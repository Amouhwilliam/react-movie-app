import React from 'react'
import {useNavigate} from "react-router-dom"
import { useContext } from 'react'
import bg_image from '../assets/image.jpg'
import {ArrowRight} from "react-feather";
import {GenreInterface} from "../interfaces/genre";
import { MoviesContext } from '../context/movieContext'

export default function Home() {
    const { moviesGenres } = useContext(MoviesContext)
    const navigate = useNavigate()

    const ListItem = (item: GenreInterface) => {
        return <div className="flex my-6 py-6 border-b cursor-pointer" onClick={()=>{
            navigate(`/category/${item?.id}`, {state: {name: item.name}})
        }}>
            <p className="w-10/12 font-bold">{item.name}</p>
            <div className="w-2/12 flex justify-end mr-3">
                <ArrowRight/>
            </div>
        </div>
    }

    return (
        <div className="flex justify-center">
            <div className="w-full laptop:w-[724px] px-6">
                <img src={bg_image} className="w-full h-72 rounded-lg mt-12" alt="bg-image"/>
                <div className="title my-6">
                    Movies category
                </div>
                {
                    moviesGenres?.map((genre, index)=>(
                        <ListItem key={index} id={genre?.id} name={genre?.name}/>
                    ))
                }
            </div>
        </div>
    );
}

