import axios from "axios";
import { ApiListResponse, NamedApiResource, Pokemon } from "@/types";

const API_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonCategories = async (): Promise<
  ApiListResponse<NamedApiResource>
> => {
  const { data } = await axios.get<ApiListResponse<NamedApiResource>>(
    `${API_URL}/type`,
  );
  return data;
};

export const fetchPokemonsByCategory = async (
  categoryId: string,
): Promise<NamedApiResource[]> => {
  const { data } = await axios.get(`${API_URL}/type/${categoryId}`);
  return data.pokemon.map(
    (poke: { pokemon: NamedApiResource }) => poke.pokemon,
  );
};

export const fetchPokemonDetails = async (
  pokemonId: string,
): Promise<Pokemon> => {
  const { data } = await axios.get<Pokemon>(`${API_URL}/pokemon/${pokemonId}`);
  return data;
};
