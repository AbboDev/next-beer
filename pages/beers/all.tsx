import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/layout'
import { GetStaticProps } from 'next'

type Props = {
  beers: Beer[]
}

export default function All({ beers }: Props) {
  return (
    <Layout title="Tutte le birre">
      <p>Tutte le birre</p>

      <ul style={{ textAlign: 'center', listStyle: 'none' }}>
        {beers.map(({ id, name, tagline, image_url }) => (
          <li key={id} style={{ margin: '0 auto 1rem' }}>
            <Image src={image_url} alt={name} width={39} height={150} />
            <h3>{name}</h3>
            <h4>{tagline}</h4>
          </li>
        ))}
      </ul>

      <Link href="/">Torna alla home</Link>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const beers: Beer[] = await fetch('https://api.punkapi.com/v2/beers').then(
    (response) => response.json()
  )

  return {
    props: {
      beers,
    },
  }
}
