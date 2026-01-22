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

#### Version 1.8.1

Updated the regionsNameMap to remove the color property since that is now controlled by the settings.

#### Version 1.8.0

After first deploy to the server, there were a few issues noticed. While most were easily fixed, the region name text
color was not updating and using the selected color properly. This has been fixed and persists when you refresh the
page.

#### Version 1.7.4

Fixed a few issues when verifying the deployment of all the applications to my server. Added a copyright to the
bottom of the landing page.

#### Version 1.7.3

Implemented routing so that when the user navigates back to the Landing Page from any app, the current
darkmode value will be preserved for that app, This is also saved in the local storage so the app is
always in the mode the user last set it to.

#### Version 1.7.1

Rearranged some of the logic in app.ts. There are a lot of methods and variables in that file now so
I wanted to group them better.

#### Version 1.7.0

Implementing new logic to store the values set in settings to local storage. This way, when the user
returns to the application, their settings are preserved. This includes dark mode, tile colors,
region name styles, and tile styles.

#### Version 1.6.2

Added a new section to display the About this Pokédex application. This section briefly describes the purpose of the
application and the differences between the three.

#### Version 1.6.1

Fixed an issue with the region name color not updating accordingly. Also adjusted the settings by wrapping them
in a div to ensure that when viewed on smaller screens, all options are visible without cutting off any of the
controls at the bottom.

#### Version 1.6.0

Changed the region name to be more like the tiles. Gave it controls as well to adjust the color,
font, transparency, and border color.

#### Version 1.5.9

Changed the value 'mode' to 'darkmode' to be more descriptive of what the variable controls.

#### Version 1.5.8

Implemented a toggle to change the color of the tile text. A few font options were also added and adjust only the text
on the tiles.

#### Version 1.5.7

Implemented a fix where the info icon wasn't displaying after closing the side panel. There was also a small issue
that caused the panel to reopen after closing it. I also noticed the dividers were slightly off alignment so I removed
the property that was causing that.

#### Version 1.5.6

Implemented a checkbox which controls whether the tiles and border colors should be the same or different.
I also cleaned up the new variables defined in app.ts to match the current convention of using the Angular
'signal' to set and get the value of a variable. I also removed the now not used 'info' component.

#### Version 1.5.5

Implemented the tile color toggle to control the color overlay on the tiles. Also added another
color picker for the tile border. Each are controlled separetely.

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