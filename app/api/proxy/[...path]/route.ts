import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const backendUrl = `http://127.0.0.1:8080/${params.path.join('/')}`;
        const body = await req.text();

        const res = await fetch(backendUrl, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': req.headers.get('content-type') || 'application/json'
            },
        });

        const data = await res.text();
        return new NextResponse(data, { status: res.status });
    } catch (err) {
        return NextResponse.json({ error: 'Backend unreachable', details: String(err) }, { status: 500 });
    }
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
    try {
        const backendUrl = `http://127.0.0.1:8080/${params.path.join('/')}`;

        const res = await fetch(backendUrl, { method: 'GET' });
        const data = await res.text();
        return new NextResponse(data, { status: res.status });
    } catch (err) {
        return NextResponse.json({ error: 'Backend unreachable', details: String(err) }, { status: 500 });
    }
}
