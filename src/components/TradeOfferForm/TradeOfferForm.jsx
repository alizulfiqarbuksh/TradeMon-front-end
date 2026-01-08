import React, { useEffect } from 'react'
import { useState } from 'react'
import * as tradeOfferService from '../../services/tradeOfferService'
import * as pokemonService from '../../services/pokemonService'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'

function TradeOfferForm({user, updateTradeOfferList, tradeOfferToUpdate, updateOneTradeOffer}) {

    const [selectedPokemon, setSelectedPokemon] = useState(null)
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

    const selectedCard = (pokemon) => {
        setFormData({...formData, sender_pokemon_id: pokemon._id})
        setSelectedPokemon(pokemon)
    }

  return (
    <div>
        <h1>Trade Cards</h1>

        <div>
            {selectedPokemon ? 
            <div>
            <div>
                {selectedPokemon.image && ( <img src={selectedPokemon.image} alt="Preview" style={{ width: "200px", marginTop: "10px" }} /> )}
                <p>{selectedPokemon.name}</p>
                <p>{selectedPokemon.title}</p>
                <p>{selectedPokemon.level}</p>
                {selectedPokemon.shiny ? <p>Shiny: Yes</p> : <p>Shiny: No</p>}
            </div>
            <div>
                <p>Sender: {user.username}</p>
            </div>
            </div>
             :
             <h3>Select a Pokemon to trade</h3>
             }
        </div>
        <div>
            <div>
                {pokemonToTrade.image && ( <img src={pokemonToTrade.image} alt="Preview" style={{ width: "200px", marginTop: "10px" }} /> )}
                <p>{pokemonToTrade.name}</p>
                <p>{pokemonToTrade.title}</p>
                <p>{pokemonToTrade.level}</p>
                {pokemonToTrade.shiny ? <p>Shiny: Yes</p> : <p>Shiny: No</p>}
            </div>
            <div>
                Receiver: {pokemonToTrade?.owner?.username}
            </div>
        </div>

        <button onClick={handleSubmit} >Trade</button>

        <h1>My Cards</h1>
    {myPokemon.length === 0 ?
     (<p>No Pokemon cards found</p>

     ) : (
       
        myPokemon.map((pokemon)=> (
        
        <div key={pokemon._id}>
        
        {pokemon.image && ( <img src={pokemon.image} alt="Preview" style={{ width: "200px", marginTop: "10px" }} /> )}

        <h3>Name: {pokemon.name}</h3>

        <p>Type: {pokemon.type}</p>

        <button onClick={() => {selectedCard(pokemon)}}>Select</button>
            
        </div> )
        
        ) 

     ) 
     
     
     }

    </div>
  )
}

export default TradeOfferForm