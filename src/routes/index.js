import React from "react";
import pathName from "./pathName";

const { home, movie, search, genre, tvShow } = pathName;

const routes = [
    { path: home, exact: true, component: React.lazy(() => import('views/Home')) },
    { path: search(':search'), component: React.lazy(() => import('views/Search')) },
    { path: genre.list, exact: true, component: React.lazy(() => import('views/Genre')) },
    { path: movie.list, exact: true, component: React.lazy(() => import('views/Movies')) },
    { path: movie.popular, exact: true, component: React.lazy(() => import('views/MoviesPopular')) },
    { path: movie.trending, exact: true, component: React.lazy(() => import('views/MoviesTrending')) },
    { path: movie.detail(':id'), exact: true, component: React.lazy(() => import('views/Movie-detail')) },
    { path: tvShow.list, exact: true, component: React.lazy(() => import('views/Series')) },
];

export default routes;
