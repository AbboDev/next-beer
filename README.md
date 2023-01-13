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

Da scrivere

## TODO

- **Sistemare README** \*
- Organizzare file dentro cartella src/
- Jest
- Netlify (SSG)
- [Commitizen](https://github.com/commitizen/cz-cli)

## Task

Utilizzare NextJS per creare un'applicazione React ed effettuare chiamate API a PunkAPI ([https://punkapi.com/documentation/v2](https://punkapi.com/documentation/v2)) per recuperare l'elenco di birre presenti. Dovranno essere implementate anche le funzionalità di filtro e paginazione risultati.

- **Creare un'applicazione NextJS che visualizzi un elenco di birre da PunkAPI.**
- **Utilizzare TailwindCSS per:**
  - ~~**dare stile alla pagina**~~
  - **renderla visivamente accattivante.** (Work in progress)
- **Consentire all'utente di filtrare l'elenco di birre per**:
  - ~~**nome**~~
  - **ingredienti**
  - **abbinamenti suggeriti**
- **Implementare la paginazione per visualizzare solo un determinato numero di birre per volta (ad esempio, 10 birre per pagina).**
- **Quando un utente clicca su una birra, visualizzare una finestra modale con informazioni dettagliate su quella birra (ad esempio, nome, ingredienti, metodo di produzione etc.).**

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
