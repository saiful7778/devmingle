# DevMingle - a online forum

**Live link :** [devmingle-forum.web.app](https://devmingle-forum.web.app)

### Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
   - [Frontend Technologies](#frontend-technologies)
   - [Backend Technologies](#backend-technologies)
4. [Setup and Installation](#setup-and-installation)

## Introduction

DevMingle is a forum website built on the MERN stack where users can share posts, ask questions, and interact with others on topics related to MERN stack technologies. In this project I try my best coding knowladge and I am continuously updating this also I try to maintain the best practices.

## Features

- User registration and authentication using Firebase and JWT
- Forum posts and questions
- Routing with react-router-dom
- API data handling and caching with tenstack query
- Form handling with react-hook-form
- Alert notifications with sweet-alert
- Spam protection with Google reCaptcha
- Payment control with Stripe

## Technologies Used

### Frontend Technologies

- React javascript UI library
- React-route-dom for single page application routing
- Tenstack query for api data caching and handling
- Firebase for only for authentication purpose and hosting
- Axios for handling api request and response
- React-hook-form for handling form data
- Sweet-alert2 for show alert notification in ui and model
- Keep-react react UI component library
- Google reCaptcha for protecting spaming
- Stripe for payment handling system

### Backend Technologies

- Node.js
- Express.js
- Mongodb database
- Mongoose ODM
- Stripe
- Google ReCaptcha
- ES6+ module system
- JWT (json web token)

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn or pnpm or bun

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/saiful7778/devmingle-client.git
   cd devmingle-client
   ```

2. Install dependencies:

   ```bash
   cd ./frontend

   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

   ```bash
   cd ./backend

   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

> **Note:** Here I use `bun` you can any of them

3. Set up environment variables:

   Create `.env` file in the backend folder and add the following variables:

   ```js
   // backend
   ACCESS_TOKEN=
   SITE_SECRET=
   STRIPE_SECRET_KEY=
   DB_CONNECT=
   FRONTEND_URL=
   NODE_ENV=
   ```

   Create `.env` file in the frontend folder and add the following variables:

   ```js
   // fronend
   VITE_APIKEY=
   VITE_AUTHDOMAIN=
   VITE_PROJECTID=
   VITE_STORAGEBUCKET=
   VITE_MESSAGINGSENDERID=
   VITE_APPID=
   VITE_SERVER_URL=
   VITE_SITE_KEY=
   VITE_STRIPE_KEY=
   ```

4. Run the application:

   ```bash
   cd ./backend

   # development run
   npm run dev
   # or
   yarn run dev
   # or
   pnpm run dev
   # or
   bun run dev

   # build
   npm run build
   # or
   yarn run build
   # or
   pnpm run build
   # or
   bun run build

   # production run
   npm run start
   # or
   yarn run start
   # or
   pnpm run start
   # or
   bun run start
   ```

   ```bash
   cd ./frontend

   # development run
   npm run dev
   # or
   yarn run dev
   # or
   pnpm run dev
   # or
   bun run dev

   # build
   npm run build
   # or
   yarn run build
   # or
   pnpm run build
   # or
   bun run build

   # production run
   npm run preview
   # or
   yarn run preview
   # or
   pnpm run preview
   # or
   bun run preview
   ```

5. Deploy the application:

   ```bash
   cd ./backend

   # deploy
   npm run deploy
   # or
   yarn run deploy
   # or
   pnpm run deploy
   # or
   bun run deploy
   ```

   **Note :** Server deployed on vercel

   ```bash
   cd ./frontend

   # deploy
   npm run deploy
   # or
   yarn run deploy
   # or
   pnpm run deploy
   # or
   bun run deploy
   ```

   **Note :** Server deployed on firebase hosting
