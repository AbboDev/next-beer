import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export default function All() {
  return (
    <>
      <Head>
        <title>Tutte le birre - Next Beer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Tutte le birre</p>
          <div>
            <Link href="/">Torna alla home</Link>
          </div>
        </div>
      </main>
    </>
  )
}
