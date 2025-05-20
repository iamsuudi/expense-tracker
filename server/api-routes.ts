import { Hono } from "hono";
import { expensesRoute } from "./routes/expenses";
import { logger } from "hono/logger";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

export type ApiRoutes = typeof apiRoutes;

export default app;
