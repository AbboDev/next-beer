import { GetServerSideProps } from 'next'
import Layout from '@/components/layout'
import H1 from '@/components/h1'
import { fetchBeers } from '@/utilities/api'
import Beers from '@/components/beers'

type Props = {
  beers: Beer[]
}

export default function All({ beers }: Props) {
  return (
    <Layout title="Tutte le birre" className="text-center">
      <H1>Tutte le birre</H1>

      <Beers beers={beers} />
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
