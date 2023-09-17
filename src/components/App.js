import React, { useState, useEffect } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
    const [listings, setListings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:6001/listings')
            .then((response) => response.json())
            .then((data) => setListings(data));
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:6001/listings/${id}`, {
            method: 'DELETE',
        }).then(() => {
            setListings(listings.filter((listing) => listing.id !== id));
        });
    };

    const handleFavorite = (id) => {
        setListings(
            listings.map((listing) =>
                listing.id === id
                    ? { ...listing, isFavorite: !listing.isFavorite }
                    : listing
            )
        );
    };

    return (
        <div className="app">
            <Header setSearchTerm={setSearchTerm} />
            <ListingsContainer 
                listings={listings} 
                searchTerm={searchTerm}
                handleDelete={handleDelete} 
                handleFavorite={handleFavorite} 
            />
        </div>
    );
}

export default App;

