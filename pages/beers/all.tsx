import Image from 'next/image'
import Layout from '@/components/layout'
import { GetServerSideProps } from 'next'
import H1 from '@/components/h1'

type Props = {
  beers: Beer[]
}

export default function All({ beers }: Props) {
  const evaluateAlcholVolume = (abv: number | null): string => {
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

      <section className="grid grid-cols-4 gap-x-4 gap-y-4">
        {beers.map(({ id, name, tagline, image_url, abv }) => (
          <div
            key={id}
            className="p-4 rounded-md bg-slate-200 shadow-lg shadow-slate-800"
          >
            <Image
              src={image_url}
              alt={name}
              width={150}
              height={150}
              className="object-contain w-32 h-32 mb-3 mx-auto"
            />
            <h3 className="border-t border-slate-300 text-xl">{name}</h3>
            <strong
              className={`block mt-2 text-3xl ${evaluateAlcholVolume(abv)}`}
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
  const beers: Beer[] = await fetch('https://api.punkapi.com/v2/beers').then(
    (response) => response.json()
  )

  console.debug(beers[0])

  return {
    props: {
      beers,
    },
  }
}
