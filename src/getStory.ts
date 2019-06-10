import got from 'got';

import { Media, Listing, PagingResponse } from './types';
import { apiUrl, createHeaders } from './config';

type _StoryResponse = Readonly<{
  story: Readonly<{
    id: string;
    name: string;
    slug: string;
    followed: boolean;
    city_id: string;
  }>;
  contents: ReadonlyArray<StoryContent>;
  paging?: PagingResponse;
}>;

export type StoryText = Readonly<{
  size: number;
  text: string;
  style: string;
  colour: string;
  text_type: string;
  uppercase: boolean;
}>;

export type StoryContent = Readonly<{
  content_type: number;
  padding: number;
  order: number;
  text?: StoryText;
  listing?: Listing;
  medias?: ReadonlyArray<Media>;
  follow_button?: boolean;
}>;

export type ExpandedStory = Readonly<{
  id: string;
  name: string;
  slug: string;
  followed: boolean;
  city_id: string;
  contents: ReadonlyArray<StoryContent>;
}>;

async function _getStory(storyId: string): Promise<_StoryResponse> {
  try {
    const response = await got(`${apiUrl}/stories/${storyId}`, {
      headers: createHeaders(),
      json: true,
    });

    return response.body;
  } catch (error) {
    console.log('ERROR!', error.response);

    return {} as any;
  }
}

export async function getStory(storyId: string): Promise<ExpandedStory> {
  return _getStory(storyId).then(({ story, contents }) => ({
    ...story,
    contents,
  }));
}
