"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { setAdminLoggedIn } from "@/lib/data-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAdminLoggedIn();
        router.push("/hjtl232jhand");
      } else {
        setError(data.error || "Noto'g'ri parol. Iltimos, qayta urinib ko'ring.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Server bilan bog'lanishda xatolik yuz berdi.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-[#0047AB] rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">A</span>
          </div>
          <CardTitle className="text-2xl">Admin Panel</CardTitle>
          <CardDescription>
            Yoshlar Parlamenti boshqaruv paneliga kirish
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input
                id="password"
                type="password"
                placeholder="Parolni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#0047AB] hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Kirish..." : "Kirish"}
            </Button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Kirish huquqi faqat Yoshlar parlamenti raisi va u ruxsat bergan foydalanuvchilar uchun!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
