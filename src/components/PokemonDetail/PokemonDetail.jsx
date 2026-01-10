import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import * as pokemonService from '../../services/pokemonService'
import { useNavigate } from 'react-router'

import styles from './PokemonDetail.module.css'

function PokemonDetail({user}) {

  const [pokemon, setPokemon] = useState(null)
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
       
   
  if(!id) return <h1>Loading...</h1>
  if(!pokemon) return <h1>Loading...</h1>
  
  
  const ownerId = pokemon?.owner?._id ?? null;
  const isLoggedIn = Boolean(user?._id)
  const isOwner = isLoggedIn && user?._id === ownerId;
  
   
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.cardContainer}>
        
        {/* TITLE */}
        <h1 className={styles.title}>{pokemon.name}</h1>

        {/* IMAGE */}
        {pokemon.image && (
          <div className={styles.imageWrapper}>
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
        )}

        {/* CONTENT */}
        <div className={styles.content}>
          <p><strong>Type:</strong> {pokemon.type}</p>
          <p><strong>Level:</strong> {pokemon.level}</p>
          <p><strong>Shiny:</strong> {pokemon.shiny ? 'Yes' : 'No'}</p>
          <p><strong>Owner:</strong> {pokemon.owner?.username ?? 'Unknown'}</p>
        </div>

        {/* ACTIONS */}
        <div className={styles.actions}>
          
          {isLoggedIn && !isOwner && (
            <button
              className={styles.actionBtn}
              onClick={() => navigate(`/tradeOffer/${pokemon._id}/create`)}
            >
              Trade
            </button>
          )} 
          
          
          {isLoggedIn && isOwner && (
            <span className={styles.ownerText}>You own this card</span>
          )}

         
          {!isLoggedIn && (
            <span className={styles.ownerText}>Sign in to trade</span>
          )}

        </div>

      </div>
    </div>
  )
}

export default PokemonDetail