export interface Ubicacion {
  plus_code: Pluscode;
  results: Result[];
  status: string;
}

export interface Result {
  address_components: Addresscomponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
  plus_code?: Pluscode;
  postcode_localities?: string[];
}

interface Geometry {
  bounds?: Bounds;
  location: Northeast;
  location_type: string;
  viewport: Bounds;
}

interface Bounds {
  northeast: Northeast;
  southwest: Northeast;
}

interface Northeast {
  lat: number;
  lng: number;
}

interface Addresscomponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Pluscode {
  compound_code: string;
  global_code: string;
}
