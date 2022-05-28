from tkinter import *
from tkinter import messagebox as ms

class Root(Tk):
    def __init__(self):
        super(Root,self).__init__()
 
        self.title("Mood Tracker")
        self.minsize(500,400)
        self.geometry("500x700")

root = Root()

# MARK: - Helpers

def createButton(context, title, func):
    return Button(context,
                  text = title,
                  command = func,
                  height = 3, 
                  width = 17)

def packButton(button):
    button.pack(padx=6, pady=4)

# MARK: - Navigation functions

def yearInPixelsDelegate():
    return ms.showinfo("yearInPixels", "yearInPixelsDelegate")

def anxietyInPixelsDelegate():
    return ms.showinfo("anxietyInPixels", "anxietyInPixelsDelegate")

def moodInPixelsDelegate():
    return ms.showinfo("moodInPixels", "moodInPixelsDelegate")

def weatherInPixelsDelegate():
    return ms.showinfo("weatherInPixels", "weatherInPixelsDelegate")

def exerciseInPixelsDelegate():
    return ms.showinfo("exerciseInPixels", "exerciseInPixelsDelegate")

def readingInPixelsDelegate():
    return ms.showinfo("readingInPixels", "readingInPixelsDelegate")

def healthInPixelsDelegate():
    return ms.showinfo("healthInPixels", "healthInPixelsDelegate")

menuTitle = Label(root, text ='Mood Tracker', font = ("Roboto", 30)) 
menuTitle.pack()

# MARK: - Menu Buttons
yearInPixelsNav = createButton(root, "Year In Pixels", lambda: yearInPixelsDelegate())
packButton(yearInPixelsNav)

anxietyInPixelsNav = createButton(root, "Anxiety In Pixels", lambda: anxietyInPixelsDelegate())
packButton(anxietyInPixelsNav)

moodInPixelsNav = createButton(root, "Mood In Pixels", lambda: moodInPixelsDelegate())
packButton(moodInPixelsNav)

weatherInPixelsNav = createButton(root, "Weather In Pixels", lambda: weatherInPixelsDelegate())
packButton(weatherInPixelsNav)

exerciseInPixelsNav = createButton(root, "Exercise In Pixels", lambda: exerciseInPixelsDelegate())
packButton(exerciseInPixelsNav)

readingInPixelsNav = createButton(root, "Reading In Pixels", lambda: readingInPixelsDelegate())
packButton(readingInPixelsNav)

healthInPixelsNav = createButton(root, "Health In Pixels", lambda: healthInPixelsDelegate())
packButton(healthInPixelsNav)

root.mainloop()