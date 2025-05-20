import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import z from "zod";

export const Route = createFileRoute("/create-expense")({
    component: RouteComponent,
});

const formSchema = z.object({
  title: z.string(),
  amount: z.string().min(5)
})

function RouteComponent() {
    const form = useForm({
        defaultValues: {
            title: "",
            amount: "",
        },
        validators: {
          onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            // Do something with form data
            console.log(value);
        },
    });

    return (
        <div className="py-20 space-y-10">
            <h1 className="text-center font-bold">Expense Create Form</h1>
            <form
                className="space-y-2 max-w-lg mx-auto"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <form.Field
                    name="title"
                    validators={{
                        onChange: ({ value }) =>
                            !value
                                ? "A title is required"
                                : value.length < 3
                                  ? "Title must be at least 3 characters"
                                  : undefined,
                        onChangeAsyncDebounceMs: 500,
                        onChangeAsync: async ({ value }) => {
                            await new Promise((resolve) =>
                                setTimeout(resolve, 1000)
                            );
                            return (
                                value.includes("error") &&
                                'No "error" allowed in title'
                            );
                        },
                    }}
                    children={(field) => (
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                placeholder="Laundary"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                            />
                            <FieldInfo field={field} />
                        </div>
                    )}
                />
                <form.Field
                    name="amount"
                    children={(field) => (
                        <div className="space-y-2">
                            <Label>Amount</Label>
                            <Input
                                id={field.name}
                                name={field.name}
                                placeholder="11.50"
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                            />
                            <FieldInfo field={field} />
                        </div>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </div>
    );
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  console.log(field.state);
  
    return (
        <div className="h-6">
            {field.state.meta.isTouched && !field.state.meta.isValid ? (
                <em className="text-red-500 text-xs">
                    {field.state.meta.errors.join(", ")}
                </em>
            ) : null}
            {field.state.meta.isValidating ? (
                <span className="text-xs text-blue-500">Validating...</span>
            ) : null}
        </div>
    );
}
