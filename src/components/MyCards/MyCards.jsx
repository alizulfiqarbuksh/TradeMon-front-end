import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as pokemonService from '../../services/pokemonService'
import { useNavigate } from 'react-router'
import styles from './MyCards.module.css'


const MyCards =  ({user, findPokemonToUpdate, deletePokemon}) => {
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

const handleDelete = async (id)=>{
 
  const deletedPokemon = await pokemonService.deleteOne(id)

  if(deletedPokemon) {
   setMyPokemon((prevPoke)=>prevPoke.filter((pokemon)=> pokemon._id !== id)) 
  deletePokemon(id)
  navigate('/pokemon/mycards')
}else{0
  console.log('somtheing went wrong')
}
  
}

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.title}>My Cards</h1>

        {myPokemon.length === 0 ? (
          <p>No Pokémon cards found</p>
        ) : (
          <div className={styles.cards}>
            {myPokemon.map(pokemon => (
              <div key={pokemon._id} className={styles.card}>
                
                <div className={styles.imageWrapper}>
                  {pokemon.image && (
                    <img
                      src={pokemon.image}
                      alt={pokemon.name}
                      className={styles.image}
                    />
                  )}
                </div>

                <div className={styles.content}>
                  <h3 className={styles.name}>{pokemon.name}</h3>
                  <p className={styles.text}>Type: {pokemon.type}</p>

                  <div className={styles.actions}>
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(pokemon._id)}
                    >
                      Delete
                    </button>

                    <button
                      className={styles.button}
                      onClick={() => {
                        findPokemonToUpdate(pokemon._id)
                        navigate(`/pokemon/${pokemon._id}/update`)
                      }}
                    >
                      Update
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyCards