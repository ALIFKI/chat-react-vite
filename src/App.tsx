import { useEffect, useState } from "react";
import "./App.css";
import RoutesLayout from "./Router/index.js";
import { socket } from "./lib/Socket/index.js";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <>
      <RoutesLayout></RoutesLayout>
    </>
  );
}

export default App;
