---
applyTo: '**/*.md'
description: 'Markdown Instructions'
---
Apply these instructions when editing Markdown files.

- Use markdown headings consistently
- Include code examples when applicable
- Prefer concise explanations
- Avoid marketing language
- Use numbered lists for procedures and bullet points for general information
- Use links to reference related documentation or code when helpful
- Ensure formatting is correct for readability (e.g., code blocks, lists, etc.)

## Markdown Files
The following markdown files need to be maintained with each update to the project. If one change is made to these files,
it is likely that it might need to be updated in a corresponding file.
For example, the AGENTS.md and CLAUDE.md files should mostly be exactly the same, except for the specific agent information.
If one of these files is updated, the other should be reviewed to ensure consistency.
Another change that is ALWAYS necessary is to update the version in the README.md file. The version is found in the pom.xml file.

- ./README.md: The main documentation for the project, including an overview, setup instructions, usage examples, and contribution guidelines.
- ./AGENTS.md: Documentation for the agents used in the project, including their purpose and how to interact with them.
- ./CLAUDE.md: Documentation for the Claude agent, including its capabilities and how to use it effectively.
- ./.github/instructions/build.instructions.md: Build instructions for the project.
- ./.github/instructions/css.instructions.md: Guidelines for editing CSS files in the project.
- ./.github/instructions/html.instructions.md: Guidelines for editing HTML files in the project.
- ./.github/instructions/markdown.instructions.md: Guidelines for editing Markdown files in the project. (This file)
- ./.github/instructions/spec.instructions.md: Guidelines for writing specifications and documentation for the project.
- ./.github/instructions/typescript.instructions.md: Coding standards and guidelines for TypeScript code in this project.
- ./.github/copilot-instructions.md: Coding standards and guidelines for using GitHub Copilot effectively in this project.
- ./.github/git-commit-instructions.md: Guidelines for writing clear and informative git commit messages for this project.