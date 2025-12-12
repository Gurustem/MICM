# Manual Pre-Push Checks - Step-by-Step Guide

This guide walks you through the three essential checks before pushing your code to GitHub.

---

## ✅ Check 1: Test Locally (`npm run dev`)

### What This Does
Starts a local development server so you can see your changes in the browser before deploying.

### Step-by-Step:

1. **Open Terminal in Cursor**
   - Press `` Ctrl+` `` (backtick) to open integrated terminal
   - Or go to: `Terminal` → `New Terminal`

2. **Run the dev server**
   ```bash
   npm run dev
   ```

3. **What You'll See**
   ```
   VITE v5.x.x  ready in xxx ms

   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ```

4. **Test Your Changes**
   - Open http://localhost:5173 in your browser
   - Navigate through your app
   - Test the features you just changed
   - Look for:
     - ✅ Pages load correctly
     - ✅ Buttons work
     - ✅ Forms submit properly
     - ✅ No console errors (press F12 → Console tab)
     - ✅ No visual glitches

5. **Stop the Server**
   - Press `Ctrl+C` in the terminal when done testing

### 🎯 What to Look For
- ✅ Everything works as expected
- ✅ No broken links or missing pages
- ✅ No JavaScript errors in browser console
- ✅ UI looks correct on different screen sizes

---

## ✅ Check 2: Build Check (`npm run build`)

### What This Does
Simulates the production build that Vercel will run. Catches TypeScript errors, missing imports, and build issues.

### Step-by-Step:

1. **In the same terminal** (or open a new one)

2. **Run the build command**
   ```bash
   npm run build
   ```

3. **What You'll See (Success)**
   ```
   > micm-lms@1.0.0 build
   > tsc && vite build

   vite v5.x.x building for production...
   ✓ 2798 modules transformed.
   dist/index.html                   0.90 kB
   dist/assets/index-xxx.css         24.15 kB
   dist/assets/index-xxx.js         788.29 kB
   ✓ built in 49.58s
   ```

4. **If You See Errors**
   ```
   error TS6133: 'variable' is declared but never used.
   error TS2307: Cannot find module 'xyz'.
   ```
   - **Fix these errors** before pushing
   - Common fixes:
     - Remove unused imports/variables
     - Fix import paths
     - Add missing dependencies

5. **Success = Ready to Push!**
   - If build completes without errors, you're good to go!

### 🎯 What to Look For
- ✅ Build completes successfully
- ✅ No TypeScript errors
- ✅ No missing module errors
- ✅ No syntax errors

---

## ✅ Check 3: Review in Cursor (`Ctrl+Shift+G`)

### What This Does
Shows you exactly what files will be committed. Prevents committing unwanted files or sensitive data.

### Step-by-Step:

1. **Open Source Control Panel**
   - Press `Ctrl+Shift+G`
   - Or click the Git icon in the left sidebar (looks like a branch symbol)

2. **Review Changed Files**
   - Files with changes appear in the "Changes" section
   - Green "M" = Modified file
   - Green "U" = Untracked (new) file
   - Red "D" = Deleted file

3. **Review Each File**
   - Click on a file name to see the diff (what changed)
   - Green lines = additions
   - Red lines = deletions
   - Check that:
     - ✅ You intended to change these files
     - ✅ No debug code (`console.log`, `debugger`)
     - ✅ No commented-out code
     - ✅ No sensitive data (passwords, API keys)

4. **Stage Files to Commit**
   - Click the "+" icon next to files you want to commit
   - Or click "+" next to "Changes" to stage all files
   - Staged files move to "Staged Changes"

5. **Unstage Files You Don't Want**
   - Click the "-" icon to unstage a file
   - Files you don't want to commit should stay unstaged

6. **Check Staged Changes**
   - Only files in "Staged Changes" will be committed
   - Make sure this is what you want to push!

### 🎯 What to Look For
- ✅ Only intended files are staged
- ✅ No temporary files (`.tmp`, `.log`, `.bak`)
- ✅ No node_modules or dist folders
- ✅ No sensitive information
- ✅ No debug/console code

---

## 🚀 Complete Workflow Example

Here's how a typical session looks:

```bash
# 1. Make your changes in Cursor
# (Edit files, add features, fix bugs)

# 2. Test locally
npm run dev
# → Open browser, test changes
# → Press Ctrl+C to stop

# 3. Build check
npm run build
# → Wait for "✓ built successfully"
# → If errors, fix them and repeat

# 4. Review in Cursor
# → Press Ctrl+Shift+G
# → Review changes
# → Stage only what you want

# 5. Commit and push
git commit -m "Your message"
git push origin main
```

---

## 🐛 Common Issues & Solutions

### Issue: `npm run dev` doesn't start
**Solution**: Make sure you're in the project directory
```bash
cd C:\Users\tekzo\OneDrive\Desktop\MICM
npm run dev
```

### Issue: Build fails with TypeScript errors
**Solution**: Fix the errors shown, common ones:
- Unused variables → Remove them
- Missing imports → Add them
- Type errors → Fix the types

### Issue: Can't see Source Control panel
**Solution**: 
- Make sure you're in a git repository
- Try `Ctrl+Shift+G` again
- Check if Git is installed: `git --version`

### Issue: Too many files in "Changes"
**Solution**: 
- Check `.gitignore` is working
- Don't stage `node_modules`, `dist`, or `.env` files
- Only stage files you actually changed

---

## 💡 Pro Tips

1. **Test frequently**: Don't wait until the end to test
2. **Small commits**: Commit after each feature/fix, not everything at once
3. **Clear messages**: Write descriptive commit messages
4. **Check console**: Always check browser console for errors
5. **Build before push**: Never skip the build check!

---

## 📝 Quick Reference Card

```
┌─────────────────────────────────────────┐
│  PRE-PUSH CHECKLIST                    │
├─────────────────────────────────────────┤
│  ☐ npm run dev → Test in browser       │
│  ☐ npm run build → Check for errors    │
│  ☐ Ctrl+Shift+G → Review changes       │
│  ☐ Stage only intended files           │
│  ☐ Write clear commit message          │
│  ☐ git push origin main                │
└─────────────────────────────────────────┘
```

---

**Remember**: These checks prevent broken deployments and save time! 🎯

