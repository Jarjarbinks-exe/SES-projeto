import { Server } from "@hocuspocus/server";

const server = new Server({
    // The server will be available at ws://localhost:3000
    port: 1010,
});

async function start() {
    await server.listen();
    console.log("Server is running on ws://localhost:1010");
}