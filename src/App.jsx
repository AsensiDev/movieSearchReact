import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useEffect, useState, useRef } from 'react'

function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {

    if(isFirstInput.current) {
      isFirstInput.current = search === ''
      return 
    }

    if(search === '') {
      setError('No se puede buscar una palicula vacia')
      return
    }

    if(search.match(/^\d+$/)) {
      setError('No se puede buscar una palícula con un número')
      return
    }

    if(search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, setSearch, error}
}

function App() {

  const { search, setSearch, error } = useSearch()
  const { movies, getMovies } = useMovies({ search })
  

  function handleSubmit(event) {
    event.preventDefault()
    getMovies()
  }

  function handleChange(event) {
    setSearch(event.target.value)
  }
  
  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input name='query' onChange={handleChange} value={search} type="text" placeholder='Avengers, Star Wars...' id='movie'/>
          <button type='submit'>buscar</button>
        </form>
        {error && <p style={{ color: 'red'}} >{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
      
    </div>
  )
}

export default App

