// src/utils/sceneFactory.ts
import { Scene, GameState, GameActions, SceneTemplate } from "../types/game";
import { SCENE_TEMPLATES } from "../config/gameData";

export class SceneFactory {
  static generateScene(template: SceneTemplate, gameState: GameState, actions: GameActions): Scene {
    return {
      title: template.title,
      description: template.description,
      choices: template.options.map(option => ({
        text: option.text,
        action: () => {
          if (option.score) actions.addScore(option.score);
          if (option.heal) actions.heal(option.heal);
          if (option.damage) actions.takeDamage(option.damage);
          if (option.item) {
            actions.addToInventory(option.item);
            if (option.achievement) actions.addAchievement(option.achievement);
          }
          if (option.skill) actions.improveSkill(option.skill.type, option.skill.amount);
          if (option.relationship) actions.modifyRelationship(option.relationship.target, option.relationship.change);
          if (option.scene) actions.changeScene(option.scene);
        },
        condition: option.condition ? () => this.evaluateCondition(option.condition!, gameState) : undefined,
        skillCheck: option.skillCheck
      }))
    };
  }

  static evaluateCondition(condition: string, gameState: GameState): boolean {
    if (condition.includes('inventory.includes')) {
      const item = condition.match(/"([^"]+)"/)?.[1];
      return item ? gameState.inventory.includes(item) : false;
    }
    if (condition.startsWith('!')) {
      return !this.evaluateCondition(condition.slice(1), gameState);
    }
    return true;
  }

  static getAllScenes(gameState: GameState, actions: GameActions): Record<string, Scene> {
    const scenes: Record<string, Scene> = {};
    
    Object.entries(SCENE_TEMPLATES).forEach(([id, template]) => {
      scenes[id] = this.generateScene(template, gameState, actions);
    });

    const missingScenes = [
      'found_key', 'hermit_lore', 'got_sword', 'got_potion', 'forest_rest', 'secret_paths',
      'water_mystery', 'stream_blessing', 'blessed_by_unicorn', 'unicorn_wisdom', 'quest_truth',
      'temple_approach', 'respectful_approach', 'tribute_offering', 'dragon_combat',
      'wisdom_victory', 'treasure_choice', 'creative_solution'
    ];

    missingScenes.forEach(sceneId => {
      if (!scenes[sceneId]) {
        scenes[sceneId] = {
          title: "Continue Your Journey",
          description: "Your path leads forward through the mystical realm.",
          choices: [
            { text: "Continue", action: () => actions.changeScene("forest_path") },
            { text: "Rest", action: () => { actions.heal(10); actions.changeScene("forest_path"); }}
          ]
        };
      }
    });

    return scenes;
  }
}
