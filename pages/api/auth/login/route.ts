import { NextResponse } from "next/server";
import { signIn } from "next-auth/react";
import { logAuth } from "../_log";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            logAuth('warning', 'Eksik kimlik bilgileri');
            return NextResponse.json(
                { error: "E-posta ve şifre gereklidir" },
                { status: 400 }
            );
        }

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if (result?.error) {
                return NextResponse.json(
                    { error: "Geçersiz kimlik bilgileri" },
                    { status: 401 }
                );
            }

            logAuth('info', 'Başarılı giriş', { email });
            return NextResponse.json({ success: true });

        } catch (error) {
            logAuth('error', 'Giriş hatası', { email, error });
            return NextResponse.json(
                { error: "Giriş işlemi başarısız" },
                { status: 500 }
            );
        }

    } catch (error) {
        return NextResponse.json(
            { error: "İstek işlenirken bir hata oluştu" },
            { status: 500 }
        );
    }
}