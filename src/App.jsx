import './App.css'
import FlixsterHeader from './header_components/FlixsterHeader.jsx'
import MovieList from './body_components/MovieList'
import Footer from './Footer'

function App() {
  return (
    <div className="App">
      <FlixsterHeader />
      <MovieList />
      <Footer />
    </div>
  );
};

export default App;
