import { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import * as tradeOfferService from './services/tradeOfferService';
import * as pokemonService from './services/pokemonService'

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import Pokemon from './components/Pokemon/Pokemon';
import TradeOffer from './components/TradeOffer/TradeOffer';
import TradeOfferDetail from './components/TradeOfferDetail/TradeOfferDetail';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import TradeOfferForm from './components/TradeOfferForm/TradeOfferForm';

import { UserContext } from './contexts/UserContext';
import MyCards from './components/MyCards/MyCards';
import PokemonForm from './components/PokemonForm/PokemonForm';

const App = () => {
  // Access the user object from UserContext
  // This gives us the currently logged-in user's information (username, email) that we extract from the token
  const { user } = useContext(UserContext);

  const [pokemons, setPokemons] = useState([])

  const [tradeOffers, setTradeOffers] = useState([])

  useEffect(() => {

    const getPokemons = async () => {
      try {

        const pokemons = await pokemonService.show()
        setPokemons(pokemons)
      
    }
     catch (error) {
      console.log(error)
    }
    }

    const getTradeOffers = async () => {
      try {
        
        const tradeOffers = await tradeOfferService.show()
        setTradeOffers(tradeOffers)
      } catch (error) {
        console.log(error)
      }
    }

    getPokemons()
    getTradeOffers()

  }, [])

<<<<<<< HEAD
  const updateTradeOfferList = (tradeOffer) => {
    setTradeOffers([...tradeOffers, tradeOffer])
  }

=======
  const updatePokemonList = (pokemon) => {
    setPokemons([...pokemons, pokemon])
  }



>>>>>>> main
  return (
    <>
      <NavBar/>
      <Routes>
        {/* if the user is logged in we have the user object else we have the user set to null */}
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/pokemon' element={<Pokemon pokemons={pokemons} />} />
        <Route path='/tradeOffer' element={<TradeOffer tradeOffers={tradeOffers} />} />
        <Route path='/tradeOffer/:id' element={<TradeOfferDetail />} />
<<<<<<< HEAD
      
        <Route path='/pokemon/:id' element={<PokemonDetail />} />
        <Route path='/tradeOffer/create' element={<TradeOfferForm user={user} updateTradeOfferList={updateTradeOfferList}/>} />

=======
        <Route path='/pokemon/create' element={<PokemonForm user={user} updatePokemonList={updatePokemonList} />} />
        <Route path='/pokemon/:id' element={<PokemonDetail />} />
        <Route path='/pokemon/mycards' element={<MyCards pokemons={pokemons} user={user}/>} />
>>>>>>> main
      </Routes>
    </>
  );
};

export default App;
