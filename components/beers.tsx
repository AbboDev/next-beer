import { useState, ChangeEvent, useEffect, MouseEvent } from 'react'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import jsonpath from 'jsonpath'
import Search from '@/components/search'
import BeerList from '@/components/beer_list'
import BeerModal from '@/components/beer_modal'
import { onlyUnique } from '@/utilities/array'

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

export type SearchState = PaginationSearchState &
  IngredientSearchState & {
    beerName?: string
    hop?: string
    foodPairing?: string
  }

type SearchStateQuery = ParsedUrlQuery &
  PaginationSearchState &
  IngredientSearchState & {
    beer_name?: string
    hops?: string
    food?: string
    page?: string
    per_page?: string
  }

export type AutocompleteState = {
  beerNames: string[]
  malts: string[]
  hops: string[]
  yeasts: string[]
  foodPairings: string[]
}

let filterTimeout: ReturnType<typeof setTimeout>
const PAGINATION_OPTIONS = [10, 25, 50, 80]

export default function Beers({ beers }: Props) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const query: SearchStateQuery = router.query

  const [beer, setBeer] = useState<Beer | null>(null)

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

    setLoading(true)
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

    setLoading(true)
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

    setLoading(true)
    setSearch(newSearch)

    filterTimeout = setTimeout(() => {
      updateQuery(newSearch)
    }, 500)
  }

  useEffect(() => {
    setLoading(false)
  }, [beers])

  return (
    <>
      <Search
        search={search}
        autocomplete={autocomplete}
        elementLength={beers.length}
        paginationOptions={PAGINATION_OPTIONS}
        onChange={handleChange}
        onPageChange={handlePageChange}
      />

      {loading ? (
        <section className="mt-12 mb-4 px-2">
          <div className="w-32 h-32 relative mx-auto">
            <div className="w-32 h-32 rounded-full border-4 bg-transparent border-l-0 animate-spin border-teal-300 border-r-teal-500 border-b-teal-700"></div>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl text-white">
              Loading...
            </span>
          </div>
        </section>
      ) : (
        <BeerList
          beers={beers}
          onResetSearch={handleResetSearch}
          onBeerSelect={handleBeerSelect}
        />
      )}

      {beer && <BeerModal onCloseModal={handleCloseModal} beer={beer} />}
    </>
  )
}
