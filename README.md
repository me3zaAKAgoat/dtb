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

- [ ] design modular modal logic
  - [ ] there should be a modal context provider at the highest order component that selectively loads different forms that all adhere to the same styling but mount different forms and information.
  - Different types of forms:
  - cycle creation form
  - cycle ending form
  - cycle new task form
  - settings form
- [ ] design custom alert system
- [ ] design base button
- [ ] design base input
- [ ] design base text area
- [ ] design context menu system
- [ ] design modular flickering of divs on validation error.
- [ ] find extremely modular way of doing debounce
- [ ] design good cycle management system (deletion, update, mounting for view demounting etc)
- [ ] implement recurring tasks feature
- [ ] figure out an accent color (probably orange)
- [ ] set a small horizontal bar that differentiates tasks based on priority (they should be sorted).
- [ ] rich markdown text editor for notes component that behaves like discord text form parsing.
- [ ] configure shadcn and use it for all complex components

### Redundant tasks

- [ ] write a settings page
- [ ] write task expandable card

### Yapping

- a homepage should be rendered when first entering the app that renders the latest unarchived cycle, if not it should prompt you to create a new cycle, open an old one or move to dashboard tab
- should use radix library for context menu and dialogs and alerts most likely
- modal system should be :
  - a component called modal renders all the logic of animation click outside ot exit
  - on top of this component we conditionally render different preset of modals that do different api calls, these modals may need additional props passed to them!
- tasks should be at board level
- task list should view the tasks, and sort them
- modal state should be at highest order component and should be pe passed to children via context provider
