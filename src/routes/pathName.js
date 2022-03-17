const pathName = {
    home: '/',
    movie: {
        list: '/movie',
        detail: params => `/movie/${params}`
    },
    tvShow: {
        list: '/tv-show'
    },
    search: params => `/search/${params || ''}`
};

export default pathName;
