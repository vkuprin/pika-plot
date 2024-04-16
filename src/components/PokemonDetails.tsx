import React, { ReactElement } from "react";
import { useQuery } from "react-query";
import dynamic from "next/dynamic";
import { fetchPokemonDetails } from "@/services/pokemonService";
import { ApexOptions } from "apexcharts";

const ReactApexCharts = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface PokemonDetailsProps {
  pokemonId: string;
}

export const PokemonDetails = ({
  pokemonId,
}: PokemonDetailsProps): ReactElement => {
  const { data: pokemon, isLoading } = useQuery(
    ["pokemonDetails", pokemonId],
    () => fetchPokemonDetails(pokemonId),
  );

  if (isLoading) return <div>Loading...</div>;
  if (!pokemon) return <div>No data found</div>;

  const options: ApexOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories: pokemon.stats.map((stat) => stat.stat.name),
    },
  };

  const series = [
    { name: "Stat", data: pokemon.stats.map((stat) => stat.base_stat) },
  ];

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <ReactApexCharts
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};
