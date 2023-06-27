import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { readDeck } from "../utils/api";

function Header() {
  const location = useLocation();
  const [deckName, setDeckName] = useState("");

  useEffect(() => {
    const fetchDeckName = async () => {
      try {
        const deckId = location.pathname.split("/")[2];
        const fetchedDeck = await readDeck(deckId);
        setDeckName(fetchedDeck.name);
      } catch (error) {
        console.log(error);
      }
    };

    if (location.pathname.includes("/decks/") && location.pathname !== "/decks/new") {
      fetchDeckName();
    } else {
      setDeckName("");
    }
  }, [location.pathname]);

  return (
    <>
      <header className="jumbotron bg-dark">
        <div className="container text-white">
          <h1 className="display-4">Flashcard-o-matic</h1>
          <p className="lead">Discover The Flashcard Difference.</p>
        </div>
      </header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <div className="navbar-text ml-auto">
            {deckName && <span>{deckName}</span>}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
