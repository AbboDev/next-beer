import Image from 'next/image'
import Modal from '@/components/modal'
import { MouseEventHandler } from 'react'

type Props = {
  beer: Beer
  onCloseModal: MouseEventHandler
}

export default function BeerModal({ beer, onCloseModal }: Props) {
  const getUnitQuantity = (unit: UnitQuantity): string => {
    return `${unit.value} ${unit.unit}`
  }

  return (
    <Modal onCloseModal={onCloseModal}>
      <div className="grid grid-cols-beer-modal grid-rows-beer-modal gap-y-2 gap-x-4 items-start text-white text-left">
        <Image
          className="row-span-4 row-start-2 col-start-2 max-h-modal-image object-contain py-1"
          src={beer.image_url}
          alt={beer.name}
          width={300}
          height={500}
        />

        <hgroup className="row-start-1 col-span-2 text-center">
          <h2 className="text-3xl row-start-1">{beer.name}</h2>
          <h3 className="text-xl">{beer.tagline}</h3>
        </hgroup>

        <p>{beer.description}</p>

        <div className="border-t border-t-white pt-2">
          <h4 className="text-lg mb-2">Il consiglio del Mastro birraio:</h4>
          <p>{beer.brewers_tips}</p>
        </div>

        <div className="flex flex-wrap justify-around items-center bg-white py-1 text-slate-600 text-center gap-y-2">
          <span className="text-xl w-1/2">{beer.abv}°</span>

          <div className="text-sm w-1/2">
            <span className="block">Anno di produzione:</span>
            <span>{beer.first_brewed}</span>
          </div>

          <div className="text-sm">
            <span className="block text-xs">IBU:</span>
            <span>{beer.ibu}</span>
          </div>
          <div className="text-sm">
            <span className="block text-xs">TARGET FG:</span>
            <span>{beer.target_fg}</span>
          </div>
          <div className="text-sm">
            <span className="block text-xs">TARGET OG:</span>
            <span>{beer.target_og}</span>
          </div>
          <div className="text-sm">
            <span className="block text-xs">EBC:</span>
            <span>{beer.ebc}</span>
          </div>
          <div className="text-sm">
            <span className="block text-xs">SRM:</span>
            <span>{beer.srm}</span>
          </div>
          <div className="text-sm">
            <span className="block text-xs">PH:</span>
            <span>{beer.ph}</span>
          </div>
        </div>

        <div>
          <h4 className="text-lg mb-2">Gli abbinamenti perfetti:</h4>
          <ul>
            {beer.food_pairing.map((food, index) => (
              <li key={index} className="mt-2 block">
                {food}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-2 border-t border-white pt-2">
          <h4 className="text-2xl">Dati per i HomeBrewers</h4>
          <p>Volume pre bollitura: {getUnitQuantity(beer.boil_volume)}</p>
          <p>Volume finale: {getUnitQuantity(beer.volume)}</p>

          <h5 className="mt-2 text-lg">Ammostamento</h5>
          <ul>
            {beer.method.mash_temp.map((mash, index) => (
              <li key={index.toString()}>
                A {getUnitQuantity(mash.temp)} per {mash.duration} minuti
              </li>
            ))}
          </ul>

          <h5 className="mt-2 text-lg">Fermentazione</h5>
          <p>
            Avviene ad una temperatura di{' '}
            {getUnitQuantity(beer.method.fermentation.temp)}
          </p>
          {beer.method.twist && (
            <>
              <h5 className="mt-2 text-lg">Note peculiari della lavorazione</h5>
              <p>{beer.method.twist}</p>
            </>
          )}
        </div>

        <div className="mt-2 border-t border-white pt-2">
          <h4 className="text-2xl">Gli ingredienti</h4>
          <h5 className="mt-2 text-lg">Malti</h5>
          <ul>
            {beer.ingredients.malt.map((malt) => (
              <li key={malt.name}>
                {malt.name}: {getUnitQuantity(malt.amount)}
              </li>
            ))}
          </ul>

          <h5 className="mt-2 text-lg">Luppoli</h5>
          <ul>
            {beer.ingredients.hops.map((hop) => (
              <li key={hop.name}>
                <span className="block">
                  {hop.name}: {getUnitQuantity(hop.amount)}
                </span>
                <span className="block">Aggiunto a {hop.add}</span>
                <span className="block">Dona una nota {hop.attribute}</span>
              </li>
            ))}
          </ul>

          <h5 className="mt-2 text-lg">Lievito</h5>
          <p>{beer.ingredients.yeast}</p>
        </div>
      </div>
    </Modal>
  )
}
