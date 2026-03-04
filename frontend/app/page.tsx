"use client";
import { useEffect, useState } from 'react';

// Environment variables provided by your orchestrator
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "";

export default function TestPage() {
  const [apiMsg, setApiMsg] = useState("Loading API...");
  const [wsMsg, setWsMsg] = useState("Connecting WS...");
  const [aiMsg, setAIMsg] = useState("");

  // Corrected function syntax
  const handleAIClick = () => {
    setAIMsg("AI is thinking...");
    fetch(`${API_URL}/ai-talk`)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => setAIMsg(data.message || data.msg || "No message received"))
      .catch(err => {
        console.error("AI Fetch Error:", err);
        setAIMsg("Error talking to AI");
      });
  };

  useEffect(() => {
    // 1. Test HTTP
    if (API_URL) {
      fetch(`${API_URL}/data`)
        .then(res => res.json())
        .then(data => setApiMsg(data.message || data.msg))
        .catch(err => setApiMsg("Error loading API"));
    }

    // 2. Test WebSocket
    let socket: WebSocket | null = null;
    if (WS_URL) {
      try {
        socket = new WebSocket(WS_URL);
        socket.onmessage = (e) => {
          const data = JSON.parse(e.data);
          setWsMsg(data.msg || data.message);
        };
        socket.onerror = () => setWsMsg("Connection error");
      } catch (e) {
        console.error("Socket initialization failed:", e);
      }
    }

    return () => { if (socket) socket.close(); };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Multi-Backend Test</h1>
      
      <div style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px' }}>
        <p>HTTP Backend: <strong>{apiMsg}</strong></p>
        <p>WS Backend: <strong>{wsMsg}</strong></p>
        <p>AI Status: <strong>{aiMsg}</strong></p>
      </div>

      <button 
        onClick={handleAIClick} 
        style={{ padding: '10px 20px', cursor: 'pointer' }}
      >
        Click me for AI
      </button>

      <hr style={{ width: '50%', margin: '2rem auto' }} />
      
      <div style={{ fontSize: '0.8rem', color: '#666' }}>
        <p>Target API: {API_URL || "Not Set"}</p>
        <p>Target WS: {WS_URL || "Not Set"}</p>
      </div>
    </div>
  );
}
