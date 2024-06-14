import MovieList from './MovieList';
import MovieCard from './MovieCard';
import "./Sidebar.css";
import React from "react";
import {useState} from 'react';

const Sidebar = ({movieMap}) => {

    return (
        <div>
            <p>Favorite Movies</p>
            <div>
            {movieMap.map(movie => (
                <p>{movie}</p>
            ))}
            </div>
        </div>
    );
}

export default Sidebar;