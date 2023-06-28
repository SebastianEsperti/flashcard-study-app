import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readDeck } from '../utils/api';


function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [isFront, setIsFront] = useState(true);

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

  const flipCard = () => {
    setIsFront(!isFront);
  };

  const nextCard = () => {
    setCardIndex((prevIndex) => {
      if (prevIndex + 1 >= deck.cards.length) {
        return 0; // Reset to the first card
      } else {
        return prevIndex + 1;
      }
    });
    setIsFront(true);
  };

  if (!deck) {
    return (
      <div>
        <h4>Loading...</h4>
      </div>
    );
  }

  if (deck.cards.length === 0) {
    return (
      <div>
        <h4>Not enough cards. Please add cards to the deck.</h4>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          Add Card
        </Link>
      </div>
    );
  }

  if (cardIndex >= deck.cards.length) {
    return (
      <div>
        <h4>End of deck</h4>
      </div>
    );
  }

  const currentCard = deck.cards[cardIndex];

  return (
    <div>
      <h4>Studying: {deck.name}</h4>
      <div>
        <h5>
          Card {cardIndex + 1} of {deck.cards.length}
        </h5>
        <div>
          <div>
            <p>{isFront ? currentCard.front : currentCard.back}</p>
          </div>
        </div>
        <button onClick={flipCard}>Flip</button>
        {!isFront && <button onClick={nextCard}>Next</button>}
      </div>
    </div>
  );
}

export default Study;
