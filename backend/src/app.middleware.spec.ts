import { AppMiddleware } from './app.middleware';

describe('AppMiddleware', () => {
  it('should be defined', () => {
    expect(new AppMiddleware()).toBeDefined();
  });
});
