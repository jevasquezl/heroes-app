import { use, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { HeroStats } from '@/heroes/components/HeroStats';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { CustomPagination } from '@/components/custom/CustomPagination';


import { useHeroSummary } from '@/heroes/hoocks/useHeroSummary';
import { useHeroByPage } from '@/heroes/hoocks/useHeroByPage';
import { FavoriteHeroContext } from '@/heroes/context/FavoriteHeroContext';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favoriteCount, favorites } = use(FavoriteHeroContext);

  //Para establecer parametros en el url
  // const [searchParams, setSearchParams] = useSearchParams([["tab", "All"]]);

  const activeTab = searchParams.get('tab') ?? 'All';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'all';

  const selectedTab = useMemo(() => {
    const validTabs = ['All', 'Favorites', 'Heroes', 'Villains'];
    return validTabs.includes(activeTab) ? activeTab : 'All'
  }, [activeTab])

  // const [summary, setSumary] = useState<SummaryInformationResponse | undefined>();
  // Toma el curso de TanStack https://tanstack.com/
  // const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'>("all");
  // useEffect(() => {
  //   getHeroesByPage().then();
  // }, [])

  const handleTab = (tab: string, category: string, page: string) => {
    setSearchParams(
      (prev) => {
        prev.set("tab", tab);
        prev.set("category", category);
        prev.set("page", page);
        return prev;
      });
  }

  // const { data: heroesResponse } = useQuery({
  //   queryKey: ['heroes', { page: page, limit: limit }],
  //   queryFn: () => getHeroesByPageAction(+page, +limit),
  //   staleTime: 1000 * 60 * 5,
  // })

  const { data: heroesResponse } = useHeroByPage(page, limit, category);

  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron title="Universo de SuperHeroes" description="Descrubre, Explora y Administra Superheroes y villanos" />

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Controls */}
        {/* <SearchControls /> */}

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">

            <TabsTrigger value="All"
              onClick={() => handleTab('All', "all", "1")}>
              All Characters ({summary?.totalHeroes})
            </TabsTrigger>

            <TabsTrigger value="Favorites" className="flex items-center gap-2"
              onClick={() => handleTab('Favorites', "favorite", "1")}
            >
              Favorites ({favoriteCount})
            </TabsTrigger>

            <TabsTrigger value="Heroes"
              onClick={() => handleTab('Heroes', "hero", "1")}>
              Heroes ({summary?.heroCount} )
            </TabsTrigger>

            <TabsTrigger value="Villains"
              onClick={() => handleTab('Villains', "Villain", "1")}>
              Villains ({summary?.villainCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value='All'>
            <h1>Todos los personajes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value='Favorites'>
            <h1>Favoritos</h1>
            <HeroGrid heroes={favorites} />
          </TabsContent>
          <TabsContent value='Heroes'>
            <h1>heroes</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
          <TabsContent value='Villains'>
            <h1>Villanos</h1>
            <HeroGrid heroes={heroesResponse?.heroes ?? []} />
          </TabsContent>
        </Tabs>

        {/* Character Grid */}


        {/* Pagination */}
        {
          selectedTab !== 'Favorites' && <CustomPagination Pages={heroesResponse?.pages ?? 1} />
        }


      </>
    </>
  )
}