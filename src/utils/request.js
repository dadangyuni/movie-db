import Axios from "axios";
import { movieDbUrl, movieDbApiKey, movieDbAccessToken } from 'utils/intialEndpoint';

const getBaseHeader = async () => {
    const headers = {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${movieDbAccessToken}`,
    };

    return headers;
};

export const getOption = async (method, url, data) => {
    return { headers: await getBaseHeader(), method, url, data, cancelToken: Axios.CancelToken.source().token };
};

export const movieProvider = {
    get: async (url, params) => {
        const option = await getOption('GET', `${movieDbUrl}/${url}?api_key=${movieDbApiKey}`, params);
        const response = await Axios.request(option);
        return response;
    }
};
