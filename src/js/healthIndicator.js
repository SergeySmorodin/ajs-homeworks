// Определяет статус здоровья персонажа
export function getHealthStatus(character) {
  if (!character || typeof character !== 'object') {
    throw new Error('Необходимо передать объект персонажа');
  }
  if (typeof character.health !== 'number') {
    throw new Error('Поле health должно быть числом');
  }
  if (character.health < 0 || character.health > 100) {
    throw new Error('Здоровье должно быть в диапазоне от 0 до 100');
  }
  if (character.health > 50) {
    return 'healthy';
  } else if (character.health >= 15) {
    return 'wounded';
  } else {
    return 'critical';
  }
}
