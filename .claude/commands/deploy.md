Deploy changes to the live site.

## Steps

1. Check for uncommitted changes using `git status` and `git diff`
2. If there are no changes, inform the user and stop

3. **Analyze changes and compose commit message**:
   - Review all staged and unstaged changes
   - Compose a clear, descriptive commit message summarizing the changes
   - Present the suggested commit message to the user using AskUserQuestion
   - Allow the user to accept, edit, or provide their own message

4. If user approves:
   - Stage all changes: `git add .`
   - Create the commit with the approved message
   - Push to remote: `git push origin main`

5. Display success message with the deployed site link:
   **Live site**: https://haringeyweb.vercel.app

   Note: Vercel automatically detects the push and rebuilds (takes ~1-2 minutes)

## Usage
- `/deploy` - Analyze changes, suggest commit message, deploy after approval
- `/deploy Fix navigation bug` - Use provided message (skip suggestion step)
