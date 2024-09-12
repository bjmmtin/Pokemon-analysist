"use client";
import React, { useContext, useState, createContext, ReactNode } from "react";

interface SearchTextForPokemonCardType {
  searchTextForPokemonCard: string;
  setSearchTextForPokemonCard: (str: string) => void;
}

const SearchTextForPokemonCardContext = createContext<
  SearchTextForPokemonCardType | undefined
>(undefined);

export const SearchTextForPokemonCardProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [searchTextForPokemonCard, setSearchTextForPokemonCard] =
    useState<string>("");
  return (
    <SearchTextForPokemonCardContext.Provider
      value={{
        searchTextForPokemonCard,
        setSearchTextForPokemonCard,
      }}
    >
      {children}
    </SearchTextForPokemonCardContext.Provider>
  );
};

// Create a custom hook to use the context
export const useSearchTextForPokemonCardContext = () => {
  const context = useContext(SearchTextForPokemonCardContext);
  if (!context) {
    throw new Error(
      "useSearchTextForPokemonCardContext must be used within a SearchTextForPokemonCardProvider"
    );
  }
  return context;
};
