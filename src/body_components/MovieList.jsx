import React from "react";
import {useState, useEffect} from 'react';
import './MovieList.css'
import MovieCard from './MovieCard';
import MovieModal from './MovieModal'; 

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

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTI5ODRiYmFiNGJhMmRiMjViOTE2NTVjYTY0MDU2ZiIsInN1YiI6IjY2Njc2NGZjNGMyMDcxYWJlYWJlNzcwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ytUyI8njIl9Uh_mx_PyZNfPgDiQaYmkVjCo7uCNkarU'
            }
            };

            let url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNum}`;
            if (searchMovie) { //fetches search api with query of movie the user is searching for
                    url = `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&page=${pageNum}&language=en-US&api_key=912984bbab4ba2db25b91655ca64056f`;
                    fetch(url, options)
                    .then(response => response.json())
                    .then(response => setSearchResults([...searchResults, ...response.results]))
                    .catch(err => console.error(err)); 
             } else if (wantSort) { //fetches sort api, sorted by the option user selected
                url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNum}&sort_by=${sortValue}`;
                fetch(url, options)
                .then(response => response.json())
                .then(response => setSortResults([...sortResults, ...response.results]))
                .catch(err => console.error(err)); 
             } else { //fetches now playing
                setPageNum(1);
                fetch(url, options)
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

    return ( 
            <div>
            {showSearchPanel ? (
                <>
                    <form onSubmit= {(e) => {handleSearch(e)}}>
                        <input id='searchBar' input='text' name='movieSearch' placeholder='search'></input>
                        <button id='searchGo'>Go</button>
                    </form>
                    <button onClick={showSearch}>Back to Now Playing</button>
                    <div id="cardSection">
                        {searchResults.map(movie => (
                            <MovieCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            name={movie.title} rating={movie.vote_average} key={`${movie.id}-${Math.random}`}
                            modalOpen={() => displayModal(movie)} />)
                        )}
                        { showModal ? (
                            <MovieModal name={modalMovie.title} poster={`https://image.tmdb.org/t/p/w500${modalMovie.poster_path}`} closeModal={closeModal} release={modalMovie.release_date} overview={modalMovie.overview} />
                        ) : (<></>)}                     
                    </div>
                    <button onClick={loadMoreMovies}>Load More</button>
                </>
            ) : (
                <>
                <button onClick={showSearch} id="searchButton">Search Movies</button>
                <label id="sortLabel">Sort by:</label>
                    <select value={sortPick} onChange={handleSort} name="sort" id="sort-option">
                        <option value="">--none--</option>
                        <option value="title">Title</option>
                        <option value="rating">Rating</option>
                        <option value="relDate">Release Date</option>
                    </select>
                {wantSort ? ( 
                    <>
                    <div id="cardSection">
                    {sortResults.map(movie => (
                        <MovieCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        name={movie.title} rating={movie.vote_average} key={`${movie.id}-${Math.random *10}`}
                        modalOpen={() => displayModal(movie)} />)
                    )} 
                    { showModal ? (
                            <MovieModal name={modalMovie.title} poster={`https://image.tmdb.org/t/p/w500${modalMovie.poster_path}`} closeModal={closeModal} release={modalMovie.release_date} overview={modalMovie.overview} />
                    ) : (<></>)}                    
                    </div>
                    <button onClick={loadMoreMovies}>Load More</button> </>
                ) :
                (<>
                <div id="cardSection">
                        {data.map(movie => (
                            <MovieCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            name={movie.title} rating={movie.vote_average} key={`${movie.id}-${Math.random *100}`}
                            modalOpen={() => displayModal(movie)} />)
                        )}
                        { showModal ? (
                            <MovieModal name={modalMovie.title} poster={`https://image.tmdb.org/t/p/w500${modalMovie.poster_path}`} closeModal={closeModal} release={modalMovie.release_date} overview={modalMovie.overview} />
                        ) 
                        : (<></>)} 
                </div> 
                <button id="loadMore" onClick={loadMoreMovies}>Load More</button>
                </>)}
                </>
                )}
            </div>
    );
}

export default MovieList;