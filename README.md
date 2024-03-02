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

## Views

- signin/signup
- cycle management
- cycle statistics
- settings

## Tasks

- [ ] design modular modal logic
- [ ] design custom alert system
- [ ] design modular flickering of divs on validation error.
- [ ] find extremely modular way of doing debounce
- [ ] design good cycle management system (deletion, update, mounting for view demounting etc)
- [ ] implement recurring tasks feature
- [ ] figure out an accent color (probably orange)
- [ ] set a small horizontal bar that differentiates tasks based on priority (they should be sorted).
- [ ] rich markdown text editor for notes component that behaves like discord text form parsing.
