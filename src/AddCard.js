import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createCard } from '../utils/api';

function AddCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const [formData, setFormData] = useState({ front: '', back: '' });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createCard(deckId, formData);
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h4>Add Card</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            value={formData.front}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            value={formData.back}
            onChange={handleChange}
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          className="btn btn-secondary ml-2"
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddCard;