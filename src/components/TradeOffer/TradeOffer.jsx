import React, { useEffect, useState } from 'react'
import * as pokemonService from '../../services/tradeOfferService'
import { useNavigate } from 'react-router'

function TradeOffer({tradeOffers}) {

    const navigate = useNavigate();

  return (
    <div>
      <h1>All Trade Offers</h1>

      {tradeOffers.map((offer) => 
        <div key={offer._id}>
          <h3>Sender id: {offer.sender_id}</h3>
          <h3>Receiver id: {offer.receiver_id}</h3>
          <h3>Sender Pokemon id: {offer.sender_pokemon_id}</h3>
          <h3>Receiver Pokemon id: {offer.receiver_pokemon_id}</h3>
          <h3>Status: {offer.status}</h3>
          <button onClick={() => navigate(`/tradeOffer/${offer._id}`)}>View Details</button>
        </div>
      )}
    </div>
  )
}

export default TradeOffer