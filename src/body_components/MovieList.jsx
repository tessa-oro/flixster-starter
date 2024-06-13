import React from "react";
import {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import './MovieList.css'
import MovieCard from './MovieCard';
import {BsSearch} from 'react-icons/bs';
import {useRef} from 'react';
/*import MovieModal from './MovieModal'; */

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

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTI5ODRiYmFiNGJhMmRiMjViOTE2NTVjYTY0MDU2ZiIsInN1YiI6IjY2Njc2NGZjNGMyMDcxYWJlYWJlNzcwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ytUyI8njIl9Uh_mx_PyZNfPgDiQaYmkVjCo7uCNkarU'
            }
            };

            let url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNum}`;
            if (searchMovie) {
                    url = `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&page=1&language=en-US&api_key=912984bbab4ba2db25b91655ca64056f`;
                    fetch(url, options)
                    .then(response => response.json())
                    .then(response => setSearchResults(response.results))
                    .catch(err => console.error(err)); 
             } else if (wantSort) {
                console.log('sorting');
                url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=${sortValue}`;
                fetch(url, options)
                .then(response => response.json())
                .then(response => setSortResults(response.results))
                .catch(err => console.error(err)); 
             } else {
                fetch(url, options)
                .then(response => response.json())
                .then(response => setData([...data, ...response.results]))
                .catch(err => console.error(err));
             }
        }, [pageNum, searchMovie, sortValue]);

    
    const loadMoreMovies = () => {
        setPageNum(pageNum + 1);
    }


    const showSearch = () => {
        console.log('show search switched');
        setShowSearchPanel(!showSearchPanel);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        let searchingFor = e.target.elements.movieSearch.value;
        console.log(searchingFor);
        setSearchMovie(searchingFor);
    }
    
    const handleSort = (e) => {
        console.log('sorting');
        const selectedSort = e.target.value;
        setSortPick(selectedSort);
        console.log(selectedSort);
        if (selectedSort === '--none--') {
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


    return ( 
            <div>
            {showSearchPanel ? (
                <>
                    <form onSubmit= {(e) => {handleSearch(e)}}> {/*turn into form and do on submit handle submit and quere is searchmovie*/}
                        <input id='searchBar' input='text' name='movieSearch' placeholder='search'></input>
                        <button id='searchGo'>Go</button>
                    </form>
                    <button onClick={showSearch}>Back to Now Playing</button>
                    <div id="cardSection">
                        {searchResults.map(movie => (
                            <MovieCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            name={movie.title} rating={movie.vote_average} key={`${movie.id}-${Math.random}`} />)
                        )}                    
                    </div>
                </>
            ) : (
                <>
                <button onClick={showSearch}>Search Movies</button>
                <label>Sort by:</label>
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
                        name={movie.title} rating={movie.vote_average} key={`${movie.id}-${Math.random}`} />)
                    )}                    
                    </div>
                    <button onClick={loadMoreMovies}>Load More</button> </>
                ) :
                (<>
                <div id="cardSection">
                        {data.map(movie => (
                            <MovieCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            name={movie.title} rating={movie.vote_average} key={`${movie.id}-${Math.random}`} />)
                        )}
                </div>
                <button onClick={loadMoreMovies}>Load More</button>
                </>)}
                </>
                )}
            </div>
    );
}

export default MovieList;