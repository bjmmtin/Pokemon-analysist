"use client";
import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import Loading from "./Loading";
import SingleVsDual from "./SingleVsDual ";
import { useSearchTextForPokemonCardContext } from "../contexts/searchTextForPokemonCard";
import ErrorPage from "./Error";

interface PokemonResponse {
  name: string;
  url: string;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

function toUpperCaseFirstLetter(word: string): string {
  if (!word) return word; // Handle empty string case
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const PokemonTypeChart = () => {
  const { searchTextForPokemonCard } = useSearchTextForPokemonCardContext();
  const [pokemonTypes, setPokemonTypes] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [singleVsDual, setSingleVsDual] = useState<{
    single: number;
    dual: number;
  }>({ single: 0, dual: 0 });

  const getPokemonTypes = async (data: PokemonResponse[]) => {
    const pokemonTypes: { [key: string]: number } = {};
    let singleTypeCount = 0;
    let dualTypeCount = 0;
    await Promise.all(
      data.map(async (pokemon: PokemonResponse) => {
        const detailsResponse = await fetch(pokemon.url);
        if (!detailsResponse.ok)
          throw new Error(
            `${detailsResponse.status} ${detailsResponse.statusText} ----> URL(${detailsResponse.url})`
          );
        const details = await detailsResponse.json();
        const typeCount = details.types.length;

        if (typeCount === 1) {
          singleTypeCount++;
        } else if (typeCount === 2) {
          dualTypeCount++;
        }

        details.types.forEach((type: PokemonType) => {
          pokemonTypes[toUpperCaseFirstLetter(type.type.name)] =
            (pokemonTypes[toUpperCaseFirstLetter(type.type.name)] || 0) + 1;
        });
      })
    );
    setPokemonTypes(pokemonTypes);
    setSingleVsDual({ single: singleTypeCount, dual: dualTypeCount });
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/pokemon/`);
        if (!response.ok)
          throw new Error(
            `${response.status} ${response.statusText} ----> URL(${response.url})`
          );
        const pokemonList = await response.json();
        const filtered = pokemonList.filter((pokemon: PokemonResponse) =>
          pokemon.name
            .toLowerCase()
            .includes(searchTextForPokemonCard.toLowerCase())
        );
        await getPokemonTypes(filtered);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTextForPokemonCard]);

  if (loading) return <Loading />;

  if (error) return <ErrorPage err={error} />;

  return (
    <>
      <div className=" p-4 w-full h-full flex ">
        <div className="flex justify-around lg:flex-row flex-col w-full">
          <BarChart data={pokemonTypes} />
          <SingleVsDual data={singleVsDual} />
        </div>
      </div>
    </>
  );
};

export default PokemonTypeChart;
