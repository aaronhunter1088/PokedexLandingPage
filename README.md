# PokedexLandingPage

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5.
See below for historical changes.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will
automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build
optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit
the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## History

#### Version 1.2.0
Set up router-outlet to switch between tiles and info sections without reloading the page.

#### Version 1.1.2
Updated tile3 to alternate the logo and content images between Angular and Spring Boot, independentally of each other.

#### Version 1.1.1
Updated the homepage to fix the darkmode toggles such that the tiles adjust to this settings change.

#### Version 1.1.0
Updated the homepage to include a background image and 3 tiles. These tiles each link to their
appropriate flavor of the Pokédex app. The tiles do load their app when they are running however
the dark mode toggle is not implemented and only a concept at the moment.

#### Version 1.0.1
Added Angular Material to the project for UI components and styling.

#### Version 1.0.0
This is the initial release of the Pokedex Landing Page application. It features two main sections for navigating to
either flavor of my Pokédex applications, and then a brief overview describing the reasons for creating these applications.