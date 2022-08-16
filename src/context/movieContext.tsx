import React, {useEffect, useState} from 'react'
import {GenreInterface} from "../interfaces/genre";
import {MovieInterface} from "../interfaces/movie";
import {client} from "../client";

export interface IMovies {
    moviesGenres?: Array<GenreInterface>
    getMoviesByGenre: Function,
    movies?: Array<MovieInterface>
    selectedGenreName?: string
    canLoadMovies: boolean
    selectedMovie: MovieInterface | undefined
    getMovieById: Function
}

const defaultState: IMovies = {
    moviesGenres: [],
    getMoviesByGenre: () => {
    },
    movies: [],
    canLoadMovies: true,
    selectedMovie: undefined,
    getMovieById: () => {
    }
}

export const MoviesContext = React.createContext(defaultState)

const MoviesProvider = (props: any) => {
    const [moviesGenres, setMoviesGenres] = useState<Array<GenreInterface>>()
    const [movies, setMovies] = useState<Array<MovieInterface>>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [canLoadMovies, setCanLoadMovies] = useState<boolean>(true)
    const [selectedMovie, setSelectedMovie] = useState<MovieInterface>()

    useEffect(() => {
        if (!localStorage.getItem('config_data')) {
            configureApi()
        }
        getMoviesGenres()
    }, []);

    function configureApi() {
        client.configure()
    }

    async function getMoviesGenres() {
        setMovies([]) //clear state
        setMoviesGenres(await client.getGenres())
    }

    async function getMoviesByGenre(id: number, withPagination: boolean = false) {
        setSelectedMovie(undefined) //clear state
        const result = await client.getMoviesByGenre(id, withPagination, currentPage)
        if (withPagination) {
            setTimeout(() => {
                setMovies([...movies, ...result.results])
            }, 2000)
            setCurrentPage(currentPage + 1)
            setCanLoadMovies(result.total_pages > currentPage)
        } else {
            setMovies(result.results)
            setCurrentPage(1)
        }
    }

    async function getMovieById(id: number) {
        setMovies([]) //clear state
        setSelectedMovie(await client.getMovieById(id))
    }

    const state: IMovies = {
        moviesGenres,
        getMoviesByGenre,
        movies,
        canLoadMovies,
        selectedMovie,
        getMovieById
    }

    return <MoviesContext.Provider value={state}>{props?.children}</MoviesContext.Provider>
}

export default MoviesProvider
