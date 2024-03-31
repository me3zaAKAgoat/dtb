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
- make a custom confirm function that when called triggers a state somehow and returns either true or false
- add first name and last name change in settings
- add ability to edit cycle start or end
- add congratulations visualizers and dopamine pushes

### Yapping

- should use radix library for context menu and dialogs and alerts most likely
  - task context menu https://www.radix-ui.com/primitives/docs/components/context-menu
- add feature to make checkboxes in description of tasks
- indcator for end of debounce and successful api request
- home page should not immediately load last unarchived role, add possiblity to load archived roles even if theres unarchived one !!!!
- use ICONS MORE for better ux !!!
- improve settings layout
- fix insane number of api calls
- figure out a good way to do logging
- fix envs for contirbutors
- make wesbite inaccesisble from phone
- unify the css for buttons
- handle uncaught execptions that would block the app such failed mail sending
- validate uploaded pictures mroe
- trim inputs
- write jest tests
- write husky pre commit hooks
- daisy ui navbar hover dialog bug
- implement github/google OAUTH to make it easier for users to opt in to the app
