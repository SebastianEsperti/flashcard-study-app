import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api';

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState({ front: '', back: '' });

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

  const handleSave = async () => {
    try {
      await createCard(deckId, card);
      setCard({ front: '', back: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = () => {
    history.push(`/decks/${deckId}`);
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">
            Front
          </label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            rows="4"
            value={card.front}
            onChange={(e) => setCard({ ...card, front: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="back" className="form-label">
            Back
          </label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            rows="4"
            value={card.back}
            onChange={(e) => setCard({ ...card, back: e.target.value })}
            required
          />
        </div>
        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={handleDone}
        >
          Done
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSave}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;