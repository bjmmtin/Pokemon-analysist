import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Image from "next/image";

Chart.register(...registerables);

interface Props {
  data: { [key: string]: number };
}

const pokemonTypeColors: { [key: string]: string } = {
  Fire: "#F08030",
  Water: "#6890F0",
  Grass: "#78C850",
  Electric: "#F8D030",
  Ice: "#98D8D8",
  Fighting: "#C03028",
  Poison: "#A040A0",
  Ground: "#E0C068",
  Flying: "#A890F0",
  Psychic: "#F85888",
  Bug: "#A8B820",
  Rock: "#B8A038",
  Ghost: "#705898",
  Dragon: "#7038F8",
  Normal: "#705848",
  Steel: "#B8B8D0",
  Fairy: "#F0B6BC",
};

const BarChart: React.FC<Props> = ({ data }) => {
  const [showPercentages, setShowPercentages] = useState(false);
  const sortedTypes = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const labels = sortedTypes.map(([type]) => type);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const counts = sortedTypes.map(([_, count]) => count);
  const total = counts.reduce((a, b) => a + b, 0);
  const percentages = counts.map((count) => ((count / total) * 100).toFixed(2));
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: showPercentages
          ? "Percentage of Pokémon by Type"
          : "Count of Pokémon by Type",
        data: showPercentages ? percentages : counts,
        backgroundColor: labels.map((label) =>
          pokemonTypeColors[label] ? pokemonTypeColors[label] : "#cccccc"
        ),
      },
    ],
  };

  const options = {
    responsive: true,
    maxBarThickness: 90,
    scales: {
      y: {
        stacked: true,
        grid: {
          display: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="mb-8 flex p-8 shadow-2xl justify-center rounded-md flex-col items-center ">
      {total > 0 && (
        <div className="w-full">
          {" "}
          <button
            className="mb-8 bg-blueCustom float-right text-white px-4 py-2 text-[10px] md:text-sm  rounded-full hover:bg-blue-600 transform duration-300 ease-in-out"
            onClick={() => setShowPercentages(!showPercentages)}
          >
            Toggle to {showPercentages ? "Counts" : "Percentages"}
          </button>
        </div>
      )}
      <div>
        <div
          className={`flex w-[90vw] flex-col items-center justify-center lg:w-[62vw] md:w-[80vw]`}
        >
          <Bar data={chartData} options={options} className="" />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
