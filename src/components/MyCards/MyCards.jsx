import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as pokemonService from '../../services/pokemonService'
import { useNavigate } from 'react-router'

const MyCards =  ({user, findPokemonToUpdate}) => {
    const [myPokemon, setMyPokemon] = useState([])
 
    if (!user?._id) return <p>Please sign in to view your cards</p>;

  const navigate = useNavigate()

useEffect(() => {

    const getPokemons = async () => {
      try {

        const pokemons = await pokemonService.myPokemons()
        
        setMyPokemon(pokemons)
      
    }
     catch (error) {
      console.log(error)
    }}

    getPokemons()
},[user])
  return (
    
    <div>
    <h1>My Cards</h1>
    {myPokemon.length === 0 ?
     (<p>No Pokemon cards found</p>

     ) : (
       
        myPokemon.map((pokemon)=> (
        
        <div key={pokemon._id}>

        <h3>Name: {pokemon.name}</h3>

        <p>Type: {pokemon.type}</p>

        <button onClick={() => {
          findPokemonToUpdate(pokemon._id)
          navigate(`/pokemone/${pokemon._id}/update`)
        }
          } >Update</button>
            
        </div> )
        
        ) 

     ) 
     
     
     }
    
    </div>
  )
}

export default MyCards