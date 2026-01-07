import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as pokemonService from '../../services/pokemonService'
import { Navigate } from 'react-router'

const MyCards =  ({user, deletePokemon}) => {
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

const handleDelete = async (id)=>{
 
  const deletedPokemon = await pokemonService.deleteOne(id)

  if(deletedPokemon) {
  deletePokemon()
  Navigate('/pokemon/mycards')
}else{
  console.log('somtheing went wrong')
}
  
}

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
      

      <button onClick={()=>handleDelete(pokemon._id)}>Delete</button>
            
        </div> )
        
        ) 

     ) 
     
     
     }
    
    </div>
  )
}

export default MyCards