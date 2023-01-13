import Image from 'next/image'
import Layout from '@/components/layout'
import { GetServerSideProps } from 'next'
import H1 from '@/components/h1'
import { useState, ChangeEvent } from 'react'
import defaultImage from '@/public/default.png'
import { useRouter } from 'next/router'
// TODO: implement wretch library and/or integrated SWR for loading

type Props = {
  beers: Beer[]
}

type IngredientSearchState = {
  malt?: string
  hops?: string
  yeast?: string
}

type SearchState = IngredientSearchState & {
  beerName?: string
}

type SearchStateQuery = IngredientSearchState & {
  beer_name?: string
}

/**
 * The SearchStateQuery is parsed before toString() because Punk API
 * gives errors when params are passed empty
 */
const cleanQueryParams = function (params: SearchStateQuery): SearchStateQuery {
  return Object.entries(params).reduce((cleanObject, [key, value]) => {
    if (value) {
      cleanObject[key as keyof SearchStateQuery] = (value as string)
        .trim()
        .replaceAll(' ', '_')
    }

    return cleanObject
  }, {} as SearchStateQuery)
}

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

let filterTimeout: ReturnType<typeof setTimeout>

export default function All({ beers }: Props) {
  const router = useRouter()

  const query: SearchStateQuery = router.query

  const [search, setSearch] = useState<SearchState>({
    beerName: (query.beer_name || '').replaceAll('_', ' '),
    malt: (query.malt || '').replaceAll('_', ' '),
    hops: (query.hops || '').replaceAll('_', ' '),
    yeast: (query.yeast || '').replaceAll('_', ' '),
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(filterTimeout)

    const { target } = event
    const { name, value } = target

    const newSearch = {
      ...search,
      [name]: value,
    }

    setSearch(newSearch)

    filterTimeout = setTimeout(async () => {
      const { beerName: beer_name, hops, malt, yeast } = newSearch

      const objectParams: SearchStateQuery = {
        beer_name,
        hops,
        malt,
        yeast,
      }

      router.replace({
        query: { ...router.query, ...objectParams },
      })
    }, 500)
  }

  const evaluateAlcoholVolume = (abv: number | null): string => {
    if (!abv) {
      return ''
    }

    const GREEN = 5
    const YELLOW = 7
    const RED = 10

    if (abv <= GREEN) {
      return 'text-green-500'
    }

    if (abv <= YELLOW) {
      return 'text-yellow-500'
    }

    if (abv <= RED) {
      return 'text-red-500'
    }

    return 'text-red-800'
  }

  return (
    <Layout title="Tutte le birre" className="text-center">
      <H1>Tutte le birre</H1>

      <form action="#" method="GET" className="w-full mb-4 text-left">
        <fieldset className="grid grid-cols-3 gap-x-4 gap-y-2">
          <legend className="text-xl text-white block mb-2">
            Ricerca birra per&hellip;
          </legend>

          <div className="col-span-3">
            <label htmlFor="beerName" className="block mb-1">
              Nome della birra
            </label>
            <input
              type="search"
              id="beerName"
              name="beerName"
              value={search.beerName}
              onChange={handleChange}
              placeholder="Prova a digitare Punk IPA, Brewdog, Beer&hellip;"
              className="rounded bg-white py-2 px-4 w-full"
            />

            <datalist id="beerName">
              <option value="" />
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
              placeholder="Prova a digitare Punk IPA, Brewdog, Beer&hellip;"
              className="rounded bg-white py-2 px-4 w-full"
              list="malt"
            />

            <datalist id="malt">
              <option value="" />
            </datalist>
          </div>

          <div>
            <label htmlFor="hops" className="block mb-1">
              Luppoli utilizzati
            </label>
            <input
              type="search"
              id="hops"
              name="hops"
              value={search.hops}
              onChange={handleChange}
              placeholder="Prova a digitare Punk IPA, Brewdog, Beer&hellip;"
              className="rounded bg-white py-2 px-4 w-full"
            />

            <datalist id="hops">
              <option value="" />
            </datalist>
          </div>

          <div>
            <label htmlFor="yeast" className="block mb-1">
              Tipologia di lievito
            </label>
            <input
              type="search"
              id="yeast"
              name="yeast"
              value={search.yeast}
              onChange={handleChange}
              placeholder="Prova a digitare Punk IPA, Brewdog, Beer&hellip;"
              className="rounded bg-white py-2 px-4 w-full"
            />

            <datalist id="yeast">
              <option value="" />
            </datalist>
          </div>
        </fieldset>
      </form>

      <section className="grid grid-cols-5 gap-4">
        {beers.map(({ id, name, tagline, image_url, abv }) => (
          <div
            key={id}
            className="p-4 rounded-md bg-slate-200 shadow-lg shadow-slate-800"
          >
            <Image
              src={image_url || defaultImage}
              alt={name}
              width={150}
              height={150}
              className="object-contain w-32 h-32 mb-3 mx-auto"
            />
            <h3 className="border-t border-slate-300 text-xl">{name}</h3>
            <strong
              className={`block mt-2 text-3xl ${evaluateAlcoholVolume(abv)}`}
            >
              {abv?.toFixed(1)}°
            </strong>
            <p className="mt-2 text-sm">{tagline}</p>
          </div>
        ))}
      </section>
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
