import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { readCard, updateCard } from '../utils/api';

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState({ front: '', back: '' });

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const fetchedCard = await readCard(cardId);
        setCard(fetchedCard);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCard();
  }, [cardId]);

  const handleCardUpdate = async (event) => {
    event.preventDefault();
    try {
      await updateCard({ ...card, id: cardId });
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setCard((prevCard) => ({
      ...prevCard,
      [event.target.name]: event.target.value,
    }));
  };

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
            <Link to={`/decks/${deckId}`}>Deck</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <form onSubmit={handleCardUpdate}>
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            required
          />
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditCard;
