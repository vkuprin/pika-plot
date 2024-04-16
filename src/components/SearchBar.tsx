import React, { ReactElement } from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 8px;
  margin: 10px;
  width: 300px;
`;

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps): ReactElement => (
  <Input
    type="text"
    placeholder="Search Pokemon or Category"
    onChange={(e) => onSearch(e.target.value)}
  />
);
