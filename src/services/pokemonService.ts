import axios from "axios";
import { ApiListResponse, NamedApiResource, Pokemon } from "@/types";

const API_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonCategories = async (): Promise<
  ApiListResponse<NamedApiResource>
> => {
  try {
    const { data } = await axios.get<ApiListResponse<NamedApiResource>>(
      `${API_URL}/type`,
    );
    return data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw error;
  }
};

export const fetchPokemonsByCategory = async (
  categoryId: string,
  searchQuery?: string,
): Promise<ApiListResponse<NamedApiResource>> => {
  try {
    const response = await axios.get(`${API_URL}/type/${categoryId}`);

    const pokemonEntries = response.data.pokemon || [];

    let results = pokemonEntries.map((entry: any) => entry.pokemon);

    if (searchQuery) {
      results = results.filter((pokemon: NamedApiResource) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return {
      count: results.length,
      next: null,
      previous: null,
      results: results,
    };
  } catch (error) {
    console.error(
      `Failed to fetch pokemons for category ${categoryId} with query ${searchQuery}`,
      error,
    );
    throw error;
  }
};

export const fetchPokemonDetails = async (
  pokemonId: string,
): Promise<Pokemon> => {
  try {
    const { data } = await axios.get<Pokemon>(
      `${API_URL}/pokemon/${pokemonId}`,
    );
    return data;
  } catch (error) {
    console.error(`Failed to fetch details for pokemon ${pokemonId}`, error);
    throw error;
  }
};
