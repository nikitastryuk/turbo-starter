# Turborepo Starter

This turborepo uses [npm](https://www.npmjs.com/) as a package manager.

### Tech stack

- [TypeScript](https://www.typescriptlang.org)
- [Next.js](https://nextjs.org)
- [Next-intl](https://next-intl-docs.vercel.app)
- [Tailwind](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [React-hook-form](https://react-hook-form.com)
- [CVA](https://cva.style/docs)
- [Radix](https://www.radix-ui.com)
- [Zod](https://zod.dev/?id=installation)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Turborepo](https://turbo.build/repo/docs)

### Folder structure

```text
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ client
  |   ├─ Next.js client project
  └─ admin
      ├─ Next.js admin project
packages
  └─ system
      └─ Design system with shared components, hooks, and styles
configs
  ├─ eslint
  |   └─ Shared, fine-grained, eslint presets
  ├─ prettier
  |   └─ Shared prettier configuration
  └─ typescript
      └─ Shared tsconfig you can extend from
```

### Initial Setup

1. **Create Environment File:**
   - Create a `.env` file in the root folder and fill it with the required environment variables. Use `.env.example` as a reference.

2. **Install Dependencies:**
   - Install project dependencies from the root folder using the following command:

     ```bash
     npm install
     ```

3. **Run Development Server:**
   - To run the development server for a specific app or package, use the following command from the root folder:

     ```bash
     npm run dev:admin
     ```

### Most common project scripts

| Script           | Description                                                               |
|------------------|---------------------------------------------------------------------------|
| `build`          | Run the build command for each workspace.                                 |
| `clean`          | Clean all workspaces, removing `node_modules`, `.next`, `.turbo` folders. |
| `dev:admin`      | Run the development server for the admin project.                         |
| `dev:client`     | Run the development server for the client project.                        |
| `dev:system`     | Run the development server for the system project.                        |
| `format`         | Format workspaces with Prettier, writing changes and caching results.     |
| `lint`           | Lint workspaces with ESLint, fixing issues and caching results.           |
| `ncu`            | Update workspaces dependencies using npm-check-updates.                   |
| `typecheck`      | Run tcs for each workspaces.                                              |

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
