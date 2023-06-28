import React, { useState } from 'react';

function CardForm({ onSave, onCancel, initialValues }) {
  const [front, setFront] = useState(initialValues.front || '');
  const [back, setBack] = useState(initialValues.back || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedCard = {
      front,
      back,
    };
    onSave(updatedCard);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front:
        </label>
        <textarea
          id="front"
          className="form-control"
          value={front}
          onChange={(e) => setFront(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="back" className="form-label">
          Back:
        </label>
        <textarea
          id="back"
          className="form-control"
          value={back}
          onChange={(e) => setBack(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default CardForm;
