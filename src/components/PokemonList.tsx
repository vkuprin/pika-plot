import React, { ReactElement } from "react";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import { fetchPokemonsByCategory } from "@/services/pokemonService";
import { PokemonDetails } from "@/components/PokemonDetails";
import { NamedApiResource, ApiListResponse } from "@/types";

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
  const [selectedPokemonId, setSelectedPokemonId] = React.useState<
    string | null
  >(null);

  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<ApiListResponse<NamedApiResource>, Error>(
      ["pokemons", categoryId],
      ({ pageParam = 0 }) => fetchPokemonsByCategory(categoryId, pageParam),
      {
        getNextPageParam: (lastPage) => lastPage.next || undefined,
      },
    );

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop <=
      event.currentTarget.clientHeight + 10;
    if (bottom && hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) return <LoadingDiv>Loading...</LoadingDiv>;
  if (!data) return <div>No data available</div>;

  const pokemons = data.pages.flatMap((page) => page.results);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <HomePageContainer>
      <LeftColumn onScroll={handleScroll}>
        {filteredPokemons.map((pokemon) => (
          <PokemonContainer
            key={pokemon.name}
            onClick={() => setSelectedPokemonId(pokemon.name)}
          >
            {pokemon.name}
          </PokemonContainer>
        ))}
        {isFetchingNextPage && <LoadingDiv>Loading more...</LoadingDiv>}
      </LeftColumn>
      <RightColumn>
        {selectedPokemonId && <PokemonDetails pokemonId={selectedPokemonId} />}
      </RightColumn>
    </HomePageContainer>
  );
};
