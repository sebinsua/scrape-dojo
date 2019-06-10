import { ensureDir, writeJson, writeFile } from 'fs-extra';

import {
  AssetPaths,
  getCategories,
  getCategory,
  getStory,
  categoriesToPaths,
  categoryToPaths,
  storyToPaths,
  saveAssets,
} from './src';

(async () => {
  console.log(`Download list of categories...`);

  const categories = await getCategories();

  let assetPaths: AssetPaths = {
    ...categoriesToPaths(categories),
  };

  await ensureDir('./output/assets');

  await ensureDir('./output/categories');
  await writeJson('./output/categories/metadata.json', categories, {
    spaces: 2,
  });

  console.log(`Download individual categories...`);

  let storyIds = [];
  for (let { id } of categories) {
    const category = await getCategory(id);

    assetPaths = {
      ...assetPaths,
      ...categoryToPaths(category),
    };

    const _storyIds = category.contents
      .filter(c => c.action && c.action.type === 'story')
      .map(c => c.action.item_id);
    storyIds.push(..._storyIds);

    await ensureDir(`./output/category/${category.id}`);
    await writeJson(
      `./output/category/${category.id}/metadata.json`,
      category,
      { spaces: 2 }
    );
  }

  console.log(`Download individual stories...`);

  for (let storyId of storyIds) {
    const story = await getStory(storyId);

    assetPaths = {
      ...assetPaths,
      ...storyToPaths(story),
    };

    await ensureDir(`./output/story/${story.id}`);
    await writeJson(`./output/story/${story.id}/metadata.json`, story, {
      spaces: 2,
    });
  }

  console.log(`Download assets...`);

  await saveAssets(assetPaths);

  console.log('Success!');
})();
