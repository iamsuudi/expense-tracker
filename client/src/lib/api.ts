import { hc } from "hono/client";
import { type ApiRoutes } from "@server/api-routes";

const client = hc<ApiRoutes>("/");

export const api = client.api