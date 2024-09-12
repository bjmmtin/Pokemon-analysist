export interface PokemonResponse {
  name: string;
  url: string;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export const toUpperCaseFirstLetter = (word: string): string => {
  if (!word) return word; // Handle empty string case
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getPokemonTypes = async (
  data: PokemonResponse[]
): Promise<{
  typesCount: { [key: string]: number };
  singleVsDual: { single: number; dual: number };
}> => {
  const typesCount: { [key: string]: number } = {};
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
        const typeName = toUpperCaseFirstLetter(type.type.name);
        typesCount[typeName] = (typesCount[typeName] || 0) + 1;
      });
    })
  );

  return {
    typesCount,
    singleVsDual: { single: singleTypeCount, dual: dualTypeCount },
  };
};
