import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getDeck, updateDeck } from '../utils/api';

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const fetchedDeck = await getDeck(deckId);
        setDeck(fetchedDeck);
        setFormData({
          name: fetchedDeck.name,
          description: fetchedDeck.description,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchDeck();
  }, [deckId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDeck({ ...formData, id: deckId });
      history.push(`/decks/${deckId}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h4>Edit Deck</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
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

export default EditDeck;