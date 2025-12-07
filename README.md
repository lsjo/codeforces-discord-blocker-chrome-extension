# codeforces-discord-blocker-chrome-extension
<img width="100%" alt="image" src="https://github.com/user-attachments/assets/21dd3b5a-bedf-4b54-9554-0d2c40252571" />
A chrome extension that blocks you from accessing Discord on Chrome until you've solved one of three random Codeforces problems

## What it Does
When the user attempts to open Discord on Chrome, it creates an overlay that prevents them from seeing or interacting with Discord. Then it uses the Codeforces API to select three random problems (with the first having a rating between 800 and 1200, the second having a rating between 1300 and 1900, and the third having a rating between 2000 and 2600), and doesn't delete the overlay until the user submits an AC solution to one of the problems, types in their username, and presses submit on the overlay. After that, they're free to access Discord.

## How to Use it
* Download this repository
* Go to the chrome extensions page (chrome://extensions)
* In the top right, turn on Developer Mode
* In the top left, select Load Unpacked and choose this folder
* Now it should work when you try to open Discord!

Note: Currently this just uses Discord's stylesheet, but I'll work on making a better one for this extension.
