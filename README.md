# Teenage Mutant Ninja Turtles Memory Game

A fast-paced TMNT-themed memory card game built with React and Vite. Players pick a difficulty, flip through randomly selected trading cards, and try to avoid clicking the same card twice. Animated transitions, toast notifications, and a responsive layout keep the experience smooth on desktop and mobile.

## Gameplay
- Choose a difficulty (Easy, Medium, Hard) from the home screen to set the number of cards per round and total unique cards required to win.
- Unique TMNT cards are fetched on load from the public Scryfall API (`set:tmt`) and shuffled for each session.
- Tap a card to reveal it; if you pick a card twice, the game ends. Survive until all unique cards are clicked to win.
- Scores update in real time with persistent best-score tracking for the current session.
- A help toggle reminds you of the rules, and clicking the logo jumps back to the home screen.

## Features
- **Dynamic data:** Pulls live Teenage Mutant Ninja Turtles cards from the Scryfall API for every session.
- **Multiple difficulty levels:** Adjusts grid size and required rounds for Easy, Medium, and Hard.
- **Card interactions:** 3D tilt and flip animations, round reshuffling, and hover effects for an arcade feel.
- **Game states:** Modal for win/lose outcomes with restart control and best-score tracking.
- **Feedback:** Toast messaging for API errors and animated help overlay in the footer.
- **Responsive design:** Scales card grid, layout, and typography for mobile and desktop screens.

## Tech Stack
- **Framework:** React 19 + Vite
- **Animations:** Framer Motion, react-parallax-tilt
- **Icons:** react-icons
- **Styling:** CSS modules in `src/App.css` and global tokens in `src/index.css`
- **Data:** Scryfall REST API (`https://api.scryfall.com/cards/search?q=set:tmt&unique=cards`)

## Project Structure
- `src/App.jsx` – Entry experience that fetches cards, routes between home and game views, and controls toast notifications.
- `src/components/Home/` – Home screen with difficulty selection and hero artwork.
- `src/components/Game/` – Core gameplay loop, score tracking, win/lose detection, and card grid rendering.
- `src/components/GameOver.jsx` – Modal overlay for end-of-game messaging and restart control.
- `src/components/Toast.jsx` – Timed toast component for transient feedback.
- `src/components/Footer.jsx` – Floating help toggle; click to show rules or close the tip.
- `src/utils/shuffle.js` – Helper for randomizing card collections per round and per game.
- `src/assets/` – TMNT artwork used for the title, cards, and result screens.

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the development server**
   ```bash
   npm run dev
   ```
   Vite will output a local URL (default: `http://localhost:5173`).
3. **Build for production**
   ```bash
   npm run build
   ```
4. **Preview the production build**
   ```bash
   npm run preview
   ```

## Gameplay Notes
- Card data is fetched at startup; if the network call fails, a toast prompts you to retry.
- The game shuffles the full card pool for each session, then randomizes the subset shown every round to keep players guessing.
- Clicking the logo resets to the home screen without a full page reload.

## License
This project uses public TMNT card data sourced from Scryfall under its API terms; ensure compliance with Scryfall’s usage guidelines for any deployments.