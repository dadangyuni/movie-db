import React from "react";
import pathName from "./pathName";

const { home, movie } = pathName;

const routes = [
    { path: home, exact: true, component: React.lazy(() => import('views/Home')) },
    { path: movie.list, exact: true, component: React.lazy(() => import('views/Movies')) },
];

export default routes;
