# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Justine Weber | 261458 |
| Franck Dessimoz | 246602 |
| Simon Roquette | 246540 |

IMPORTANT NOTE : For the moment, the website only works properly on Safari, some functionnalities such as zooming out of the Timeline do not work on other browsers.

This project provides tools to explore correlation between song lyrics and historical events, start exploring at : https://com-480-data-visualization.github.io/com-480-project-artemis/website/templates/

Start by clicking on a year to zoom on a specific period, then select an event or a song by clicking on a point, correlated song/events will change color when hovering, and only them will stay if you click. After clicking, you get more information about the event / song, such as the lyrics or description with the Named Entities recognized highlighted. You also have a link to either the Wikipedia or the Youtube of the event / song, it is always nice to listen to one of the songs in the background !

You can also put filters by clicking on the top left icon, and remove them by clicking on the trash can. The cliper with a bar icon filters out events/songs that have no link. It as activated by default. You can click on it to still see isolated points. When you are zoomed on a 5 year span, you can unzoom by clicking the top right icon. 
If you are ever in a situation where you feel there is a glitch / bug, just refresh the page, we are sorry for the inconveniance !

## Screen cast :
Check out our 2min website presentation here : https://youtu.be/HscXsXHk8Zg

## Code : 

The website folder contains the HTML/CSS/JavaScript files and the csv data files to run the simulation. The csv files contain all the data of the points (one for vents and one for lyrics).

Those csv files are pre-cooked data files with a lot of processing. They were generated from the data "analysis/Billboard-Data-Exploration.ipynb" in Python. This notebook is VERY messy as it was modified over and over to obtain the data in the exact format we needed. Theoretically though, one could use it to add / modify the data of the points.
To run it you will need the following libraries : Matplotlib, Huggingface/transformer, gensim, spacy, nltk, pandas, numpy... If needed, contact Simon Roquette and he could generate you the specific conda env file for it.
