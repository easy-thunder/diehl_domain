# Multiplayer Card Game - Design & Feature Breakdown

## Authentication & Routing

### Routes
- **Initial Login / Play as Guest**
  - Initiates authentication check before continuing to the game
- **Menu Page**
  - Options:
    - Profile
    - Custom Game
    - Quick Play Game
- **Quick Play Game**
  - Matchmaking with random players
- **Custom Game**
  - Create or join games with friends
- **Profile Page**
  - Edit profile
  - View stats

## Features

### User Features
- **Cookie Validation Permission**
  - Modal asking for permission to save login cookie
- **Parental Permission Validation**
  - Required for:
    - Voice chat in custom games
    - In-game messaging
    - Friends list and game invites

### Game Configuration

#### Custom Game
- Can be marked as:
  - Public (listed in custom games)
  - Private (not listed)
- Settings:
  - Voice chat enabled/disabled
  - Shot clock: 3–20 seconds per action
  - Points to win: 10–100
  - Max players: configurable
- Lobby:
  - One host controls game setup
  - Host can start game or kick players
  - Future: deck selection by host

#### Quick Play Game
- Settings:
  - Shot clock: 3s, 5s, or 10s 20s
  - Points to win: 10, 20, or 30
- Lobby:
  - Random player matchmaking
  - Game starts when all players are ready
  - Player may join recently ended game lobbies

### Game Features

#### Game Setup
- 2–6 players
- Three decks shuffled and placed in the center
- Each player draws 2 cards from each deck
- Clockwise turn order starting with Player 1
- Each player starts with 3 negates

#### Gameplay
1. Activate beginning-of-turn abilities - miss if shot clock is up
2. Draw a card from any deck
3. Choose 1 of the following actions:
   - Play a card from hand
   - Draw an additional card
   - Sacrifice 3 creatures for a permanent point
   - Discard a card and sacrifice one to regenerate a negate
   - If shot clock is missed default to drawing a card.
4. Discard down to 7 cards at turn end

##### Negate Rules
- Can be used **before** the next player's action
- Negates can be chained
- Effects of a negated action:
  - Card played: discarded
  - Card drawn: discarded
  - Negate generated: removed + sacrifice lost
  - Sacrifice for point: effect canceled
- Max 3 negates per player

#### Winning Conditions
- First to reach point goal wins
- If two decks run out, player with most points wins
  - Tiebreakers:
    1. Most permanent points
    2. Most cards in hand
    3. Draw

### Edge Cases & Validations
- **Card Effects & Timing**
  - Trait for when an effect triggers (play, turn start)
  - Traits:
    - Shot clock relevant
    - Counts as an action
- **Card Requirements**
  - Middleware validation for:
    - Cards in hand to discard/sacrifice
    - Creatures on field
    - Card types & deck origins
    - Factions

### Game State UI Counters
- Hand size
- Permanent points
- Field points
- Negate count
- Turn order
- Cards in deck/discard
- Types of cards in play and hand
- Factions in play and hand
- Creature/trap counts
- Shot clock time

## Profile
- Tracks:
  - Wins
  - Losses
  - Ties
  - Friends list

## Monetization Ideas
- Google AdSense:
  - Sidebar ads
  - Banner ads
  - Pre-game video ads
- Ad removal via one-time payment
- Sell additional decks as DLC
- Use ad space to promote personal projects
