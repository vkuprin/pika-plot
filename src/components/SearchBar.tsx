import { useState, useEffect, ReactElement } from "react";
import { debounce } from "@/utils/debounce";
import styled from "styled-components";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchInput = styled.input`
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const SearchBar = ({ onSearch }: SearchBarProps): ReactElement => {
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = debounce((query: string) => {
    onSearch(query);
  }, 300);

  useEffect(() => {
    if (inputValue) {
      debouncedSearch(inputValue);
    }
  }, [debouncedSearch, inputValue]);

  return (
    <SearchInput
      type="text"
      placeholder="Search Pokemon or Category"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};
