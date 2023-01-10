type UnitQuantity = {
  value: number
  unit: string
}

type BeerFermentation = {
  temp: UnitQuantity
}

type BeerMashTemperature = {
  temp: UnitQuantity
  duration: number | null
}

type BeerMethod = {
  mash_temp: BeerMashTemperature[]
  fermentation: BeerFermentation
  twist: string | null
}

type BeerMalt = {
  name: string
  amount: UnitQuantity
}

type BeerHop = {
  name: string
  amount: UnitQuantity
  add: string
  attribute: string
}

type BeerIngredients = {
  malt: BeerMalt[]
  hops: BeerHop[]
  yeast: string
}

type Beer = {
  id: number
  name: string
  tagline: string
  first_brewed: string
  description: string
  image_url: string
  abv: number | null
  ibu: number | null
  target_fg: number | null
  target_og: number | null
  ebc: number | null
  srm: number | null
  ph: number | null
  attenuation_level: number
  volume: BeerVolume
  boil_volume: UnitQuantity
  method: BeerMethod
  ingredients: BeerIngredients
  food_pairing: string[]
  brewers_tips: string
  contributed_by: string
}
