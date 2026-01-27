# Copilot Instructions for Pokédex Landing Page

## Project Overview

This is an Angular 21 application that serves as a landing page for multiple Pokédex applications. The project provides a visually appealing interface with customizable tiles, background images, and theme settings that persist across sessions using local storage.

## Technology Stack

- **Framework**: Angular 21.0.0 with standalone components
- **Language**: TypeScript 5.9.2 with strict mode enabled
- **UI Components**: Angular Material 21.0.6
- **Color Picker**: ngx-color 10.1.0
- **Build Tool**: Angular CLI 21.0.5
- **Testing**: Vitest 4.0.8
- **Package Manager**: npm 11.6.2

## Project Structure

- `src/app/` - Main application component with settings panel and tile management
- `src/tiles/` - Tile components for navigating to different Pokédex apps
- `src/environments/` - Environment configurations (development and production)
- `public/` - Static assets including background images
- `angular.json` - Angular CLI configuration
- `tsconfig.json` - TypeScript configuration with strict mode

## Code Style and Conventions

### TypeScript

- Use **single quotes** for strings (enforced by .editorconfig and Prettier)
- Indent with **2 spaces** (no tabs)
- Use **strict TypeScript** mode (all strict flags enabled in tsconfig.json)
- Use **Angular signals** for reactive state management
- Prefer `readonly` properties where applicable
- Use `protected` or `private` access modifiers appropriately
- Always specify types explicitly; avoid relying on inference for public APIs

### Angular Patterns

- Use **standalone components** (no NgModules)
- Use **ChangeDetectionStrategy.OnPush** for components
- Use **@ViewChild** decorators for template references
- Import MaterialModule for Angular Material components
- Use Angular's signal API for state management
- Follow the naming convention: component files use the component name (e.g., `app.ts`, `tiles.ts`)

### File Organization

- Component files are co-located: `component.ts`, `component.html`, `component.css`
- Use lowercase filenames without suffixes like `.component` (e.g., `app.ts` not `app.component.ts`)
- Group related constants at the top of component classes
- Organize component properties in this order:
  1. ViewChild references
  2. Signals
  3. Icons
  4. Colors
  5. Constants and keys
  6. Other properties

### Formatting

- **Maximum line length**: 100 characters (Prettier config)
- **Final newline**: Required in all files
- **Trim trailing whitespace**: Enabled
- Use Prettier for HTML files with Angular parser
- Quote type for TypeScript: single quotes

## Development Commands

```bash
# Development server
npm start                    # Start dev server at http://localhost:4200
npm run startPort            # Start dev server accessible on network (0.0.0.0)

# Building
npm run build                # Production build
npm run build-server         # Build for server deployment
npm run watch                # Build with watch mode for development

# Testing
npm test                     # Run Vitest unit tests

# Angular CLI
ng generate component <name> # Generate new component
ng generate --help           # See all available schematics
```

## Key Features and Patterns

### Local Storage Integration

The application extensively uses localStorage to persist user preferences:
- Dark mode settings
- Tile color and transparency settings
- Region name styles
- Background image preferences
- Individual tile settings

When working with localStorage:
- Use descriptive constant keys defined in the component
- Always handle cases where localStorage might be unavailable
- Parse JSON carefully with error handling

### Signal-Based State Management

The project uses Angular signals for reactive state:
```typescript
protected readonly title = signal('My Pokédex')
protected readonly darkMode = signal<boolean>(false)
```

When adding new state:
- Use signals for reactive values
- Use `protected readonly` for component state
- Prefer signals over traditional properties for values that trigger UI updates

### Material Design Integration

Angular Material is integrated through a custom MaterialModule:
- Import MaterialModule in standalone components
- Use Material components for UI elements (buttons, side panels, expansion panels, etc.)
- Follow Material Design guidelines for UX patterns

### Environment Configuration

Two environments are configured:
- `environment.development.ts` - Local development (uses localhost)
- `environment.ts` - Production (uses deployed server URLs)

When adding environment-specific configuration:
- Update both environment files
- Use `environment.apiUrl` or similar patterns
- Ensure builds select the correct environment via angular.json

## When Making Changes

### Adding New Features

1. **Check existing patterns** - Look at how similar features are implemented
2. **Use signals** - For any reactive state
3. **Update localStorage** - If the feature needs persistence
4. **Follow Material Design** - For UI components
5. **Maintain accessibility** - Ensure proper ARIA attributes and keyboard navigation
6. **Test responsiveness** - Verify the feature works on different screen sizes

### Modifying Existing Code

1. **Preserve existing patterns** - Don't mix paradigms (e.g., don't replace signals with observables)
2. **Maintain version history** - Update the History section in README.md for significant changes
3. **Keep settings synchronized** - When changing settings, ensure all related controls update
4. **Test localStorage persistence** - Verify settings persist across page reloads

### Dependencies

- **Avoid unnecessary dependencies** - Use existing libraries when possible
- **Check Material compatibility** - Ensure new Material components are compatible with v21
- **Verify Angular version** - All Angular packages should match version 21.x
- **Review package.json** - Use the exact versions specified in package.json

### Testing

- Write tests using Vitest
- Follow Angular testing best practices
- Test component behavior, not implementation details
- Mock localStorage for tests that use persistent settings

## Common Pitfalls to Avoid

1. **Don't use double quotes** - The project uses single quotes consistently
2. **Don't skip type annotations** - TypeScript strict mode requires explicit types
3. **Don't use traditional class properties for reactive state** - Use signals instead
4. **Don't ignore the change detection strategy** - Components use OnPush, so ensure proper signal updates
5. **Don't mix module-based and standalone patterns** - This project is fully standalone
6. **Don't bypass EditorConfig settings** - Respect the 2-space indentation and other rules

## Build and Bundle Size

The project has strict bundle size limits:
- **Initial bundle**: Maximum 1MB (warning at 900kB)
- **Component styles**: Maximum 8kB (warning at 4kB)

When adding features:
- Be mindful of bundle size
- Lazy load heavy dependencies if possible
- Use tree-shakeable imports
- Review build output for size increases

## Accessibility

- Maintain semantic HTML structure
- Ensure keyboard navigation works for all interactive elements
- Provide appropriate ARIA labels for screen readers
- Test with high contrast modes
- Ensure sufficient color contrast ratios

## Documentation

When making significant changes:
- Update the README.md History section with a new version entry
- Document the changes clearly
- Include the version number following the existing pattern (x.y.z)
- Explain the purpose and impact of changes

## Additional Notes

- The application manages three different Pokédex application links (tiles)
- Background images are themed by Pokémon regions
- Settings can be controlled globally or per-tile
- The side panel provides extensive customization options
- Dark mode affects the entire application and is persisted
