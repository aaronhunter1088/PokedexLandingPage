# PokédexLandingPage

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

#### Version 1.5.4
Implemented the outline toggle to control whether the tiles have an outline or not.

#### Version 1.5.3
Implemented the blur toggle to control how much blur is applied to the background image.

#### Version 1.5.2
Implemented the transparency toggle to control whether the tiles have a glass-like effect or a solid background.

#### Version 1.5.1
Updated the homepage to have a side panel that will display the information section. It will have additional settings
to control the tiles. Also fixed the version numbers here and added missing files from the last update.

#### Version 1.5.0
Changed the tiles from having a white/black background to having a glass-like effect. This will let the user see the
beautiful background image while still knowing that there is a tile to click on. 

#### Version 1.4.0
Added two environments: develop and prod. The develop environment uses the local server
while the prod environment uses the deployed version on the server.

#### Version 1.3.2
Updated the regionsInfoMap to include a custom color for each region. This color is then used
as the background color for the header when that region's image is being displayed. Some colors
are not yet finalized so they will use Silver as a placeholder until a color is chosen.

#### Version 1.3.1
Reformatted all files to ensure consistent code style across the project.

#### Version 1.3.0
Remove old list of image filenames since there is a map that contains this information alongside the region name.
Removed the references to that list and use the map instead.

#### Version 1.2.4
Used Chat to update the header to display the region name based on the current background image.

#### Version 1.2.3
Update help icon to info icon since that is the info section, not a help section. Also updated the scaling effect that
occurs when the mouse hovers over an icon in the header. I also added some readonly properties in app and tiles that
reference the icons in use, in that particular component. This may make switching icons around easier but also helps
ensure that icons don't get forgotten about. Finally, removed some unnecessary comments printed to the dev console.

#### Version 1.2.2
Added new maps for the background randomizer. Then added logic to randomly select one of these maps
when the shuffle icon is clicked.

#### Version 1.2.1
Used Chat to update the homepage to include a header. This header should have two icons, right-justified.
The first icon is a shuffle icon and will be configured to randomize the background image but is not yet implemented.
The second icon is an info icon to switch between the tiles and the info section without reloading the page; this button
was implemented. Clicking the icon shows the info section of the application. The icon also adjusts to a 'go back'
circle arrow which can be used to display the tiles again.

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
either flavor of my Pokédex applications, and then a brief overview describing the reasons for creating these
applications.