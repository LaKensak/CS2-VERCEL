import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST() {
    const conn = await mysql.createConnection({
        host: 'mysql-rcharkaoui.alwaysdata.net',
        user: '339575',
        password: 'Marocco80',
        database: 'rcharkaoui_cs2',
    });

    await conn.execute("INSERT INTO cheat_commands (command) VALUES ('start')");
    await conn.end();

    return NextResponse.json({ message: 'Start command sent' });
}
