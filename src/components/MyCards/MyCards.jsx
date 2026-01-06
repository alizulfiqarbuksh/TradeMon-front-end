import React, { useState } from 'react'


const MyCards =  ({pokemons, user}) => {
 
    if (!user?._id) return <p>Please sign in to view your cards</p>;


const myCards = pokemons.filter((pokemon)=> pokemon.owner === user._id)

  return (
    
    <div>
    <h1>My Cards</h1>
    {myCards.length === 0 ?
     (<p>No Pokemon cards found</p>

     ) : (
       
        myCards.map((pokemon)=> (
        
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