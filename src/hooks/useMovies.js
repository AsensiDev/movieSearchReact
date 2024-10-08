import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const prevSearch = useRef(search)

    const getMovies = useCallback(async ({search}) => {
        if(search === prevSearch.current) return

        try {
          setError(null)
          prevSearch.current = search
          const newMovies = await searchMovies({ search })
          setMovies(newMovies)
        } catch (e) {
          setError(e.message)
        }
      }, [search])
    
    const sortedMovies = useMemo(() => {
      return sort
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
        : movies
    }, [sort, movies]) 

    return { movies: sortedMovies, getMovies }
  }