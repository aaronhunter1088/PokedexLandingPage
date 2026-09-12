# Pokédex Application - Git Commit Instructions

Generate concise commit messages.

Format:
- <type>/<summary>

Types:
- feature/a_new_feature
- defect/a_bug_fix
- deps/a_dependency_update

Summary:
- A brief description of the change, separated by underscores, in all lowercase characters.

Rules for Summary Line:
- Use the tense (e.g., "add" instead of "added" or vise versa) that best fits the change
- Try to keep it under 72 characters but not mandatory
- Focus on what was changed or introduced and why, rather than how
- Separate each word by an underscore.

Rules for Deps PRs:
- If the PR is only updating dependencies, use the `deps/` type.
- Read the instructions files in the `.github` folder for any inconsistent versions. If the major version is updated,
then the referenced versions there should also be updated.

Examples:
feature/add_hexadecimal_conversion_support
defect/prevent_divide_by_zero_exception
deps/update_dependencies