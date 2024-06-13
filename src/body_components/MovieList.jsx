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
                    console.log('searching');
                    url = `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&page=1&language=en-US&api_key=912984bbab4ba2db25b91655ca64056f`;
                    fetch(url, options).
                    then(response => response.json())
                    .then(response => setSearchResults(response.results))
                    .catch(err => console.error(err)); 
                    console.log(searchResults);
             } else {
                fetch(url, options)
                .then(response => response.json())
                .then(response => setData([...data, ...response.results]))
                .catch(err => console.error(err));
             }
        }, [pageNum, searchMovie]);

    
        const loadMoreMovies = () => {
            setPageNum(pageNum + 1);
        }

        // use effect to query search results using async
        /*useEffect(() => {
            if (searchMovie) {
                const url = `https://api.themoviedb.org/3/search/movie?query=${searchMovie}&page=1&language=en-US&api_key=912984bbab4ba2db25b91655ca64056f`;
                fetch(url).
                then(response => response.json())
                .then(response => setSearchResults([...data, ...response.results]))
                .catch(err => console.error(err)); 
            };
            //fetchSearchResults();
        }, [searchMovie]); */

    
        const showSearch = () => {
            console.log('show search switched');
            setShowSearchPanel(!showSearchPanel);
        };

        const handleSearch = (e) => {
            e.preventDefault();
            let searchingFor = e.target.elements.movieSearch.value;
            console.log(searchingFor);
            //searchMovie = searchingFor;
            //console.log(searchMovie);
            setSearchMovie(searchingFor);
            //console.log(searchMovie);
        }
/*
        const setSearchTerm = (searchingFor) => {
            console.log(searchingFor);
            setSearchMovie(searchingFor);
            console.log(searchMovie);
        } */
        //console.log(searchMovie);
    return (
        <div> 
            <div>
            <button onClick={showSearch}>Search Movies</button>
            {showSearchPanel ? (
                <>
                    <form onSubmit= {(e) => {handleSearch(e)}}> {/*turn into form and do on submit handle submit and quere is searchmovie*/}
                        <input id='searchBar' input='text' name='movieSearch' placeholder='search'></input>
                        <button id='searchGo'>Go</button>
                    </form>
                    <div id="cardSection">
                        {searchResults.map(movie => (
                        <MovieCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        name={movie.title} rating={movie.vote_average} key={`${movie.id}-${Math.random}`} />)
                        )}                    
                    </div>
                </>
             ) : <div id="cardSection">
                    {data.map(movie => (
                    <MovieCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    name={movie.title} rating={movie.vote_average} key={`${movie.id}-${Math.random}`} />)
                    )}
                </div>}
            </div>
            <button onClick={loadMoreMovies}>Load More</button>
        </div>
    );
}

export default MovieList;