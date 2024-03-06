import {Outlet, useRoutes} from 'react-router-dom';
import {FC, Suspense} from "react";
import Layout from "../component/layout";
import Home from "../component/page/home";

const routeList: any = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Home />,
            },
        ]
    }
]
const RenderRouter: FC = () => {
    const element = useRoutes(routeList);

    return element;
};

export default RenderRouter;