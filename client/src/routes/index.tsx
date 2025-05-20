import { createFileRoute } from "@tanstack/react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { api } from "@/lib/api";
import { useSuspenseQuery } from "@tanstack/react-query";

async function getTotalSpent() {
    const res = await api.expenses.total.$get();
    if (!res.ok) {
        throw new Error("Failed to fetch total spent");
    }
    return res.json();
}

export const Route = createFileRoute("/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data, error, isPending } = useSuspenseQuery({
        queryKey: ["get-total-spent"],
        queryFn: getTotalSpent,
    });

    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return (
        <Card className="w-[350px] m-auto">
            <CardHeader>
                <CardTitle>Total Spent</CardTitle>
                <CardDescription>
                    The total amount you have spent
                </CardDescription>
            </CardHeader>
            <CardContent>{data.total}</CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
}
