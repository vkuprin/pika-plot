import { useRouter } from "next/router";
import { PokemonDetails } from "@/components/PokemonDetails";

const PokemonPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      {id ? <PokemonDetails pokemonId={id as string} /> : <p>Loading...</p>}
    </div>
  );
};

export default PokemonPage;
