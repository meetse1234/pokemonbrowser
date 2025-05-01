import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import TypeFilter from './components/TypeFilter';
import PokemonCard from './components/PokemonCard';
import './App.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        const promises = res.data.results.map(pokemon => axios.get(pokemon.url));
        const results = await Promise.all(promises);

        const detailedPokemon = results.map(({ data }) => ({
          id: data.id,
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map(t => t.type.name),
        }));

        setPokemonList(detailedPokemon);
        setFilteredList(detailedPokemon);
        setLoading(false);
      } catch (err) {
        setError('Failed to load Pokémon.');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    let filtered = pokemonList.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (type) {
      filtered = filtered.filter(p => p.types.includes(type));
    }

    setFilteredList(filtered);
  }, [search, type, pokemonList]);

  return (
    <div className="App">
      <Header />
      <div className="controls">
        <SearchBar search={search} setSearch={setSearch} />
        <TypeFilter setType={setType} />
      </div>

      {loading && <p>Loading Pokémon...</p>}
      {error && <p>{error}</p>}
      {!loading && filteredList.length === 0 && <p>No Pokémon found.</p>}

      <div className="pokemon-container">
        {filteredList.map(p => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </div>
  );
}

export default App;
