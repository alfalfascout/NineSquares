"""
NineSquares command line game
Created by Alan Jacon "alfalfascout" on 22 September 2015
"""

from random import randint

class Button(object):
    """ Creates a class of toggle-able buttons """
    def __init__(self, id):
        self.id      = id
        self.active  = False
        self.affects = [False for i in range(9)]

    def randomAffects(self):
        """ Randomly decides which other buttons
            a button should affect.
            A button should always affect itself. """
        for i in range(9):
            if randint(0,2) == 1:
                self.affects[i] = True
            else:
                self.affects[i] = False
        self.affects[self.id] = True

    def randomStates(self):
        """ Randomly turns buttons on and off. """
        for i in range(randint(1,4)):
            buttons[randint(0,8)].activate

    def activate(self):
        """ Turns the button on/off and
            turns the affected buttons on/off """
        for i in range(9):
            if self.affects[i]:
                if buttons[i].active:
                    buttons[i].active = False
                else:
                    buttons[i].active = True

""" Create nine buttons for the grid, like so:
    0 1 2
    3 4 5
    6 7 8 """
b0 = Button(0)
b1 = Button(1)
b2 = Button(2)
b3 = Button(3)
b4 = Button(4)
b5 = Button(5)
b6 = Button(6)
b7 = Button(7)
b8 = Button(8)
""" Create an array to contain the grid """
buttons = [b0,b1,b2,b3,b4,b5,b6,b7,b8]

def newGame(buttons):
    """ Randomizes all the buttons """
    for i in range(9):
        buttons[i].randomAffects()
        buttons[i].randomStates()

def drawBoard(buttons):
    """ Draws the board to the command line, like so:
        0 1 2
        3 4 5
        6 7 8
        "on" buttons are O and "off" buttons are X """
    bX = 0
    for i in range(3):
        for j in range(3):
            if buttons[bX].active:
                print "O",
            else:
                print "X",
            bX += 1
        print "\n",

def demoBoard():
    """ Prints a demo board with button positions. """
    bX = 0
    for i in range(3):
        for j in range(3):
            print bX,
            bX += 1
        print "\n",

def checkWin(buttons):
    """ Checks all the buttons to see if the player won.
        If so, draws the finished board and announces win. """
    result = True
    for i in range(9):
        result = result and buttons[i].active
    if result:
        print "\n\n"
        drawBoard(buttons)
        print "You won!"
        return True
    else:
        return False

def playGame(buttons):
    """ Play the game on the command line. """
    newGame(buttons)
    won = False
    press = 0

    print "\nWelcome to Nine Squares!"
    print "The board looks like this:"
    demoBoard()
    print "Every \"button\" you press could activate others!"
    print "The goal is to turn every button into an O."
    print "Let's start!"

    """ Main loop """
    while not won:
        drawBoard(buttons)

        try:
            press = int(raw_input("9 to Quit. Press 0 through 8? "))
        except ValueError:
            press = -1

        if press == 9:
            break
        elif press < 0 or press > 9:
            print "You need to enter a number from 0 to 8 to play."
        else:
            buttons[press].activate()

        won = checkWin(buttons)
        print "\n"

playLooper = "Y"

while playLooper == "y" or playLooper == "Y":
    playGame(buttons)

    playLooper= raw_input("\nWould you like to play again? (Y/N) ")
