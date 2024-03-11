import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import {
  AcceptLanguageResolver,
  I18nOptions,
  I18nOptionsFactory,
  I18nOptionsWithoutResolvers,
  I18nJsonLoader,
  QueryResolver,
} from 'nestjs-i18n';

@Injectable()
export class I18nConfigService implements I18nOptionsFactory {
  constructor(private configService: ConfigService) {}

  createI18nOptions():
    | Promise<I18nOptionsWithoutResolvers>
    | I18nOptionsWithoutResolvers {
    return {
      fallbackLanguage: 'en',
      fallbacks: {
        en: 'en',
        ar: 'ar',
      },
      loaderOptions: {
        path: join(__dirname, '../statics/i18n/'),
        includeSubfolders: true,
        watch: true,
      },
    };
  }
}

export const i18nConfig = <I18nOptions>{
  fallbackLanguage: 'en',
  fallbacks: {
    en: 'en',
    ar: 'ar',
  },
  loaderOptions: {
    path: join(__dirname, '../statics/i18n/'),
    includeSubfolders: true,
    watch: true,
  },
  loader: I18nJsonLoader,
  resolvers: [
    AcceptLanguageResolver,
    QueryResolver,
  ],
};
