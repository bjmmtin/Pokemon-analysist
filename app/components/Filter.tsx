import React, { useState } from "react";
import { useSearchTextForPokemonCardContext } from "../contexts/searchTextForPokemonCard";

const Filter = () => {
  const { setSearchTextForPokemonCard } = useSearchTextForPokemonCardContext();

  const [searchText, setSearch] = useState<string>("");

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setSearchTextForPokemonCard(searchText);
    }
  };
  return (
    <div className="flex justify-end my-8">
      <div className="flex mb-4 mr-4 rounded-md border focus-visible:border hover:border-blueCustom">
        <div className=" rounded-s-md   pt-2.5 px-2 text-blueCustom">
          <svg
            width="20"
            height="20"
            className="DocSearch-Search-Icon"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
              stroke="currentColor"
              fill="none"
              fillRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
        <input
          onKeyDown={(e) =>
            handleKeyDown(
              e as unknown as React.KeyboardEvent<HTMLTextAreaElement>
            )
          }
          type="text"
          placeholder="Search Pokémon by name..."
          className="p-2 rounded-e-md md:w-[400px] outline-none w-[250px]  shadow-2xl  "
          value={searchText}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <button
        className="rounded-md text-white hover:bg-blue-600 bg-blueCustom mb-5 mt-0.5 px-3"
        onClick={() => setSearchTextForPokemonCard(searchText)}
      >
        filter
      </button>
    </div>
  );
};

export default Filter;
