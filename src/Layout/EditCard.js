import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { readCard, updateCard } from '../utils/api';
import CardForm from './CardForm';

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

  const handleCardUpdate = async (updatedCard) => {
    try {
      await updateCard({ ...updatedCard, id: cardId });
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
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
      <CardForm onSave={handleCardUpdate} onCancel={handleCancel} initialValues={card} />
    </div>
  );
}

export default EditCard;
