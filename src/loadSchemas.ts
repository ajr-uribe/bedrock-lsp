import * as fs from 'fs';
import * as path from 'path';
import { JSONSchema } from 'vscode-json-languageservice/lib/esm/jsonLanguageService.js';

const schemasDir = path.join(__dirname, 'schemas');

export function loadSchema(file: string): any {
  const fullPath = path.join(schemasDir, file);
  if (!fs.existsSync(fullPath)) {
    console.warn(`[bedrock-lsp] No encontrado: ${fullPath}`);
    return {};
  }
  return JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
}

export const bedrockSchemas: {
  uri: string;
  fileMatch: string[];
  schema: JSONSchema;
}[] = [
  {
    uri: 'bedrock://schemas/manifest',
    fileMatch: ['**/manifest.json'],
    schema: loadSchema('general/manifest.json'),
  },
  {
    uri: 'bedrock://schemas/world_packs',
    fileMatch: [
      '**/world_manifest.json',
      '**/world_behavior_packs.json',
      '**/world_resource_packs.json',
    ],
    schema: loadSchema('general/world_x_packs.json'),
  },

  {
    uri: 'bedrock://schemas/bp/entity',
    fileMatch: ['entities/*.json'],
    schema: loadSchema('behavior/entities/entities.json'),
  },
  {
    uri: 'bedrock://schemas/bp/block',
    fileMatch: ['blocks/*.json'],
    schema: loadSchema('behavior/blocks/blocks.json'),
  },
  {
    uri: 'bedrock://schemas/bp/item',
    fileMatch: ['items/*.json'],
    schema: loadSchema('behavior/items/items.json'),
  },
  {
    uri: 'bedrock://schemas/bp/recipe',
    fileMatch: ['recipes/*.json'],
    schema: loadSchema('behavior/recipes/recipes.json'),
  },
  {
    uri: 'bedrock://schemas/bp/loot_tables',
    fileMatch: ['loot_tables/*.json'],
    schema: loadSchema('behavior/loot_tables/loot_tables.json'),
  },
  {
    uri: 'bedrock://schemas/bp/trading',
    fileMatch: ['trading/*.json'],
    schema: loadSchema('behavior/trading/trading.json'),
  },
  {
    uri: 'bedrock://schemas/bp/spawn_rules',
    fileMatch: ['spawn_rules/*.json'],
    schema: loadSchema('behavior/spawn_rules/spawn_rules.json'),
  },
  {
    uri: 'bedrock://schemas/bp/feature',
    fileMatch: ['features/*.json'],
    schema: loadSchema('behavior/features/features.json'),
  },
  {
    uri: 'bedrock://schemas/bp/feature_rules',
    fileMatch: ['feature_rules/*.json'],
    schema: loadSchema(
      'behavior/feature_rules/feature_rules.json'
    ),
  },
  {
    uri: 'bedrock://schemas/bp/biome',
    fileMatch: ['biomes/*.json'],
    schema: loadSchema('behavior/biomes/biomes.json'),
  },
  {
    uri: 'bedrock://schemas/bp/animation',
    fileMatch: ['animations/*.json'],
    schema: loadSchema('behavior/animations/animations.json'),
  },
  {
    uri: 'bedrock://schemas/bp/animation_controller',
    fileMatch: ['animation_controllers/*.json'],
    schema: loadSchema(
      'behavior/animation_controllers/animation_controller.json'
    ),
  },
  {
    uri: 'bedrock://schemas/bp/dialogue',
    fileMatch: ['dialogue/*.json'],
    schema: loadSchema('behavior/dialogue/dialogue.json'),
  },
  {
    uri: 'bedrock://schemas/bp/item_catalog',
    fileMatch: ['item_catalog/crafting_item_catalog.json'],
    schema: loadSchema(
      'behavior/item_catalog/crafting_item_catalog.json'
    ),
  },
  {
    uri: 'bedrock://schemas/bp/tick',
    fileMatch: ['tick.json'],
    schema: loadSchema('behavior/functions/tick.json'),
  },
  {
    uri: 'bedrock://schemas/bp/camera',
    fileMatch: ['cameras/*.json'],
    schema: loadSchema('behavior/cameras/presets/cameras.json'),
  },

  {
    uri: 'bedrock://schemas/rp/entity',
    fileMatch: ['*.entity.json', 'entity/*.json'],
    schema: loadSchema('resource/entity/entity.json'),
  },
  {
    uri: 'bedrock://schemas/rp/attachable',
    fileMatch: ['attachables/*.json'],
    schema: loadSchema('resource/attachables/attachables.json'),
  },
  {
    uri: 'bedrock://schemas/rp/model_entity',
    fileMatch: ['*.geo.json'],
    schema: loadSchema(
      'resource/models/entity/model_entity.json'
    ),
  },
  {
    uri: 'bedrock://schemas/rp/render_controller',
    fileMatch: [
      'render_controllers/*.json',
      '*.render_controller.json',
    ],
    schema: loadSchema(
      'resource/render_controllers/render_controllers.json'
    ),
  },
  {
    uri: 'bedrock://schemas/rp/animation',
    fileMatch: ['animations/*.json', '*.animation.json'],
    schema: loadSchema(
      'resource/animations/actor_animation.json'
    ),
  },
  {
    uri: 'bedrock://schemas/rp/animation_controller',
    fileMatch: [
      'animation_controllers/*.json',
      '*.animation_controller.json',
    ],
    schema: loadSchema(
      'resource/animation_controllers/animation_controller.json'
    ),
  },
  {
    uri: 'bedrock://schemas/rp/particles',
    fileMatch: ['particles/*.json'],
    schema: loadSchema('resource/particles/particles.json'),
  },
  {
    uri: 'bedrock://schemas/rp/fog',
    fileMatch: ['fogs/*.json', 'fog/*.json'],
    schema: loadSchema('resource/fog/fog.json'),
  },
  {
    uri: 'bedrock://schemas/rp/sounds',
    fileMatch: ['sounds.json'],
    schema: loadSchema('resource/sounds.json'),
  },
  {
    uri: 'bedrock://schemas/rp/sound_definitions',
    fileMatch: ['sounds/sound_definitions.json'],
    schema: loadSchema('resource/sounds/sound_definitions.json'),
  },
  {
    uri: 'bedrock://schemas/rp/materials',
    fileMatch: ['materials/*.material', '*.material'],
    schema: loadSchema('resource/materials/materials.json'),
  },
  {
    uri: 'bedrock://schemas/rp/item',
    fileMatch: ['items/*.json'],
    schema: loadSchema('resource/items/items.json'),
  },
  {
    uri: 'bedrock://schemas/rp/textures',
    fileMatch: ['**/item_texture.json'],
    schema: loadSchema('resource/textures/item_texture.json'),
  },

  {
    uri: 'bedrock://schemas/languages',
    fileMatch: ['texts/languages.json'],
    schema: loadSchema('language/languages.json'),
  },
];
