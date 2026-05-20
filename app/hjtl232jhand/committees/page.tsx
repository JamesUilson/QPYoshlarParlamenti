"use client";

import { useEffect, useState } from "react";
import { Pencil, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  getCommittees, updateCommittee, initializeData, type Committee,
} from "@/lib/data-store";
import LangTabInput from "@/components/lang-tab-input";

const emptyForm = {
  chair: "",
  description: "", description_oz: "", description_ru: "", description_en: "",
  image: "",
};

export default function AdminCommitteesPage() {
  const [list, setList] = useState<Committee[]>([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ ...emptyForm });
  const [selected, setSelected] = useState<Committee | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => { initializeData(); setList(getCommittees()); }, []);

  const filtered = list.filter(x =>
    x.name.toLowerCase().includes(search.toLowerCase()) ||
    (x.chair || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFormData(f => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleEdit = () => {
    if (!selected) return;
    const updated = updateCommittee(selected.id, formData);
    if (updated) setList(list.map(x => x.id === updated.id ? updated : x));
    setIsEdit(false);
    setSelected(null);
    setFormData({ ...emptyForm });
  };

  const openEdit = (item: Committee) => {
    setSelected(item);
    setFormData({
      chair: item.chair || "",
      description: item.description || "",
      description_oz: item.description_oz || "",
      description_ru: item.description_ru || "",
      description_en: item.description_en || "",
      image: item.image || "",
    });
    setIsEdit(true);
  };

  const handleLangField = (field: string, value: string) =>
    setFormData(f => ({ ...f, [field]: value }));

  const FormFields = () => (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>Qo'mita raisi (F.I.Sh)</Label>
        <Input
          value={formData.chair}
          onChange={e => setFormData(f => ({ ...f, chair: e.target.value }))}
          placeholder="Rais ismi"
        />
      </div>
      <LangTabInput
        label="Tavsif"
        fieldBase="description"
        values={formData}
        onChange={handleLangField}
        multiline
        rows={4}
        placeholder="Qo'mita haqida qisqacha ma'lumot"
      />
      <div className="space-y-2">
        <Label>Rasm</Label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} className="cursor-pointer" />
        {formData.image?.startsWith("data:") && (
          <p className="text-xs text-green-600">✓ Rasm yuklandi</p>
        )}
        {formData.image && !formData.image.startsWith("data:") && (
          <Input
            value={formData.image}
            onChange={e => setFormData(f => ({ ...f, image: e.target.value }))}
            placeholder="/images/..."
          />
        )}
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Qo'mitalar</h1>
          <p className="text-gray-600">Yoshlar parlamenti qo'mitalarini boshqarish</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Qidirish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Qo'mita nomi</TableHead>
              <TableHead className="hidden md:table-cell">Rais</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                  Ma'lumot topilmadi
                </TableCell>
              </TableRow>
            ) : filtered.map((item, idx) => (
              <TableRow key={item.id}>
                <TableCell className="text-gray-500 text-sm">{idx + 1}</TableCell>
                <TableCell className="font-medium text-sm leading-snug max-w-xs">{item.name}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-gray-600">
                  {item.chair || <span className="text-gray-400 italic">Belgilanmagan</span>}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEdit} onOpenChange={setIsEdit}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sm leading-snug">
              Tahrirlash: {selected?.name}
            </DialogTitle>
          </DialogHeader>
          <FormFields />
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
    </div>
  );
}
