/**
 * Commitlint configuration to enforce conventional commit messages.
 *
 * - Extends the `@commitlint/config-conventional` rules.
 * - Customizes commit message validation rules.
 * - Ensures structured and meaningful commit history.
 *
 * @see https://commitlint.js.org/
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    /**
     * Enforces allowed commit types.
     *
     * - Level 2 (error) ensures strict enforcement.
     * - "always" means the rule is always applied.
     * - Allowed types:
     *   - `feat`      → A new feature
     *   - `fix`       → A bug fix
     *   - `docs`      → Documentation changes
     *   - `style`     → Code style changes (formatting, missing semicolons, etc.)
     *   - `refactor`  → Code changes that neither fix a bug nor add a feature
     *   - `test`      → Adding or updating tests
     *   - `chore`     → Maintenance tasks (e.g., dependency updates)
     *   - `perf`      → Performance improvements
     *   - `ci`        → CI/CD pipeline changes
     *   - `build`     → Changes to build system or external dependencies
     *   - `revert`    → Reverts a previous commit
     */
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "test",
        "chore",
        "perf",
        "ci",
        "build",
        "revert",
      ],
    ],

    /**
     * Enforces a maximum commit subject length.
     *
     * - Ensures readability and concise commit messages.
     */
    "header-max-length": [2, "always", 72],

    /**
     * Enforces a blank line before the commit body.
     *
     * - Enhances commit readability.
     */
    "body-leading-blank": [2, "always"],

    /**
     * Enforces a blank line before the commit footer.
     *
     * - Maintains commit message structure.
     */
    "footer-leading-blank": [2, "always"],

    /**
     * Enforces lowercase subject.
     *
     * - Improves consistency.
     */
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case"],
    ],

    /**
     * Enforces that the commit subject does not end with a period.
     */
    "subject-full-stop": [2, "never", "."],

    /**
     * Enforces a capitalized commit type.
     *
     * - Example: `Feat: Add new feature`
     */
    "type-case": [2, "always", "lower-case"],

    /**
     * Enforces a minimum commit body length.
     *
     * - Helps ensure meaningful commit messages.
     */
    "body-min-length": [2, "always", 20],
  },
};
