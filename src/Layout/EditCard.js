import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { readCard, updateCard } from '../utils/api';

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();

  const [formData, setFormData] = useState({
    front: '',
    back: '',
  });

  useEffect(() => {
    const abortController = new AbortController();

    const loadCard = async () => {
      try {
        const card = await readCard(cardId, abortController.signal);
        setFormData({
          front: card.front,
          back: card.back,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadCard();

    return () => {
      abortController.abort();
    };
  }, [cardId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedCard = {
        ...formData,
        id: cardId,
      };
      await updateCard(updatedCard);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            name="front"
            value={formData.front}
            onChange={handleChange}
            rows="4"
            cols="50"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            name="back"
            value={formData.back}
            onChange={handleChange}
            rows="4"
            cols="50"
            required
          ></textarea>
        </div>
        <button type="submit">Save</button>
        <button onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
      </form>
    </div>
  );
}

export default EditCard;