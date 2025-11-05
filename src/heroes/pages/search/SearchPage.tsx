import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControls } from './ui/SearchControls';
import { CustomBreadcrums } from '@/components/custom/CustomBreadcrums';
import { HeroGrid } from '@/heroes/components/HeroGrid';

import { useSearchParams } from 'react-router';

import { useHeroSearch } from '@/heroes/hoocks/useHeroSearch';

export const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;
  const team = searchParams.get('team') ?? undefined;
  const category = searchParams.get('category') ?? undefined;
  const universe = searchParams.get('universe') ?? undefined;
  const status = searchParams.get('status') ?? undefined;

  const opciones = {
    name: name,
    team: team,
    category: category,
    universe: universe,
    status: status,
    strength: strength
  }

  const { data: heroes = [] } = useHeroSearch(opciones);

  return (
    <>
      <CustomJumbotron
        title="Búsqueda de SuperHéroes"
        description="Descubre, explora y administra super héroes y villanos"
      />

      <CustomBreadcrums
        currentPage="Buscador de héroes"
      // breadcrumbs={[
      //   { label: 'Home1', to: '/' },
      //   { label: 'Home2', to: '/' },
      //   { label: 'Home3', to: '/' },
      // ]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* Filter and search */}
      <SearchControls />

      {/*  */}
      <HeroGrid heroes={heroes} />
    </>
  );
};

export default SearchPage;