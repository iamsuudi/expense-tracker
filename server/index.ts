import { serveStatic } from "hono/bun";
import app from "./app";

app.get("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

const server = Bun.serve({
    port: process.env.PORT || 3000,
    fetch: app.fetch,
});

console.log("Server running on port", server.port);
