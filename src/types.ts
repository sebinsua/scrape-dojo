export type PagingResponse = Readonly<{
  page: number;
  page_length: number;
  requested_page_length: number;
  total: number;
}>;

export type Media = Readonly<{
  link: string;
  mime_type: string;
  media_type: string;
  base64: string;
  aspect_ratio: number;
  width: number;
  height: number;
  order?: number;
  front_image?: boolean;
}>;

type ListingTime = Readonly<{
  open: string;
  close: string;
  overnight: boolean;
}>;

export type Listing = Readonly<{
  id: string;
  type: 'Venue' | 'Event';
  author: null | number;
  name: string;
  published: boolean;
  subtitle: string;
  coordinates: Readonly<{
    lat: number;
    lng: number;
  }>;
  phone: string;
  website: string;
  station: string;
  rating: number | null;
  address: Readonly<{
    line1: string;
    line2: string | null;
    postcode: string;
    city: string;
  }>;
  pretty_url: string;
  price_rating: number;
  mongo_id: string;
  times: Readonly<{
    hours: Readonly<{
      0: ReadonlyArray<ListingTime>;
      1: ReadonlyArray<ListingTime>;
      2: ReadonlyArray<ListingTime>;
      3: ReadonlyArray<ListingTime>;
      4: ReadonlyArray<ListingTime>;
      5: ReadonlyArray<ListingTime>;
      6: ReadonlyArray<ListingTime>;
    }>;
    open_days: Readonly<{
      0: boolean;
      1: boolean;
      2: boolean;
      3: boolean;
      4: boolean;
      5: boolean;
      6: boolean;
    }>;
  }>;
  collection_ids: ReadonlyArray<string>;
  listingContext_id: 'string';
  slug: string;
  medias: ReadonlyArray<Media>;
  tip: Readonly<{
    text: string;
    language_id: string;
  }>;
  language_id: string;
  review: string | null;
}>;
