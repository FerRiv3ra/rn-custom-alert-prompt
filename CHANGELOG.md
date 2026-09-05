# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project follows
[Semantic Versioning](https://semver.org/).

## [1.3.0] - Unreleased

### Added

- Prompt input options: `keyboardType`, `secureTextEntry`, `autoCapitalize`, `maxLength`,
  and `inputProps` for any other `TextInput` prop (the prompt keeps control of `value`,
  `onChangeText`, `placeholder` and `defaultValue`).
- `dismissOnBackdropPress` on `AlertContainer`: tapping the dimmed background cancels the
  alert or prompt. Off by default.

### Fixed

- The prompt no longer shifts the card up by a fixed 50 % of the screen to make room for
  the keyboard. The card is centred and a `KeyboardAvoidingView` moves it only when the
  keyboard is shown. Fixes the card being cut off at the top on tall screens and on Web.

### Changed

- Still zero runtime dependencies: everything comes from `react-native` core.

## [1.2.0] - 2026-09-05

### Added

- `Alert.dismiss()` closes the alert or prompt currently shown; its promise resolves as
  cancelled (`false` / `undefined`).
- `Alert.alert(title, description, onPress)` now runs `onPress` when the alert is confirmed
  (the third argument was accepted but ignored). `Alert.prompt(title, description, onPress)`
  runs `onPress(value)` when the prompt is confirmed.
- The prompt input submits on the keyboard return key.
- Accessibility: buttons expose `accessibilityRole="button"` and a label, the title is a header
  and the card is marked as modal for screen readers.
- Public types are exported: `AlertContainerProps`, `AlertData`, `PromptData`, `PersonalTheme`,
  `AlertButton`, `AlertIcon`, `Appearances`, `ValidPlatforms`.
- ESM build with an `exports` map (`import` and `require` entry points with their own types).

### Fixed

- The container subscribed a new listener on every alert and never unsubscribed (memory leak,
  duplicated callbacks). Subscriptions are now created once and removed on unmount.
- Opening a second alert while one was shown could remove the container's listener and leave
  the promise pending. The previous request now resolves as cancelled.
- `Alert.prompt` is typed as `Promise<string | undefined>`: it always resolved `undefined` on
  cancel but claimed `Promise<string>`.
- The Android hardware back button closes the modal (`onRequestClose`) and resolves as cancelled.

### Changed

- Build with `react-native-builder-bob` (CommonJS, ESM and TypeScript declarations in `lib/`).
  `dist/` and `lib-esm/` are gone. `main`, `module`, `types` and `exports` point to `lib/`.
- Tooling: ESLint 9 flat config, Prettier 3, TypeScript 5.9, React Native 0.83 dev dependencies,
  `@testing-library/react-native` 14, `release-it`, GitHub Actions CI and tag-based release
  through npm trusted publishing (OIDC, no token).
- `peerDependencies`: `react >= 18.2.0`, `react-native >= 0.73.0`. Node 20+ for development.
- Package manager: Yarn 4 workspaces (`packageManager` field, `yarn.lock`). `package-lock.json` removed.
- The demo app moved from the repo root to `example/` (Expo 55, iOS, Android and Web). It imports
  the library from `src/` through the `rn-custom-alert-prompt-source` export condition.
  The old bare React Native 0.73 `ios/` and `android/` projects are gone.
- Removed the unused `helpers/prompt.ts` duplicate.

## [1.1.6] - 2025-09-14

- Add husky with lint-staged. Bump dependencies.

## [1.1.5] - 2025-04-23

- `defaultValue` for the prompt input (thanks @mroswald). Bump peer dependencies.
