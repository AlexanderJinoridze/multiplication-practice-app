import React from "react";
import useRoutes from "./routes";
import { Toaster } from 'react-hot-toast';

export default function App() {
    const routes = useRoutes(false);

    return (
        <div>
            { routes }
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </div>
    );
}
