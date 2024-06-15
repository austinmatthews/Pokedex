import axios from 'axios';
import { useState } from 'react';
import PokemonInfo from './PokemonInfo';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

export default function SearchForm() {
  const [pokemonList, setPokemonList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemonList();
  };

  const getPokemonList = async () => {
    try {
      const response = await axios.get(`${baseUrl}?&limit=15"`);
      setPokemonList(
        response.data.results.map((pokemon) => ({
          name: pokemon.name,
          url: pokemon.url,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <hr />
      <form method='get' onSubmit={handleSubmit}>
        <label>
          Search By Name: <input name='searchName' />
        </label>
        <button type='submit' style={{ marginLeft: '10px' }}>
          Search
        </button>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
          {pokemonList.map((pokemon) => (
            <PokemonInfo
              key={pokemon.name}
              url={pokemon.url}
              style={{ width: '100%', flexBasis: '23%' }}
            />
          ))}
        </div>
      </form>
      <hr />
    </>
  );
}
