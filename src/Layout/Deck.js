import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { readDeck, deleteDeck, deleteCard } from '../utils/api';

function Deck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const fetchedDeck = await readDeck(deckId);
        setDeck(fetchedDeck);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDeck();
  }, [deckId]);

  const handleDeleteDeck = async () => {
    if (window.confirm('Are you sure you want to delete this deck?')) {
      try {
        await deleteDeck(deckId);
        history.push('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await deleteCard(cardId);
        setDeck((prevDeck) => ({
          ...prevDeck,
          cards: prevDeck.cards.filter((card) => card.id !== cardId),
        }));
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
          <button className="btn btn-danger mr-2" onClick={handleDeleteDeck}>
            Delete
          </button>
          <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">
            Edit
          </Link>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            Add Card
          </Link>
        </div>
      </div>
      <p>{deck.description}</p>
      <h5>Cards in Deck:</h5>
      {deck.cards.map((card) => (
        <div key={card.id} className="card">
          <div className="card-body">
            <h5 className="card-title">Card {card.id}</h5>
            <p className="card-text">{card.front}</p>
            <p className="card-text">{card.back}</p>
            <div>
              <Link
                to={`/decks/${deckId}/cards/${card.id}/edit`}
                className="btn btn-secondary mr-2"
              >
                Edit
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteCard(card.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Deck;
