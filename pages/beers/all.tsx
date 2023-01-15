import { useState, ChangeEvent, useEffect, MouseEvent } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import H1 from '@/components/h1'
import BeerList from '@/components/beer_list'
import jsonpath from 'jsonpath'
import Button from '@/components/button'
import SearchField from '@/components/search_field'
import BeerModal from '@/components/beer_modal'
// TODO: implement wretch library and/or integrated SWR for loading

const PAGINATION_OPTIONS = [10, 25, 50, 80]

type Props = {
  beers: Beer[]
}

type IngredientSearchState = {
  malt?: string
  yeast?: string
}

type PaginationSearchState = {
  page?: number | string
  per_page?: number | string
}

type SearchState = PaginationSearchState &
  IngredientSearchState & {
    beerName?: string
    hop?: string
    foodPairing?: string
  }

type SearchStateQuery = PaginationSearchState &
  IngredientSearchState & {
    beer_name?: string
    hops?: string
    food?: string
    page?: string
    per_page?: string
  }

type AutocompleteState = {
  beerNames: string[]
  malts: string[]
  hops: string[]
  yeasts: string[]
  foodPairings: string[]
}

/**
 * The SearchStateQuery is parsed before toString() because Punk API
 * gives errors when params are passed empty
 *
 * TODO: move into separate folder
 */
const cleanQueryParams = function (params: SearchStateQuery): SearchStateQuery {
  return Object.entries(params).reduce((cleanObject, [key, value]) => {
    if (value) {
      cleanObject[key as keyof SearchStateQuery] = value
        .toString()
        .trim()
        .replaceAll(' ', '_') as string
    }

    return cleanObject
  }, {} as SearchStateQuery)
}

// TODO: move into separate folder
const fetchBeers = function <T>(params?: SearchStateQuery): Promise<T> {
  let query = ''

  if (params) {
    query = new URLSearchParams(cleanQueryParams(params))?.toString()
  }

  const url: URL = new URL(`https://api.punkapi.com/v2/beers?${query}`)

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response.json() as Promise<T>
  })
}

function onlyUnique<T>(value: T, index: number, self: T[]): boolean {
  return self.indexOf(value) === index
}

let filterTimeout: ReturnType<typeof setTimeout>

export default function All({ beers }: Props) {
  const router = useRouter()

  const query: SearchStateQuery = router.query

  const [beer, setBeer] = useState<Beer | null>(null)

  // TODO: create single component for input with autocomplete
  const [autocomplete, setAutocomplete] = useState<AutocompleteState>({
    beerNames: [],
    malts: [],
    hops: [],
    yeasts: [],
    foodPairings: [],
  })

  useEffect(() => {
    const newAutocomplete: AutocompleteState = {
      beerNames: jsonpath.query(beers, '$.*.name') as string[],
      malts: jsonpath.query(beers, '$.*.ingredients.yeast') as string[],
      hops: jsonpath.query(beers, '$.*.ingredients.malt..name') as string[],
      yeasts: jsonpath.query(beers, '$.*.ingredients.hops..name') as string[],
      foodPairings: jsonpath.query(beers, '$.*..food_pairing.*') as string[],
    }

    if (
      (newAutocomplete.beerNames && newAutocomplete.beerNames.length > 0) ||
      (newAutocomplete.malts && newAutocomplete.malts.length > 0) ||
      (newAutocomplete.hops && newAutocomplete.hops.length > 0) ||
      (newAutocomplete.yeasts && newAutocomplete.yeasts.length > 0)
    ) {
      setAutocomplete((previousAutocomplete) => {
        return {
          beerNames: [
            ...previousAutocomplete.beerNames,
            ...newAutocomplete.beerNames,
          ].filter(onlyUnique),
          malts: [
            ...previousAutocomplete.malts,
            ...newAutocomplete.malts,
          ].filter(onlyUnique),
          hops: [...previousAutocomplete.hops, ...newAutocomplete.hops].filter(
            onlyUnique
          ),
          yeasts: [
            ...previousAutocomplete.yeasts,
            ...newAutocomplete.yeasts,
          ].filter(onlyUnique),
          foodPairings: [
            ...previousAutocomplete.foodPairings,
            ...newAutocomplete.foodPairings,
          ].filter(onlyUnique),
        }
      })
    }
  }, [beers])

  // TODO: move search bar into separate component
  const [search, setSearch] = useState<SearchState>({
    beerName: (query.beer_name || '').replaceAll('_', ' '),
    malt: (query.malt || '').replaceAll('_', ' '),
    hop: (query.hops || '').replaceAll('_', ' '),
    yeast: (query.yeast || '').replaceAll('_', ' '),
    foodPairing: (query.food || '').replaceAll('_', ' '),
    page: parseInt(query.page || '1'),
    per_page: parseInt(query.per_page || '') || PAGINATION_OPTIONS[0],
  })

  const updateQuery = (search: SearchState) => {
    const {
      beerName: beer_name,
      hop: hops,
      malt,
      yeast,
      foodPairing: food,
      per_page,
      page,
    } = search

    const objectParams: SearchStateQuery = {
      beer_name,
      hops,
      malt,
      yeast,
      food,
      per_page: (per_page || PAGINATION_OPTIONS[0]).toString(),
      page: (page || PAGINATION_OPTIONS[0]).toString(),
    }

    router.replace({
      query: { ...router.query, ...objectParams },
    })
  }

  const handleResetSearch = () => {
    const newSearch: SearchState = {
      beerName: '',
      malt: '',
      hop: '',
      yeast: '',
      foodPairing: '',
      per_page: PAGINATION_OPTIONS[0],
      page: 1,
    }

    setSearch(newSearch)
    updateQuery(newSearch)
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    clearTimeout(filterTimeout)

    const { target } = event
    const { name, value } = target

    const newSearch: SearchState = {
      ...search,
      [name]: value,
    }

    setSearch(newSearch)

    filterTimeout = setTimeout(() => {
      updateQuery(newSearch)
    }, 500)
  }

  const handleBeerSelect = (beer: Beer): void => {
    setBeer(beer)
  }

  const handleCloseModal = (): void => {
    setBeer(null)
  }

  const handlePageChange = (event: MouseEvent, newPage: number): void => {
    event.preventDefault()

    changePage(newPage)
  }

  const changePage = (newPage: number, add = true): void => {
    clearTimeout(filterTimeout)

    let page = newPage

    if (add) {
      page = (search.page as number) + newPage
    }

    if (page <= 0) {
      page = 1
    }

    const newSearch: SearchState = {
      ...search,
      page,
    }

    setSearch(newSearch)

    filterTimeout = setTimeout(() => {
      updateQuery(newSearch)
    }, 500)
  }

  return (
    <Layout title="Tutte le birre" className="text-center">
      <H1>Tutte le birre</H1>

      <form action="#" method="GET" className="w-full mb-4 text-left">
        <fieldset className="grid grid-cols-5 gap-x-4 gap-y-2">
          <legend className="text-xl text-white block mb-2">
            Ricerca birra per&hellip;
          </legend>

          <SearchField
            className="col-span-2"
            id="beerName"
            label="Nome della birra"
            value={search.beerName}
            onChange={handleChange}
            placeholder="Prova a digitare Punk IPA, Brewdog, Beer&hellip;"
            autocomplete={autocomplete.beerNames}
          />

          <SearchField
            id="malt"
            label="Malto usato"
            value={search.malt}
            onChange={handleChange}
            autocomplete={autocomplete.malts}
          />

          <SearchField
            id="hop"
            label="Luppoli utilizzati"
            value={search.hop}
            onChange={handleChange}
            autocomplete={autocomplete.hops}
          />

          <SearchField
            id="yeast"
            label="Tipologia di lievito"
            value={search.yeast}
            onChange={handleChange}
            autocomplete={autocomplete.yeasts}
          />

          <SearchField
            className="col-span-5"
            id="foodPairing"
            label="Hai qualche piatto a cui vorresti abbinare una buona birra? Prova a cercare l'abbinamento giusto!"
            value={search.foodPairing}
            onChange={handleChange}
            placeholder="Ad esempio: chicken, curry, beef, ice cream&hellip;"
            autocomplete={autocomplete.foodPairings}
          />

          <div>
            <label htmlFor="per_page" className="block mb-1">
              Visualizza {search.per_page} birre per pagina:
            </label>
            <select
              id="per_page"
              name="per_page"
              onChange={handleChange}
              className="rounded bg-white py-2 px-4 w-full"
              value={search.per_page}
            >
              {PAGINATION_OPTIONS.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-4 grid grid-cols-[1fr_auto_1fr] items-center justify-center self-end">
            <Button
              onClick={(event) => handlePageChange(event, -1)}
              tag="button"
              className="w-9 block justify-self-end text-xl py-1"
              disabled={search.page === 1}
            >
              &laquo;
            </Button>
            <div className="mx-4">Stai vedendo pagina {search.page || 1}</div>
            <Button
              onClick={(event) => handlePageChange(event, 1)}
              tag="button"
              className="w-9 block justify-self-start text-xl py-1"
              disabled={
                beers.length <
                (search.per_page ||
                  PAGINATION_OPTIONS[PAGINATION_OPTIONS.length - 1])
              }
            >
              &raquo;
            </Button>
          </div>
        </fieldset>
      </form>

      <BeerList
        beers={beers}
        onResetSearch={handleResetSearch}
        onBeerSelect={handleBeerSelect}
      />

      {beer && <BeerModal onCloseModal={handleCloseModal} beer={beer} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const beers: Beer[] = await fetchBeers<Beer[]>(query)

  return {
    props: {
      beers: beers,
    },
  }
}
