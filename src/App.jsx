import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'



function App() {

  const { movies } = useMovies()

  function handleSubmit(event) {
    event.preventDefault()
    const { query } = Object.fromEntries(new window.FormData(event.target))
    console.log({ query })
  }
  
  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input name='query' type="text" placeholder='Avengers, Star Wars...' id='movie'/>
          <button type='submit'>buscar</button>
        </form>
      </header>

      <main>
        <Movies movies={movies} />
      </main>
      
    </div>
  )
}

export default App
