# Testing Guide — T-Cube Landing Page

This document owns testing standards, automated check gates, and manual user interface verification instructions.

---

## 🤖 Automated Checks

All code must pass automated checks before compiling or deploying. Running `just verify` executes the full check suite:

1. **Code Formatting:** Prettier ensures consistent spacing, line endings, and syntax layout.
   ```bash
   pnpm prettier --check src index.html
   ```
2. **TypeScript Compilation:** Checks for type safety, strict null errors, and import references.
   ```bash
   pnpm tsc --noEmit
   ```
3. **Static Linting:** ESLint evaluates structural code hygiene, potential promise misuses, and style rules.
   ```bash
   pnpm eslint src --max-warnings 0
   ```

---

## 📦 Build Verification

Ensure the production bundle can compile cleanly and fits within our performance budget target size limits:
```bash
just build
```

| Asset | Target Size (Gzipped) |
|---|---|
| JavaScript Bundle | < 30 KB |
| CSS Stylesheet | < 20 KB |

You can run `just preview` after compiling to test the production bundle locally.

---

## ♿ Manual Accessibility & UX Verification

Since the landing page relies on client-side JS rendering, verify the following interactions:

### 1. Keyboard Navigation
- Open the page and press `Tab`. The "Skip to content" link must display as the first focusable element.
- Tab through the CTA buttons and input fields. Every element must have a visible ring border.

### 2. Motion Reduction
- Set your system preferences to "Reduce Motion".
- Reload the page. All sections must display immediately without fade-up animations.

### 3. Screen Scaling
- Verify layout structures at `320px` viewport widths (narrow mobile screens) and standard desktop widths.
- Fluid typography (`display-hero` and `display-h2` headers) must scale dynamically without overlapping parent boundaries.
