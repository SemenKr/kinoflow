import { useGetTopRatedMoviesQuery } from '@/features/movies/api/moviesApi'

function App() {
  const { data } = useGetTopRatedMoviesQuery({ page: 2, language: 'ru-RU' })
  console.log(data)
  return <div>KinoFlow</div>
}

export default App
