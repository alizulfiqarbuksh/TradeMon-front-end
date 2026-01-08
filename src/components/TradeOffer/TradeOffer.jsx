import React, { useEffect, useState } from 'react'
import * as tradeOfferService from '../../services/tradeOfferService'
import { useNavigate } from 'react-router'

import styles from './TradeOffer.module.css'


function TradeOffer({findTradeOfferToUpdate, user}) {

    const navigate = useNavigate();

    const [tradeOffers, setTradeOffers] = useState([])

        const fetchTrades = async () => {
      try {
        const trades = await tradeOfferService.show();
        setTradeOffers(trades);
      } catch (err) {
        console.error('Failed to fetch trades', err);
      }
    };
    useEffect(() => {

    fetchTrades();
  }, []);

  if (!user?._id) return <h1>Loading...</h1>

  const handleRespond = async (id, action) => {
    const updatedTrade = await tradeOfferService.respond(id, action);

    fetchTrades()
  };
 
  
  return (
  <div className={styles.pageWrapper}>
    <div className={styles.cardContainer}>
      <h1 className={styles.title}>My Trade Offers</h1>

      {tradeOffers.length === 0 ? (
        <p className={styles.emptyText}>No trade offers found.</p>
      ) : (
        tradeOffers.map((offer) => (
          <div key={offer._id} className={styles.tradeCard}>

            <div className={styles.pokemonRow}>
              {/* SENDER */}
              <div className={styles.pokemonBox}>
                {offer?.sender_pokemon_id?.image && (
                  <img
                    src={offer.sender_pokemon_id.image}
                    alt="Sender Pokémon"
                    className={styles.pokemonImage}
                  />
                )}
                <p className={styles.pokemonText}>{offer.sender_pokemon_id.name}</p>
                <p className={styles.pokemonText}>Type: {offer.sender_pokemon_id.type}</p>
                <p className={styles.pokemonText}>Level: {offer.sender_pokemon_id.level}</p>
                <p className={styles.pokemonText}>
                  Shiny: {offer.sender_pokemon_id.shiny ? 'Yes' : 'No'}
                </p>
                <p className={styles.userText}>
                  Sender: {offer.sender_id.username}
                </p>
              </div>

              {/* RECEIVER */}
              <div className={styles.pokemonBox}>
                {offer?.receiver_pokemon_id?.image && (
                  <img
                    src={offer.receiver_pokemon_id.image}
                    alt="Receiver Pokémon"
                    className={styles.pokemonImage}
                  />
                )}
                <p className={styles.pokemonText}>{offer.receiver_pokemon_id.name}</p>
                <p className={styles.pokemonText}>Type: {offer.receiver_pokemon_id.type}</p>
                <p className={styles.pokemonText}>Level: {offer.receiver_pokemon_id.level}</p>
                <p className={styles.pokemonText}>
                  Shiny: {offer.receiver_pokemon_id.shiny ? 'Yes' : 'No'}
                </p>
                <p className={styles.userText}>
                  Receiver: {offer.receiver_id.username}
                </p>
              </div>
            </div>

            <p className={styles.status}>Status: {offer.status}</p>

            <div className={styles.actions}>
              <button
                className={styles.actionBtn}
                onClick={() => navigate(`/tradeOffer/${offer._id}`)}
              >
                View Details
              </button>

              <button
                className={styles.actionBtn}
                onClick={() => {
                  findTradeOfferToUpdate(offer._id);
                  navigate(`/tradeOffer/${offer._id}/update`);
                }}
              >
                Update
              </button>

              {offer.status === 'pending' &&
                offer.receiver_id._id === user._id && (
                  <>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleRespond(offer._id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => handleRespond(offer._id, 'rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
            </div>

          </div>
        ))
      )}
    </div>
  </div>
)

}

export default TradeOffer