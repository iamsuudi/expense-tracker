import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const ExpenseSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string().min(3).max(100),
    amount: z.number().positive(),
});

type Expense = z.infer<typeof ExpenseSchema>;

const CreateExpenseSchema = ExpenseSchema.omit({ id: true });

const fakeExpenses: Expense[] = [
    { id: 1, title: "Groceries", amount: 50 },
    { id: 2, title: "Transport", amount: 20 },
    { id: 3, title: "Utilities", amount: 100 },
];

export const expensesRoute = new Hono()
    .get("/", (c) => {
        return c.json({ expenses: fakeExpenses });
    })
    .get("/total", (c) => {
        const total = fakeExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        return c.json({ total });
    })
    .post("/", zValidator("json", CreateExpenseSchema), async (c) => {
        const expense = c.req.valid("json");
        fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
        c.status(201);
        return c.json(expense);
    })
    .get("/:id{[0-9]+}", (c) => {
        const id = parseInt(c.req.param("id"));
        const expense = fakeExpenses.find((expense) => expense.id === id);
        if (!expense) {
            return c.notFound();
        }
        return c.json({ expense });
    })
    .delete("/:id{[0-9]+}", (c) => {
        const id = parseInt(c.req.param("id"));
        const index = fakeExpenses.findIndex((expense) => expense.id === id);
        if (index === -1) {
            return c.notFound();
        }
        const deleted = fakeExpenses.splice(index, 1)[0];
        return c.json({ deleted });
    });
