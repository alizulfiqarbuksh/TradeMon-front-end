import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import * as tradeOfferService from '../../services/tradeOfferService'

function TradeOfferDetail() {

    const [tradeOffer, setTradeOffer] = useState([])
    const {id} = useParams()

    useEffect(() => {
        const tradeOfferDetail = async (id) => {
            try {
                const foundTradeOffer = await tradeOfferService.details(id)
                setTradeOffer(foundTradeOffer)
            } catch (error) {
                console.log(error);
            }
        }

        tradeOfferDetail(id)
    }, [id])

  return (
    <div>
      <h1>Trade Offers Detail</h1>

      
          <h3>Sender id: {tradeOffer.sender_id}</h3>
          <h3>Receiver id: {tradeOffer.receiver_id}</h3>
          <h3>Sender Pokemon id: {tradeOffer.sender_pokemon_id}</h3>
          <h3>Receiver Pokemon id: {tradeOffer.receiver_pokemon_id}</h3>
          <h3>Status: {tradeOffer.status}</h3>
        
        
      
    </div>
    
  )
}

export default TradeOfferDetail