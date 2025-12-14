Review the UI design of pages at $ARGUMENTS using Playwright MCP.

## Steps

1. Start the dev server if not running (`npm run dev`)
2. For each page URL provided (or all main pages if none specified):
   - Navigate to the page
   - Take a screenshot in light mode
   - Switch to dark mode
   - Take a screenshot in dark mode
   - Evaluate computed styles for contrast issues

3. Check against these Design Principles from CLAUDE.md:
   - Text contrast: Ensure text has sufficient contrast with backgrounds in BOTH themes
   - Theme adaptation: Verify semantic colors like `text-base-content` are used (not fixed colors)
   - Opacity patterns: Flag any `opacity-70/80/90` on text elements
   - Hero sections: Verify text is white on dark overlays, theme-responsive otherwise
   - Information hierarchy: Important content should be prominent

4. Report findings with:
   - Screenshot comparisons
   - Specific elements with contrast issues
   - Recommended fixes using DaisyUI semantic colors

## Usage
- `/review-ui` - Review all main pages
- `/review-ui http://localhost:4321/about` - Review specific page

## Main Pages to Review (when no arguments provided)
- http://localhost:4321/ (Home)
- http://localhost:4321/about
- http://localhost:4321/events
- http://localhost:4321/contact
- http://localhost:4321/study
- http://localhost:4321/devotional
