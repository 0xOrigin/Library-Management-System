import { Transform } from 'class-transformer';

export const ToBoolean = (): PropertyDecorator => {
  return Transform(({ obj, key }) => {
    if (obj[key] === 'true') return true;
    if (obj[key] === 'false' || obj[key] === '') return false;
    if (obj[key] === 'null') return null;
    return obj[key];
  });
};
