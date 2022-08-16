import {client} from "../client";
import {GenreInterface} from "../interfaces/genre";
import {MovieInterface} from "../interfaces/movie";

describe('Test Api client', () => {

    it('Get get movies genres', async () => {
        const getResult = await client.getGenres()
        expect(Array.isArray(getResult)).toBe(true)
        if (Array.isArray(getResult) && getResult.length > 0) {
            const defaultGenre = getResult[0]
            isGenre(defaultGenre)
        }
    }, 3000)

    it('Get get movies by genre', async () => {
        const {results} = await client.getMoviesByGenre(27)
        expect(Array.isArray(results)).toBe(true)
        if (Array.isArray(results) && results.length > 0) {
            const movie = results[0]
            isMovie(movie)
        }
    }, 3000)

    it('Get get movies by id', async () => {
        const results = await client.getMovieById(299536)
        isMovie(results)
    }, 3000)
})


function isMovie(movie: MovieInterface) {
    expect(movie.id).toBeDefined()
    expect(movie.id).toBeGreaterThan(0)
    isString(movie.poster_path)
    isBoolean(movie.adult)
    isString(movie.overview)
    isString(movie.release_date)
    if (Array.isArray(movie.genre_ids) && movie.genre_ids.length > 0) {
        const genre_id = movie.genre_ids[0]
        isNumber(genre_id)
    }
    isString(movie.original_title)
    isString(movie.original_language)
    isString(movie.title)
    isString(movie.backdrop_path)
    isNumber(movie.popularity)
    isNumber(movie.vote_count)
    isBoolean(movie.video)
    isNumber(movie.vote_average)
    isString(movie.status)
    if (Array.isArray(movie.genres) && movie.genres.length > 0) {
        const genre = movie.genres[0]
        isGenre(genre)
    }
}

function isNumber(data?: number) {
    expect(data).toBeDefined()
    expect(typeof data).toBe('number')
}

function isString(data?: string) {
    if (data) {
        expect(data).toBeDefined()
        expect(typeof data).toBe('string')
    } else {
        expect(data).toBeUndefined();
    }
}

function isBoolean(data?: boolean) {
    expect(data).toBeDefined()
    expect(typeof data).toBe('boolean')
}

function isGenre(data: GenreInterface) {
    expect(data.id).toBeDefined()
    expect(data.id).toBeGreaterThan(0)
    expect(data.name).toBeDefined()
    expect(typeof data.name).toBe('string')
}
