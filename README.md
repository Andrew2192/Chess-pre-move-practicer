Project goal: Make a functional pre-move practice website for chess players, where the pre-move functionality is very similar to that on chess.com.

MVP scope: A website with two functioning pages, puzzles.html and index.html, a functional chess board, and a functional check pre-moves button.

Future plans: ,  and interface

Tech stack: 
JSON and plain text to store data.
# Pre-move practicer

A website that helps you practice premoves in chess.

## The Problem

In chess, a game is normally played with a clock where, if a player's clock reaches 0 (in most cases), they lose. 
Some players can't win when they have enough material to win but don't have enough time to think about every move.  


## How It Works

After index.html, the user adds a puzzle and pre-moves it after it's loaded. After premoving it, 
they can press the check pre-move button to see if they might have made an incorrect move. 
After this, they have the option of repeating the process.

![System diagram]([docs/diagram.png](https://github.com/Andrew2192/Chess-pre-move-practicer/blob/main/System%20Diagram.pdf))

## Tech Stack

- **Language:** HTML, CSS, JavaScript, Java
- **Libraries:** None
- **External tools:** None

## Setup

Step-by-step: how does someone who just cloned your repo get it
running?

```bash
git clone https://github.com/you/your-project
cd your-project
./install.sh   # or whatever
```

## Usage

How to actually run the thing, with examples.

```bash
./backup.sh ~/Documents
```

## Roadmap

- [ ] External chess library access
- [ ] Settings button + interface
- [ ] Puzzle racer for premoves

## Author

Andrew Wu, github.com/Andrew2192
