import React, { useEffect, useState } from 'react'
import * as pokemonService from '../../services/pokemonService'
import { useNavigate } from 'react-router'
import styles from './Pokemon.module.css';

function Pokemon({pokemons}) {

  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      

      <div className={styles.cards}>
        {pokemons.map((pokemon) => (
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
              <p className={styles.text}>
                Pokémon card available for viewing and trading.
              </p>

              <button
                className={styles.button}
                onClick={() => navigate(`/pokemon/${pokemon._id}`)}
              >
                Details
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Pokemon