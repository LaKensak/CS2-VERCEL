// app/api/agent/report/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const API_KEY = process.env.AGENT_API_KEY || 'CHANGE_THIS_TO_A_SECRET_KEY';

export async function POST(req: Request) {
    try {
        const key = req.headers.get('x-api-key') || '';
        if (key !== API_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const body = await req.json();

        const conn = await mysql.createConnection({
            host: process.env.DB_HOST || 'mysql-rcharkaoui.alwaysdata.net',
            user: process.env.DB_USER || '339575',
            password: process.env.DB_PASS || 'Marocco80',
            database: process.env.DB_NAME || 'rcharkaoui_cs2',
        });

        // Insert into agent_logs
        const insertSql = `
      INSERT INTO agent_logs
      (agent_id, timestamp, pid, process_name, exe_path, cmdline, process_running,
       cpu_percent, memory_rss_mb, memory_vms_mb, num_threads,
       process_uptime_seconds, open_files, connections, mapped_paths, raw_json)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const p = body.process_info || {};
        await conn.execute(insertSql, [
            body.agent_id,
            body.timestamp,
            p.pid || null,
            p.name || null,
            p.exe || null,
            JSON.stringify(p.cmdline || []),
            p ? 1 : 0,
            p.cpu_percent ?? null,
            p.memory_rss_mb ?? null,
            p.memory_vms_mb ?? null,
            p.num_threads ?? null,
            p.process_uptime_seconds ?? null,
            JSON.stringify(p.open_files || []),
            JSON.stringify(p.connections || []),
            JSON.stringify(p.mapped_paths || []),
            JSON.stringify(body)
        ]);

        // Upsert status global (id=1)
        const upsertSql = `
      INSERT INTO agent_status (id, agent_id, last_seen, process_running, status_message)
      VALUES (1, ?, CURRENT_TIMESTAMP, ?, ?)
      ON DUPLICATE KEY UPDATE
        agent_id = VALUES(agent_id),
        last_seen = CURRENT_TIMESTAMP,
        process_running = VALUES(process_running),
        status_message = VALUES(status_message)
    `;
        await conn.execute(upsertSql, [
            body.agent_id,
            (p && p.pid) ? 1 : 0,
            (p && p.pid) ? 'running' : 'stopped'
        ]);

        await conn.end();
        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error("Agent POST error:", err);
        return NextResponse.json({ error: String(err.message || err) }, { status: 500 });
    }
}
