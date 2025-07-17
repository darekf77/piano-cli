#  piano-cli



## Presentation about project
link 
https://pianodrive-my.sharepoint.com/:p:/g/personal/dariusz_filipiak_piano_io/ETGPxbpCJEFPq7OToEZ503YBeVcSjArgc61z_-QcFmuyJw?e=XpQm62

## QUICK INSTALLATION in 10 seconds
```bash 
npm run link:latest
# each 'git pull origin master' on piano-cli repository
# does an update to your cli main file 
# local_release/npm-lib-and-cli-tool/piano-cli-latest/cli.js
# (and you don't need to rebuild it or do anything)
```

## CLI Development guide
Install taon:
```bash
npm i -g taon
```

Build and link project:
```bash
taon link       # link globally your project (not local_release version)

taon build      # build of project
# or
taon build:watch      # watch build of project
# or
taon bw      # short version of 'taon build:watch'
```

If you use **linux** for development - for `taon build:watch` to work -> **increase watchers**:
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

If you need to update node_modules from  **piano-cli/node_modules** use:
```bash
taon sync
```

# Available commands

## Handy shortcuts

`piano soft`  => `git reset --soft HEAD~1`

`piano hosts`  => open hosts files in VSCode

`piano count:commits`  => show origin of project

`piano remove:submodules`  => remove all submodules from repo

`piano remove:submodule my-not-wanted-git-submodules`  => remove submodule by folder name

`piano remove:tag git-tag-name-optionally` => remove git tag (if not provided name - select menu appears)

`piano last:tag` => display info aboutlast tag

## Remotes

`piano origin`  => show origin of project

`piano remote`  => `piano origin` 

`piano origins`  => show all origins of project

`piano remotes`  => `piano origins`

`piano rename:origin http://my-new-origin`  => replaces default origin new provided

`piano set:origin http://my-new-origin`  => alias to rename:origin

`piano set:remote:ssh`  => changes http remote to ssh remote

`piano set:remote:http`  => changes ssh remote to https remote

## Rebase 

`piano rebase`  => rebase current branch with default branch

`piano rebase branch-to-rebase`  => rebase current branch with changes from branch-to-rebase

## Stash

`piano stash`  => stash only staged files

`piano stashall`  => stash all files

## Reset + change branch

`piano branch`  => git fetch / display menu with branches to select / select branch

`piano reset`  => `git fetch` + remove tmp files for project + `piano branch` (include children)

`piano reset my-branch`  => same as `piano reset` but specific branch

`piano reset`  => reset hard and pull (recrusively)

## Pull

`piano pull`  => pull current branch or current workspace projects one after another

`piano repull`  => `git reset hard --HEAD~10` + `piano pull`


## Push

`piano pushall` => push code to all remotes(origins) defined in .git/config

`piano pall` => `piano pushall`

`piano push`  => (optionally git add +)  commit with message based on branch name + push current branch

## Smart Conventional Commits Branching

**Checkout branch + add changes + commit message + push branch**

Create special branches (with metadata inside name) that can be use later with command
`piano push`<br> to "re-push" changes and use matadata from branch name 
 as commit message.

### fix
Quick commit and push bugfix<br>
`piano pfix JIRA-379089 JIRA-380320 proper counter message [my-lib]` <br> 
<=><br>
`git checkout -b bugfix/JIRA-379089-JIRA-380320--my-lib--proper-counter-message` + <br>
`git add` + <br>
`git commit -m "fix(my-lib): proper counter message JIRA-379089 JIRA-380320"` + <br>
`git push origin bugfix/JIRA-379089-JIRA-380320--my-lib--proper-counter-message`

piano pfix <=> piano pushfix <=> piano push:fix

### feature
Quick commit and push feature<br>
`piano pf JIRA-379089 JIRA-380320 admin notification [my-lib]`  <br>
<>=><br>
`git checkout -b feature/JIRA-379089-JIRA-380320--my-lib--admin-notification` + <br>
`git add` + <br>
`git commit -m "feat(my-lib): admin notification JIRA-379089 JIRA-380320"` + <br>
`git push origin feature/JIRA-379089-JIRA-380320--my-lib--admin-notification`

piano pf <=> piano pushfeature <=> piano push:feature

### chore
Quick commit and push chore <br>
`piano pc JIRA-379089 update deps`  
<=>  <br>
`git checkout -b chore/JIRA-379089-update-deps` + <br>
`git add` + <br>
`git commit -m "chore: update deps JIRA-379089"` + <br>
`git push origin  chore/JIRA-379089-update-deps`

piano pc <=> piano chore <=> piano pchore

### docs
Quick commit and push docs update <br>
`piano pd explained installation`<br>
 <=> <br>
`git checkout -b docs/explained-installation` + <br>
`git add` + <br>
`git commit -m "docs:explained installation"` + <br>
`git push origin docs/explained-installation`

piano pd <=> piano pdocs

### test
Quick commit and push tests update <br>
`piano ptest admin permission new use case`<br>
 <=> <br>
`git checkout -b test/admin-permission-new-use-case` + <br>
`git add` + <br>
`git commit -m "test: admin permission new use case"` + <br>
`git push origin test/admin-permission-new-use-case`

piano push:test <=> piano ptest  <=> piano ptests

### styl

Quick commit and push style update (formatting, linting etc.) <br>
`piano pstyle proper project methods`<br>
 <=> <br>
`git checkout -b style/proper-project-methods` + <br>
`git add` + <br>
`git commit -m "style: proper project methods"` + <br>
`git push origin style/proper-project-methods`

piano pstyl <=> piano pstyle

### refactor

Quick commit and push code refactor <br>
`piano pref new permission module`<br>
 <=> <br>
`git checkout -b refactor/new-permission-module` + <br>
`git add` + <br>
`git commit -m "refactor: new permission module"` + <br>
`git push origin refactor/new-permission-module`


piano pref <=> piano prefactor

### release

Quick commit and push release commit <br>
`piano prelease`<br>
 <=> <br>
`git checkout -b release/version-v1-2-3` + <br>
`git add` + <br>
`git commit -m "release: version v1.2.3"` + <br>
`git push origin release/version-1-2-3`

piano prel <=> piano prelase
