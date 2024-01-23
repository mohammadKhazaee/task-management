// import { SetMetadata } from '@nestjs/common';

// export const Permission = (permission: string) =>
//   SetMetadata('permission', permission);

import { Reflector } from '@nestjs/core';

export const Permission = Reflector.createDecorator<string[]>();
