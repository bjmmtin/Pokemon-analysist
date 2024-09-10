import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

// Define the API response type
type PokemonResponse = {
  name: string;
  url: string;
};

// API handler for the GET request
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    );
    const pokemonData: PokemonResponse[] = response.data.results;

    res.status(200).json(pokemonData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
