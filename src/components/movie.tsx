import React, {useContext, useEffect} from 'react'
import {MoviesContext} from "../context/movieContext";
import {useParams} from "react-router-dom";

export default function Movie() {

    const {id} = useParams()

    const {getMovieById, selectedMovie} = useContext(MoviesContext)
    const imageBaseUrl = JSON.parse(localStorage.getItem('config_data') || '{}').image.base_url
    const posterSize = JSON.parse(localStorage.getItem('config_data') || '{}').image.poster_sizes[0]
    const backdropSizes = JSON.parse(localStorage.getItem('config_data') || '{}').image.backdrop_sizes[3]
    const colorArray = ['#607d8b', '#3949ab', '#bf360c', '#1b5e20', '#01579b', '#ffeb3b']

    useEffect(() => {
        if (id) {
            getMovieById(id)
        }
    }, [id])

    return (
        <div className="flex justify-center">
            <div className="w-full laptop:w-[724px] px-6">
                <div className="w-full h-60 rounded-lg mt-12 bg-no-repeat bg-cover shadow"
                     style={{
                         backgroundImage: `url(\'${imageBaseUrl + backdropSizes + '/' + selectedMovie?.backdrop_path}\')`
                     }}
                />
                <div className="flex ml-2 -mt-32 items-center">
                    <img src={imageBaseUrl + posterSize + '/' + selectedMovie?.poster_path}
                         className="rounded-lg border-white-2 shadow-xl" alt="poster_path"/>
                </div>
                <div className="title my-6 text-center">
                    {selectedMovie?.title}
                </div>
                <div className="my-3 text-center">
                    {selectedMovie?.overview}
                </div>
                <div className="flex justify-center">
                    {
                        selectedMovie?.genres?.map((item, index) => (
                            <div key={index} className="inline px-3 py-1 mr-4 rounded-lg text-white"
                                 style={{
                                     backgroundColor: colorArray[index]
                                 }}
                            >
                                {item?.name}
                            </div>
                        ))
                    }
                </div>
                <div className="mt-8">
                    Status:
                    <span
                        className="font-bold"
                        style={{color: selectedMovie?.status === 'Released' ? '#004d40' : ''}}> {selectedMovie?.status}
                    </span>
                </div>

                <div>
                    Release date: {selectedMovie?.release_date}
                </div>

                <div>
                    Vote:
                    <span className="font-bold"> {selectedMovie?.vote_count}</span>
                </div>

            </div>
        </div>
    );
}

