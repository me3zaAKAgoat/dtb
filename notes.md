<h1 align="center"><strong>Digital Tasks Board</strong></h1>

## Project Overview

- MERN MVC

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

- design context menu system
- design modular flickering of divs on validation error.
- implement recurring tasks feature
- figure out an accent color (probably orange)
- set a small horizontal bar that differentiates tasks based on priority (they should be sorted).
- rich markdown text editor for notes component that behaves like discord text form parsing.
- configure shadcn and use it for all complex components
- add congratulations visualizers and dopamine pushes
- make a custom confirm function that when called triggered a state somehow and returns either true or false
- add first name and last name change in settings
- add ability to edit cycle start or end
- add cycle time left
- styling of completion on firefox does not have a border radius!!

### Yapping

- should use radix library for context menu and dialogs and alerts most likely
  - task context menu https://www.radix-ui.com/primitives/docs/components/context-menu
- add feature to make checkboxes in description of tasks
- indcator for end of debounce and successful api request
- show completion of each task as a number!!!!!
- everything looks clickable in task card because theres no indicator to whtas clickable and whats not!!
- priority isnt visible in the ui of the task !!!
- add some sort of explanation or something to show what the app is about in the home no board window
- home page should not immediately load last unarchived role, add possiblity to load archived roles even if theres unarchived one !!!!
- make an about modal that has licensing and note from creator (me :))
- make a settings page
- use ICONS MORE for better ux !!!
- improve settings layout
- fix insane number of api calls
- figure out a good way to do logging
- create a workflow for CI/CD
- fix envs for contirbutors
- make wesbite inaccesisble from phone
- unify the css for buttons
- figure out why nan in prod time left
- handle uncaught execptions that would block the app such failed mail sending
- validate big dates
- validate uploaded pictures mroe

## UX

- implement github/google OAUTH to make it easier for users to opt in to the app
