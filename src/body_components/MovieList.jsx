import React from "react";
import {useState, useEffect} from 'react';
import './MovieList.css'
import MovieCard from './MovieCard';
import MovieModal from './MovieModal'; 
import Sidebar from './Sidebar';

const MovieList = () => {
    const [data, setData] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const [searchMovie, setSearchMovie] = useState("");
    const [showSearchPanel, setShowSearchPanel] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [sortResults, setSortResults] = useState([]);
    const [wantSort, setWantSort] = useState(false);
    const [sortValue, setSortValue] = useState("");
    const [sortPick, setSortPick] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMovie, setModalMovie] = useState([]);
    const [favMovies, setFavMovies] = useState([]);

//use iframe to show trailer
//check if type is teaser
//search movie video api

    useEffect(() => {
        const apiKey = import.meta.env.VITE_API_KEY;

            let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&include_adult=false&page=${pageNum}`;
            if (searchMovie) { //fetches search api with query of movie the user is searching for
                    url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchMovie}&page=${pageNum}&language=en-US&include_adult=false&api_key=912984bbab4ba2db25b91655ca64056f`;
                    fetch(url)
                    .then(response => response.json())
                    .then(response => setSearchResults([...response.results]))
                    .catch(err => console.error(err)); 
             } else if (wantSort) { //fetches sort api, sorted by the option user selected
                url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=${sortValue}`;
                fetch(url)
                .then(response => response.json())
                .then(response => setSortResults([...response.results]))
                .catch(err => console.error(err)); 
             } else { //fetches now playing
                setPageNum(1);
                fetch(url)
                .then(response => response.json())
                .then(response => setData([...data, ...response.results]))
                .catch(err => console.error(err));
             }
        }, [pageNum, searchMovie, sortValue, wantSort]);

    /*
    increases page numbers showing when user clicks load more
    8*/
    const loadMoreMovies = () => { 
        setPageNum(pageNum + 1);
    }

    /* 
    clears movies on page shows search bar when user clicks search movies 
    */
    const showSearch = () => { 
        setSearchMovie("");
        setSearchResults([]);
        setShowSearchPanel(!showSearchPanel);
    };

    /* 
    takes in user search and sets searchMovie to that user input for the search api
    */
    const handleSearch = (e) => { 
        e.preventDefault();
        let searchingFor = e.target.elements.movieSearch.value;
        setSearchMovie(searchingFor);
        setPageNum(1);
    }
    
    /* 
    if user selects a search option, wantSort is set to true and sortValue is set to corresponding pick for sort api
    */
    const handleSort = (e) => {
        const selectedSort = e.target.value;
        setSearchResults([]);
        setSortPick(selectedSort);
        setPageNum(1);
        if (selectedSort === '') {
            setWantSort(false);
        } else if (selectedSort === 'title') {
            setWantSort(true);
            setSortValue('title.asc');
        } else if (selectedSort === 'rating') {
            setWantSort(true);
            setSortValue('vote_average.desc');
        } else {
            setWantSort(true);
            setSortValue('primary_release_date.desc');
        }
    }

    /*
    displays modal with the movie info of the movie user clicked on
    */
    const displayModal = (movie) => {
        setShowModal(true);
        setModalMovie(movie);
    }

    /* 
    closes the modal
    */
    const closeModal = () => {
        setShowModal(false);
        setModalMovie([]);
    }

    const addToBar = (movieTitle) => {
        setFavMovies([...favMovies, movieTitle]);
    }

    const removeFromBar = (movieTitle) => {
        setFavMovies(favMovies.filter(e => e !== movieTitle));
    }

    return ( 
            <div>
            {showSearchPanel ? (
                <>
                    <form onSubmit= {(e) => {handleSearch(e)}}>
                        <input id='searchBar' input='text' name='movieSearch' placeholder='search'></input>
                        <button id='searchGo'>Go</button>
                    </form>
                    <button id="backToPlaying" onClick={showSearch}>Back to Now Playing</button>
                    <div id="cardSection">
                        {searchResults.map(movie => (
                            <MovieCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            name={movie.title} rating={movie.vote_average} key={`${movie.id}-${Math.random}`}
                            modalOpen={() => displayModal(movie)} addToBar={() => addToBar(movie.title)}
                            removeFromBar={() => removeFromBar(movie.title)}/>)
                        )}
                        { showModal ? (
                            <MovieModal name={modalMovie.title} movieID={modalMovie.id} key={`${modalMovie.id}-${Math.random}`} poster={`https://image.tmdb.org/t/p/w500${modalMovie.poster_path}`} closeModal={closeModal} release={modalMovie.release_date} overview={modalMovie.overview} />
                        ) : (<></>)}                     
                    </div>
                </>
            ) : (
                <div>
                <span id="buttonBar">
                <button onClick={showSearch} id="searchButton"><span>Search Movies</span></button>
                <div id="sortBox"><span>
                    <label id="sortLabel">Sort by:</label>
                    <select value={sortPick} onChange={handleSort} name="sort" id="sortOption">
                        <option value="">--none--</option>
                        <option value="title">Title</option>
                        <option value="rating">Rating</option>
                        <option value="relDate">Release Date</option>
                    </select>
                    </span>
                </div>
                </span>
                <div id="mainBody">
                {wantSort ? ( 
                    <div id="movies">
                    <div id="cardSection">
                    {sortResults.map(movie => (
                        <MovieCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        name={movie.title} rating={movie.vote_average} key={`${movie.id}-${Math.random *10}`}
                        modalOpen={() => displayModal(movie)} addToBar={() => addToBar(movie.title)}
                        removeFromBar={() => removeFromBar(movie.title)}/>)
                    )} 
                    { showModal ? (
                            <MovieModal name={modalMovie.title} movieID={modalMovie.id} key={`${modalMovie.id}-${Math.random}`} poster={`https://image.tmdb.org/t/p/w500${modalMovie.poster_path}`} closeModal={closeModal} release={modalMovie.release_date} overview={modalMovie.overview} />
                    ) : (<></>)}                    
                    </div>
                     </div>
                ) :
                (<div id="movies">
                <div id="cardSection">
                        {data.map(movie => (
                            <MovieCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            name={movie.title} rating={movie.vote_average} key={`${movie.id}-${Math.random *100}`}
                            modalOpen={() => displayModal(movie)} addToBar={() => addToBar(movie.title)}
                            removeFromBar={() => removeFromBar(movie.title)}/>)
                        )}
                        { showModal ? (
                            <MovieModal name={modalMovie.title} movieID={modalMovie.id} key={`${modalMovie.id}-${Math.random}`} poster={`https://image.tmdb.org/t/p/w500${modalMovie.poster_path}`} closeModal={closeModal} release={modalMovie.release_date} overview={modalMovie.overview} />
                        ) 
                        : (<></>)} 
                </div> 
                <button id="loadMore" onClick={loadMoreMovies}><span>Load More</span></button>
                </div>)}
                <Sidebar movieMap={favMovies}/>
                </div>
                </div>
                )}
            </div>
    );
}

export default MovieList;