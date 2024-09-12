import { getPokemonTypes, toUpperCaseFirstLetter, PokemonResponse } from './utils';

// Mock the global fetch function
global.fetch = jest.fn();

describe('Data Transformation Logic', () => {
    const mockPokemonList: PokemonResponse[] = [
        { name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25' },
        { name: 'Charmander', url: 'https://pokeapi.co/api/v2/pokemon/4' },
        { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
    ];

    beforeEach(() => {
        fetch.mockClear();
    });

    it('transforms Pokémon types correctly for single type', async () => {
        const mockDetails = {
            types: [
                { slot: 1, type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13' } },
            ],
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            statusText: 'OK',
            json: jest.fn().mockResolvedValue(mockDetails),
        });

        const { typesCount, singleVsDual } = await getPokemonTypes([
            { name: 'Squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7' },
        ]);

        expect(typesCount).toEqual({ Electric: 1 });
        expect(singleVsDual).toEqual({ single: 1, dual: 0 });
    });

    it('transforms Pokémon types correctly for dual types', async () => {
        const mockDetails = {
            types: [
                { slot: 1, type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10' } },
                { slot: 2, type: { name: 'flying', url: 'https://pokeapi.co/api/v2/type/3' } },
            ],
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            statusText: 'OK',
            json: jest.fn().mockResolvedValue(mockDetails),
        });

        const { typesCount, singleVsDual } = await getPokemonTypes([
            { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
        ]);

        expect(typesCount).toEqual({ Fire: 1, Flying: 1 });
        expect(singleVsDual).toEqual({ single: 0, dual: 1 });
    });

    it('handles fetch errors gracefully', async () => {
        fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

        await expect(getPokemonTypes(mockPokemonList)).rejects.toThrow('Failed to fetch');
    });

    it('capitalizes the first letter of a word', () => {
        expect(toUpperCaseFirstLetter('hello')).toBe('Hello');
        expect(toUpperCaseFirstLetter('')).toBe('');
        expect(toUpperCaseFirstLetter('world')).toBe('World');
    });

    it('counts multiple Pokémon types correctly', async () => {
        const mockDetails1 = {
            types: [
                { slot: 1, type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12' } },
            ],
        };

        const mockDetails2 = {
            types: [
                { slot: 1, type: { name: 'water', url: 'https://pokeapi.co/api/v2/type/11' } },
                { slot: 2, type: { name: 'flying', url: 'https://pokeapi.co/api/v2/type/3' } },
            ],
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            statusText: 'OK',
            json: jest.fn().mockResolvedValue(mockDetails1),
        });
        fetch.mockResolvedValueOnce({
            ok: true,
            status: 200,
            statusText: 'OK',
            json: jest.fn().mockResolvedValue(mockDetails2),
        });

        const { typesCount, singleVsDual } = await getPokemonTypes([
            { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
            { name: 'Squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7' },
        ]);

        expect(typesCount).toEqual({ Grass: 1, Water: 1, Flying: 1 });
        expect(singleVsDual).toEqual({ single: 1, dual: 1 });
    });
});
