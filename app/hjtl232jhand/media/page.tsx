"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search, Image as ImageIcon, Video } from "lucide-react";
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
import { getMedia, addMedia, updateMedia, deleteMedia, initializeData, type MediaItem } from "@/lib/data-store";

const MediaPage = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "photo" | "video">("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    image: "",
    type: "photo" as "photo" | "video",
    duration: "",
  });

  useEffect(() => {
    initializeData();
    setMedia(getMedia());
  }, []);

  const filteredMedia = media.filter(
    (item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || item.type === filterType;
      return matchesSearch && matchesType;
    }
  );

  const handleAdd = () => {
    const newItem = addMedia(formData);
    setMedia([newItem, ...media]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedMedia) return;
    const updated = updateMedia(selectedMedia.id, formData);
    if (updated) {
      setMedia(media.map((item) => (item.id === updated.id ? updated : item)));
    }
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedMedia) return;
    deleteMedia(selectedMedia.id);
    setMedia(media.filter((item) => item.id !== selectedMedia.id));
    setIsDeleteDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      image: "",
      type: "photo",
      duration: "",
    });
    setSelectedMedia(null);
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

  const openEditDialog = (item: MediaItem) => {
    setSelectedMedia(item);
    setFormData({
      title: item.title,
      date: item.date,
      image: item.image,
      type: item.type,
      duration: item.duration || "",
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (item: MediaItem) => {
    setSelectedMedia(item);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Mediateka</h1>
          <p className="text-gray-600">Foto va video materiallarni boshqarish</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0047AB] hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Yangi qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yangi media qo'shish</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Sarlavha</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Media sarlavhasi"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Turi</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as "photo" | "video" })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="photo">Foto</option>
                    <option value="video">Video</option>
                  </select>
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
                <Label htmlFor="image">Rasm/Thumbnail</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/media/example.jpg"
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
              {formData.type === "video" && (
                <div className="space-y-2">
                  <Label htmlFor="duration">Davomiyligi</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="12:30"
                  />
                </div>
              )}
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

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
            className={filterType === "all" ? "bg-[#0047AB]" : ""}
          >
            Hammasi
          </Button>
          <Button
            variant={filterType === "photo" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("photo")}
            className={filterType === "photo" ? "bg-[#0047AB]" : ""}
          >
            <ImageIcon className="h-4 w-4 mr-1" /> Foto
          </Button>
          <Button
            variant={filterType === "video" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("video")}
            className={filterType === "video" ? "bg-[#0047AB]" : ""}
          >
            <Video className="h-4 w-4 mr-1" /> Video
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Turi</TableHead>
              <TableHead>Sarlavha</TableHead>
              <TableHead>Sana</TableHead>
              <TableHead className="hidden md:table-cell">Qo'shimcha</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMedia.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  Media topilmadi
                </TableCell>
              </TableRow>
            ) : (
              filteredMedia.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {item.type === "photo" ? (
                      <ImageIcon className="h-5 w-5 text-blue-500" />
                    ) : (
                      <Video className="h-5 w-5 text-red-500" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate">{item.title}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.type === "video" && item.duration ? item.duration : "-"}
                  </TableCell>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Mediani tahrirlash</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Sarlavha</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-type">Turi</Label>
                <select
                  id="edit-type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as "photo" | "video" })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="photo">Foto</option>
                  <option value="video">Video</option>
                </select>
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
              <Label htmlFor="edit-image">Rasm/Thumbnail</Label>
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
            {formData.type === "video" && (
              <div className="space-y-2">
                <Label htmlFor="edit-duration">Davomiyligi</Label>
                <Input
                  id="edit-duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
            )}
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
              Bu mediani o'chirishni xohlaysizmi? Bu amal qaytarib bo'lmaydi.
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

export default MediaPage;
