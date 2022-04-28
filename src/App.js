import { useState, useEffect } from 'react'

import './App.css'
import MovieCard from './MovieCard'
import SearchIcon from './search.svg'
// apikey 6efa985b

const API_URL = 'http://www.omdbapi.com?apikey=6efa985b'

const movie1 = {
    "Title": "Hollywood's Master Storytellers: Spiderman Live",
    "Year": "2006",
    "imdbID": "tt2158533",
    "Type": "movie",
    "Poster": "N/A"
}


const App = () => {

    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json()

        setMovies(data.Search)
        console.log(data)
    }
 
    useEffect(() => {
        searchMovies('batman')
    }, [])

  return (
    <div className='app'>
        <h1>BenFLix</h1>

        <div className='search'>
            <input 
                placeholder='Search for movies' 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img 
                src={SearchIcon} 
                alt='search'
                onClick={() => searchMovies(searchTerm)}
            />
        </div>

        {movies?.length > 0 
            ?   (
                    <div className='container'>
                    {movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.imdbID}/>
                        ))}
                    </div>
                )   :   (
                    <div className='empty'>
                        <h2>No movies found</h2>
                    </div>
                )}
    </div>
  )
}

export default App