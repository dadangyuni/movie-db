import { movieProvider } from 'utils/request';
import { movieDbBaseImgUrl } from 'utils/intialEndpoint';
import axios from 'axios';

const app = {
    get: async (url) => {
        return movieProvider.get(url);
    },
    getImage: (filepath, size = 'w500') => {
        return `${movieDbBaseImgUrl}${size}${filepath}`;
    },
    cancel: () => axios.CancelToken.source().cancel('Request got rejected')
};

export default app;
