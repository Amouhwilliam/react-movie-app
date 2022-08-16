import React, {useContext, useEffect, useState} from 'react'
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {MoviesContext} from "../context/movieContext";
import {ArrowRight} from "react-feather";
import {MovieInterface} from "../interfaces/movie";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Category() {

    const [searchValue, setSearchValue] = useState<string>("")

    const {id} = useParams()
    const location = useLocation()
    const {name}: any = location.state || {name: ''}
    const navigate = useNavigate()
    const {movies, getMoviesByGenre, canLoadMovies} = useContext(MoviesContext)
    const imageBaseUrl = JSON.parse(localStorage.getItem('config_data') || '{}').image.base_url
    const posterSize = JSON.parse(localStorage.getItem('config_data') || '{}').image.poster_sizes[0]

    useEffect(() => {
        if (id) {
            getMoviesByGenre(id)
        }
    }, [id])

    const ListItem = (item: MovieInterface) => {
        return <div className="flex my-8 py-4 border-b cursor-pointer" onClick={() => {
            navigate(`/movie/${item?.id}`)
        }}>
            <img src={imageBaseUrl + posterSize + item?.poster_path} alt="poster" className="rounded-lg mr-4 h-24"/>
            <div className="w-10/12">
                <p className="font-bold">{item?.title}</p>
                <div>Release date: {item?.release_date}</div>
                <div>Vote: {item?.vote_count}</div>
            </div>
            <div className="w-2/12 flex justify-end mr-3">
                <ArrowRight/>
            </div>
        </div>
    }

    const handleSearch = (e: any) => {
        setSearchValue(e.target.value)
    }


    return (
        <div className="flex justify-center">
            <div className="w-full laptop:w-[724px] px-6">
                <div className="w-full pr-12 laptop:w-[724px] h-32 laptop:flex laptop:items-center fixed bg-white">
                    <div className="title w-full">
                        {name}
                    </div>
                    <div className="w-full laptop:flex laptop:justify-end">
                        <input type="text" value={searchValue} placeholder="Search" onChange={handleSearch}
                               className="w-64 border rounded-xl p-3"/>
                    </div>
                </div>
                <div className="mt-32">
                    {
                        <InfiniteScroll
                            dataLength={movies?.length || 0}
                            next={() => {
                                getMoviesByGenre(id, true)
                            }}
                            hasMore={canLoadMovies}
                            loader={<h4 className="text-center mx-3">Loading...</h4>}
                            endMessage={
                                <p style={{textAlign: 'center'}}>
                                    <b>Yay! No more movies to load.</b>
                                </p>
                            }
                        >
                            {
                                movies?.filter(item => item?.title?.match(new RegExp(searchValue, "i")))
                                .map((item, index) => (
                                    <ListItem key={index} id={item?.id} title={item?.title}
                                              vote_count={item?.vote_count}
                                              release_date={item?.release_date} poster_path={item?.poster_path}
                                    />
                                ))
                            }
                        </InfiniteScroll>
                    }
                </div>
            </div>
        </div>
    );
}

