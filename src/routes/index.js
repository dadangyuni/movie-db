import React from "react";
import pathName from "./pathName";

const { home, movie, search } = pathName;

const routes = [
    { path: home, exact: true, component: React.lazy(() => import('views/Home')) },
    { path: movie.list, exact: true, component: React.lazy(() => import('views/Movies')) },
    { path: search(':search'), component: React.lazy(() => import('views/Search')) },
];

export default routes;
