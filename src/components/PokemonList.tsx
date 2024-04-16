import React, { ReactElement, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchPokemonsByCategory } from "@/services/pokemonService";
import { PokemonDetails } from "@/components/PokemonDetails";
import { NamedApiResource } from "@/types";

const PokemonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const LoadingDiv = styled.div`
  text-align: center;
  padding: 20px;
`;

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
`;

const LeftColumn = styled.div`
  padding: 10px;
  max-height: 700px;
  overflow-y: auto;
`;

export const RightColumn = styled.div`
  flex: 1;
  padding: 10px;
`;

interface PokemonListProps {
  categoryId: string;
  searchQuery: string;
}

export const PokemonList = ({
  categoryId,
  searchQuery,
}: PokemonListProps): ReactElement => {
  const { data: pokemons, isLoading } = useQuery<NamedApiResource[]>(
    ["pokemons", categoryId],
    () => fetchPokemonsByCategory(categoryId),
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
    <HomePageContainer>
      <LeftColumn>
        {filteredPokemons.map((pokemon) => (
          <PokemonContainer
            key={pokemon.name}
            onClick={() => setSelectedPokemonId(pokemon.name)}
          >
            {pokemon.name}
          </PokemonContainer>
        ))}
      </LeftColumn>
      <RightColumn>
        {selectedPokemonId && <PokemonDetails pokemonId={selectedPokemonId} />}
      </RightColumn>
    </HomePageContainer>
  );
};
