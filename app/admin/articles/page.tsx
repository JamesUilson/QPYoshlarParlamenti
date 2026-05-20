"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { getArticles, addArticle, updateArticle, deleteArticle, initializeData, type Article } from "@/lib/data-store";
import LangTabInput from "@/components/lang-tab-input";

const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [formData, setFormData] = useState({
    title: "", title_oz: "", title_ru: "", title_en: "",
    date: "",
    author: "",
    position: "",
    image: "",
    description: "", description_oz: "", description_ru: "", description_en: "",
    fileUrl: "",
    fileName: "",
  });

  const handleLangField = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    initializeData();
    setArticles(getArticles());
  }, []);

  const filteredArticles = articles.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    const newItem = addArticle(formData);
    setArticles([newItem, ...articles]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedArticle) return;
    const updated = updateArticle(selectedArticle.id, formData);
    if (updated) {
      setArticles(articles.map((item) => (item.id === updated.id ? updated : item)));
    }
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedArticle) return;
    deleteArticle(selectedArticle.id);
    setArticles(articles.filter((item) => item.id !== selectedArticle.id));
    setIsDeleteDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: "", title_oz: "", title_ru: "", title_en: "",
      date: "",
      author: "",
      position: "",
      image: "",
      description: "", description_oz: "", description_ru: "", description_en: "",
      fileUrl: "",
      fileName: "",
    });
    setSelectedArticle(null);
  };

  const openEditDialog = (item: Article) => {
    setSelectedArticle(item);
    setFormData({
      title: item.title, title_oz: item.title_oz || "", title_ru: item.title_ru || "", title_en: item.title_en || "",
      date: item.date,
      author: item.author,
      position: item.position,
      image: item.image,
      description: item.description, description_oz: item.description_oz || "", description_ru: item.description_ru || "", description_en: item.description_en || "",
      fileUrl: item.fileUrl || "",
      fileName: item.fileName || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, fileUrl: reader.result as string, fileName: file.name });
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const openDeleteDialog = (item: Article) => {
    setSelectedArticle(item);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Maqolalar</h1>
          <p className="text-gray-600">Maqolalarni boshqarish</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0047AB] hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Yangi qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yangi maqola qo'shish</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <LangTabInput
                label="Sarlavha"
                fieldBase="title"
                values={formData}
                onChange={handleLangField}
                placeholder="Maqola sarlavhasi"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Muallif</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Alisher Karimov"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Sana</Label>
                  <Input
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="15.02.2025"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Lavozim</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Yoshlar parlamenti raisi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Rasm</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/articles/example.jpg"
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
                {formData.image && formData.image.startsWith("data:") && (
                  <p className="text-sm text-green-600">✓ Rasm yuklandi</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Fayl yuklash (PDF, Word va h.k.)</Label>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.rtf,.odt"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
                {formData.fileName && (
                  <p className="text-sm text-green-600">✓ {formData.fileName}</p>
                )}
              </div>
              <LangTabInput
                label="Tavsif / Maqola matni"
                fieldBase="description"
                values={formData}
                onChange={handleLangField}
                multiline
                rows={6}
                placeholder="Maqola matni"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Bekor qilish</Button>
              </DialogClose>
              <Button onClick={handleAdd} className="bg-[#0047AB] hover:bg-blue-700">
                Saqlash
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sarlavha</TableHead>
              <TableHead className="hidden md:table-cell">Muallif</TableHead>
              <TableHead>Sana</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  Maqolalar topilmadi
                </TableCell>
              </TableRow>
            ) : (
              filteredArticles.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium max-w-xs truncate">{item.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.author}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => openDeleteDialog(item)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Maqolani tahrirlash</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <LangTabInput
              label="Sarlavha"
              fieldBase="title"
              values={formData}
              onChange={handleLangField}
              placeholder="Maqola sarlavhasi"
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-author">Muallif</Label>
                <Input
                  id="edit-author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-date">Sana</Label>
                <Input
                  id="edit-date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-position">Lavozim</Label>
              <Input
                id="edit-position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-image">Rasm</Label>
              <Input
                id="edit-image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
              {formData.image && formData.image.startsWith("data:") && (
                <p className="text-sm text-green-600">✓ Rasm yuklandi</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Fayl yuklash (PDF, Word va h.k.)</Label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.rtf,.odt"
                onChange={handleFileUpload}
                className="cursor-pointer"
              />
              {formData.fileName && (
                <p className="text-sm text-green-600">✓ {formData.fileName}</p>
              )}
            </div>
            <LangTabInput
              label="Tavsif / Maqola matni"
              fieldBase="description"
              values={formData}
              onChange={handleLangField}
              multiline
              rows={6}
              placeholder="Maqola matni"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Bekor qilish</Button>
            </DialogClose>
            <Button onClick={handleEdit} className="bg-[#0047AB] hover:bg-blue-700">
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ishonchingiz komilmi?</AlertDialogTitle>
            <AlertDialogDescription>
              Bu maqolani o'chirishni xohlaysizmi? Bu amal qaytarib bo'lmaydi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ArticlesPage;
