"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogTrigger, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  getKengash, addKengashMember, updateKengashMember, deleteKengashMember,
  initializeData, type KengashMember,
} from "@/lib/data-store";
import LangTabInput from "@/components/lang-tab-input";

const emptyForm = {
  name: "",
  position: "", position_oz: "", position_ru: "", position_en: "",
  image: "",
  description: "", description_oz: "", description_ru: "", description_en: "",
};

export default function AdminKengashPage() {
  const [list, setList] = useState<KengashMember[]>([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ ...emptyForm });
  const [selected, setSelected] = useState<KengashMember | null>(null);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => { initializeData(); setList(getKengash()); }, []);

  const filtered = list.filter(x =>
    x.name.toLowerCase().includes(search.toLowerCase()) ||
    x.position.toLowerCase().includes(search.toLowerCase())
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFormData(f => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    const item = addKengashMember(formData);
    setList([item, ...list]);
    setIsAdd(false);
    setFormData({ ...emptyForm });
  };

  const handleEdit = () => {
    if (!selected) return;
    const updated = updateKengashMember(selected.id, formData);
    if (updated) setList(list.map(x => x.id === updated.id ? updated : x));
    setIsEdit(false);
    setSelected(null);
    setFormData({ ...emptyForm });
  };

  const handleDelete = () => {
    if (!selected) return;
    deleteKengashMember(selected.id);
    setList(list.filter(x => x.id !== selected.id));
    setIsDelete(false);
    setSelected(null);
  };

  const openEdit = (item: KengashMember) => {
    setSelected(item);
    setFormData({
      name: item.name,
      position: item.position, position_oz: item.position_oz || "", position_ru: item.position_ru || "", position_en: item.position_en || "",
      image: item.image || "",
      description: item.description || "", description_oz: item.description_oz || "", description_ru: item.description_ru || "", description_en: item.description_en || "",
    });
    setIsEdit(true);
  };

  const handleLangField = (field: string, value: string) =>
    setFormData(f => ({ ...f, [field]: value }));

  const FormFields = () => (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>F.I.Sh</Label>
        <Input value={formData.name} onChange={e => setFormData(f => ({ ...f, name: e.target.value }))} placeholder="To'liq ism" />
      </div>
      <LangTabInput
        label="Lavozimi"
        fieldBase="position"
        values={formData}
        onChange={handleLangField}
        placeholder="Yoshlar parlamenti raisi"
      />
      <div className="space-y-2">
        <Label>Rasm URL</Label>
        <Input value={formData.image} onChange={e => setFormData(f => ({ ...f, image: e.target.value }))} placeholder="/images/..." />
        <Input type="file" accept="image/*" onChange={handleImageUpload} className="cursor-pointer" />
        {formData.image?.startsWith("data:") && <p className="text-xs text-green-600">✓ Rasm yuklandi</p>}
      </div>
      <LangTabInput
        label="Tavsif"
        fieldBase="description"
        values={formData}
        onChange={handleLangField}
        multiline
        rows={3}
        placeholder="Qisqacha ma'lumot"
      />
    </div>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Kengash tarkibi</h1>
          <p className="text-gray-600">Yoshlar parlamenti Kengashi a'zolarini boshqarish</p>
        </div>
        <Dialog open={isAdd} onOpenChange={setIsAdd}>
          <DialogTrigger asChild>
            <Button className="bg-[#0047AB] hover:bg-blue-700" onClick={() => setFormData({ ...emptyForm })}>
              <Plus className="mr-2 h-4 w-4" /> Yangi qo'shish
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Yangi a'zo qo'shish</DialogTitle></DialogHeader>
            <FormFields />
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Bekor qilish</Button></DialogClose>
              <Button onClick={handleAdd} className="bg-[#0047AB] hover:bg-blue-700">Saqlash</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Qidirish..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>F.I.Sh</TableHead>
              <TableHead className="hidden md:table-cell">Lavozimi</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow><TableCell colSpan={3} className="text-center py-8 text-gray-500">Ma'lumot topilmadi</TableCell></TableRow>
            ) : filtered.map(item => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-gray-600 max-w-xs truncate">{item.position}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => { setSelected(item); setIsDelete(true); }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEdit} onOpenChange={setIsEdit}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Tahrirlash</DialogTitle></DialogHeader>
          <FormFields />
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Bekor qilish</Button></DialogClose>
            <Button onClick={handleEdit} className="bg-[#0047AB] hover:bg-blue-700">Saqlash</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDelete} onOpenChange={setIsDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ishonchingiz komilmi?</AlertDialogTitle>
            <AlertDialogDescription>Bu a'zoni o'chirishni xohlaysizmi? Bu amal qaytarib bo'lmaydi.</AlertDialogDescription>
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
