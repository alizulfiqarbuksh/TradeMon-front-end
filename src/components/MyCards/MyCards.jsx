import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as pokemonService from '../../services/pokemonService'

const MyCards =  ({user}) => {
    const [myPokemon, setMyPokemon] = useState([])
 
    if (!user?._id) return <p>Please sign in to view your cards</p>;



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
            
        </div> )
        
        ) 

     ) 
     
     
     }
    
    </div>
  )
}

export default MyCards