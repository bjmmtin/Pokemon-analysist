import { NextRequest, NextResponse } from 'next/server';
import axios from "axios";


interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}
export async function GET(
    equest: NextRequest,
    { params }: { params: { id: string } }) {
    const id = parseInt(params.id, 10);
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
        const pokemonTypes: PokemonType[] = response.data.types;
        return NextResponse.json( pokemonTypes , { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}