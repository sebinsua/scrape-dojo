import got from 'got';

import { Media } from './types';
import { apiUrl, createHeaders } from './config';

export type Category = Readonly<{
  id: string;
  name: string;
  order: number;
  calendar_view: boolean;
  media: Media;
  hero: boolean;
}>;
export type Categories = ReadonlyArray<Category>;

export async function getCategories(): Promise<Categories> {
  try {
    const response = await got(`${apiUrl}/home/categories`, {
      headers: createHeaders(),
      json: true,
    });

    const categories = response.body.categories;

    return categories;
  } catch (error) {
    console.error('ERROR!', error.response.body);

    return [];
  }
}
