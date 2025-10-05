### Git Flow

This document is a summary of the usage of the Git Flow workflow in this project.

#### Feature Branches

Each new feature should reside in its own branch where the parent is `develop` (and not `main`). Features should never interact directly with `main`.

Feature branches are generally created off the latest `develop` branch.

**Example**: Creating a feature branch, committing, pushing, and creating a Pull Request:
```sh
git checkout -b feature-add-companies develop
# Make your changes and commit
git add .
git commit -m "Add companies feature"
# Push the branch to the remote repository
git push origin feature-add-companies
```

On GitHub, create a Pull Request for `feature-add-companies` into `develop` and wait for a review.

#### Release Branches

When a new release is approaching, create a release branch from `develop` directly on GitHub. This branch starts the next release cycle, so no new features can be added after this point. Only bug fixes, documentation generation, version changes, and other release-oriented tasks are allowed.

**Example**: Creating a release branch on GitHub:
1. Go to the repository on GitHub.
2. Select the `develop` branch.
3. Click "New branch" and name it `release-1.2.0`.

Once it's finally ready, the release branch must be merged into `main` and tagged with a version number. It must also be merged back into `develop` since it may have some bug fixes since the release was initiated.

**Example**: Merging a release branch on GitHub:
1. Create a Pull Request to merge `release-1.2.0` into `main` and merge it.
2. Tag the `main` branch with the new version number (e.g., `v1.2.0`).
3. Create another Pull Request to merge `release-1.2.0` into `develop` and merge it.

#### Issues

For each issue, create a branch from `develop`, commit your changes, and push it to the repository. Then, create a Pull Request on GitHub and merge it after review.

**Example**: Creating an issue branch, committing, pushing, and creating a Pull Request:
```sh
git checkout -b 1440-fix-appointment-stats develop
# Make your changes and commit
git add .
git commit -m "Fix appointment stats"
# Push the branch to the remote repository
git push origin 1440-fix-appointment-stats
```

On GitHub, create a Pull Request for `1440-fix-appointment-stats` into `develop` and merge it after the review.