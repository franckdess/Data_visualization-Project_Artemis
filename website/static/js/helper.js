/*  This script handles the helper functions related to the website,
    namely the scroll to element, select random, pixel to viewport height
    and pixel to viewport height functions */

function scroll_to_element(element) {
    /*  This function handles the scrolling animation to a given div element. */

    var offsetTop = window.pageYOffset || document.documentElement.scrollTop
    d3.transition()
        .delay(1)
        .duration(600)
        .ease(d3.easePolyInOut.exponent(3))
        .tween("scroll", (offset => () => {
            var i = d3.interpolateNumber(offsetTop, offset);
            return t => scrollTo(0, i(t))
        })(offsetTop + element.getBoundingClientRect().top));
}

function select_random(min, max) {
    /*  This function returns a random float number between min and max. */

    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function px_to_vw(value) {
    /* This function converts a value in pixels into a value in
        the viewport width coordinates (vw). */

    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    var result = (100 * value) / x;
    return result;
}

function px_to_vh(value) {
    /* This function converts a value in pixels into a value in
        the viewport height coordinates (vh). */

    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    var result = (100 * value) / y;
    return result;
}

function get_date(d, is_event) {
    /*  This function returns the date of the data transformed into
        the right date format of javascript. */

    if (is_event) {
        var date = new Date(d.Month + " " + d.Day + ", " + d.Year)
    }
    else {
        // For songs we generate random day/month since we only have the year
        var date = new Date(d.Year, select_random(1, 10), select_random(1, 30))
    }
    return date
}

function event_fields_empty() {
    /*  This function checks whether the input text fields associated to
        the event data points are all empty. */

    var empty_field = (document.getElementById("year-event-field").value == "" &&
        document.getElementById("month-field").value == "" &&
        document.getElementById("day-field").value == "" &&
        document.getElementById("day-field").value == "" &&
        document.getElementById("content-field").value == "")
    return empty_field
}

function song_fields_empty() {
    /*  This function checks whether the input text fields associated to
        the song data points are all empty. */

    var empty_field = (document.getElementById("song-field").value == "" &&
        document.getElementById("artist-field").value == "" &&
        document.getElementById("album-field").value == "" &&
        document.getElementById("year-song-field").value == "" &&
        document.getElementById("rank-field").value == "" &&
        document.getElementById("genre-field").value == "" &&
        document.getElementById("lyrics-field").value == "")
    return empty_field
}

function remove_filters() {
    /*  This function removes the filters. */
    document.getElementById("year-event-field").value = ""
    document.getElementById("month-field").value = ""
    document.getElementById("day-field").value = ""
    document.getElementById("song-field").value = ""
    document.getElementById("artist-field").value = ""
    document.getElementById("album-field").value = ""
    document.getElementById("year-song-field").value = ""
    document.getElementById("rank-field").value = ""
    document.getElementById("genre-field").value = ""
    document.getElementById("lyrics-field").value = ""
    document.getElementById("content-field").value = ""
}

function title_to_subtitle() {
    /*  This function switches the title of the plot area from
        "SELECT A YEAR" to "EVENTS / SONGS". */

    d3.select("#title")
        .transition().duration(750)
        .style("opacity", 0)
        .on("end", function () {
            d3.select("#title")
                .html("&#8593; Events / Songs &#8595;")
                .transition().duration(750)
                .style("opacity", 1)
        })
}

function subtitle_to_title() {
    /*  This function switches the title of the plot area from
        "EVENTS / SONGS" to "SELECT A YEAR". */

    d3.select("#title")
        .transition().duration(750)
        .style("opacity", 0)
        .on("end", function () {
            d3.select("#title")
                .html("select a year")
                .transition().duration(750)
                .style("opacity", 1)
        })
}

function show_button(id) {
    /* This function shows the button with the id "id". */

    d3.select(id)
        .style("visibility", "visible")
        .transition().duration(1500)
        .style("opacity", 1)
}

function hide_button(id) {
    /* This function hides the button with the id "id". */

    d3.select(id)
        .transition().duration(1500)
        .style("opacity", 0)
        .on("end", function () {
            d3.select(id)
                .style("visibility", "hidden")
        })
}

function parse_refs(refs_str) {
    /*  This function parses the references of the data points, which
        have a string type and returns a set of integer. */

    var refs = new Set();
    refs_str.replace("{", "").replace("}", "").split(",").forEach(e => {
        refs.add(parseInt(e, 10))
    });
    return refs
}

function parse_entities(d) {
    /*  This function parses the entities of the data points, which
        have a string type and returns a list of entities. */

    const entities = []
    data.Ents.replace("[", "").replace("]", "").split(",").forEach(e => {
        var s = e;
        while (s.charAt(0) === ' ' || s.charAt(0) === "\"" || s.charAt(0) === "\'") {
            s = s.substr(1);
        }
        s = s.substring(0, s.length - 1);
        entities.push(s)
    });
    return entities
}

function parse_entities_types(d) {
    /*  This function parses the entities of the data points, which
        have a string type and returns a list of entities type. */
        
    const entities_types = []
    d.Ents_types.replace("[", "").replace("]", "").split(",").forEach(e => {
        var s = e;
        while (s.charAt(0) === ' ' || s.charAt(0) === "\"" || s.charAt(0) === "\'") {
            s = s.substr(1);
        }
        s = s.substring(0, s.length - 1);
        entities_types.push(s)
    });
    return entities_types
}

function is_event(d) {
    /*  This function checks whether a given data points is an event or not. */

    return (typeof d.Lyrics_print_embedded === 'undefined')
}

function instant_hide(id) {
    /*  This function hides the element with the given id. */

    d3.select(id)
        .style("opacity", 0)
        .on("end", function () {
            d3.select(this)
                .style("visibility", "hidden")
        })
}

function show(id) {
    /*  This functions shows the element with the given id. */

    d3.select(id)
        .style("visibility", "visible")
        .transition().duration(1000)
        .style("opacity", 1)
}
