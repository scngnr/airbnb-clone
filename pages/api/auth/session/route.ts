import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Oturum bulunamadı veya süresi dolmuş. Lütfen tekrar giriş yapın." }, { status: 401 });
        }
        return NextResponse.json(session);
    } catch (error) {
        return NextResponse.json(
            { error: "Oturum bilgisi alınamadı. Lütfen daha sonra tekrar deneyin." },
            { status: 500 }
        );
    }
}