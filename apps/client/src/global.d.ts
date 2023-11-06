/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-empty-interface */
type Messages = typeof import('./messages/en.json');
declare interface IntlMessages extends Messages {}
