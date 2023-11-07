import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000");

export default function Home() {
  const [mes, setMes] = useState("");
  const [newMes, setNewMes] = useState("");
  const [room, setRoom] = useState("");

  function sendMessage() {
    socket.emit("send_message", { message: mes, room });
  }

  function joinRoom() {
    socket.emit("join_room", { room });
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setNewMes(data.message);
    });
  }, [socket]);
  return (
    <div>
      <div>
        <input
          type="text"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button onClick={joinRoom}>JoinRoom</button>
      </div>
      <input
        type="text"
        value={mes}
        onChange={(e) => {
          setMes(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send</button>
      <h1>{newMes}</h1>
    </div>
  );
}
