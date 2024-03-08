<h1 align="center"><strong>Digital Tasks Board</strong></h1>

## Project Overview

- MERN MVC

## Services provided:

- Good note-taking system/mind mapping system.
- Quantifiable weekly performance tracking.
- Statistics dashboard that has weeks stamped with a note about overall emotional/mental state during that period.

## The database schemas:

- User

  - id
  - username
  - first name
  - last name
  - email
  - passwordhash
  - isVerified
  - verificationToken
  - [ Cycles ]

- Cycle

  - [ Tasks ]
  - start date
  - deadline (optional)

- Task

  - Cycle id
  - title
  - description
  - priority
  - progress

## Autosave system

cluegi

## Views

- signin/signup
- cycle management
- cycle statistics
- settings

## Tasks

- [ ] design context menu system
- [ ] design modular flickering of divs on validation error.
- [ ] implement recurring tasks feature
- [ ] figure out an accent color (probably orange)
- [ ] set a small horizontal bar that differentiates tasks based on priority (they should be sorted).
- [ ] rich markdown text editor for notes component that behaves like discord text form parsing.
- [ ] configure shadcn and use it for all complex components

### Yapping

- should use radix library for context menu and dialogs and alerts most likely
  - task context menu https://www.radix-ui.com/primitives/docs/components/context-menu
- task list should view the tasks, and sort them
- add feature to make checkboxes in description of tasks
- indcator for end of debounce and successful api request
- description looks like it could be edited (looks like text area)!!!
- show completion of each task as a number!!!!!
- everything looks clickable in task card because theres no indicator to whtas clickable and whats not!!
- priority isnt visible in the ui of the task !!!
- add task is not intuitively accessible
- add some sort of explanation or something to show what the app is about in the home no board window
- add tooltip for all navbar items
- pre tag does not break at all if there are no new lines !!!
- home page should not immediately load last unarchived role, add possiblity to load archived roles even if theres unarchived one !!!! 