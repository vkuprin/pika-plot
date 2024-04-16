import React, { ReactElement } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchPokemonCategories } from "@/services/pokemonService";
import { ApiListResponse, NamedApiResource } from "@/types";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  max-height: 700px;
  overflow-y: auto;
`;

const CategoryItem = styled.div`
  cursor: pointer;
  padding: 10px;
  margin: 5px;
  background-color: lightgray;
  &:hover {
    background-color: gray;
  }
`;

interface CategoryListProps {
  onCategorySelect: (categoryName: string) => void;
  searchQuery: string;
}

export const CategoryList = ({
  onCategorySelect,
  searchQuery,
}: CategoryListProps): ReactElement => {
  const { data, isLoading } = useQuery<ApiListResponse<NamedApiResource>>(
    "categories",
    fetchPokemonCategories,
  );

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  const filteredCategories = data.results.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ListContainer>
      {filteredCategories.map((category) => {
        if (category.name === "unknown" || category.name === "shadow")
          return null; // ToDo: check why API does not return data for these categories

        return (
          <CategoryItem
            key={category.name}
            onClick={() => onCategorySelect(category.name)}
          >
            {category.name}
          </CategoryItem>
        );
      })}
    </ListContainer>
  );
};
