# AGENTS.md

## Project

KinoFlow is a frontend application built with React, TypeScript, and Vite.

## Core workflow

Default workflow for non-trivial tasks:

1. Plan
2. Implement
3. Review

Do not skip planning for multi-file or architecture-sensitive tasks.
Do not skip review after code changes.

## Source of truth

For project-specific questions, prefer project documentation and RAG knowledge before making assumptions.

Use:

- README and project docs
- architecture docs
- routing docs
- API patterns
- frontend style guide
- review checklist

## Change policy

Prefer minimal, local changes.
Do not introduce large refactors unless explicitly requested.
Preserve existing conventions and structure.

## Engineering rules

- Follow existing React + TypeScript + Vite patterns.
- Keep components readable and focused.
- Avoid unnecessary abstraction.
- Respect routing and API conventions.
- Keep naming consistent with the codebase.

## Validation

Before finishing:

- explain what changed
- explain why it changed
- mention affected files
- mention risks or follow-ups
