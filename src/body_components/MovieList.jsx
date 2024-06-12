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

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTI5ODRiYmFiNGJhMmRiMjViOTE2NTVjYTY0MDU2ZiIsInN1YiI6IjY2Njc2NGZjNGMyMDcxYWJlYWJlNzcwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ytUyI8njIl9Uh_mx_PyZNfPgDiQaYmkVjCo7uCNkarU'
            }
            };
            
            fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageNum}`, options)
            .then(response => response.json())
            .then(response => setData([...data, ...response.results]))
            .catch(err => console.error(err));
        }, [pageNum]);
    
        const loadMoreMovies = () => {
            setPageNum(pageNum + 1);
        }

        const showSearch = () => {
            setShowSearchPanel(!showSearchPanel);
        };
        
        const handleSearchButton = () => {
            console.log('searchclicked');
            if (searchMovie === "") {
                setData(data); return;
            }
            const filterBySearch = data.filter((movie) => {
                if (movie.title.toLowerCase().includes(searchMovie.toLowerCase())) {
                    return movie;
                }
            })
            setData(filterBySearch);
        }

    return (
        <div> 
            <div>
            <button onClick={showSearch}>Search</button>
            {showSearchPanel ? (
                <>
                    <span>
                        <input id='searchBar' onChange={e => setSearchMovie(e.target.value)}></input>
                        <BsSearch id='searchGo' onClick={handleSearchButton} />
                    </span>
                </>
             ) : <></>}
            </div>
            <div id="cardSection">
                {data.map(movie => (
                    <MovieCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    name={movie.title} rating={movie.vote_average} key={movie.id} />)
                )}
            </div>
            <button onClick={loadMoreMovies}>Load More</button>
        </div>
    );
}

export default MovieList;