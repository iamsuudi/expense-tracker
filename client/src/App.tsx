import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

function App() {
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        fetch("/api/expenses/total")
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: { total: number } = await response.json();
                setTotalExpenses(data.total);
            })
            .catch((error) => {
                console.log(error);
            });
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
