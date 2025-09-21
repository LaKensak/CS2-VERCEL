
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST || 'mysql-rcharkaoui.alwaysdata.net',
        user: process.env.DB_USER || '339575',
        password: process.env.DB_PASS || 'Marocco80',
        database: process.env.DB_NAME || 'rcharkaoui_cs2',
    });

    const [rows] = await conn.execute("SELECT status FROM cheat_status WHERE id=1");
    await conn.end();

    return NextResponse.json({ status: (rows as any)[0].status });
}
