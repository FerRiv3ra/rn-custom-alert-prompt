# Contributing

## Setup

This repo is a Yarn 4 workspace: the library lives at the root (`src/`) and the demo app in `example/` (Expo).

```sh
yarn            # install root + example
yarn prepare    # build lib/ with builder-bob and install git hooks
```

Node 20+ is required (see `.nvmrc`).

## Scripts

| Command            | What it does                                             |
| ------------------ | -------------------------------------------------------- |
| `yarn typecheck`   | `tsc` over `src/` and `example/`                         |
| `yarn lint`        | ESLint (flat config) over the whole repo                 |
| `yarn lint:fix`    | Same, auto-fixing                                        |
| `yarn test`        | Jest + `@testing-library/react-native`                   |
| `yarn build`       | Build `lib/` (commonjs, module, typescript declarations) |
| `yarn example ios` | Run the demo app on iOS (`android`, `web` also work)     |
| `yarn release`     | Bump version, tag and publish with release-it            |

The example app resolves `rn-custom-alert-prompt` straight from `src/` through the
`rn-custom-alert-prompt-source` export condition, so no rebuild is needed while developing.

## Commit hooks

Husky runs `lint-staged` on every commit: ESLint + Prettier on staged files.

## Publishing

`npm pack --dry-run` shows exactly what will be published. Only `src/` and `lib/`
are shipped; tests, fixtures and dotfiles are excluded through the `files` field.

`yarn release` bumps the version, commits and pushes the `v*` tag; it does not publish
and does not talk to GitHub, so no token is needed locally. Pushing the `v*` tag triggers the Release workflow, which verifies,
builds and stages the version on npm through **trusted publishing** (OIDC) with
provenance (`npm stage publish`). No npm token or repository secret is involved.
The version goes live once a maintainer approves it with 2FA: npmjs.com → package →
_Staged Packages_ → Approve, or `npm stage list <package>` then `npm stage approve <stage-id>`.

One-time setup on npmjs.com (package → Settings → Trusted Publisher → GitHub Actions):
owner `FerRiv3ra`, repository `rn-custom-alert-prompt`, workflow `release.yml`,
no environment. Once the first trusted publish succeeds, set _Publishing access_ to
"Require two-factor authentication and disallow tokens".

## Example app

`example/src/App.tsx` is a single screen with a button per use case (alert, cancel,
custom buttons, prompt, default value, dismiss) plus theme and appearance toggles.

Run it with `yarn example ios`, `yarn example android` or `yarn example web`.
