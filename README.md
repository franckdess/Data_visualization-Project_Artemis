# Project of Data Visualization (COM-480)

*IMPORTANT NOTE : For the moment, the website only works properly on Safari, some functionnalities such as zooming out of the timeline do not work on other browsers.*

The Project Artemis aims to use NLP techniques to find mappings between Billboard songs lyrics and historical events, and eventually display the results in an interactive way. It provides you with tools to explore correlation between lyrics and events.

Explore at: https://franckdess.github.io/Data_visualization-Project_Artemis/website/templates/

Start by clicking on a year. This will zoom on a specific period and bring you to the selected year. Correlated songs/events are highlighted when hovering and a small description appears. You can then select an event or a song by clicking on a data point. After having clicked, you get more information about the event/song, such as the lyrics or description with the Named Entities recognized highlighted. You will also find a link to either the Wikipedia page or the Youtube video of the given event or song, it is always nice to listen to one of the songs in the background !

You can also add filters by clicking on the top left icon, and remove them by clicking on the trash can icon. For instance, the search option allows you to see the distribution of a given word in lyrics over the years or to filter events which description matches a given key-word. The cliper with a bar icon filters out events/songs that have no link. It as activated by default. You can click on it to still see isolated points. When you are zoomed on a 5 year span, you can unzoom by clicking the top right icon. 

If you are ever in a situation where you feel there is a glitch or a bug, just refresh the page, we are sorry for the inconveniance !

## Screen cast :

Check out our 2min website presentation here : https://youtu.be/HscXsXHk8Zg

## Code : 

The website folder contains the HTML/CSS/JavaScript files and the csv data files to run the simulation. The csv files contain all the data of the points (one for vents and one for lyrics).

Those csv files are pre-cooked data files with a lot of processing. They were generated from the data "analysis/Billboard-Data-Exploration.ipynb" in Python. This notebook is very messy as it was modified over and over to obtain the data in the exact format we needed. Theoretically though, one could use it to add or modify the data of the points. To run it you will need the following libraries: Matplotlib, Huggingface/transformer, gensim, spacy, nltk, pandas, numpy... If needed, contact Simon Roquette and he could generate you the specific conda env file for it.
