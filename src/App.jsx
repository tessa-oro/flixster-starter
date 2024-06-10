import { useState } from 'react'
import './App.css'
import FlixsterHeader from './header_components/FlixsterHeader.jsx'
import MovieList from './body_components/MovieList'

function App() {
  return (
    <div className="App">
      <header>
        <FlixsterHeader />
      </header>
      <MovieList />
    </div>
  );
};

export default App;
