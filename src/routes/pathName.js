const pathName = {
    home: '/',
    movie: {
        list: '/movie',
    },
    tvShow: {
        list: '/tv-show'
    },
    search: params => `/search/${params || ''}`
};

export default pathName;
