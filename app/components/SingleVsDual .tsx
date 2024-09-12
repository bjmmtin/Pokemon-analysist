import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Image from "next/image";

Chart.register(...registerables);

interface Props {
  data: { single: number; dual: number };
}

const SingleVsDual: React.FC<Props> = ({ data }) => {
  const chatData = {
    labels: ["Single-Type Pokémon", "Dual-Type Pokémon"],
    datasets: [
      {
        data: [data.single, data.dual],
        backgroundColor: ["#4CAF50", "#FF6384"],
      },
    ],
  };

  const options = {
    responsive: true,
  };
  return (
    <div className="flex flex-col  items-center justify-center">
      <div className=" rounded-md shadow-2xl flex">
        <div className="flex justify-center items-center p-8  w-[432px] h-[432px] lg:w-[18vw] lg:h-[18vw]  ">
          {data.single > 0 || data.dual > 0 ? (
            <Doughnut data={chatData} options={options} className="" />
          ) : (
            <div className="flex text-[#555]  lg:text-[9px] xl:text-[11px] 2xl:text-[14px] w-full justify-center  xl:flex-row font-bold mt-50px ">
              <Image
                src="/warning.png"
                alt="waring icon"
                className="mr-3"
                width={24}
                height={24}
              />
              <p className="mt-1">No Pokémon Types Found </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleVsDual;
