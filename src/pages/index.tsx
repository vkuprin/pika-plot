import React, {ReactElement, useState} from "react";
import styled from "styled-components";
import { CategoryList } from "@/components/CategoryList";
import { PokemonList } from "@/components/PokemonList";
import { SearchBar } from "@/components/SearchBar";

const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Home = (): ReactElement => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <HomePageContainer>
      <SearchBar onSearch={setSearchQuery} />
      <CategoryList
        onCategorySelect={setSelectedCategory}
        searchQuery={searchQuery}
      />
      {selectedCategory && (
        <PokemonList categoryId={selectedCategory} searchQuery={searchQuery} />
      )}
    </HomePageContainer>
  );
};

export default Home;
