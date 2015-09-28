from Cocoa import *
from Foundation import NSObject
from random import randint


class NineSquaresController(NSWindowController):
    messageField = objc.IBOutlet()
    """ Maybe if I make 9 button objects like this,
        I can send their presses to the equivalent button.affect()? """
    appB0 = objc.IBOutlet() 
    appB1 = objc.IBOutlet()
    appB2 = objc.IBOutlet()
    appB3 = objc.IBOutlet()
    appB4 = objc.IBOutlet()
    appB5 = objc.IBOutlet()
    appB6 = objc.IBOutlet()
    appB7 = objc.IBOutlet()
    appB8 = objc.IBOutlet()
        
    def windowDidLoad(self):
        NSWindowController.windowDidLoad(self)
        
        """ put other stuff here for when the window loads """
    
    @objc.IBAction
    def press_(self, sender):
        """ press the corresponding button & activate others too
            by passing it to functions in the button class and then
            updating all the button states... i hope """
        buttonsEquivs[self].activate
    
    def updateDisplay(self):
        self.messageField.setStringValue_(message)
        for i in range(9):
            if buttons[i].active:
                pass
                """ set the equivalent appButton[i] to active/highlighted """
    
    
class Button(object):
    """ Creates a class of toggle-able buttons """
    def __init__(self, id):
        self.id = id
        self.active = False
        self.affects = [False for i in range(9)]
    
    def randomize(self):
        """ Randomly decides which other buttons 
            a button should affect. 
            A button should always affect itself.
            Randomly turns button on or off. """
        for i in range(9):
            if randint(0,2) == 1:
                self.affects[i] = True
            else:
                self.affects[i] = False
        self.affects[self.id] = True
        if randint(0,1) == 1:
            self.active = True
        
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
buttons = [b0, b1, b2, b3, b4, b5, b6, b7, b8]
appButtons = [appB0, appB1, appB2, appB3, appB4, appB5, appB6, appB7, appB8]
""" Set the equivalents of the app buttons to the Button objects """
buttonsEquivs = {
    appB0 : b0
    appB1 : b1
    appB2 : b2
    appB3 : b3
    appB4 : b4
    appB5 : b5
    appB6 : b6
    appB7 : b7
    appB8 : b8
}

def newGame(buttons):
    """ Randomizes all the buttons """
    for i in range(9):
        buttons[i].randomize()

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
    print "\nWelcome to Nine Squares!"
    print "The board looks like this:"
    demoBoard()
    print "Every \"button\" you press could activate others!"
    print "The goal is to turn every button into an O."
    print "The boards are generated randomly and not guaranteed",
    print "to be winnable.\n"
    print "Let's start!"
    newGame(buttons)
    won = False
    press = 0
    
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

playGame(buttons)