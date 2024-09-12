import {  NextResponse } from 'next/server';
import axios from "axios";

// Define the API response type
type PokemonResponse = {
  name: string;
  url: string;
};

// API handler for the GET request
export async function GET() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
    const pokemonData: PokemonResponse[] = response.data.results;
    
    return NextResponse.json(pokemonData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
