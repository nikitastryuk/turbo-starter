# E-commerce Turborepo

## What's inside?

This turborepo uses [npm](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

### Apps

- `admin-panel`: Admin panel.
- `storefront`: E-commerce storefront.

### Packages

- `eslint-config`: Eslint config.
- `system`: Shared components, hooks, utils.
- `tailwind-config`: Tailwind config.

## Tech stack

- [TypeScript](https://www.typescriptlang.org)
- [Next](https://nextjs.org/)
- [Tailwind](https://tailwindcss.com/docs/installation)
- [CVA](https://cva.style/docs)
- [HeadlessUI](https://headlessui.com/)
- [Heroicons](https://heroicons.com/)
- [Next-i18-next](https://github.com/i18next/next-i18next)
- [React-hook-form](https://react-hook-form.com/)
- [Storybook](https://storybook.js.org/docs/react/get-started/install)
- [Prisma](https://www.prisma.io/)
- [tRPC](https://trpc.io/)
- [Zod](https://zod.dev/?id=installation)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Turborepo](https://turbo.build/repo/docs)

## Cloud Services

- [Vercel](https://vercel.com)
- [PlanetScale](https://planetscale.com)
- [Axiom](https://www.axiom.co)

### Initial setup

1. Create `.env` (root folder) and fill out files with all environment variables. Use `.env.example` as reference.

2. Install the dependencies (**_FROM ROOT FOLDER_**):

```
npm i
```

3. Run dev server for expected app / package. (**_FROM ROOT FOLDER_**):

```
npm run dev:ap
```

### Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup), then enter the following commands:

```
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your turborepo:

```
npx turbo link
```
