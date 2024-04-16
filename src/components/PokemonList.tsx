import React, {ReactElement, useState} from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPokemonsByCategory } from "@/services/pokemonService";
import { PokemonDetails } from "@/components/PokemonDetails";
import { NamedApiResource } from "@/types";

const PokemonContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const LoadingDiv = styled.div`
  text-align: center;
  padding: 20px;
`;

interface PokemonListProps {
    categoryId: string;
    searchQuery: string;
}

export const PokemonList = ({ categoryId, searchQuery }: PokemonListProps): ReactElement => {
  const {
    data: pokemons,
    isLoading,
  } = useQuery<NamedApiResource[]>(["pokemons", categoryId], () =>
    fetchPokemonsByCategory(categoryId),
  );

  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(
    null,
  );

  if (isLoading) return <LoadingDiv>Loading...</LoadingDiv>;
  if (!pokemons) return <div>No data available</div>;

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      {filteredPokemons.map((pokemon) => (
        <PokemonContainer
          key={pokemon.name}
          onClick={() => setSelectedPokemonId(pokemon.name)}
        >
          {pokemon.name}
        </PokemonContainer>
      ))}
      {selectedPokemonId && <PokemonDetails pokemonId={selectedPokemonId} />}
    </div>
  );
};
