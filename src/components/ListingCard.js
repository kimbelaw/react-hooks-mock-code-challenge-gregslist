import React from "react";

function ListingCard({ listing, handleDelete, handleFavorite }) {
  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={listing.image || "https://via.placeholder.com/300x300"} alt={listing.description} />
      </div>
      <div className="details">
        {listing.isFavorite ? (
          <button className="emoji-button favorite active" onClick={() => handleFavorite(listing.id)}>★</button>
        ) : (
          <button className="emoji-button favorite" onClick={() => handleFavorite(listing.id)}>☆</button>
        )}
        <strong>{listing.description}</strong>
        <span> · {listing.location}</span>
        <button className="emoji-button delete" onClick={() => handleDelete(listing.id)}>🗑</button>
      </div>
    </li>
  );
}

export default ListingCard;

