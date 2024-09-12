// components/PokemonSprite.tsx
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface Props {
  pokemonId: number;
}

const PokemonAnimation: React.FC<Props> = ({ pokemonId }) => {
  const [sprite, setSprite] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the Pokémon data
    const fetchPokemon = async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
      );
      const data = await response.json();
      setSprite(
        data.sprites.versions["generation-v"]["black-white"].animated
          .front_default
      );
    };

    fetchPokemon();
  }, [pokemonId]);

  return (
    <div className="text-center flex justify-center mb-8">
      {sprite ? (
        <Image
          src={sprite}
          alt={`Pokémon ${pokemonId} Animation`}
          width={120}
          height={120}
        />
      ) : (
        <strong>Loading animation...</strong>
      )}
    </div>
  );
};

export default PokemonAnimation;
