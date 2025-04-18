# 1.1.11-beta20254181745010627PR18 - 2025-4-18

This pull request involves a minor reorganization of dependencies across `package.json` files. The `use-debounce` library has been moved from the main `package.json` to the `packages/lib/package.json`, likely to better align with its usage.


# 1.1.10 - 2025-4-18

Debounce and Throttle are two main concepts that NEEDs to be available in any application and need to have easy ways to access them through the UI library instead of only in language level.
These two are being proxied through https://www.npmjs.com/package/use-debounce


# 1.1.9 - 2025-4-16

Just refining the availability of multiple themes on the same screen making them not blink on page load.


# 1.1.8 - 2025-4-16

Adding support for the real dark mode


# 1.1.7 - 2025-4-16

Just creating a dedicated entrypoint for all providers available in the application


# 1.1.6 - 2025-4-16

This PR makes all necessary changes to enable multi-theme support by default through Tailwind and shadcn based on this https://ui.shadcn.com/themes


# 1.1.5 - 2025-4-15

The idea is to provide an alternative to useState, when handling asyncData providing structures to:
- `enabled`: Control WHEN they run, and make the requests be queued based on others
- ...


# 1.1.4 - 2025-4-15

Just exposing the entrypoint `"@omariosouto/common-ui-web/components"` to make direct access to components only, considering that the library will have more scopes


# 1.1.3 - 2025-4-15

Just adding support to dev mode with a interactive docs


# 1.1.2 - 2025-4-14

This PR exposes an API to make easier to work with custom themes


# 1.1.1 - 2025-4-14

In this version, we are adding support for a standardized testing library


# 1.1.0 - 2025-4-14

This PR is just adding support to Tailwind CSS over an experimental setup, trying to make shadcn works as a component library


# 1.0.3 - 2025-4-13

Here you specify what exactly will be added to the changelog of the new version.


# 1.0.2 - 2025-4-13

Here you specify what exactly will be added to the changelog of the new version.


# 1.0.1 - 2025-4-13

Here you specify what exactly will be added to the changelog of the new version.


