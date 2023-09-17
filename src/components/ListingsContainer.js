import React, { useState, useEffect } from "react";
import ListingCard from "./ListingCard";

function ListingsContainer({ searchTerm }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((r) => r.json())
      .then(setListings);
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:6001/listings/${id}`, {
      method: "DELETE",
    }).then(() => {
      setListings((prevListings) => prevListings.filter((listing) => listing.id !== id));
    });
  };

  const handleFavorite = (id) => {
    setListings((prevListings) => 
      prevListings.map((listing) => 
        listing.id === id ? { ...listing, isFavorite: !listing.isFavorite } : listing
      )
    );
  };

  const filteredListings = listings.filter((listing) =>
    listing.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <ul className="cards">
        {filteredListings.map((listing) => (
          <ListingCard 
            key={listing.id}
            listing={listing}
            handleDelete={handleDelete}
            handleFavorite={handleFavorite}
          />
        ))}
      </ul>
    </main>
  );
}

export default ListingsContainer;

