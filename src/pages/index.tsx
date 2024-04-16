import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { CategoryList } from "@/components/CategoryList";
import { PokemonList } from "@/components/PokemonList";
import { SearchBar } from "@/components/SearchBar";

const HomePageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
`;

const LeftColumn = styled.div`
  padding: 10px;
`;

export const RightColumn = styled.div`
  flex: 1;
  padding: 10px;
  border-left: 1px solid #ccc;
`;

const Home = (): ReactElement => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* ToDo: implement search <SearchBar onSearch={setSearchQuery} />*/}
      <HomePageContainer>
        <LeftColumn>
          <CategoryList
            onCategorySelect={setSelectedCategory}
            searchQuery={searchQuery}
          />
        </LeftColumn>
        <RightColumn>
          {selectedCategory && (
            <PokemonList
              categoryId={selectedCategory}
              searchQuery={searchQuery}
            />
          )}
        </RightColumn>
      </HomePageContainer>
    </>
  );
};

export default Home;
