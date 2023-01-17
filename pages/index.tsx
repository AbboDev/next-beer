import Layout from '@/components/layout'
import Button from '@/components/button'
import H1 from '@/components/h1'

export default function Home() {
  return (
    <Layout title="Homepage" className="text-center" home>
      <H1>Homepage</H1>

      <Button tag="link" href="/beers/all">
        <span className="block text-xl mb-1">Scopri le nostre birre</span>
        <span className="block text-sm">
          Guarda la lista completa con tutte le birre Punk!
        </span>
      </Button>
    </Layout>
  )
}
