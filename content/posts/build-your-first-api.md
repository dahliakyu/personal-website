---
date: 2025-04-10
title: "Build Your First API"
summary: "Step-by-step tutorial: create a simple REST API from scratch using Node.js and TypeScript."
categories:
  - Tutorials
image: placeholder.png
---

## What You'll Build

A minimal REST API with a single endpoint that returns a list of items.

## Step 1 — Init the project

```bash
mkdir my-api && cd my-api
npm init -y
npm install typescript ts-node express
```

## Step 2 — Create the server

```typescript
import express from 'express'

const app = express()

app.get('/items', (req, res) => {
  res.json([{ id: 1, name: 'Item One' }])
})

app.listen(3000, () => console.log('Running on port 3000'))
```

## Step 3 — Run it

```bash
npx ts-node server.ts
```

Visit `http://localhost:3000/items` to see your API in action.
