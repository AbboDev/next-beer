import Link from 'next/link'
import Layout from '@/components/layout'

export default function Home() {
  return (
    <Layout title="Homepage">
      <p>Homepage</p>

      <Link href="/beers/all">
        <h2>
          Tutte le birre <span>-&gt;</span>
        </h2>
        <p>Mostra la lista con tutte le birre Punk!</p>
      </Link>
    </Layout>
  )
}
