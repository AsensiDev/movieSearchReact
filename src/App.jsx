import './App.css'
import responseMovies from './mocks/with-results.json'
import withoutResults from './mocks/no-results.json'

function App() {
  const movies = responseMovies.Search
  const hasMovies = movies?.length > 0

  return (
    <div className='page'>

      <header>
        <h1>Buscador de películas</h1>
        <form className="form">
          <input type="text" placeholder='Avengers, Star Wars...' id='movie'/>
          <button type='submit'>buscar</button>
        </form>
      </header>

      <main>
        {
          hasMovies
            ? (
              <ul>
                {
                  movies.map(movie => (
                    <li key={movie.imdbID}>
                      <h3>{movie.Title}</h3>
                      <p>{movie.Year}</p>
                      <img src={movie.Poster} alt={movie.Title} />
                    </li>
                  ))
                }
              </ul>
            )
            : (
              <p>No tenemos esa película en la base de datos</p>
            )
        }
      </main>
      
    </div>
  )
}

export default App
