import { useEffect } from "react";
import { useMemo } from "react";
import { io } from "socket.io-client";
const App = () => {
  const socket = useMemo(() => io("http://localhost:3000"), []);
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("hello how you doing ?");
    });
  });

  return <div className="font-bold">jivan aryal</div>;
};

export default App;
