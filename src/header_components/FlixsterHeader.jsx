import React from 'react';
import "./FlixsterHeader.css"
import SearchMovie from "./SearchMovie";
import SortMovie from "./SortMovie";

function FlixsterHeader() {
    return (
        <header>
            <h1>Flixster</h1>
            <div>
                <SearchMovie />
                <SortMovie />
            </div>
        </header>
    );
}

export default FlixsterHeader;