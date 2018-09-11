# Memory-Game

__Project Review:__

This project is an amusement game for testing memory and sharpening intellectual skills. The player basically has to memorize the card and its location. The game has a 4*4 deck of cards i.e. 16 cards which is 8 pairs of identical twins. Keep locating and displaying until you find all the pairs.

__How to run the game:__

The game can be either downloaded as zip file or cloned from the following link: https://github.com/TejaSankuru/Memory-Game Once downloaded just open the folder and open the index.html file in your browser. You should be able to play the game right away.

__How to play the game:__

This is a very simple game where you just click any card on the deck which will be flipped and then you flip another card. Once a pair of cards is displayed, it will be hidden automatically after one second. Your job is to find the exact same pair of cards. Once you flip open the exact same cards they will stay open. Keep flipping cards until you find all the pairs and try to use the least number of moves and least time to have a good rating.

__Game features:__

- A clock to monitor the time utilized to win.
- A move counter to count the number of moves utilized to win.
- A 5-star-rating system to rate your performance.
- A pop-up window displaying the results after winning the game.
- A  reset button to reset the game.

__About code:__

All the function names are self-explanatory and additional comments explain the more about them. Let's explore the code.

- set up the event listener for a card. If a card is clicked:

- Display the card's symbol (put this functionality in another function that you call from this one)

- Add the card to a list of "open" cards (put this functionality in another function that you call from this one)

- If the list already has another card, check to see if the two cards match

- If the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)

- If the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)

- Increment the move counter and display it on the page (put this functionality in another function that you call from this one)

- If all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)

- So the card's symbol is displayed by the function toggleCard().

- The displayed card is added to an array by the function addToggledCard().

- The two displayed cards are matched by the function checkForMatch().

- If all cards have been matched an gameOver() function is called which calls another function stopClock() to stop the clock and then calls writeModalStats() to display a message with the final score.

__Dependencies:__
- Font Awesome.
- Google Fonts.

__Resources:__
I refered the below mentioned resource.

The webinar youtube video from Udacity content expert Mike Wales.
https://www.youtube.com/watch?time_continue=3680&v=_rUH-sEs68Y

