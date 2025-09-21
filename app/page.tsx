'use client';
import { useState, useEffect } from 'react';

export default function Page() {
    const [status, setStatus] = useState('stopped');

    async function fetchStatus() {
        const res = await fetch('/api/db/status');
        const data = await res.json();
        setStatus(data.status);
    }

    async function startCheat() {
        const res = await fetch('/api/db/start', { method: 'POST' });
        const data = await res.json();
        fetchStatus();
        console.log(data);
    }

    async function stopCheat() {
        const res = await fetch('/api/db/stop', { method: 'POST' });
        const data = await res.json();
        fetchStatus();
        console.log(data);
    }

    useEffect(() => {
        const interval = setInterval(fetchStatus, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>CS2 Cheat Control</h1>
            <p>Status: <strong>{status}</strong></p>
            <button onClick={startCheat} style={{ backgroundColor: 'BLUE',marginRight: '10px', padding: '10px 20px' }}>Start</button>
            <button onClick={stopCheat} style={{ backgroundColor: 'RED', padding: '10px 20px' }}>Stop</button>
        </div>
    );
}
