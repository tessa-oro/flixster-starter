import React from "react";
import {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import './MovieList.css'
import MovieCard from './MovieCard';

const MovieList = () => {
    const [data, setData] = useState([]);
    const [pageNum, setPageNum] = useState(1);

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

    return (
        <div>
            <div id="cardSection">
                {data.map(movie => (
                    <MovieCard poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} name={movie.title} rating={movie.vote_average} key={movie.id} />)
                )}
            </div>
            <button onClick={loadMoreMovies}>Load More</button>
        </div>
    );
}

export default MovieList;