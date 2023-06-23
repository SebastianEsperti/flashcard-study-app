import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api';

function CreateDeck() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = {
      name: name,
      description: description,
    };
    const createdDeck = await createDeck(newDeck);
    history.push(`/decks/${createdDeck.id}`);
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <div>
      <h4>Create Deck</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter deck name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Enter deck description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Submit
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;