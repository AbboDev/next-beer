import Link from 'next/link'
import Layout from '../../components/layout'

export default function All() {
  return (
    <Layout title="Tutte le birre">
      <p>Tutte le birre</p>

      <Link href="/">Torna alla home</Link>
    </Layout>
  )
}
