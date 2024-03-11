export type TokenGetterLocationType = {
    location: 'header' | 'cookie';
  };
  
export type TokenGetterType = {
token: string | undefined;
} & TokenGetterLocationType;
