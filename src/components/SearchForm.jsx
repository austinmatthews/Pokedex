import axios from 'axios';
import { useEffect, useState } from 'react';

export default function SearchForm() {
  const [pokemon, setPokemon] = useState([]);
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon')
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const searchName = formData.get('searchName');

    console.log(searchName);

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchName}`)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }

  return (
    <form method='get' onSubmit={handleSubmit}>
      <label>
        Search By Name: <input name='searchName' />
      </label>
      <button type='submit'>Search</button>
      <hr />
    </form>
  );
}
