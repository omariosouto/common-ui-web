# 1.1.13-beta20254191745030102PR20 - 2025-4-19

This pull request introduces new dependencies on `@omariosouto/common-core` and `@omariosouto/common-errors` libraries, while also refactoring code to utilize the `sleep` utility from `@omariosouto/common-core` instead of duplicating it locally. These changes improve code reuse and consistency across the project.
### Dependency Updates:
* Added `@omariosouto/common-core` and `@omariosouto/common-errors` as `peerDependencies` and `devDependencies` in `packages/lib/package.json`. This ensures these libraries are available for shared functionality and error handling. [[1]](diffhunk://#diff-f11fdfd051a9039f87286aa9c327c257e9619660394143b2d0d8dbade3c3abd5L37-R39) [[2]](diffhunk://#diff-f11fdfd051a9039f87286aa9c327c257e9619660394143b2d0d8dbade3c3abd5R67-R68)
### Code Refactoring:
* Updated `playground/example-nextjs/app/async-state/client.tsx` to use the `sleep` utility from `@omariosouto/common-core`, removing the locally defined `sleep` function.
* Refactored `playground/example-nextjs/app/state/httpClient.tsx` to replace the local `sleep` function with the imported version from `@omariosouto/common-core`.


# 1.1.12 - 2025-4-18

Reference guide to guide abstractions related to asyncState on UI
- https://tkdodo.eu/blog/practical-react-query
- [Why we need this abstraction to work on web with react](https://tkdodo.eu/blog/why-you-want-react-query)
### Most important support APIs
#### Query Params
- Data transformation: All UI data must be transformed BEFORE it goes to the UI.
- [initialData](https://tanstack.com/query/v4/docs/framework/react/guides/initial-query-data#using-initialdata-to-prepopulate-a-query): Help us to populate the react query with data provided through the network
- [Reference](https://tkdodo.eu/blog/placeholder-and-initial-data-in-react-query)
- Adjust [for stale time when using initialData](https://tkdodo.eu/blog/react-query-fa-qs#why-is-the-queryfn-not-called)
- [enabled](https://tanstack.com/query/v4/docs/framework/react/guides/disabling-queries): Help us to enable and disable queries
#### Usage on screen
- Always ensure that errors are being considered
- Always ensure that loadings are being considered
#### React Query under the hood
![image](https://github.com/user-attachments/assets/ea301fc5-048d-4932-89d0-8caeaa8d7266)
![CleanShot 2025-04-16 at 20 00 12](https://github.com/user-attachments/assets/08efeb9f-300f-46bd-8335-a021f69c6811)
![CleanShot 2025-04-16 at 20 02 30](https://github.com/user-attachments/assets/78b1626d-f75e-4318-8039-5a9d3d23a2c1)


# 1.1.11 - 2025-4-18

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


