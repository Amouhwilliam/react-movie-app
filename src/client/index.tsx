import {axiosInstance} from "./apiConfig";

function configureApi() {
    axiosInstance.get(`configuration?api_key=${process.env.REACT_APP_TMBD_API_KEY}`)
        .then(function (response) {
            const data = {
                imageBaseUrl: response.data.images.baseURL,
                image: response.data.images
            }
            localStorage.setItem('config_data', JSON.stringify(data))
        })
        .catch(function (error) {
            console.error(error);
        })
}

function getGenres() {
    return axiosInstance.get(`/genre/movie/list?api_key=${process.env.REACT_APP_TMBD_API_KEY}&language=en-US`)
        .then(function (response) {
            return response.data.genres
        })
        .catch(function (error) {
            console.error(error);
        })
}

function getMoviesByGenre(id: number, withPagination: boolean = false, currentPage: number = 1) {
    return axiosInstance.get(`/discover/movie?api_key=${process.env.REACT_APP_TMBD_API_KEY}&with_genres=${id}&page=${withPagination ? currentPage + 1 : currentPage}`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.error(error);
        })

}

function getMovieById(id: number) {
    return axiosInstance.get(`/movie/${id}?api_key=${process.env.REACT_APP_TMBD_API_KEY}&language=en-US`)
        .then(function (response) {
            return response.data
        })
        .catch(function (error) {
            console.error(error);
        })
}

export const client = {
    configure: configureApi,
    getGenres: getGenres,
    getMoviesByGenre: getMoviesByGenre,
    getMovieById: getMovieById
}