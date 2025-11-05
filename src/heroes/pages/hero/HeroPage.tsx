import SuperheroProfile from "@/heroes/components/SuperheroData";
import { useParams } from "react-router";



export const HeroPage = () => {
  const { idSlug = '' } = useParams();

  return <SuperheroProfile idSlug={idSlug} />

}

export default HeroPage;