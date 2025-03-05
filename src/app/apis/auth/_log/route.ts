import { NextResponse } from "next/server";
import { getAuthLogs } from "./_log";

export async function GET(request: Request) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const limit = parseInt(searchParams.get('limit') || '100');

        const logs = getAuthLogs(limit);
        return NextResponse.json(logs);
    } catch (error) {
        return NextResponse.json(
            { error: "Log kayıtları alınamadı" },
            { status: 500 }
        );
    }
}