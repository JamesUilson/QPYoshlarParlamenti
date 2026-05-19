"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  getFriendshipGroups, addFriendshipGroup, updateFriendshipGroup, deleteFriendshipGroup,
  initializeData, type FriendshipGroup,
} from "@/lib/data-store";

const emptyForm = {
  country: "",
  flag: "",
  members: 0,
  chair: "",
  image: "",
  description: "",
  established: "",
};

export default function AdminFriendshipGroupsPage() {
  const [list, setList] = useState<FriendshipGroup[]>([]);
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState<FriendshipGroup | null>(null);
  const [formData, setFormData] = useState({ ...emptyForm });

  useEffect(() => {
    initializeData();
    setList(getFriendshipGroups());
  }, []);

  const filtered = list.filter(g =>
    g.country.toLowerCase().includes(search.toLowerCase()) ||
    g.chair.toLowerCase().includes(search.toLowerCase())
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setFormData(f => ({ ...f, image: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    const item = addFriendshipGroup({ ...formData, members: Number(formData.members) });
    setList(prev => [...prev, item]);
    setFormData({ ...emptyForm });
    setIsAddOpen(false);
  };

  const openEdit = (g: FriendshipGroup) => {
    setSelected(g);
    setFormData({ country: g.country, flag: g.flag || "", members: g.members, chair: g.chair, image: g.image || "", description: g.description, established: g.established || "" });
    setIsEditOpen(true);
  };

  const handleEdit = () => {
    if (!selected) return;
    const updated = updateFriendshipGroup(selected.id, { ...formData, members: Number(formData.members) });
    if (updated) setList(prev => prev.map(g => g.id === updated.id ? updated : g));
    setIsEditOpen(false);
    setSelected(null);
  };

  const handleDelete = () => {
    if (!selected) return;
    deleteFriendshipGroup(selected.id);
    setList(prev => prev.filter(g => g.id !== selected.id));
    setIsDeleteOpen(false);
    setSelected(null);
  };

  const FormFields = () => (
    <div className="space-y-4 py-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Davlat nomi</Label>
          <Input value={formData.country} onChange={e => setFormData(f => ({ ...f, country: e.target.value }))} placeholder="Rossiya" />
        </div>
        <div className="space-y-2">
          <Label>Tashkil yili</Label>
          <Input value={formData.established} onChange={e => setFormData(f => ({ ...f, established: e.target.value }))} placeholder="2019" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Rais F.I.Sh</Label>
          <Input value={formData.chair} onChange={e => setFormData(f => ({ ...f, chair: e.target.value }))} placeholder="Alisher Karimov" />
        </div>
        <div className="space-y-2">
          <Label>A'zolar soni</Label>
          <Input type="number" min={0} value={formData.members} onChange={e => setFormData(f => ({ ...f, members: Number(e.target.value) }))} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Tavsif</Label>
        <Textarea value={formData.description} onChange={e => setFormData(f => ({ ...f, description: e.target.value }))} rows={4} placeholder="Guruh haqida ma'lumot..." />
      </div>
      <div className="space-y-2">
        <Label>Rasm yuklash</Label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} className="cursor-pointer" />
        {formData.image && formData.image.startsWith("data:") && (
          <p className="text-xs text-green-600">✓ Rasm yuklandi</p>
        )}
        <Input value={formData.image} onChange={e => setFormData(f => ({ ...f, image: e.target.value }))} placeholder="/images/dostlik/rossiya.jpg" className="text-xs" />
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Do'stlik guruhlar</h1>
          <p className="text-gray-500 text-sm">Xorijiy davlatlar bilan do'stlik guruhlarini boshqarish</p>
        </div>
        <Button onClick={() => { setFormData({ ...emptyForm }); setIsAddOpen(true); }} className="bg-[#0047AB] hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" /> Qo'shish
        </Button>
      </div>

      <div className="mb-4 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input placeholder="Davlat yoki rais bo'yicha qidirish..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(g => (
          <div key={g.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            {g.image ? (
              <div className="h-36 relative"><img src={g.image} alt={g.country} className="w-full h-full object-cover" /></div>
            ) : (
              <div className="h-36 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                <span className="text-4xl font-bold text-[#0047AB] opacity-20">{g.country[0]}</span>
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-sm mb-1">O'zbekiston-{g.country} do'stlik guruhi</h3>
              <p className="text-xs text-gray-500 mb-1">Rais: {g.chair}</p>
              <p className="text-xs text-gray-500 mb-3">A'zolar: {g.members} ta {g.established && `• ${g.established}-yil`}</p>
              <p className="text-xs text-gray-600 line-clamp-2 mb-3">{g.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => openEdit(g)}>
                  <Pencil className="h-3 w-3 mr-1" /> Tahrirlash
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300" onClick={() => { setSelected(g); setIsDeleteOpen(true); }}>
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-12 text-gray-500">
            {search ? "Qidiruv natijasi topilmadi." : "Hali do'stlik guruh qo'shilmagan."}
          </div>
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Do'stlik guruhi qo'shish</DialogTitle></DialogHeader>
          <FormFields />
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Bekor qilish</Button></DialogClose>
            <Button onClick={handleAdd} className="bg-[#0047AB] hover:bg-blue-700" disabled={!formData.country || !formData.chair}>
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Do'stlik guruhini tahrirlash</DialogTitle></DialogHeader>
          <FormFields />
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Bekor qilish</Button></DialogClose>
            <Button onClick={handleEdit} className="bg-[#0047AB] hover:bg-blue-700">Saqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>O'chirish</AlertDialogTitle>
            <AlertDialogDescription>
              O'zbekiston-{selected?.country} do'stlik guruhini o'chirmoqchimisiz?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Bekor qilish</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">O'chirish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
