# Crooked Labs - Marianopolis Mentorship Program

Created as part of a submission to Marihacks 2024.
https://devpost.com/software/crooked-labs-marianopolis-mentorship-program

## The Product

Our software automates the process of pairing mentors and mentees. The choices are based upon multiple factors and in this particular order: Program of study, gender, language, high school, and hobbies. In addition, any other factors can be easily implemented into the system, allowing for a more compatible pairing. It does this automatically using a combination of fixed proportion weighed scores for items such as gender or program and machine learning based heuristics for matching more qualitative traits such as hobbies or preferences.

_The project is a proof-of-concept._

Copyright (C) 2024 Annie Liu, (Chris) Xi Yang, Justin Bax, (Tony) Le Tuan Huy Nguyen

This project is powered by Svelte, SvelteKit. Create-svelte instructions on building are below.

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
