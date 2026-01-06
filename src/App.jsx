import { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import * as pokemonService from './services/pokemon'

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import Pokemon from './components/Pokemon/Pokemon';

import { UserContext } from './contexts/UserContext';

const App = () => {
  // Access the user object from UserContext
  // This gives us the currently logged-in user's information (username, email) that we extract from the token
  const { user } = useContext(UserContext);

  const [pokemons, setPokemons] = useState([])

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

    getPokemons()

  }, [])

  return (
    <>
      <NavBar/>
      <Routes>
        {/* if the user is logged in we have the user object else we have the user set to null */}
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/pokemon' element={<Pokemon pokemons={pokemons} />} />
      </Routes>
    </>
  );
};

export default App;
