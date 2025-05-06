# Git Cheat Sheet

## 🔹 Configuration
```sh
# Set user name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check configuration
git config --list
```

## 🔹 Repository Setup
```sh
# Initialize a new repo
git init

# Clone an existing repo
git clone <repo_url>
```

## 🔹 Basic Commands
```sh
# Check status
git status

# Add files to staging area
git add <file>  # Add specific file
git add .       # Add all changes

# Commit changes
git commit -m "Your commit message"
```

## 🔹 Branching
```sh
# List branches
git branch

# Create new branch
git branch <branch_name>

# Switch to a branch
git checkout <branch_name>

# Create and switch to new branch
git checkout -b <branch_name>
```

## 🔹 Merging and Rebasing
```sh
# Merge branches
git merge <branch_name>

# Rebase branch
git rebase <branch_name>
```

## 🔹 Remote Repositories
```sh
# Add a remote repo
git remote add origin <repo_url>

# View remote repos
git remote -v

# Push changes
git push origin <branch_name>

# Pull latest changes
git pull origin <branch_name>
```

## 🔹 Undo Changes
```sh
# Unstage a file
git reset <file>

# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

## 🔹 Logs & History
```sh
# View commit history
git log

# View history in one line
git log --oneline --graph --decorate --all

# View last commit changes
git show HEAD
```

## 🔹 Stashing
```sh
# Save uncommitted changes
git stash

# List stashes
git stash list

# Apply last stash
git stash apply

# Apply and remove last stash
git stash pop
```

## 🔹 Tags
```sh
# Create a tag
git tag <tag_name>

# List all tags
git tag

# Push tag to remote
git push origin <tag_name>
```

## 🔹 Aliases
```sh
# Create alias
git config --global alias.st status

git config --global alias.cm "commit -m"

git config --global alias.co checkout
