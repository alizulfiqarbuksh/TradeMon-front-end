import React, { useEffect } from 'react'
import { useState } from 'react'
import * as tradeOfferService from '../../services/tradeOfferService'
import * as pokemonService from '../../services/pokemonService'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'

function TradeOfferForm({user, updateTradeOfferList, tradeOfferToUpdate, updateOneTradeOffer}) {

    const [pokemonToTrade, setPokemonToTrade] = useState({})
    const [myPokemon, setMyPokemon] = useState([])

    const {id} = useParams()


    const [formData, setFormData] = useState( tradeOfferToUpdate ? tradeOfferToUpdate
        :
        {
            sender_id: user._id,
            receiver_id: "",
            sender_pokemon_id: "",
            receiver_pokemon_id: id,
            status: "pending"

    })

    useEffect(() => {
      
        const pokemonDetail = async (id) => {
          try {
    
            const foundPokemon = await pokemonService.details(id)
            console.log(foundPokemon)
            setPokemonToTrade(foundPokemon)
            
          } catch (error) {
            console.log(error)
          }
        }

        const getPokemons = async () => {
              try {
        
                const pokemons = await pokemonService.myPokemons()
                
                setMyPokemon(pokemons)
              
            }
             catch (error) {
              console.log(error)
            }}

            getPokemons()
    
        if (id) pokemonDetail(id)
    
    }, [id, user])

    const navigate = useNavigate()

    const handleSubmit = async (event) => {

        console.log(formData)
        event.preventDefault()

        if(tradeOfferToUpdate){
            try {
                const updatedTradeOffer = await tradeOfferService.update(formData, tradeOfferToUpdate._id)

                if(updatedTradeOffer) {
                    updateOneTradeOffer(updatedTradeOffer)
                    navigate('/tradeOffer')
                }
                else {
                    console.log('Something went wrong')
                }
            } catch (error) {
                console.log(error)
            }
        }
        else {
            try {
                const body = {
                    ...formData,
                    receiver_id: pokemonToTrade.owner._id
                }
            const tradeOffer = await tradeOfferService.create(body)

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
    }

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
        console.log(formData)
    }

    const selectedCard = (id) => {
        setFormData({...formData, sender_pokemon_id: id})
    }

  return (
    <div>
        <h1>Add new card</h1>

        <form onSubmit={handleSubmit}>
            <label htmlFor="sender_id">Sender ID:</label>
            <input type="text" id="sender_id" name="sender_id" onChange={handleChange} value={formData.sender_id}></input>

            <label htmlFor="receiver_id">Receiver ID:</label>
            <input type="text" id="receiver_id" name="receiver_id" value={pokemonToTrade?.owner?._id}></input>

            <label htmlFor="sender_pokemon_id">Sender Pokemon ID:</label>
            <input type="text" id='sender_pokemon_id' name='sender_pokemon_id' onChange={handleChange} value={formData.sender_pokemon_id} />

            <label htmlFor="receiver_pokemon_id">Receiver Pokemon ID:</label>
            <input type="text" id="receiver_pokemon_id" name="receiver_pokemon_id" onChange={handleChange} value={formData.receiver_pokemon_id}></input>

            <input type="hidden" id="status" name="status" value="pending"></input>

            <button type="submit">Submit</button>
        </form>

        <h1>My Cards</h1>
    {myPokemon.length === 0 ?
     (<p>No Pokemon cards found</p>

     ) : (
       
        myPokemon.map((pokemon)=> (
        
        <div key={pokemon._id}>

        <h3>Name: {pokemon.name}</h3>

        <p>Type: {pokemon.type}</p>

        <button onClick={() => {selectedCard(pokemon._id)}}>Select</button>
            
        </div> )
        
        ) 

     ) 
     
     
     }

    </div>
  )
}

export default TradeOfferForm