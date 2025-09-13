import { SetMetadata } from "@nestjs/common";

export const Perm = (...permissions: string[]) => SetMetadata('permissions', permissions)
