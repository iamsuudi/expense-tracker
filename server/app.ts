import { serveStatic } from "hono/bun";
import app from "./api-routes";

app.get("*", serveStatic({ root: "./client/dist" }));
app.get("*", serveStatic({ path: "./client/dist/index.html" }));

export default app;
