import media
import fresh_tomatoes
#movie instances created using media.Movie().
godfather = media.Movie("The Godfather",
                        "Story of a Corleone mafia family.",
                        "https://movietalkexpress.files.wordpress.com/2015/12/the-godfather.jpeg",
                        "https://www.youtube.com/watch?v=sY1S34973zA")
tpoh = media.Movie("The Pursuit of Happyness",
                   "Story of a man dealing with the struggles in his life.",
                   "http://www.impawards.com/2006/posters/pursuit_of_happyness_xlg.jpg",
                   "https://www.youtube.com/watch?v=89Kq8SDyvfg")
shawshank = media.Movie("The Shawshank Redemption",
                        "A man ends up in a jail even when he was innocent.",
                        "https://www.movieposter.com/posters/archive/main/42/MPW-21321",
                        "https://www.youtube.com/watch?v=6hB3S9bIaco")
assassins = media.Movie("Assassin's Creed",
                        "The ancestors of a man are assassins.",
                        "http://cdn2-www.comingsoon.net/assets/uploads/gallery/assassins-creed-movie/asscreedinternational.jpg",
                        "https://www.youtube.com/watch?v=gfJVoF5ko1Y")
jumpstreet = media.Movie("21 Jump Street",
                         "Story of 2 undercover cops messing things up.",
                         "http://www.impawards.com/2012/posters/twenty_one_jump_street.jpg",
                         "https://www.youtube.com/watch?v=ISJR4rVO0TQ")
haroldkumar = media.Movie("Harold and Kumar","Harold and Kumar and thier extreme adventure.",
                          "http://www.impawards.com/2004/posters/harold_and_kumar_go_to_white_castle.jpg",
                          "https://www.youtube.com/watch?v=cwP5E15VzRM")
#An array of all the movie instances is created.
movies = [godfather,tpoh,shawshank,assassins,jumpstreet,haroldkumar]
fresh_tomatoes.open_movies_page(movies)     #The movies page is opened.
