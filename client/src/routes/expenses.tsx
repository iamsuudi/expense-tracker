import { createFileRoute } from "@tanstack/react-router";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

async function getExpenses() {
    const res = await api.expenses.$get();
    if (!res.ok) {
        throw new Error("Failed to fetch expenses");
    }
    return res.json();
}

export const Route = createFileRoute("/expenses")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data, error, isPending } = useQuery({
        queryKey: ["get-all-expenses"],
        queryFn: getExpenses,
    });

    if (error) return "An error has occurred: " + error.message;

    return (
        <div className="py-20">
            <Table className="max-w-xl mx-auto">
                <TableCaption>A list of your expenses.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isPending
                        ? Array(10)
                              .fill(0)
                              .map((_, i) => (
                                  <TableRow key={i}>
                                      <TableCell className="font-medium">
                                          <Skeleton className="h-4" />
                                      </TableCell>
                                      <TableCell className="">
                                          <Skeleton className="h-4" />
                                      </TableCell>
                                      <TableCell className="">
                                          <Skeleton className="h-4" />
                                      </TableCell>
                                  </TableRow>
                              ))
                        : data.expenses.map((expense) => {
                              return (
                                  <TableRow key={expense.id}>
                                      <TableCell className="font-medium">
                                          {expense.id}
                                      </TableCell>
                                      <TableCell>{expense.title}</TableCell>
                                      <TableCell className="text-right">
                                          ${expense.amount.toFixed(2)}
                                      </TableCell>
                                  </TableRow>
                              );
                          })}
                </TableBody>
            </Table>
        </div>
    );
}
