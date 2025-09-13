import { LoggingInterceptor } from '../../../security/interceptors/logging.interceptor';

describe('LoggingInterceptor', () => {
  it('should be defined', () => {
    expect(new LoggingInterceptor()).toBeDefined();
  });
});
