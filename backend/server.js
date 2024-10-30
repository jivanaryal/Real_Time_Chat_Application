import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import userRoutes from "./routes/users.js";
import { authenticateToken } from "./middleware/auth.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true,
  },
});

const port = 3000;

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/users", userRoutes);
// app.use(authenticateToken);

app.get("/", authenticateToken, (req, res) => {
  res.send("<h1>hello jivan</h1>");
});
io.on("connect", (socket) => {
  console.log("a user connected");
});
server.listen(port, () => {
  console.log(`the server is listening at port ${port}`);
});
