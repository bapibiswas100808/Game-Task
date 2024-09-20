import axios from "axios";
import React, { useEffect, useState } from "react";

const GameTask = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon")
      .then((res) => {
        setData(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Get Pokemon Id
  const getPokemonId = (url) => {
    const parts = url.split("/");
    const nonEmptyParts = parts.filter(Boolean);
    const id = nonEmptyParts.pop();
    return id;
  };

  // Search Function
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Search Filter
  const filteredData = data.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="max-w-[1170px] mx-auto px-3 lg:px-0 py-10">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search Pokémon"
        className="border p-2 mb-10 w-full"
        value={searchTerm}
        onChange={handleSearch}
      />
      {/* Pokemon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((d, id) => {
          const pokemonId = getPokemonId(d.url);
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
          return (
            <div key={id} className="card card-compact shadow-xl">
              <figure>
                <img src={imageUrl} alt={d.name} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{d.name}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameTask;
