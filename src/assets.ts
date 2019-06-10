import got from 'got';
import { dirname } from 'path';
import { ensureDir, createWriteStream } from 'fs-extra';
import { parse } from 'url';

import { Categories } from './getCategories';
import { ExpandedCategory } from './getCategory';
import { ExpandedStory } from './getStory';

export type AssetPaths = { [path: string]: string };

export const categoriesToPaths = (categories: Categories): AssetPaths => {
  const paths: AssetPaths = {};

  for (let category of categories) {
    const link = category.media.link;
    const { pathname } = parse(link);
    if (pathname) {
      paths[pathname] = link;
    }
  }

  return paths;
};

export const categoryToPaths = (category: ExpandedCategory): AssetPaths => {
  const paths: AssetPaths = {};

  for (let content of category.contents) {
    if (content.listing) {
      const medias = content.listing.medias;
      for (let media of medias) {
        const link = media.link;
        const { pathname } = parse(link);
        if (pathname) {
          paths[pathname] = link;
        }
      }
    }
  }

  return paths;
};

export const storyToPaths = (story: ExpandedStory): AssetPaths => {
  const paths: AssetPaths = {};

  for (let content of story.contents) {
    if (content.listing) {
      const medias = content.listing.medias;
      for (let media of medias) {
        const link = media.link;
        const { pathname } = parse(link);
        if (pathname) {
          paths[pathname] = link;
        }
      }
    }
    if (content.medias) {
      const medias = content.medias;
      for (let media of medias) {
        const link = media.link;
        const { pathname } = parse(link);
        if (pathname) {
          paths[pathname] = link;
        }
      }
    }
  }

  return paths;
};

export async function saveAssets(assetPaths: AssetPaths): Promise<void> {
  for (let [assetPath, url] of Object.entries(assetPaths)) {
    const outputFile = `./output/assets/${assetPath}`;
    await ensureDir(dirname(outputFile));

    const stream = got.stream(url).pipe(createWriteStream(outputFile));
    await new Promise((resolve, reject) => {
      stream.on('finish', () => {
        console.log(`Downloaded ${url} to ${outputFile}`);
        resolve(outputFile);
      });
      stream.on('error', () => {
        reject(new Error(`ERROR! Failed to download ${url} to ${outputFile}`));
      });
    });
  }
}
