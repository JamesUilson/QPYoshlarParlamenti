"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  getYoshlarGuruhlari, updateYoshlarGuruhi, initializeData, type YoshlarGuruhi,
} from "@/lib/data-store";
import LangTabInput from "@/components/lang-tab-input";

const emptyForm = {
  description: "", description_oz: "", description_ru: "", description_en: "",
};

export default function AdminYoshlarGuruhlariPage() {
  const [list, setList] = useState<YoshlarGuruhi[]>([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ ...emptyForm });
  const [selected, setSelected] = useState<YoshlarGuruhi | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => { initializeData(); setList(getYoshlarGuruhlari()); }, []);

  const filtered = list.filter(x =>
    x.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = () => {
    if (!selected) return;
    const updated = updateYoshlarGuruhi(selected.id, formData);
    if (updated) setList(list.map(x => x.id === updated.id ? updated : x));
    setIsEdit(false);
    setSelected(null);
    setFormData({ ...emptyForm });
  };

  const openEdit = (item: YoshlarGuruhi) => {
    setSelected(item);
    setFormData({
      description: item.description || "",
      description_oz: item.description_oz || "",
      description_ru: item.description_ru || "",
      description_en: item.description_en || "",
    });
    setIsEdit(true);
  };

  const handleLangField = (field: string, value: string) =>
    setFormData(f => ({ ...f, [field]: value }));

  const FormFields = () => (
    <div className="space-y-4 py-4">
      <LangTabInput
        label="Tavsif"
        fieldBase="description"
        values={formData}
        onChange={handleLangField}
        multiline
        rows={5}
        placeholder="Yoshlar guruhi haqida qisqacha ma'lumot"
      />
    </div>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Yoshlar guruhlari</h1>
          <p className="text-gray-600">Siyosiy partiyalar yoshlar guruhlarini boshqarish</p>
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
              <TableHead>Logo</TableHead>
              <TableHead>Yoshlar guruhi nomi</TableHead>
              <TableHead className="hidden md:table-cell">Tavsif</TableHead>
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
            ) : filtered.map(item => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="relative w-10 h-10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-sm leading-snug max-w-xs">{item.name}</TableCell>
                <TableCell className="hidden md:table-cell text-sm text-gray-500 max-w-xs truncate">
                  {item.description || <span className="italic text-gray-400">Kiritilmagan</span>}
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
            <DialogTitle className="text-sm leading-snug flex items-center gap-3">
              {selected && (
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image src={selected.image} alt={selected.name} fill className="object-contain" />
                </div>
              )}
              {selected?.name}
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
