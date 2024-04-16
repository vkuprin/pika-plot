import React, {ReactElement} from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { fetchPokemonCategories } from "@/services/pokemonService";
import { ApiListResponse, NamedApiResource } from "@/types";

const ListContainer = styled.div``;
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

export const CategoryList = ({ onCategorySelect, searchQuery }: CategoryListProps): ReactElement => {
  const { data, isLoading } = useQuery<ApiListResponse<NamedApiResource>>(
      "categories", fetchPokemonCategories
  );

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data available</div>;

  const filteredCategories = data.results.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <ListContainer>
      {filteredCategories.map((category) => (
        <CategoryItem
          key={category.name}
          onClick={() => onCategorySelect(category.name)}
        >
          {category.name}
        </CategoryItem>
      ))}
    </ListContainer>
  );
};
