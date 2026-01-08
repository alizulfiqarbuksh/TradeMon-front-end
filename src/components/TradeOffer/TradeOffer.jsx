import React, { useEffect, useState } from 'react'
import * as tradeOfferService from '../../services/tradeOfferService'
import { useNavigate } from 'react-router'

function TradeOffer({findTradeOfferToUpdate, user}) {

    const navigate = useNavigate();

    const [tradeOffers, setTradeOffers] = useState([])

    useEffect(() => {
    const fetchTrades = async () => {
      try {
        const trades = await tradeOfferService.show();
        setTradeOffers(trades);
      } catch (err) {
        console.error('Failed to fetch trades', err);
      }
    };
    fetchTrades();
  }, []);

  if (!user?._id) return <h1>Loading...</h1>

  const handleRespond = async (id, action) => {
    const updatedTrade = await tradeOfferService.respond(id, action);

    setTradeOffers(prev =>
      prev.map(trade =>
        trade._id === updatedTrade._id ? updatedTrade : trade
      )
    );
  };
 
  
  return (
    <div>
      <h1>All Trade Offers</h1>

      {tradeOffers.length === 0 ? (
        <p>No trade offers found.</p>
      ) : (
        tradeOffers.map((offer) => (
          <div key={offer._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>

            <div>
              <div>
                {offer?.sender_pokemon_id?.image && ( <img src={offer?.sender_pokemon_id?.image} alt="Preview" style={{ width: "200px", marginTop: "10px" }} /> )}
                <p>{offer?.sender_pokemon_id?.name}</p>
                <p>{offer.sender_pokemon_id.type}</p>
                <p>{offer.sender_pokemon_id.level}</p>
                {offer.sender_pokemon_id.shiny ? <p>Shiny: yes</p> : <p>Shiny: yes</p>}
              </div>
              <div>
                <h3>Sender: {offer.sender_id.username}</h3>
              </div>
            </div>

            <div>
              <div>
                {offer?.receiver_pokemon_id?.image && ( <img src={offer?.receiver_pokemon_id?.image} alt="Preview" style={{ width: "200px", marginTop: "10px" }} /> )}
                <p>{offer?.receiver_pokemon_id?.name}</p>
                <p>{offer.receiver_pokemon_id.type}</p>
                <p>{offer.receiver_pokemon_id.level}</p>
                {offer.receiver_pokemon_id.shiny ? <p>Shiny: yes</p> : <p>Shiny: yes</p>}
              </div>
              <div>
                <h3>Receiver: {offer.receiver_id.username}</h3>
              </div>
            </div>

            <h3>Status: {offer.status}</h3>

            <button onClick={() => navigate(`/tradeOffer/${offer._id}`)}>View Details</button>

            <button
              onClick={() => {
                findTradeOfferToUpdate(offer._id);
                navigate(`/tradeOffer/${offer._id}/update`);
              }}
              >
              Update
            </button>
            {offer.status === 'pending' && offer.receiver_id === user._id && (
            <>
              <button onClick={() => handleRespond(offer._id, 'accepted')}>
                Accept
              </button>
              <button onClick={() => handleRespond(offer._id, 'rejected')}>
                Reject
              </button>
            </>
          )}
          </div>
        ))
      )}
    </div>
  )
}

export default TradeOffer