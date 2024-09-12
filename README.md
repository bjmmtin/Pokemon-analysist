# Pokémon Types Distribution Visualizer

This is a Next.js application that fetches data from the PokéAPI and visualizes the distribution of Pokémon types using a bar chart.

## Description

This application allows users to see the distribution of Pokémon types from the first generation of Pokémon (151 Pokémon) and the distribution of single-type vs dual-type Pokémon.
Users can toggle between viewing counts and percentages of each type and filter Pokémon by name.

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/renathomas/pokemon-analytics.git
   cd pokemon-analytics

   ```

2. Install dependencies:

   ```
   npm install

   ```

3. Run the application:

   ```
   npm run dev

   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

1. Since you're using Babel for transforming the code in tests, ensure the necessary presets/plugins are configured in babel.config.js:
   ```
   module.exports ={
       "presets": [
       "@babel/preset-env",
       "@babel/preset-typescript"
       ]
   }
   ```
2. Run the tests for the transformation logic:
   ```
   npm run test
   ```

## Features

- Fetches Pokémon data from the PokéAPI.
- Visualizes the count of Pokémon types using a bar chart.
- Visualizes the distribution of single-type vs dual-type Pokémon using a doughnut chart
- Search functionality to filter Pokémon by name.
- Toggle between showing counts and percentages.
- Responsive design using Tailwind CSS.
- Includes unit tests for the data transformation logic.
