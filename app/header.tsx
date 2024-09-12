"use client";
import React from "react";
import Image from "next/image";
import Filter from "./components/Filter";
const Header = () => {
  return (
    <header className="flex w-full top-0 px-4 shadow-2xl  justify-between">
      <div className="p-4">
        <Image src="/pokemon.gif" alt="Your Company" width={240} height={88} />
      </div>
      <Filter />
    </header>
  );
};

export default Header;
