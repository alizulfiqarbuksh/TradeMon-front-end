import React, { useEffect } from 'react'
import { useState } from 'react'
import * as tradeOfferService from '../../services/tradeOfferService'
import * as pokemonService from '../../services/pokemonService'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router'

import styles from './TradeOfferForm.module.css';


function TradeOfferForm({ user }) {

    const [selectedPokemon, setSelectedPokemon] = useState(null)
    const [pokemonToTrade, setPokemonToTrade] = useState({})
    const [myPokemon, setMyPokemon] = useState([])

    const {id} = useParams()

    const [formData, setFormData] = useState({
  sender_pokemon_id: "",
  receiver_pokemon_id: id,
});

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
    event.preventDefault();

    try {
      if (!formData.sender_pokemon_id) return;

      await tradeOfferService.create({
        sender_pokemon_id: formData.sender_pokemon_id,
        receiver_pokemon_id: id,
      });

      navigate('/tradeOffer');
    } catch (error) {
      console.log(error);
    }
  };

    const selectedCard = (pokemon) => {
        setFormData({...formData, sender_pokemon_id: pokemon._id})
        setSelectedPokemon(pokemon)
    }

  return (
    <div className={styles.pageWrapper}>
  <div className={styles.cardContainer}>
    <h1 className={styles.title}>Trade Cards</h1>

    <div className={styles.pokemonRow}>
      <div className={styles.pokemonBox}>
        {selectedPokemon ? (
          <>
            {selectedPokemon.image && <img src={selectedPokemon.image} alt="Preview" className={styles.pokemonImage} />}
            <p>{selectedPokemon.name}</p>
            <p>{selectedPokemon.title}</p>
            <p>Level: {selectedPokemon.level}</p>
            <p>Shiny: {selectedPokemon.shiny ? "Yes" : "No"}</p>
            <p>Sender: {user.username}</p>
          </>
        ) : (
          <h3>Select a Pokemon to trade</h3>
        )}
      </div>

      <div className={styles.pokemonBox}>
        {pokemonToTrade.image && <img src={pokemonToTrade.image} alt="Preview" className={styles.pokemonImage} />}
        <p>{pokemonToTrade.name}</p>
        <p>{pokemonToTrade.title}</p>
        <p>Level: {pokemonToTrade.level}</p>
        <p>Shiny: {pokemonToTrade.shiny ? "Yes" : "No"}</p>
        <p>Receiver: {pokemonToTrade?.owner?.username}</p>
      </div>
    </div>

    <button className={styles.actionBtn} onClick={handleSubmit}>
      Trade
    </button>

    <h1 className={styles.title}>My Cards</h1>
    <div className={styles.myPokemonRow}>
      {myPokemon.length === 0 ? (
        <p>No Pokemon cards found</p>
      ) : (
        myPokemon.map((pokemon) => (
          <div key={pokemon._id} className={styles.pokemonBox}>
            {pokemon.image && <img src={pokemon.image} alt="Preview" className={styles.pokemonImage} />}
            <h3>{pokemon.name}</h3>
            <p>Type: {pokemon.type}</p>
            <button className={styles.actionBtn} onClick={() => selectedCard(pokemon)}>
              Select
            </button>
          </div>
        ))
      )}
    </div>
  </div>
</div>



  )
}

export default TradeOfferForm