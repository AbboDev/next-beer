import { useState, ChangeEvent, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Layout from '@/components/layout'
import H1 from '@/components/h1'
import BeerList from '@/components/beer_list'
import jsonpath from 'jsonpath'
// TODO: implement wretch library and/or integrated SWR for loading

const PAGINATION_OPTIONS = ['10', '25', '50', '100']

type Props = {
  beers: Beer[]
}

type IngredientSearchState = {
  malt?: string
  yeast?: string
}

type PaginationSearchState = {
  page?: string
  per_page?: string
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
        .trim()
        .replaceAll(' ', '_')
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
    page: query.page || '',
    per_page: query.per_page || PAGINATION_OPTIONS[0],
  })

  const updateQuery = (search: SearchState) => {
    const {
      beerName: beer_name,
      hop: hops,
      malt,
      yeast,
      foodPairing: food,
      per_page,
    } = search

    const objectParams: SearchStateQuery = {
      beer_name,
      hops,
      malt,
      yeast,
      food,
      per_page,
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

  return (
    <Layout title="Tutte le birre" className="text-center">
      <H1>Tutte le birre</H1>

      <form action="#" method="GET" className="w-full mb-4 text-left">
        <fieldset className="grid grid-cols-5 gap-x-4 gap-y-2">
          <legend className="text-xl text-white block mb-2">
            Ricerca birra per&hellip;
          </legend>

          <div className="col-span-2">
            <label htmlFor="beerName" className="block mb-1">
              Nome della birra
            </label>
            <input
              type="search"
              name="beerName"
              value={search.beerName}
              onChange={handleChange}
              placeholder="Prova a digitare Punk IPA, Brewdog, Beer&hellip;"
              className="rounded bg-white py-2 px-4 w-full"
              list="beerNames"
            />

            <datalist id="beerNames">
              {autocomplete.beerNames?.length &&
                autocomplete.beerNames.map((name) => (
                  <option value={name} key={name} />
                ))}
            </datalist>
          </div>

          <div>
            <label htmlFor="malt" className="block mb-1">
              Malto usato
            </label>
            <input
              type="search"
              id="malt"
              name="malt"
              value={search.malt}
              onChange={handleChange}
              className="rounded bg-white py-2 px-4 w-full"
              list="malts"
            />

            <datalist id="malts">
              {autocomplete.malts?.length &&
                autocomplete.malts.map((name) => (
                  <option value={name} key={name} />
                ))}
            </datalist>
          </div>

          <div>
            <label htmlFor="hop" className="block mb-1">
              Luppoli utilizzati
            </label>
            <input
              type="search"
              id="hop"
              name="hop"
              value={search.hop}
              onChange={handleChange}
              className="rounded bg-white py-2 px-4 w-full"
              list="hops"
            />

            <datalist id="hops">
              {autocomplete.hops?.length &&
                autocomplete.hops.map((name) => (
                  <option value={name} key={name} />
                ))}
            </datalist>
          </div>

          <div>
            <label htmlFor="yeast" className="block mb-1">
              Tipologia di lievito
            </label>
            <input
              type="search"
              name="yeast"
              value={search.yeast}
              onChange={handleChange}
              className="rounded bg-white py-2 px-4 w-full"
              list="yeasts"
            />

            <datalist id="yeasts">
              {autocomplete.yeasts?.length &&
                autocomplete.yeasts.map((name) => (
                  <option value={name} key={name} />
                ))}
            </datalist>
          </div>

          <div className="col-span-5">
            <label htmlFor="beerName" className="block mb-1">
              Hai qualche piatto a cui vorresti abbinare una buona birra? Prova
              a cercare l&apos;abbinamento giusto!
            </label>
            <input
              type="search"
              name="foodPairing"
              value={search.foodPairing}
              onChange={handleChange}
              placeholder="Ad esempio: chicken, curry, beef, ice cream&hellip;"
              className="rounded bg-white py-2 px-4 w-full"
              list="foodPairings"
            />

            <datalist id="foodPairings">
              {autocomplete.foodPairings?.length &&
                autocomplete.foodPairings.map((name) => (
                  <option value={name} key={name} />
                ))}
            </datalist>
          </div>

          <div>
            <label htmlFor="per_page" className="block mb-1">
              Visualizza {search.per_page} birre per pagina:
            </label>
            <select
              id="per_page"
              name="per_page"
              value={search.per_page}
              onChange={handleChange}
              className="rounded bg-white py-2 px-4 w-full"
              defaultValue={search.per_page}
            >
              {PAGINATION_OPTIONS.map((value) => (
                <option value={value} key={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
      </form>

      <BeerList beers={beers} onResetSearch={handleResetSearch} />
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
