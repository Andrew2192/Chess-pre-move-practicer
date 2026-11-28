# Pre-move practicer

A website that helps you practice premoves in chess.

## The Problem

In chess, a game is normally played with a clock where, if a player's clock reaches 0 (in most cases), they lose. 
Some players can't win when they have enough material to win but don't have enough time to think about every move.  


## How It Works

When the website loads index.html, the user sees a puzzle
which is a forced mate in 2. After the user comes up with a premove strategy for it, they can premove that strategy, press start, and the website will tell them if it's the right strategy for that puzzle.

![System diagram]([docs/diagram.png](https://github.com/Andrew2192/Chess-pre-move-practicer/blob/main/System%20Diagram.pdf))

## Tech Stack

- **Language:** HTML, JavaScript, Java
- **Libraries:** chessboard-element, Thymeleaf, chess.js
- **External tools:** Gradle, Git, VSCode
- **Frameworks:** Spring Boot

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

- [X] Settings button + interface
- [ ] External chess library access
- [ ] Puzzle racer for premoves

## Author

Andrew Wu, github.com/Andrew2192
