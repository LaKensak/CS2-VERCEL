import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST() {
    const conn = await mysql.createConnection({
        host: process.env.DB_HOST || 'mysql-rcharkaoui.alwaysdata.net',
        user: process.env.DB_USER || '339575',
        password: process.env.DB_PASS || 'Marocco80',
        database: process.env.DB_NAME || 'rcharkaoui_cs2',
    });


    await conn.execute("INSERT INTO cheat_commands (command) VALUES ('stop')");
    await conn.end();

    return NextResponse.json({ message: 'Stop command sent' });
}
