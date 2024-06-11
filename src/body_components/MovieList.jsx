import React from "react";
import {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import './MovieList.css'
import MovieCard from './MovieCard';
import LoadMore from "./LoadMore.jsx";

const MovieList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MTI5ODRiYmFiNGJhMmRiMjViOTE2NTVjYTY0MDU2ZiIsInN1YiI6IjY2Njc2NGZjNGMyMDcxYWJlYWJlNzcwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ytUyI8njIl9Uh_mx_PyZNfPgDiQaYmkVjCo7uCNkarU'
            }
            };
            
            fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
            .then(response => response.json())
            .then(response => setData(response.results))
            .catch(err => console.error(err));
        }, []);

    return (
        <div>
            <div id="cardSection">
                {data.map(movie => (
                    <MovieCard name={movie.name} poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} rating={movie.vote_average} key={movie.id} />)
                )}
            </div>
            <LoadMore />
        </div>
    );
}

export default MovieList;