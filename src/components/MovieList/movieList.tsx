'use client'

import { useEffect, useState } from 'react'
import './movieList.scss'
import axios from 'axios'
import Moviecard from '../MovieCard/movieCard'
import { Movie } from '@/types/movie'
import ReactLoading from 'react-loading'

export default function MovieList() {

    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getMovies()
    }, [])

    const getMovies = async () => {
        await axios({
            method: 'get',
            url: "https://api.themoviedb.org/3/discover/movie",
            params: {
                api_key: 'eef343da8ecd30f451f0abc46ff35f37',
                language: 'pt-BR'
            }

        }).then(response => {
            setMovies(response.data.results)
        })

        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <div className='loading-container'>
                <ReactLoading type="spin" color="#6046ff" height={'5%'} width={'5%'} />
            </div>
        )
    }

    return (
        <ul className='movie-list'>
            {movies.map((movie) =>
             <Moviecard
                     key={movie.id}
                    movie={movie}
              />
            )}
        </ul>
    )
}