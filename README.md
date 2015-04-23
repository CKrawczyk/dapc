# dapc

Dragon Age Table Top RPG Character Sheet written in HTML/JS.

# Features

+ All the information you need to play the Dragon Age Table Top RPG on one page
+ Keep track of custom notes
+ Presented in a format that adjusts for any size screen (including phones and tablets)
+ Primary stats automatically marked based on class
+ Turn on edit mode to create or level up your character, turn it off to limit edits to the values that change during normal game play
+ Built in calculator to add/remove health, mana, and money
+ Dynamically add spells to you chracter sheet including full text discriptions for each spell (currently limited to spells from Set 1)
+ A "cast" button for each spell that automatically deducts mana and shows if a spell can be cast
+ The ability to save/load your character sheet locally in a human readable .json format
+ Example save file included "Alice_save.json"

# dagm

Dragon Age Table Top RPG initiative tracker writeen in HTML/JS

# Features

+ Import save files made with dapc
+ Differnt view for players and Foes
    + Players only disply basic stats and information
    + Foes Include all information needed to play the character including helth and mana trackers, full weapon discriptions, and full spell lists
+ Dynamic initiative tracker for support adding new characters after a battle begins
    + Hover highlighting liked between character stats and position on the tracker
    + Removal of character also removes from tracker
    + Removal from tracker will keep character stats (don't have to reload players every battle)
    + Seize the initiative button included on the tracker
    + Top of the initiative order marked with a star
    + Round number automatically tracked
