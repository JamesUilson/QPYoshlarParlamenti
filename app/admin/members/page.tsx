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
import { getMembers, addMember, updateMember, deleteMember, initializeData, type Member } from "@/lib/data-store";

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    region: "",
    image: "",
    fraction: "O'zlidep",
    position: "",
    birthYear: "",
    birthPlace: "",
    nationality: "",
    education: "",
    university: "",
    specialization: "",
    degree: "",
    languages: "",
    email: "",
  });

  useEffect(() => {
    initializeData();
    setMembers(getMembers());
  }, []);

  const filteredMembers = members.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    const newItem = addMember(formData);
    setMembers([newItem, ...members]);
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEdit = () => {
    if (!selectedMember) return;
    const updated = updateMember(selectedMember.id, formData);
    if (updated) {
      setMembers(members.map((item) => (item.id === updated.id ? updated : item)));
    }
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDelete = () => {
    if (!selectedMember) return;
    deleteMember(selectedMember.id);
    setMembers(members.filter((item) => item.id !== selectedMember.id));
    setIsDeleteDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      region: "",
      image: "",
      fraction: "O'zlidep",
      position: "",
      birthYear: "",
      birthPlace: "",
      nationality: "",
      education: "",
      university: "",
      specialization: "",
      degree: "",
      languages: "",
      email: "",
    });
    setSelectedMember(null);
  };

  const openEditDialog = (item: Member) => {
    setSelectedMember(item);
    setFormData({
      name: item.name,
      region: item.region,
      image: item.image || "",
      fraction: item.fraction,
      position: item.position || "",
      birthYear: item.birthYear || "",
      birthPlace: item.birthPlace || "",
      nationality: item.nationality || "",
      education: item.education || "",
      university: item.university || "",
      specialization: item.specialization || "",
      degree: item.degree || "",
      languages: item.languages || "",
      email: item.email || "",
    });
    setIsEditDialogOpen(true);
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

  const openDeleteDialog = (item: Member) => {
    setSelectedMember(item);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">A'zolar</h1>
          <p className="text-gray-600">Parlament a'zolarini boshqarish</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#0047AB] hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Yangi qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yangi a'zo qo'shish</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">F.I.Sh</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Jiyenbayev Berdakh Kalbay o'g'li"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region">Saylov okrugi</Label>
                <Input
                  id="region"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="1-Qoraqalpog'iston Respublikasi saylov okrugi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Rasm</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/members/example.jpg"
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
                <Label htmlFor="fraction">Fraksiya</Label>
                <select
                  id="fraction"
                  value={formData.fraction}
                  onChange={(e) => setFormData({ ...formData, fraction: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                >
                  <option value="O'zlidep">O'zlidep</option>
                  <option value="Milliy tiklanish">Milliy tiklanish</option>
                  <option value="Adolat">Adolat</option>
                  <option value="Eco">Eco</option>
                  <option value="Bepartiya">Bepartiya</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Lavozimi</Label>
                <Textarea
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Lavozim"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthYear">Tug'ilgan yili</Label>
                  <Input
                    id="birthYear"
                    value={formData.birthYear}
                    onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                    placeholder="1996"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Millati</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    placeholder="o'zbek"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthPlace">Tug'ilgan joyi</Label>
                <Input
                  id="birthPlace"
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                  placeholder="Toshkent shahri"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education">Ma'lumoti</Label>
                <Input
                  id="education"
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  placeholder="oliy ma'lumotli"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">O'qish joyi</Label>
                <Input
                  id="university"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  placeholder="Toshkent davlat universiteti"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Mutaxassisligi</Label>
                <Input
                  id="specialization"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="huquqshunos"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Ilmiy darajasi</Label>
                <Input
                  id="degree"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="yo'q"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="languages">Chet tillarini bilishi</Label>
                <Input
                  id="languages"
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  placeholder="ingliz, rus tillari"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                />
              </div>
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
              <TableHead>F.I.Sh</TableHead>
              <TableHead className="hidden md:table-cell">Saylov okrugi</TableHead>
              <TableHead>Fraksiya</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  A'zolar topilmadi
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">{item.region}</TableCell>
                  <TableCell>{item.fraction}</TableCell>
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
            <DialogTitle>A'zoni tahrirlash</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">F.I.Sh</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-region">Saylov okrugi</Label>
              <Input
                id="edit-region"
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
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
              <Label htmlFor="edit-fraction">Fraksiya</Label>
              <select
                id="edit-fraction"
                value={formData.fraction}
                onChange={(e) => setFormData({ ...formData, fraction: e.target.value })}
                className="w-full h-10 px-3 rounded-md border border-input bg-background"
              >
                <option value="O'zlidep">O'zlidep</option>
                <option value="Milliy tiklanish">Milliy tiklanish</option>
                <option value="Adolat">Adolat</option>
                <option value="Eco">Eco</option>
                <option value="Bepartiya">Bepartiya</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-position">Lavozimi</Label>
              <Textarea
                id="edit-position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-birthYear">Tug'ilgan yili</Label>
                <Input
                  id="edit-birthYear"
                  value={formData.birthYear}
                  onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-nationality">Millati</Label>
                <Input
                  id="edit-nationality"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-birthPlace">Tug'ilgan joyi</Label>
              <Input
                id="edit-birthPlace"
                value={formData.birthPlace}
                onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-education">Ma'lumoti</Label>
              <Input
                id="edit-education"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-university">O'qish joyi</Label>
              <Input
                id="edit-university"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-specialization">Mutaxassisligi</Label>
              <Input
                id="edit-specialization"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-degree">Ilmiy darajasi</Label>
              <Input
                id="edit-degree"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-languages">Chet tillarini bilishi</Label>
              <Input
                id="edit-languages"
                value={formData.languages}
                onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
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
              Bu a'zoni o'chirishni xohlaysizmi? Bu amal qaytarib bo'lmaydi.
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

export default MembersPage;
