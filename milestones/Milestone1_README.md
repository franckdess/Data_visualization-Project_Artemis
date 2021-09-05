# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Justine Weber | 261458 |
| Franck Dessimoz | 246602 |
| Simon Roquette | 246540 |

[Milestone 1](#milestone-1-friday-3rd-april-5pm) • [Milestone 2](#milestone-2-friday-1st-may-5pm) • [Milestone 3](#milestone-3-thursday-28th-may-5pm)

## Milestone 1 (Friday 3rd April, 5pm)

**10% of the final grade**

### 1. Dataset
*Find a dataset (or multiple) that you will explore. Assess the quality of the data it contains and how much preprocessing / data-cleaning it will require before tackling visualization. We recommend using a standard dataset as this course is not about scraping nor data processing.*

The dataset that we are going to use comes from [Kaggle](https://www.kaggle.com/rakannimer/billboard-lyrics) and has been originally created by [Kaylin Pavlik](https://github.com/walkerkq/musiclyrics). The dataset contains the following columns: *Rank*, *Song*, *Artist*, *Year*, *Lyric* and *Source*. The following steps have been taken as data pre-processing:

- For the purpose of our project, we removed the column *Source* as it is not relevant for our analysis.
- We filled in the *NaN* values for the *Lyrics* feature by using two Python libraries, *PyLyrics* (see section [1.2.1](https://github.com/com-480-data-visualization/com-480-project-artemis/blob/master/data_preprocessing.ipynb)) and *lyricwikia*(see section [1.2.2](https://github.com/com-480-data-visualization/com-480-project-artemis/blob/master/data_preprocessing.ipynb)).
- We added a feature *Genre* by using *BeautifulSoup* and *Selenium* to perform web-scrapping (see section [1.3](https://github.com/com-480-data-visualization/com-480-project-artemis/blob/master/data_preprocessing.ipynb)).
- We added a feature *Album* by using *BeautifulSoup* and *Selenium* to perform web-scrapping (see section [1.4](https://github.com/com-480-data-visualization/com-480-project-artemis/blob/master/data_preprocessing.ipynb)).

We used *BeautifulSoup* and *Selenium* together with Safari web browser to gather missing data from Google, since Safari provides quick information retrieval as shown in the following two images:

![](images/genre_feature.png)![](images/album_feature.png)

This gives us a complete dataset that we are going to explore and analyze.

### 2. Problematic
*Frame the general topic of your visualization and the main axis that you want to develop.
What am I trying to show with my visualization?
Think of an overview for the project, your motivation, and the target audience.*

Our project will show the evolution of music through time, on several different aspects. We will focus in particular on the lyrics of the songs, the vocabulary, the popularity of the song, its artist, and the time in which it came and in which it was popular.

The main axis we would like to develop are the following:
- How closely are the lyrics of the music related to contemporary events?
- Has the vocabulary evolve over time, and if yes, how ?
- Can we classify music based on some of their lyrics' characteristics, and if yes is that related to time ?

The goal will be to show the interesting results, outcoming of these questions. We are also interested in providing an interactive platform: the user would be able to write text, which we will process and link to our data analysis.

### 3. Exploratory Data Analysis
*Pre-processing of the data set you chose:
Show some basic statistics and get insights about the data*

The Notebook [Billboard-Data-Exploration.ipynb](https://github.com/com-480-data-visualization/com-480-project-artemis/blob/master/Billboard-Data-Exploration.ipynb) displays various statistics about out dataset, we summarize some of them here.

The completed dataset contains **5108** rows. There were **5100** in the original one, but we found that **8** rows contained actually two songs (from the same Artist) so we split them.

The rows correspond to the Top-100 songs from 1965 to 2015. In the completed dataset, each row contains : Rank, Song Name, Artist, Year, Lyrics, Genre, Album.

**95.8%** of the songs appear **only once**, and **4.2% appear twice**, meaning they were in the Top-100 during 2 different years.

There are **2471** different artists (if artists make a collaboration, the collab is considered as a different other artist. For example The Beatles, David Bowie, The Beatles feat David Bowie would be 3 different Artists)

On average each artist that is at least once in the Top-100 appears twice, but **65.8%** of artists are only there once. The average is pulled up by extreme cases, artists with lots of appearances, the maximum is 35 appearances for Madonna.

![](images/songs_per_artist.png)!


Genre distribution (Filtering out genres containing less than 70 songs):
![](images/genre_distribution.png)!

Here is the distribution of the number of words per song and vocabulary size (excluding songs with more than 1000 words)
![](images/words.png)! ![](images/unique_words.png)!

In order to make interesting visualization, we will have to use diverse NLP vectorization tools, which we have started to explore at the bottom of the [Data Exploration Notebook](https://github.com/com-480-data-visualization/com-480-project-artemis/blob/master/Billboard-Data-Exploration.ipynb). Among them LDA, Doc2Vec, ... and more to come!




### 4. Related work

***What others have already done with the data?***

1.
The first very interesting source we have is [Kaylin Pavlik's presentations of the dataset](https://www.kaylinpavlik.com/50-years-of-pop-music/). She is the person who has created the dataset. Through the above website, she provides basic statistics, information on the context such as the evolution of the ranking policy, as well as interesting analysis on the dataset, such as the most characteristic lyrics by decades (cf. image below).

![alt text][lyrics_plot]

[lyrics_plot]: https://github.com/com-480-data-visualization/com-480-project-artemis/blob/master/images/lyrics_plot1.png "Most characteristic lyrics by decade."

Kaylin Pavlik is an American data scientist passionate about music. She has done a lot of other projects which are available [here](https://www.kaylinpavlik.com/). It may be interesting sources for later.

2.
The Pudding is a digital publication that explains ideas debated in culture with visual essays. Their project [How Music Taste Evolved ](https://pudding.cool/2017/03/music-history/) enables to see the top 5 songs and listen to the top 1 song through time. They used the same dataset we do, and created a very enjoyable platform to listen to old songs, while visualising the evolution of popular songs : we love it !


***Why is our approach original?***

As far as we know, there exist no interactive interface which provides a deep analysis on the top 100 Billboard songs' lyrics, through time. Some static presentations exist on the evolution through time, but they are perfunctory. Interactive visualizations can also be found, but they are very specific and short, and do not cover the topic in an overview.

The idea will be to allow the visitor to our website to travel through time, and relate back to a period of time in a certain way. This is what makes this project special.

***What source of inspiration do you take?***

The article ["Are Pop Lyrics Getting More Repetitive? *An exercise in language compression.*"](https://pudding.cool/2017/05/song-repetition/) (from *The Pudding* again) is a great example of visualization related to language analysis. We especially like how they show their compression method on text, when scrolling the website. They have also studied the link between repetitiveness and popularity of a song. We are inspired by the fact that each visualisation is appropriate for its own purpose, very smooth, and unique.

Other inspirations:
- [The Most Sucessful Labels in Hip Hop](https://pudding.cool/2017/03/labels/) : original interactive maps, through time, beautiful.
- [The Largest Vocabulary in Hip Hop](https://pudding.cool/projects/vocabulary/index.html) : short but nice !
- [The Musical Diversity of Pop Songs](https://pudding.cool/2018/05/similarity/) : interesting subject and nice visualisation.
- [The Unlikely Odds of Making It Big](https://pudding.cool/2017/01/making-it-big/) : great visualisation !

Main source for data visualisation projects : [Flowing Data](https://flowingdata.com/tag/music/).

## Milestone 2 (Friday 1st May, 5pm)

**10% of the final grade**

_Two A4 pages describing the project goal._

- Include sketches of the vizualiation you want to make in your final product.
- List the tools that you will use for each visualization and which (past or future) lectures you will need.
- Break down your goal into independent pieces to implement. Try to design a core visualization (minimal viable product) that will be required at the end.

Then list extra ideas (more creative or challenging) that will enhance the visualization but could be dropped without endangering the meaning of the project.

_Functional project prototype review._
- You should have an initial website running with the basic skeleton of the visualization/widgets.

### Our product

Our goal is the following : create a visualization which shows the link between historical events and songs, through their lyrics. Our website will contain one main animation, illustrating this.

For that purpose we had to gather events data. Since we could not find any relevant dataset for our project, we created our own by scrapping information from https://www.onthisday.com. This site has the advantage of showing only major events which would perfectly fit our needs. Indeed, for each year from 1965 to 2015, we were able to extract the day, month and year of the event, as well as a one-sentence summary. Having collected these data, we used the Wikipedia Python API, to gather the article's url associated with the event as well as the summary of the article. At the end we were able to gather 1115 events over 50 years. The complete processing script can be found [here](https://github.com/com-480-data-visualization/com-480-project-artemis/blob/master/data%20analysis/data_processing_events.ipynb).

### Sketches

The following 5 sketches show our first idea of the rendering. It is meant to evolve throughout the project and may not be exactly the same at the end of the project, but this is the general idea. You can have a look at the initial version of the website [here](https://github.com/com-480-data-visualization/com-480-project-artemis/tree/master/website).

The user lands on the home page, which is quite light. He is asked to choose a year.

![alt text][sketch1]

Once he has chosen a year, the time line is zoomed in, centered in the year the user chose. The events are displayed above the time line while the songs are displayed below. The data points related to the chosen year are highlighted, and the ones related to the 2 previous and 2 folowwing years have reduced opacity. If the user hover over an event data point, the connected song data points are highlighted in orange as well.

![alt text][sketch2]

The user is also offered the possibility to filter the resuts, i.e., filter the events or/and the songs.

![alt text][sketch3]

Once the user choose an event data point, the informations appear in the upper half of the screen, while the related song data points are still highlighted in orange.

![alt text][sketch4]

Once the user choose one of the connected song, the informations about the song appear in the lower half of the screen. As we will use Name Entity Recognition to link the events and the songs, we will also highlight the words that allowed us to make a connection between the 2 data points. Since we also extracted the wikipedia article for each event, we will add a link pointing to that article, in order for the user to read the entire article.

![alt text][sketch5]


[sketch1]: images/sketch1.png
[sketch2]: images/sketch2.png
[sketch3]: images/sketch3.png
[sketch4]: images/sketch4.png
[sketch5]: images/sketch5.png

### Tools

We will use several tools for the visualisation
Past lectures :
- Week 4 - D3
- Week 5 - Interactions
- Week 6 - Mark and channels
- Week 7 - Design for data viz (already used, for designing our interface)
- Week 9 - Text visualization : for processing our text, and may be useful if we want to display it (this may come later)
- Week 10 - Graphs : may be useful for the links between songs and events

The NLP tools we use / might use for improvements include the following algorithms : LDA, Doc2Vec, Word2Vec, Glove and BERT if time allows. We are using dedicated libraries offered in Python : Scikit-learn, Gensim, Spacy, Nltk and, if time allows transformers (https://github.com/huggingface/transformers).  

In our Roadmap below, steps 5 and 6 imply some user interaction, and therefore some live computations.  We considered using tfjs (tensorflow.js), but it might not be compatible with all the end task vectorisation tools we are currently computing in Python. We therefore decided to have a server with minimal Python backend to compute vectors for text input by user, using the Flask framework, and leaving the visualization do D3.js. Using flask implied some changes in the code structure, which are currently in progress on the flask branch. This way, if we were to not use it because step 5 and 6 are not done, we can go back to a fully HTML/CSS/JS server.

### Roadmap
1. Work on a "simple" NLP algorithm, to link songs to events
  - Using Name Entity recognition to extract entities from the lyrics, and from the wikipedia excerpt.

  - Matching the lyrics and Wikipedia excerpt which have Entities in common.

2. Work on the animations
  - The apparition of the dots when clicking on a year.
  - The highlighting of the dots when hovering the mouse over a point representing a song or an event.
  - The apparition of a description when clicking on a dot (event or song)
  - The navigation through the timeline.

3. Work on the website (in parallel of 2)
  - Explanation of our algorithm.
  - Navigation between the upper part (main animation) and the lower part (description of the project) of the website.

4. (optional - if time) Improve our NLP algorithm, to make the links between lyrics and events more coherent / accurate / meaningful.
5. (optional - if time) Enable users to submit their own written text, and show them the link between their text and our events.
6. (optional - if time) Develop another page, that would be more semantic / meaning oriented, rather than time. This page would enable the user to visualize semantic links such as embeddings in 2D between Lyrics and events. This way we could for example clusterize texts, and show where the text given by the user positions itself compared to the Events, Lyrics and Clusters.

## Milestone 3 (Thursday 28th May, 5pm)

**80% of the final grade**
