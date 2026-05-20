import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const correctPassword = process.env.ADMIN_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { error: "Server xatosi: Parol sozlanmagan" },
        { status: 500 }
      );
    }

    if (password === correctPassword) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Noto'g'ri parol" },
      { status: 401 }
    ) as NextResponse;
  } catch (error) {
    return NextResponse.json(
      { error: "Xato so'rov jo'natildi" },
      { status: 400 }
    );
  }
}
