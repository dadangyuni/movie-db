const pathName = {
    home: '/',
    movie: {
        list: '/movies',
        popular: '/movies/popular',
        trending: '/movies/trending',
        newRelease: '/movies/new-release',
        detail: params => `/movie/${params}`
    },
    tvShow: {
        list: '/tv-show',
        popular: '/tv-show/popular',
        trending: '/tv-show/trending',
        newRelease: '/tv-show/new-release',
        detail: params => `/tv-show/${params}`,
    },
    genre: {
        list: '/genre'
    },
    search: params => `/search/${params || ''}`
};

export default pathName;
