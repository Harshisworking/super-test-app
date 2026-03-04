"use client";
import { useEffect, useState } from 'react';

// Use fallbacks to satisfy TypeScript during the build process
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "";

export default function TestPage() {
  const [apiMsg, setApiMsg] = useState("Loading API...");
  const [wsMsg, setWsMsg] = useState("Connecting WS...");

  useEffect(() => {
    // 1. Test HTTP - Only run if URL exists
    if (API_URL) {
      fetch(`${API_URL}/data`)
        .then(res => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then(data => setApiMsg(data.message || data.msg))
        .catch(err => {
          console.error("API Fetch Error:", err);
          setApiMsg("Error loading API");
        });
    }

    // 2. Test WebSocket - TypeScript safety check
    let socket: WebSocket | null = null;
    
    if (WS_URL) {
      try {
        socket = new WebSocket(WS_URL);
        
        socket.onopen = () => console.log("Connected to WebSocket");
        
        socket.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data);
            setWsMsg(data.msg || data.message);
          } catch (parseError) {
            console.error("WS Parse Error:", parseError);
          }
        };

        socket.onerror = (error) => {
          console.error("WebSocket Error:", error);
          setWsMsg("Connection error");
        };
      } catch (e) {
        console.error("Socket initialization failed:", e);
      }
    }

    // Cleanup function to close socket when component unmounts
    return () => {
      if (socket) socket.close();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Multi-Backend Test</h1>
      <p>HTTP Backend: <strong>{apiMsg}</strong></p>
      <p>WS Backend: <strong>{wsMsg}</strong></p>
      <hr style={{ width: '50%', margin: '2rem auto' }} />
      <div style={{ fontSize: '0.8rem', color: '#666' }}>
        <p>Target API: {API_URL || "Not Set"}</p>
        <p>Target WS: {WS_URL || "Not Set"}</p>
      </div>
    </div>
  );
}
