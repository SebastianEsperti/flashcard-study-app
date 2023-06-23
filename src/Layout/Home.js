import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listDecks, deleteDeck } from '../utils/api';

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const fetchDecks = async () => {
      const response = await listDecks();
      setDecks(response);
    };

    fetchDecks();
  }, []);

  const handleDelete = async (deckId) => {
    const confirmed = window.confirm('Are you sure you want to delete this deck?');
    if (confirmed) {
      await deleteDeck(deckId);
      const updatedDecks = decks.filter((deck) => deck.id !== deckId);
      setDecks(updatedDecks);
    }
  };

  return (
    <div>
      <Link to="/decks/new" className="btn btn-primary">
        Create Deck
      </Link>

      <div className="mt-4">
        {decks.map((deck) => (
          <div className="card" key={deck.id}>
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
              <p className="card-text">{`${deck.cards.length} cards`}</p>

              <Link to={`/decks/${deck.id}/study`} className="btn btn-secondary mr-2">
                Study
              </Link>
              <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                View
              </Link>
              <button className="btn btn-danger" onClick={() => handleDelete(deck.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;