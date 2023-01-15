import { ChangeEventHandler, MouseEvent } from 'react'
import { AutocompleteState, SearchState } from '@/pages/beers/all'
import SearchField from '@/components/search_field'
import Button from '@/components/button'

type Props = {
  search: SearchState
  autocomplete: AutocompleteState
  elementLength: number
  paginationOptions: number[]
  onChange: ChangeEventHandler
  onPageChange: (event: MouseEvent, newPage: number) => void
}

export default function Search({
  search,
  autocomplete,
  elementLength,
  paginationOptions,
  onChange,
  onPageChange,
}: Props) {
  return (
    <form action="#" method="GET" className="w-full mb-4 text-left">
      <fieldset className="grid grid-cols-5 gap-x-4 gap-y-2">
        <legend className="text-xl text-white block mb-2">
          Ricerca birra per&hellip;
        </legend>

        <SearchField
          className="col-span-2"
          id="beerName"
          label="Nome della birra"
          value={search.beerName}
          onChange={onChange}
          placeholder="Prova a digitare Punk IPA, Brewdog, Beer&hellip;"
          autocomplete={autocomplete.beerNames}
        />

        <SearchField
          id="malt"
          label="Malto usato"
          value={search.malt}
          onChange={onChange}
          autocomplete={autocomplete.malts}
        />

        <SearchField
          id="hop"
          label="Luppoli utilizzati"
          value={search.hop}
          onChange={onChange}
          autocomplete={autocomplete.hops}
        />

        <SearchField
          id="yeast"
          label="Tipologia di lievito"
          value={search.yeast}
          onChange={onChange}
          autocomplete={autocomplete.yeasts}
        />

        <SearchField
          className="col-span-5"
          id="foodPairing"
          label="Hai qualche piatto a cui vorresti abbinare una buona birra? Prova a cercare l'abbinamento giusto!"
          value={search.foodPairing}
          onChange={onChange}
          placeholder="Ad esempio: chicken, curry, beef, ice cream&hellip;"
          autocomplete={autocomplete.foodPairings}
        />

        <div>
          <label htmlFor="per_page" className="block mb-1">
            Visualizza {search.per_page} birre per pagina:
          </label>
          <select
            id="per_page"
            name="per_page"
            onChange={onChange}
            className="rounded bg-white py-2 px-4 w-full"
            value={search.per_page}
          >
            {paginationOptions.map((value) => (
              <option value={value} key={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-4 grid grid-cols-[1fr_auto_1fr] items-center justify-center self-end">
          <Button
            onClick={(event) => onPageChange(event, -1)}
            tag="button"
            className="w-9 block justify-self-end text-xl py-1"
            disabled={search.page === 1}
          >
            &laquo;
          </Button>
          <div className="mx-4">Stai vedendo pagina {search.page || 1}</div>
          <Button
            onClick={(event) => onPageChange(event, 1)}
            tag="button"
            className="w-9 block justify-self-start text-xl py-1"
            disabled={
              elementLength <
              (search.per_page ||
                paginationOptions[paginationOptions.length - 1])
            }
          >
            &raquo;
          </Button>
        </div>
      </fieldset>
    </form>
  )
}
