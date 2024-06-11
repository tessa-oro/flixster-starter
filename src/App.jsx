import { useState } from 'react'
import './App.css'
import FlixsterHeader from './header_components/FlixsterHeader.jsx'
import MovieList from './body_components/MovieList'

function App() {
  return (
    <div className="App">
      <FlixsterHeader />
      <MovieList />
    </div>
  );
};

const fetchData = async () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}&api_key=${apiKey}`);
  const data = await response.json();
  console.log(data.results);
  /*setMovieData(data); */
};

fetchData();

export default App;
