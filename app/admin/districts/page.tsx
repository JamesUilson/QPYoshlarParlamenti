"use client";

import { useEffect, useState } from "react";
import { Pencil, Search, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import { getDistricts, updateDistrict, initializeData, type ElectionDistrict } from "@/lib/data-store";

export default function AdminDistrictsPage() {
  const [list, setList] = useState<ElectionDistrict[]>([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editing, setEditing] = useState<ElectionDistrict | null>(null);
  const [formData, setFormData] = useState({
    districts: "",
    mahallas: "",
  });

  useEffect(() => {
    initializeData();
    setList(getDistricts());
  }, []);

  const filtered = list
    .filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.region.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.number - b.number);

  const openEdit = (d: ElectionDistrict) => {
    setEditing(d);
    setFormData({
      districts: d.districts.join(", "),
      mahallas: d.mahallas ? d.mahallas.join(", ") : "",
    });
  };

  const handleSave = () => {
    if (!editing) return;
    const updated = updateDistrict(editing.id, {
      districts: formData.districts.split(",").map(s => s.trim()).filter(Boolean),
      mahallas: formData.mahallas.split(",").map(s => s.trim()).filter(Boolean),
    });
    if (updated) {
      setList(list.map(d => d.id === updated.id ? updated : d));
    }
    setEditing(null);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Saylov okruglari</h1>
        <p className="text-gray-600">Har bir saylov okrugi tumanlar va mahallalarini tahrirlash</p>
      </div>

      <div className="mb-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Okrug nomi yoki viloyat bo'yicha qidirish..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map(d => (
          <div key={d.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <button
                className="flex items-center gap-3 flex-1 text-left"
                onClick={() => setExpanded(expanded === d.id ? null : d.id)}
              >
                <span className="w-8 h-8 rounded-full bg-[#0047AB] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {d.number}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{d.name}</p>
                  <p className="text-xs text-gray-500">{d.region}</p>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  {d.mahallas && d.mahallas.length > 0 && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">
                      {d.mahallas.length} mahalla
                    </span>
                  )}
                  {expanded === d.id ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </button>
              <Button
                variant="ghost"
                size="sm"
                className="ml-3 text-[#0047AB]"
                onClick={() => openEdit(d)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>

            {expanded === d.id && (
              <div className="border-t border-gray-100 px-4 py-4 bg-gray-50 text-sm space-y-3">
                <div>
                  <p className="font-semibold text-gray-600 mb-1">Tumanlar:</p>
                  <p className="text-gray-800">{d.districts.join(" , ")}</p>
                </div>
                {d.mahallas && d.mahallas.length > 0 ? (
                  <div>
                    <p className="font-semibold text-gray-600 mb-1 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" /> Mahallalar ({d.mahallas.length} ta):
                    </p>
                    <p className="text-[#0047AB] leading-relaxed text-xs">
                      {d.mahallas.join(" , ")}
                    </p>
                  </div>
                ) : (
                  <p className="text-gray-400 italic text-xs">Mahallalar kiritilmagan. Tahrirlash tugmasini bosing.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editing} onOpenChange={open => { if (!open) setEditing(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 border border-blue-200 rounded p-3 text-xs text-blue-800">
              Vergul bilan ajratib yozing. Har bir tuman yoki mahalla alohida qator emas, vergul bilan.
            </div>
            <div className="space-y-2">
              <Label>Tumanlar (vergul bilan ajrating)</Label>
              <Textarea
                value={formData.districts}
                onChange={e => setFormData(f => ({ ...f, districts: e.target.value }))}
                rows={3}
                placeholder="Beruniy tumani, Nukus shahri, Amudaryo tumani"
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Mahallalar (vergul bilan ajrating)</Label>
              <Textarea
                value={formData.mahallas}
                onChange={e => setFormData(f => ({ ...f, mahallas: e.target.value }))}
                rows={10}
                placeholder="Abay OFY, Amir Temur MFY, Beruniy OFY, ..."
                className="text-sm font-mono"
              />
              {formData.mahallas && (
                <p className="text-xs text-gray-500">
                  {formData.mahallas.split(",").filter(s => s.trim()).length} ta mahalla kiritilgan
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Bekor qilish</Button>
            </DialogClose>
            <Button onClick={handleSave} className="bg-[#0047AB] hover:bg-blue-700">
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
