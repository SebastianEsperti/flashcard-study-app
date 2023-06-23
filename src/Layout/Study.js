import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api';

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const fetchDeck = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    };

    fetchDeck();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (cardIndex < deck.cards.length - 1) {
      setCardIndex(cardIndex + 1);
      setIsFront(true);
      setIsFlipped(false);
    } else {
      const confirmed = window.confirm('Restart the deck?');
      if (confirmed) {
        setCardIndex(0);
        setIsFront(true);
        setIsFlipped(false);
      }
    }
  };

  if (!deck) {
    return <div>Loading...</div>;
  }

  const card = deck.cards[cardIndex];

  return (
    <div>
      <h4>Study: {deck.name}</h4>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardIndex + 1} of {deck.cards.length}
          </h5>
          <p className="card-text">{isFront ? card.front : card.back}</p>
          <button className="btn btn-secondary mr-2" onClick={handleFlip}>
            Flip
          </button>
          {isFlipped && (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
      {!isFlipped && (
        <div className="mt-4">
          <Link to={`/decks/${deckId}`} className="btn btn-secondary mr-2">
            Back to Deck
          </Link>
        </div>
      )}
    </div>
  );
}

export default Study;