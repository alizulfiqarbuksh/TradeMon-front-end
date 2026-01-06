import React from 'react'
import { useState } from 'react'
import * as tradeOfferService from '../../services/tradeOfferService'
import { useNavigate } from 'react-router'

function TradeOfferForm({user, updateTradeOfferList}) {

    const [formData, setFormData] = useState({
            sender_id: "",
            receiver_id: "",
            sender_pokemon_id: "",
            receiver_pokemon_id: "",
            status: "pending"

    })

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const tradeOffer = await tradeOfferService.create(formData)

            if(tradeOffer){
                updateTradeOfferList(tradeOffer)
                navigate('/tradeOffer')
            }
            else{
                console.log("Something went wrong")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
        console.log(formData)
    }

  return (
    <div>
        <h1>Add new card</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="sender_id">Sender ID:</label>
            <input type="text" id="sender_id" name="sender_id" onChange={handleChange} value={formData.sender_id}></input>

            <label htmlFor="receiver_id">Receiver ID:</label>
            <input type="text" id="receiver_id" name="receiver_id" onChange={handleChange} value={formData.receiver_id}></input>

            <label htmlFor="sender_pokemon_id">Sender Pokemon ID:</label>
            <input type="text" id="sender_pokemon_id" name="sender_pokemon_id" onChange={handleChange} value={formData.sender_pokemon_id}></input>

            <label htmlFor="receiver_pokemon_id">Receiver Pokemon ID:</label>
            <input type="text" id="receiver_pokemon_id" name="receiver_pokemon_id" onChange={handleChange} value={formData.receiver_pokemon_id}></input>

            <input type="hidden" id="status" name="status" value="pending"></input>

            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default TradeOfferForm