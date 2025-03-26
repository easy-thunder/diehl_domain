import React from 'react'
// we need auth and check auth
// we need 
//ROUTES: 
// initial login or play as guest. This will initiaize a check to continue to the rest of the game.
// Redirect to menu page with profile, custom game, and quick play game options.
// quick play game will be a random game with random players.
// custom game will be a game with friends.
// profile will be a page to edit profile and view stats.



//FEATURES:
    //User features:
        // Validation cookie permission:
            // We will need to save a cookie if the user wants to stay logged in. Need a modal asking for permission to save cookie.
        //Validation of parental permission:
            // Voice Chat on custom games
            // in game messaging
            // friends list and can notify friends of game invites.
    // Game configuration:
        //Custom Game:
            // Can be marked as private or public. If public will be listed in custom play game list. If not won't be listed.
            // Can mark if voice chat is allowed.
            // Can mark 3 seconds to 20 seconds for action time. An action is using a card ability, drawing an additional card, or playing a card.
            // Mark the number of points needed to win between 10 an 100.
            // Can mark the max number of players.
            // Custom Game lobbies:
                // One person will host the game. They make decision on when to start the game, and configure the game, and can kick players.
                // Eventually if this game is successful I will add in decks that can be played with and the host can choose which decks to use.
        //Quick Play Game:
            // Can mark 3 second turn time/ 5 second turn time/ 10 second turn time.
            // Can mark 10 points to win/ 20 points to win/ 30 points to win.
            //Quick Play Lobbies:
                // Lobbies will have random people join. when All people mark ready, the game will start whether the lobby is full or not.
                // If one person is in a lobby they will join another lobby of a game that just recently ended.
    // Game Features:
        // Game Setup:
            // There can be 2-6 players.
            // Game play starts with shuffling the three different decks and placing them in the center of the board.
            // Each player draws 2 cards from each deck.
            // Player one starts. Turn order is clockwise.
            // Each player starts with 3 negates.
        // Game Play:
            // 1. Player starts with activating any beginning of turn abilities.
            // 2. Player draws a card from any of the three decks.
            // 3. Player actions:
                // 1. Play a card from hand.
                // 2. Draw an additional card.
                // 3. sacrafice three creatures for a permanent point.
                // 4. Discard a card, and sacrafice a card to regenerate a negate.
            // 4. Players must always discard down to 7 cards at the end of their turn play goes to the next player.
            // Negate rules:
                // At any point a player can use a negate to stop THE NEXT players action. In other words, the negate is played before the action is played. 
                // Negates can be used to stop negates. But the original negater can choose to negate again.
                // If negated what ever action it was is lost:
                    // If a card was played it is discarded.
                    // If a card was drawn it is discarded.
                    // if a a negate was generated it is removed, and the player loses their sacraficed card.
                    // If three creatures were sacrficed for a point, the effect simply doesn't happen.
            // Winning: 
                // points accumlate by the number of creatures on the field+ the number of permanent points.
                // The first player to reach the point goal wins.
                // If two of the decks run out of cards the game ends and the player with the most points wins. In a tie the player with the most permanent points wins. If still a tie the player with the most cards in hand wins. Else it is a draw.

            
        
        

export default function InitialPage(){
    return<>
    </>
}

