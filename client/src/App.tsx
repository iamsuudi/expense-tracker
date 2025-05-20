import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { api } from "./lib/api";

function App() {
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        async function fetchTotal() {
            const res = await api.expenses.total.$get();
            const data = await res.json();
            setTotalExpenses(data.total);
        }
        fetchTotal();
    }, []);

    return (
        <Card className="w-[350px] m-auto">
            <CardHeader>
                <CardTitle>Total Spent</CardTitle>
                <CardDescription>
                    The total amount you have spent
                </CardDescription>
            </CardHeader>
            <CardContent>{totalExpenses}</CardContent>
            <CardFooter></CardFooter>
        </Card>
    );
}

export default App;
