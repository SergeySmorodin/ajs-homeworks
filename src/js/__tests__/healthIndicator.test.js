import { getHealthStatus } from '../healthIndicator';

describe('getHealthStatus', () => {
  describe('проверка здоровья', () => {
    test.each([
      [{ name: 'Маг', health: 90 }, 'healthy', 'healthy для здоровья > 50'],
      [{ name: 'Маг', health: 30 }, 'wounded', 'wounded для здоровья < 50'],
      [{ name: 'Маг', health: 10 }, 'critical', 'critical для здоровья < 15'],
    ])('$s', (character, expectedStatus) => {
      expect(getHealthStatus(character)).toBe(expectedStatus);
    });
  });

  describe('граничные значения', () => {
    test.each([
      [51, 'healthy', '51 -> healthy'],
      [50, 'wounded', '50 -> wounded'],
      [15, 'wounded', '15 -> wounded'],
      [14, 'critical', '14 -> critical'],
    ])('health=%i возвращает %s (%s)', (health, expectedStatus) => {
      expect(getHealthStatus({ name: 'Маг', health })).toBe(expectedStatus);
    });
  });

  describe('обработка ошибок', () => {
    test.each([
      [undefined, 'Необходимо передать объект персонажа', 'отсутствие объекта'],
      [{ name: 'Маг', health: '90' }, 'Поле health должно быть числом', 'строковый формат health'],
      [{ name: 'Маг', health: -1 }, 'Здоровье должно быть в диапазоне от 0 до 100', 'отрицательное health'],
      [{ name: 'Маг', health: 101 }, 'Здоровье должно быть в диапазоне от 0 до 100', 'health > 100'],
    ])('тест исключения для %s', (input, expectedError) => {
      expect(() => getHealthStatus(input)).toThrow(expectedError);
    });
  });
});
