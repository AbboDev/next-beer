import { MouseEventHandler } from 'react'
import Image from 'next/image'
import defaultImage from '@/public/default.png'
import Button from '@/components/button'

type Props = {
  beers: Beer[]
  className?: string
  onBeerSelect: (beer: Beer) => void
  onResetSearch?: MouseEventHandler
}

export default function BeerList({
  beers,
  className,
  onBeerSelect,
  onResetSearch,
}: Props) {
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

  if (beers.length === 0) {
    const noBeerFoundClassName = ['text-center']

    return (
      <section className={[...noBeerFoundClassName, className].join(' ')}>
        <h3 className="text-xl mb-2">Siamo spiacenti 😢</h3>
        <h4 className="text-lg mb-3 underline underline-offset-4">
          Non abbiamo trovato alcuna birra per la tua ricerca
        </h4>

        {onResetSearch && (
          <Button onClick={onResetSearch}>Ricomincia la ricerca</Button>
        )}
      </section>
    )
  }

  const beersSectionClassName = [
    'grid',
    'grid-cols-2',
    'sm:grid-cols-3',
    'md:grid-cols-4',
    'xl:grid-cols-5',
    'gap-4',
  ]

  const beerClassName = [
    'group',
    'p-4',
    'rounded-md',
    'bg-slate-200',
    'shadow-lg',
    'shadow-slate-800',
    'cursor-pointer',
    'transition',
    'hover:-translate-x-1',
    'hover:-translate-y-1',
    'hover:bg-slate-300',
    'hover:text-slate-500',
  ]

  return (
    <section className={[...beersSectionClassName, className].join(' ')}>
      {beers.map((beer) => {
        const { id, name, tagline, image_url, abv } = beer

        return (
          <div
            key={id}
            className={beerClassName.join(' ')}
            onClick={() => onBeerSelect(beer)}
          >
            <Image
              src={image_url || defaultImage}
              alt={name}
              width={150}
              height={150}
              className="object-contain w-32 h-32 mb-3 mx-auto"
            />
            <h3 className="text-xl transition-colors border-t border-slate-300 group-hover:border-slate-400">
              {name}
            </h3>
            <strong
              className={`block mt-2 text-3xl ${evaluateAlcoholVolume(abv)}`}
            >
              {abv?.toFixed(1)}°
            </strong>
            <p className="mt-2 text-sm">{tagline}</p>
          </div>
        )
      })}
    </section>
  )
}
