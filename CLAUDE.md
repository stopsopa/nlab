# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**nlab** is a utility library for Node.js providing reusable helper functions for common tasks including async operations (promises, delays, parallel execution), data manipulation (get/set/del with dot notation), cryptographic operations (aes256, sha256, xor, md5), HTTP utilities (lightFetch), caching mechanisms, and more.

The library is designed with:
- Simple, focused utility functions exported individually
- TypeScript definitions for all exports
- Minimal dependencies (qs, md5, sjcl, inspc)
- Comprehensive test coverage using Jest and Jasmine

## Development Commands

### Installing Dependencies

The project uses a unique package file swapping mechanism for development:

```bash
# Install development dependencies (uses package.dev.json)
/bin/bash bash/swap-files-v2.sh package.json package.dev.json -- yarn
```

This swaps `package.json` with `package.dev.json` temporarily during installation, which contains development dependencies like Jest, Playwright, Express, etc.

### Running Tests

**Unit Tests (Jest):**

```bash
# Run all unit tests with coverage
/bin/bash jest.sh

# Watch mode - reruns changed tests
/bin/bash jest.sh --watch

# Watch all tests
/bin/bash jest.sh --watchAll

# Run specific test file or directory
/bin/bash jest.sh tests/nlab/delay.unit.js

# Filter tests by name pattern
/bin/bash jest.sh -t 'filter test'

# Skip server setup (faster for library tests)
JEST_JUST_TESTS=true /bin/bash jest.sh
```

Test files follow the pattern `*.unit.js` and are located in the `tests/` directory.

**Jasmine Tests (Browser/Playwright):**

```bash
# Run Jasmine tests in Docker Playwright
NODE_API_PORT=4273 /bin/bash jasmine/test.sh --env .env -- --target docker

# Run specific test file
/bin/bash jasmine/test.sh --env .env --test path/to/test.jasmine.js -- --target docker

# Filter tests with grep
/bin/bash jasmine/test.sh --env .env --filter "grep -i -E 'pattern'" -- --target docker

# Stay running for manual inspection
/bin/bash jasmine/test.sh --env .env --stay
```

Test files follow the pattern `*.jasmine.js` or `*.jasmine.unit.js`. The test runner:
1. Bundles test files using esbuild
2. Launches a Koa server serving project files
3. Runs tests in Playwright browser context
4. Reports results and cleans up

### Code Style

```bash
# Check code formatting
yarn style:check

# Fix code formatting
yarn style:fix

# List files with formatting issues
yarn style:list
```

Uses Prettier with configuration in `prettier.config.cjs`.

## Project Structure

### Core Directories

- **`src/`** - Library source files (57+ utility modules)
  - Each utility is a separate file (e.g., `delay.js`, `promiseall.js`, `lightFetch.js`)
  - TypeScript definitions provided alongside
  - Individual exports via `package.json` exports field

- **`tests/`** - Test files organized by type
  - `tests/nlab/` - Unit tests for utilities (Jest)
  - `tests/jest/` - Jest-specific test utilities
  - `tests/server.js` - Test server for integration tests
  - Test files use `.unit.js` or `.jasmine.js` suffixes

- **`bash/`** - Bash utility scripts
  - `swap-files-v2.sh` - File swapping utility for CI/CD
  - `exportsource.sh` - Environment variable loading
  - `node/` - Node.js helper scripts (coverage badge, port checking)

- **`jasmine/`** - Jasmine test infrastructure
  - `test.sh` - Main test runner script
  - `server_koa.js` - Koa server for browser tests
  - `filename_transformer.js` - Test file bundling helper
  - `var/` - Runtime logs and temporary files

- **`express/`** and **`controller/`** - Express middleware and utilities
  - `extend-res.js` - Response helper extensions
  - `console-logger.js` - Request logging middleware

- **`.github/workflows/`** - CI/CD configuration
  - `tests.yml` - Runs tests on Node 16, 18, 20
  - Publishes to NPM on master branch
  - Deploys coverage to GitHub Pages

### Key Configuration Files

- **`.env`** - Environment variables for test servers
  - `NODE_API_HOST`, `NODE_API_PORT` - Test API server config
  - `CRASH_PORT` - Secondary test server port
  - `JEST_COVERAGE_PORT` - Coverage server port

- **`package.json`** vs **`package.dev.json`**
  - `package.json` - Production dependencies only (published to NPM)
  - `package.dev.json` - Development dependencies (Jest, Playwright, etc.)
  - CI uses `bash/swap-files-v2.sh` to swap files during install

- **`jest.config.js`** - Jest configuration
  - Requires `TYPE=unit` environment variable or test path argument
  - Collects coverage from `src/**/*.{js,jsx}`
  - Uses custom snapshot resolver

- **`tsconfig.json`** - TypeScript configuration for type checking

## Architecture Notes

### Module Export Pattern

The library uses per-file exports via `package.json` exports field:

```json
"exports": {
  "./*.js": {
    "types": "./src/*.d.ts",
    "default": "./src/*.js"
  }
}
```

This allows consumers to import specific utilities:
```javascript
const delay = require('nlab/delay');
import promiseall from 'nlab/promiseall';
```

### Test Infrastructure

**Jest Tests:**
- Run in Node.js environment
- Start test servers on ports defined in `.env`
- Use `--runInBand` to prevent parallel execution conflicts
- Coverage reports generated to `coverage/` directory

**Jasmine Tests:**
- Bundled with esbuild for browser compatibility
- Run in Playwright (Chrome context)
- Useful for testing browser-specific functionality
- Server logs stored in `jasmine/var/`

### CI/CD Flow

1. **Test Job** (runs on Node 16, 18, 20):
   - Restores/saves yarn cache
   - Installs dependencies using `swap-files-v2.sh`
   - Pulls Playwright Docker image (Node 20 only)
   - Runs Jest unit tests
   - Runs Jasmine tests (Node 20 only)
   - Generates coverage badge
   - Uploads artifacts for GitHub Pages

2. **GitHub Pages Job**:
   - Deploys coverage reports and badges

3. **NPM Job** (master branch only):
   - Installs semantic-release
   - Publishes new versions to NPM registry
   - Uses conventional commit messages for versioning

### Environment Variables

**Required for tests:**
- `NODE_API_HOST` - Usually "0.0.0.0"
- `NODE_API_PORT` - Primary test server port (e.g., 4289)
- `CRASH_PORT` - Secondary test server port (e.g., 8087)

**Optional:**
- `JEST_JUST_TESTS=true` - Skip starting test servers (faster for pure unit tests)
- `TYPE=unit` - Specify test type for Jest

### Git Workflow

- Uses Husky for git hooks (commit message linting)
- Commitlint with conventional commits (@commitlint/config-conventional)
- Semantic-release for automated versioning
- Tests must pass before commits via pre-commit hook

## Common Patterns

### Adding New Utilities

1. Create new file in `src/` (e.g., `src/myutil.js`)
2. Add TypeScript definitions (e.g., `src/myutil.d.ts`)
3. Create unit test in `tests/nlab/myutil.unit.js`
4. Update `README.md` with usage examples
5. Exports are automatically handled via wildcard in `package.json`

### Running Tests During Development

```bash
# Fast iteration on pure functions (no server needed)
JEST_JUST_TESTS=true /bin/bash jest.sh --watch

# Full test suite with servers
/bin/bash jest.sh tests/nlab/your-test.unit.js

# Browser-based tests
/bin/bash jasmine/test.sh --env .env --test tests/your-test.jasmine.js -- --target docker
```

### Debugging

- Jest tests: Use `--verbose` flag (default in jest.sh)
- Jasmine tests: Use `--stay` flag to keep server running for manual browser testing
- Server logs: Check `jasmine/var/*.log` for Koa server output
- Test server URLs: Printed to console when servers start

## Documentation

The project documentation lives in:
- `README.md` - Comprehensive usage examples for all utilities
- GitHub Pages: https://stopsopa.github.io/nlab/ (coverage reports)
- JSDoc comments in source files (especially `lightFetch.js`)
