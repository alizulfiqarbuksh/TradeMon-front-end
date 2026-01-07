import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import * as pokemonService from '../../services/pokemonService'
import { useNavigate } from 'react-router'

function PokemonDetail({user}) {

  const [pokemon, setPokemon] = useState({})
  const {id} = useParams()

  const navigate = useNavigate()

  useEffect(() => {
  
    const pokemonDetail = async (id) => {
      try {

        const foundPokemon = await pokemonService.details(id)
        setPokemon(foundPokemon)
        
      } catch (error) {
        console.log(error)
      }
    }

    if (id) pokemonDetail(id)

  }, [id])
       
   
  const ownerId = pokemon?.owner?._id ?? null;
  const isOwner = user?._id === ownerId;
  
  const authReady = Boolean(user?._id)
  
   
  return (
    <div>
      <h1>Card Details</h1>
      
      <h3>Name: {pokemon.name}</h3>
      <p>Type: {pokemon.type}</p>
      <p>Level: {pokemon.level}</p>
      {pokemon.shiny ? <p>Shiny: Yes</p> : <p>Shiny: No</p>}
      <p>Owner: {pokemon.owner?.username}</p>
      {!isOwner ? (<button onClick={() => {navigate(`/tradeOffer/${pokemon._id}/create`)}}>Trade</button>) : (<p>You own this Card</p>)   }
      
    </div>
  )
}

export default PokemonDetail