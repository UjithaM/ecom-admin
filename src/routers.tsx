import {createBrowserRouter} from "react-router-dom";
import Layout from "@/layout/layout.tsx";
import Product from "@/page/product/product.tsx";
import Login from "@/page/Login.tsx";
import ProtectedRoute from "@/layout/ProtectedRoute.tsx";
import NotFound from "@/page/not-found.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute><Layout /></ProtectedRoute>,
        //TODO: create a 404 page for this
        errorElement : <NotFound />,
        children: [
            {
                path: 'product',
                element: <Product />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }

]);

export default router;