import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <NavBar />
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </React.Fragment>
    );
}

function NavBar() {
    return (
        <div className="p-2 flex gap-2">
            <Link to={"/"} className="[&.active]:font-bold">
                Home
            </Link>
            <Link to={"/about"} className="[&.active]:font-bold">
                About
            </Link>
            <Link to={"/expenses"} className="[&.active]:font-bold">
                Expenses
            </Link>
            <Link to={"/create-expense"} className="[&.active]:font-bold">
                Create
            </Link>
        </div>
    );
}
