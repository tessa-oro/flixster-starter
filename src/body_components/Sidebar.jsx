import "./Sidebar.css";
import React from "react";

const Sidebar = ({ movieMap }) => {

    return (
        <div id="sidebar">
            <span>
                <h2>Favorites</h2>
                <div>
                    {movieMap.map(movie => (
                        <p id="movieName">&#128153; {movie}</p>
                    ))}
                </div>
            </span>
        </div>
    );
}

export default Sidebar;