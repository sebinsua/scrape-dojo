import got from 'got';

import { Listing, PagingResponse } from './types';
import { apiUrl, createHeaders } from './config';

type _CategoryResponse = Readonly<{
  category: Readonly<{
    id: string;
    mongo_id?: string;
    name: string;
    calendar_view: boolean;
  }>;
  contents: ReadonlyArray<CategoryContent>;
  paging?: PagingResponse;
}>;

export type CategoryQuery = Readonly<{
  c?: number;
  p?: number;
  from?: string;
  to?: string;
}>;

export type CategoryAction = Readonly<{
  name: string;
  type: 'story';
  item_id: string;
  station?: string;
}>;

export type CategoryContent = Readonly<{
  content_type: number;
  padding: number;
  action: CategoryAction;
  listing: Listing;
}>;

export type ExpandedCategory = Readonly<{
  id: string;
  mongo_id?: string;
  name: string;
  calendar_view: boolean;
  contents: ReadonlyArray<CategoryContent>;
}>;

async function* _getCategory(
  categoryId: string,
  query: CategoryQuery
): AsyncIterableIterator<_CategoryResponse> {
  try {
    const response = await got(`${apiUrl}/categories/${categoryId}`, {
      headers: createHeaders(),
      query,
      json: true,
    });

    yield response.body;
  } catch (error) {
    console.error('ERROR!', error.response.body);
  }
}

export async function getCategory(
  categoryId: string
): Promise<ExpandedCategory> {
  let category: _CategoryResponse['category'] | null = null;
  let contents: Array<CategoryContent> = [];

  let currentPage = 1;
  for await (let categoryResponse of _getCategory(categoryId, {
    p: currentPage,
  })) {
    if (!category) {
      category = categoryResponse.category;
    }
    contents = [...contents, ...categoryResponse.contents];

    const pageLength = categoryResponse.paging
      ? categoryResponse.paging.page_length
      : 1;
    currentPage++;
    if (currentPage >= pageLength) {
      break;
    }
  }

  return { ...(category as _CategoryResponse['category']), contents };
}
