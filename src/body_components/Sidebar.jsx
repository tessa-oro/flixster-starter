import MovieList from './MovieList';
import MovieCard from './MovieCard';
import "./Sidebar.css";
import React from "react";
import {useState} from 'react';

const Sidebar = ({movieMap}) => {

    return (
        <div id="sidebar">
            <h2> &#128153; Favorite Movies</h2>
            <div>
            {movieMap.map(movie => (
                <p id="movieName">{movie}</p>
            ))}
            </div>
        </div>
    );
}

export default Sidebar;