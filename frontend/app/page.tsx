"use client";
import { useEffect, useState } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

export default function TestPage() {
  const [apiMsg, setApiMsg] = useState("Loading API...");
  const [wsMsg, setWsMsg] = useState("Connecting WS...");

  useEffect(() => {
    // 1. Test HTTP
    fetch(`${API_URL}/data`)
      .then(res => res.json())
      .then(data => setApiMsg(data.message));

    // 2. Test WebSocket
    const socket = new WebSocket(WS_URL);
    socket.onmessage = (e) => setWsMsg(JSON.parse(e.data).msg);
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Multi-Backend Test</h1>
      <p>HTTP Backend: <strong>{apiMsg}</strong></p>
      <p>WS Backend: <strong>{wsMsg}</strong></p>
    </div>
  );
}
