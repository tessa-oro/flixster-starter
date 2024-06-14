import './App.css'
import FlixsterHeader from './header_components/FlixsterHeader.jsx'
import MovieList from './body_components/MovieList'
import Sidebar from './body_components/Sidebar'

function App() {
  return (
    <div className="App">
      <FlixsterHeader />
      <MovieList />
    </div>
  );
};

export default App;
