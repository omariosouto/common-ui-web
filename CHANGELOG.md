# 1.1.10-beta20254181744998847PR14 - 2025-4-18

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


