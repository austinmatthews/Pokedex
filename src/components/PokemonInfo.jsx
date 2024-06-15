//import { useState } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function PokemonInfo({ url }) {
  const [pokemon, setPokemon] = useState({
    abilities: [],
    height: null,
    id: null,
    image: null,
    name: '',
    stats: [],
    types: [],
  });

  // Need to add an api call for each pokemon to get their data
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [url]);

  return (
    <>
      <section className='card'>
        <article>
          <p>{pokemon?.id}</p>
          {pokemon?.abilities.map((ability) => (
            <p key={ability.ability.name}>{ability.ability.name}</p>
          ))}
          <p>{pokemon?.height}</p>
          <p>{pokemon?.name}</p>
        </article>
        <img
          src={pokemon?.sprites?.other['official-artwork'].front_default}
          alt={pokemon?.name}
          style={{ maxWidth: '100%' }}
        />
      </section>
    </>
  );
}
