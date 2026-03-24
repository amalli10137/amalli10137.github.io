@AGENTS.md

# Workflow

- **Always pull before starting work:** `git pull origin main`
- **After completing a feature:** commit the changes and push to origin (`git push origin main`)
- The deploy workflow triggers automatically on push to main — GitHub Actions builds and deploys to GitHub Pages
- The `dynamic-site` branch has the old admin-panel version of the blog — keep it around but don't merge into main
