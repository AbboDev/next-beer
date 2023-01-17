# Test Tecnico - Next

## Comandi

```bash
# Qualora non si disponesse di pnpm, è possibile installarlo lanciando il comando:
# $ npm install -g pnpm
# in alternativa, tutti i comandi possono essere eseguiti tramite npm

# Installa le dipendenze
$ pnpm install

# Avvia Next in modalità HMR sulla porta 3000
$ pnpm dev

# Genera il sito statico
$ pnpm build

# Compila il sito ed avvia il server Node
$ pnpm start
```

## Dettagli

L'applicativo si basa tu NextJS 13 e lo sfrutta interamente in SSR.
Sono presenti due pagine:

- una homepage statica con soltanto un bottone rimandante alla seconda pagina
- una pagina dinamica che recupera le birre da Punk API

La libreria CSS utilizzata è TailwindCSS 3, sfruttando appieno le sue ottimizzazioni essendo agganciato direttamente ai file TSX (ciò garantisce il caricamento solo delle utilities realmente impiegate)

Come package manager è stato usato [PNPM](https://pnpm.io/it/)

Docker è attualmente in fase di revisione, essendoci dei conflitti coi node_modules caricati nei vari componenti

Per garantire una coerenza nello sviluppo, è stata utilizzata il [formato standard per le commit di Angular](https://gist.github.com/brianclements/841ea7bffdb01346392c), gestito da husky + commitlint e lint-staged, unito a standard-version per i changelog dinamici

Ovviamente sono stati predisposti ESlint, Prettier e Stylelint per tenere ordinato e performante il codice

## TODO

- ~~**Sistemare README** \*~~
- Organizzare file dentro cartella src/
- Jest
- Netlify (SSG)
- [Commitizen](https://github.com/commitizen/cz-cli)

## Task

Utilizzare NextJS per creare un'applicazione React ed effettuare chiamate API a PunkAPI ([https://punkapi.com/documentation/v2](https://punkapi.com/documentation/v2)) per recuperare l'elenco di birre presenti. Dovranno essere implementate anche le funzionalità di filtro e paginazione risultati.

- ~~**Creare un'applicazione NextJS che visualizzi un elenco di birre da PunkAPI.**~~
- ~~**Utilizzare TailwindCSS per:**~~
  - ~~**dare stile alla pagina**~~
  - ~~**renderla visivamente accattivante.**~~
- ~~**Consentire all'utente di filtrare l'elenco di birre per**:~~
  - ~~**nome**~~
  - ~~**ingredienti**~~
  - ~~**abbinamenti suggeriti**~~
- ~~**Implementare la paginazione per visualizzare solo un determinato numero di birre per volta (ad esempio, 10 birre per pagina).**~~
- ~~**Quando un utente clicca su una birra, visualizzare una finestra modale con informazioni dettagliate su quella birra (ad esempio, nome, ingredienti, metodo di produzione etc.).**~~
