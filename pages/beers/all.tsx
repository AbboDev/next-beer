import Image from 'next/image'
import Layout from '@/components/layout'
import { GetServerSideProps } from 'next'
import H1 from '@/components/h1'
import { useState, ChangeEvent } from 'react'
import defaultImage from '@/public/default.png'

type Props = {
  initialBeers: Beer[]
}

type SearchState = {
  beerName?: string
}

type SearchStateQuery = {
  beer_name?: string
}

const fetchBeers = function <T>(params?: URLSearchParams): Promise<T> {
  const url: URL = new URL(
    `https://api.punkapi.com/v2/beers?${params?.toString()}`
  )

  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    return response.json() as Promise<T>
  })
}

export default function All({ initialBeers }: Props) {
  const [beers, setBeers] = useState(initialBeers)

  const [search, setSearch] = useState<SearchState>({
    beerName: '',
  })

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event
    const { name, value } = target

    const newSearch = {
      ...search,
      [name]: value,
    }

    setSearch(newSearch)

    const objectParams: SearchStateQuery = {}
    if (newSearch.beerName) {
      objectParams.beer_name = newSearch.beerName
    }

    const params = new URLSearchParams(objectParams)

    const beers: Beer[] = await fetchBeers(params)

    console.debug(beers)
    setBeers(beers)
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
        <fieldset className="grid grid-cols-3">
          <legend className="text-xl text-white block mb-2">
            Ricerca birra per&hellip;
          </legend>

          <div className="col-span-3">
            <label htmlFor="beerName" className="block mb-1">
              Nome
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
          </div>
        </fieldset>
      </form>

      <section className="grid grid-cols-5 gap-x-4 gap-y-4">
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

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const beers: Beer[] = await fetchBeers<Beer[]>()

  return {
    props: {
      initialBeers: beers,
    },
  }
}
