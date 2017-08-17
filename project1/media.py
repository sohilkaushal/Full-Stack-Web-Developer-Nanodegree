import webbrowser
class Movie():
    """ This class stores the title, storyline, poster image url and trailer
url of an instance movie and show_trailer() plays the trailer on a webbrowser.
"""
    def __init__(self,movie_title,movie_storyline,poster_image,trailer_youtube):
        self.title = movie_title    #Space to store title
        self.storyline = movie_storyline    #Space to store storyline
        self.poster_image_url = poster_image    #Space to store poster image url
        self.trailer_youtube_url = trailer_youtube    #Space to store trailer url
#This function plays the trailer on webbrowser
    def show_trailer(self):
        webbrowser.open(self.trailer_youtube_url)
