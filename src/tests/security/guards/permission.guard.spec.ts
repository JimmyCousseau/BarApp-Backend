import { PermissionGuard } from '../../../security/guards/permission.guard';

describe('RoleGuard', () => {
  it('should be defined', () => {
    expect(new PermissionGuard()).toBeDefined();
  });
});
