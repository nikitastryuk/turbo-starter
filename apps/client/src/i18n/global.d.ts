/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-empty-interface */
type Messages = typeof import('./locales/en.json');
declare interface IntlMessages extends Messages {}
