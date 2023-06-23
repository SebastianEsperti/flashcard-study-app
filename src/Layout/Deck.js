import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getDeck, deleteDeck } from '../utils/api';

function Deck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const fetchedDeck = await getDeck(deckId);
        setDeck(fetchedDeck);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDeck();
  }, [deckId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      try {
        await deleteDeck(deckId);
        history.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4>{deck.name}</h4>
        <div>
          <button
            className="btn btn-danger mr-2"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => history.push(`/decks/${deckId}/edit`)}
          >
            Edit
          </button>
        </div>
      </div>
      <p>{deck.description}</p>
    </div>
  );
}

export default Deck;