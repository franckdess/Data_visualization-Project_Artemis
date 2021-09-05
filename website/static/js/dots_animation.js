/*  This script handles the animations related to the data points,
    namely the mouseover, mouseout and click event as well as timeline
    animation, namely the zoom in and zoom out animations. It also handles */

function mouse_over_dot(selection, bubble, text, refs, is_event_clicked) {
    /*  This function handles the "mouseover" event on the dots. It shows the pop-up
        with the summary. */

    // Create the pop-up called bubble
    bubble.transition().duration(DURATION_SHORT)
        .style("opacity", 0.9);
    bubble.html(text)
        .style("left", function () {
            var left = px_to_vw(d3.event.pageX) - 6
            var max_x = px_to_vw(d3.select("#plot-div").node().getBoundingClientRect().width)
            if (left < 0) {
                return 1 + "vw"
            }
            if (left + 12 > max_x) {
                return max_x - 13 + "vw"
            }
            else {
                return left + "vw"
            }
        })
        .style("top", function () {
            var top = px_to_vh(d3.event.pageY) - px_to_vh(document.getElementById("bubble").offsetHeight) - 2
            if (top < 0) {
                return 1 + "vh"
            }
            else {
                return top + "vh"
            }
        })

    // Change the opacity of all circles except the selected one
    d3.selectAll(".circle-event-visible,.circle-song-visible")
        .transition().duration(DURATION_SHORT)
        .style("opacity", 0.25)
        .style("r", "0.15vh")
    // Color on hovered item
    selection
        .transition().duration(DURATION_SHORT)
        .attr("fill", "#f26627")
        .style("r", "0.5vh")
        .style("opacity", 1)

    // Color on items that are references
    var to_select = is_event_clicked ? ".circle-song-visible" : ".circle-event-visible"
    d3.selectAll(to_select)
        .filter(d => parse_refs(refs).has(parseInt(d[""]))) // "" is index column
        .transition().duration(DURATION_SHORT)
        .attr("fill", '#f26627')
        .style("r", "0.5vh")
        .style("opacity", 1)
    if (count_clicked == 0) {
        // Color on items that are referenced and hidden (in the case where a filter is applied)
        var to_select_visible = is_event_clicked ? ".circle-song-hidden" : ".circle-event-hidden"
        d3.selectAll(to_select_visible)
            .filter(d => parse_refs(refs).has(parseInt(d[""]))) // "" is index column
            .attr("class", d => is_event(d) ? "circle-event-visible-filtered" : "circle-song-visible-filtered")
            .style("visibility", "visible")
            .transition().duration(DURATION_SHORT)
            .attr("fill", '#f26627')
            .style("r", "0.5vh")
            .style("opacity", 1)
    }
}

function mouse_out_dot(bubble) {
    /*  This function handles the "mouseout" event on the dots. It hides the pop-up
        and reinitialize the color and the size of all dots. */

    // Hide the pop-up
    bubble.transition()
        .duration(DURATION_SHORT)
        .style("opacity", 0);

    // Reset the datapoints that where previously visible
    d3.selectAll(".circle-event-visible,.circle-song-visible")
        .transition().duration(DURATION_SHORT)
        .style("opacity", 1)
        .attr("fill", '#282828')
        .style("r", "0.25vh")
    // Reset the datapoints that where previously hidden (in the case of a filter)
    d3.selectAll(".circle-event-visible-filtered,.circle-song-visible-filtered")
        .transition().duration(DURATION_SHORT)
        .attr("class", d => is_event(d) ? "circle-event-hidden" : "circle-song-hidden")
        .style("opacity", 0)
        .attr("fill", '#282828')
        .style("r", "0.25vh")
        .on("end", function (d) {
            d3.select(this)
                .style("visibility", "hidden")
        })
}

function on_click_dot(window, title, subtitle, content, refs, is_event_clicked, current_year) {
    /*  This function handle the "click" event on the dots. It shows the upper-half window and lower-half window
        filled with all information from the song and event data. */

    // Create properties depending on the type of data point (event or song)
    var icon_path = is_event_clicked ? "../static/img/cross_white.png" : "../static/img/cross_black.png"
    var font_color = is_event_clicked ? "white" : "#282828"
    var bg_color = is_event_clicked ? "#f26627" : "rgb(233, 233, 233)"
    var style_top = is_event_clicked ? "0px" : "50vh"
    var style_left = "0px"

    count_clicked += 1

    switch (is_event_clicked) {
        case true:
            var points_to_update = filtered_data ? ".circle-song-visible-filtered" : ".circle-song-visible"
            var new_class_hidden = filtered_data ? "circle-song-hidden-preview-filtered" : "circle-song-hidden-preview"
            var new_class_visible = filtered_data ? "circle-song-visible-preview-filtered" : "circle-song-visible-preview"
            break
        case false:
            var points_to_update = filtered_data ? ".circle-event-visible-filtered" : ".circle-event-visible"
            var new_class_hidden = filtered_data ? "circle-event-hidden-preview-filtered" : "circle-event-hidden-preview"
            var new_class_visible = filtered_data ? "circle-event-visible-preview-filtered" : "circle-event-visible-preview"
            break
    }

    hide_button("#open-menu-button")
    hide_button("#show-not-only-linked")
    hide_button("#show-only-linked")
    hide_button("#show-not-only-linked")
    hide_button("#unzoom-button")
    hide_button("#remove-filter-button")

    if (count_clicked == 2) {
        d3.selectAll("#cross1")
            .transition().duration(DURATION_SHORT)
            .style("opacity", 0)
            .on("end", function () {
                d3.select(this)
                    .style("visibility", "hidden")
            })
    }

    d3.select(".tooltip").transition().duration(DURATION_SHORT)
        .style("opacity", 0);

    d3.selectAll(points_to_update)
        .filter(d => parse_refs(refs).has(parseInt(d[""])))
        .transition().duration(DURATION_SHORT)
        .attr("fill", '#f26627')
        .style("r", "0.5vh")
        .style("opacity", 1)
        .on("end", function () {
            d3.select(this)
                .attr("class", new_class_visible)
        })

    d3.selectAll(points_to_update)
        .filter(d => !parse_refs(refs).has(parseInt(d[""])))
        .transition().duration(DURATION_SHORT)
        .style("opacity", 0)
        .on("end", function () {
            d3.select(this)
                .style("visibility", "hidden")
                .attr("class", new_class_hidden)
        })
    xScale.domain([mindate, maxdate])
    if (is_event_clicked) {
        xAxis = fc.axisBottom(xScale)
            .tickArguments([51])
            .tickCenterLabel(true)
            .tickSizeInner(0)
            .tickSizeOuter(0)
    }
    else {
        xAxis = fc.axisTop(xScale)
            .tickArguments([51])
            .tickCenterLabel(true)
            .tickSizeInner(0)
            .tickSizeOuter(0)

        d3.select("#title")
            .transition().duration(DURATION_LONG)
            .style("opacity", 0)
    }
    d3.select("#plot").select(".xaxis")
        .transition().delay(DURATION_SHORT).duration(DURATION_LONG)
        .call(xAxis)
        .on("end", make_year_non_clickable())
    d3.selectAll("circle")
        .transition().delay(DURATION_SHORT).duration(DURATION_LONG)
        .attr("cx", d => xScale(get_date(d, is_event(d))))


    // Show the half window
    window.style("visibility", "visible")
        .transition().duration(DURATION_LONG)
        .style("opacity", 1);

    // Add the close button
    window.append('img')
        .attr("class", "cross")
        .attr("id", function () {
            if (count_clicked == 1) {
                return "cross1"
            }
            else if (count_clicked == 2) {
                return "cross2"
            }
        })
        .attr("src", icon_path)
        // Handle the click event
        .on("click", function () {
            on_click_close_half_window(is_event_clicked, current_year, new_class_hidden, new_class_visible)
            window.transition().duration(DURATION_LONG)
                .style("opacity", 0)
                .on("end", function () {
                    window.transition().delay(DURATION_LONG)
                        .style("visibility", "hidden")
                    window.selectAll('p')
                        .remove()
                    window.selectAll('img')
                        .remove()
                });
        })
        // Handle the mouseover event
        .on("mouseover", function () {
            d3.select(this)
                .style("cursor", "pointer")
        })

    // Format the space in the half window div
    var left_div = window.append("div")
        .attr("class", "left-div")
    left_div.append('p')
        .attr("class", "title-box")
        .html(title + subtitle)
    if (is_event_clicked) {
        var right_div = window.append("div")
            .attr("class", "right-div-event")
        right_div.append('p')
            .attr("class", "p-box-event")
            .html(content)
    }
    else {
        var right_div = window.append("div")
            .attr("class", "right-div-song")
        right_div.append('p')
            .attr("class", "p-box-song")
            .html(content.replace("\n\n", "\n"))
    }
    window
        .style("top", style_top)
        .style("left", style_left)
        .style("color", font_color)
        .style("background", bg_color)
}

function zoom_in(min_date, max_date) {
    /*  This function handles the "zoom-in" function of the time line. It updates the x-axis as well as
        the data points position. */

    // Change the title once zoomed in
    if (!zoomed_in && !filtered_data) {
        title_to_subtitle()
    }

    // Handle the x-axis
    xScale.domain([min_date, max_date])
    xAxis = fc.axisBottom(xScale)
        .tickArguments([5])
        .tickCenterLabel(true)
        .tickSizeInner(0)
        .tickSizeOuter(0)

    // Show zoom-out button
    if (!demo_in_progress) {
        show_button("#unzoom-button")

    }

    // Update the x-axis and the data points position
    d3.select("#plot").select(".xaxis")
        .transition().duration(DURATION_LONG)
        .call(xAxis)
        .on("end", function () {
            make_year_clickable()
        })

    // If not zoomed and not filtered (start state) we display the points and set their position
    if (!zoomed_in && !filtered_data) {
        d3.selectAll(".circle-event-hidden, .circle-song-hidden")
            .filter(d => show_only_linked ? +d.num_refs > 0 : true)
            .style("visibility", "visible")
            .transition().duration(DURATION_LONG)
            .attr("cx", d => xScale(get_date(d, is_event(d))))
            .style("opacity", 1)
            .on("end", function () {
                d3.select(this)
                    .attr("class", d => is_event(d) ? "circle-event-visible" : "circle-song-visible")
            })
    }
    // Otherwise, we already have points plotted and we only want to change their position
    else {
        d3.select("#plot-area").selectAll("circle")
            .transition().duration(DURATION_LONG)
            .attr("cx", d => xScale(get_date(d, is_event(d))))
    }
    zoomed_in = true
}

function zoom_out() {
    /*  This function handle the "zoom-out" function of the time-line. This function is called
        when the "zoom-out" button is clicked. */

    // Change the title
    if (demo_in_progress) {
        d3.select("#title")
            .transition().duration(750)
            .style("opacity", 0)
            .on("end", function () {
                d3.select("#title")
                    .html("Your turn now !")
                    .transition().duration(750)
                    .style("opacity", 1)
            })
    }
    else if (!filtered_data) {
        subtitle_to_title()
    }

    // Update x-axis
    xScale.domain([mindate, maxdate])
    xAxis = fc.axisBottom(xScale)
        .tickArguments([51])
        .tickCenterLabel(true)
        .tickSizeInner(0)
        .tickSizeOuter(0)
    d3.select("#plot").select(".xaxis")
        .transition().duration(DURATION_LONG)
        .call(xAxis)
        .on("end", function () {
            make_year_clickable()
        })

    // Hide unzoom button
    hide_button("#unzoom-button")

    // Update data points position
    if (!filtered_data) {
        d3.selectAll(".circle-event-visible, .circle-song-visible")
            .transition().duration(DURATION_LONG)
            .attr("cx", d => xScale(get_date(d, is_event(d))))
            .style("opacity", 0)
            .on("end", function () {
                d3.select(this)
                    .style("visibility", "hidden")
                    .attr("class", d => is_event(d) ? "circle-event-hidden" : "circle-song-hidden")
            })
    }
    else {
        d3.selectAll(".circle-event-visible, .circle-song-visible")
            .transition().duration(DURATION_LONG)
            .attr("cx", d => xScale(get_date(d, is_event(d))))
    }
    zoomed_in = false
}

function make_year_clickable() {
    /*  This function makes the year ticks clickable, allowing the user
        to zoom into the time line by selecting a year tick. */

    d3.selectAll(".tick")
        // Handle the mouseover event
        .on("mouseover", function () {
            d3.select(this).select("text")
                .transition().duration(DURATION_SHORT)
                .style("fill", "#f26627")
                .style("cursor", "pointer")
        })
        // Handle the mouseout event
        .on("mouseout", function () {
            d3.select(this).select("text")
                .transition().duration(DURATION_SHORT)
                .style("fill", "#282828")
                .style("cursor", "pointer")
        })
        // Handle the click event
        .on("click", function () {
            d3.select("#menu")
                .transition().duration(DURATION_SHORT)
                .style("left", "-30vw")
            var current_date = +d3.select(this).text()
            // Handle the lower bound
            if (current_date == 1965 || current_date == 1966) {
                current_date = 1967
            }
            // Handle the upper bound
            if (current_date == 2014 || current_date == 2015) {
                current_date = 2013
            }
            var min_date = new Date(current_date - 2, 0, 1)
            var max_date = new Date(current_date + 2, 11, 31)
            zoom_in(min_date, max_date)
            zoomed_in = true
        })
}

function make_year_non_clickable() {
    /*  This function makes the year ticks non-clickable, preventing the user
        to zoom into the time line by selecting a year tick. */

    d3.selectAll(".tick")
        // Handle the mouseover event
        .on("mouseover", function () {
            
        })
        // Handle the mouseout event
        .on("mouseout", function () {
            
        })
        // Handle the click event
        .on("click", function () {
            
        })
}

function get_song_query(d, neg) {
    /*  This function checks whether the attributes of a given song data points d match 
        the query of the input fields. */

    var query = d.Song.toLowerCase().includes(document.getElementById("song-field").value.toLowerCase()) &&
        d.Artist.toLowerCase().includes(document.getElementById("artist-field").value.toLowerCase()) &&
        d.Album.toLowerCase().includes(document.getElementById("album-field").value.toLowerCase()) &&
        d.Year.toLowerCase().includes(document.getElementById("year-song-field").value.toLowerCase()) &&
        d.Rank.toLowerCase().includes(document.getElementById("rank-field").value.toLowerCase()) &&
        d.Genre.toLowerCase().includes(document.getElementById("genre-field").value.toLowerCase()) &&
        d.Lyrics_print.toLowerCase().includes(document.getElementById("lyrics-field").value.toLowerCase())
    if (neg) {
        query = !query
    }
    return song_fields_empty() ? false : query
}

function get_event_query(d, neg) {
    /*  This function checks whether the attributes of a given event data points d match 
       the query of the input fields. */

    var query = d.Year.toLowerCase().includes(document.getElementById("year-event-field").value.toLowerCase()) &&
                d.Month.toLowerCase().includes(document.getElementById("month-field").value.toLowerCase()) &&
                d.Day.toLowerCase().includes(document.getElementById("day-field").value.toLowerCase()) &&
               (d.Content.toLowerCase().includes(document.getElementById("content-field").value.toLowerCase()) ||
                d.Summary.toLowerCase().includes(document.getElementById("content-field").value.toLowerCase()))
    if (neg) {
        query = !query
    }
    return event_fields_empty() ? false : query
}

function apply_filter() {
    /*  This function handles the filters passed by the user in the filter menu
        to the data points */

    // All the points that are visible but does not match the filter becomes hidden
    d3.selectAll(".circle-event-visible, .circle-song-visible")
        .filter(function (d) {
            bool_1 = is_event(d) ? get_event_query(d, true) : get_song_query(d, true)
            bool_2 = show_only_linked ? parseInt(d.num_refs, 10) > 0 : true
            return bool_1 && bool_2
        })
        .transition().duration(DURATION_LONG)
        .style("opacity", 0)
        .on("end", function () {
            d3.select(this)
                .style("visibility", "hidden")
                .attr("class", d => is_event(d) ? "circle-event-hidden" : "circle-song-hidden")
        })
    // All the points that are hidden but does match the filter becomes visible
    d3.selectAll(".circle-event-hidden, .circle-song-hidden")
        .filter(function (d) {
            bool_1 = is_event(d) ? get_event_query(d, false) : get_song_query(d, false)
            bool_2 = show_only_linked ? parseInt(d.num_refs, 10) > 0 : true
            return bool_1 && bool_2
        })
        .style("visibility", "visible")
        .transition().duration(DURATION_LONG)
        .style("opacity", 1)
        .on("end", function () {
            d3.select(this)
                .attr("class", d => is_event(d) ? "circle-event-visible" : "circle-song-visible")
        })
}

function hide_unlinked_data_points() {
    /*  This function hides the data points with no references to display
        only those that have at least one reference. */

    // We hide the visible points with no links
    if (filtered_data) {
        d3.selectAll(".circle-event-visible, .circle-song-visible")
            .filter(d => +d.num_refs == 0)
            .transition().duration(DURATION_LONG)
            .style("opacity", 0)
            .on("end", function (d) {
                d3.select(this)
                    .style("visibility", "hidden")
                    .attr("class", is_event(d) ? "circle-event-hidden" : "circle-song-hidden")
            })
    }
    else {
        d3.selectAll(".circle-event-visible, .circle-song-visible")
            .filter(d => +d.num_refs == 0)
            .transition().duration(DURATION_LONG)
            .style("opacity", 0)
            .on("end", function () {
                d3.select(this)
                    .style("visibility", "hidden")
                    .attr("class", d => is_event(d) ? "circle-event-hidden" : "circle-song-hidden")
            })
    }
    show_only_linked = true
}

function show_unlinked_data_points() {
    /*  This functions displays all the points, even those with no
        references. */

    // We show the visible points with no links
    if (filtered_data) {
        d3.selectAll(".circle-event-hidden, .circle-song-hidden")
            .filter(d => is_event(d) ? get_event_query(d, false) : get_song_query(d, false))
            .attr("cx", d => xScale(get_date(d, is_event(d))))
            .style("visibility", "visible")
            .transition().duration(DURATION_LONG)
            .style("opacity", 1)
            .on("end", function (d) {
                d3.select(this)
                    .attr("class", is_event(d) ? "circle-event-visible" : "circle-song-visible")
            })
    }
    else if (!filtered_data && zoomed_in) {
        d3.selectAll(".circle-event-hidden, .circle-song-hidden")
            .attr("cx", d => xScale(get_date(d, is_event(d))))
            .style("visibility", "visible")
            .transition().duration(DURATION_LONG)
            .style("opacity", 1)
            .on("end", function (d) {
                d3.select(this)
                    .attr("class", is_event(d) ? "circle-event-visible" : "circle-song-visible")
            })
    }
    show_only_linked = false
}


function show_all_data(data) {
    /*  This function shows all song data points. */

    switch (data) {
        case "events":
            var select_all = ".circle-event-hidden"
            var new_class = "circle-event-visible"
            break
        case "songs":
            var select_all = ".circle-song-hidden"
            var new_class = "circle-song-visible"
            break
    }
    d3.selectAll(select_all)
        .filter(d => show_only_linked ? +d.num_refs > 0 : true)
        .style("visibility", "visible")
        .transition().duration(DURATION_LONG)
        .style("opacity", 1)
        .on("end", function () {
            d3.select(this)
                .attr("class", new_class)
        })
}

function hide_all_data(data) {
    /*  This function hide all event data points. */

    switch (data) {
        case "events":
            var select_all = ".circle-event-visible"
            var new_class = "circle-event-hidden"
            break
        case "songs":
            var select_all = ".circle-song-visible"
            var new_class = "circle-song-hidden"
            break
    }
    d3.selectAll(select_all)
        .transition().duration(DURATION_LONG)
        .style("opacity", 0)
        .on("end", function () {
            d3.select(this)
                .style("visibility", "hidden")
                .attr("class", new_class)
        })
}

function on_click_close_half_window(is_event_clicked, current_year, new_class_hidden, new_class_visible) {
    /*  This function handles the event when the half-window is closed properly
        by checking all the different situation. */

    switch (is_event_clicked) {
        case true:
            var points_to_show = "." + new_class_hidden
            var new_class = "circle-song-visible"
            break
        case false:
            var points_to_show = "." + new_class_hidden
            var new_class = "circle-event-visible"
            break
    }

    var points_to_update = "." + new_class_visible

    // We are in the case where only one half-window is open and the data points are not filtered
    if (count_clicked == 1 && !filtered_data) {
        show_button("#open-menu-button")
        show_only_linked ? show_button("#show-not-only-linked") : show_button("#show-only-linked")
        zoomed_in ? show_button("#unzoom-button") : hide_button("#unzoom-button")
        filtered_data ? show_button("#remove-filter-button") : hide_button("#remove-filter-button")

        xScale.domain([new Date(+current_year - 2, 0, 1), new Date(+current_year + 2, 11, 31)])
        xAxis = fc.axisBottom(xScale)
            .tickArguments([5])
            .tickCenterLabel(true)
            .tickSizeInner(0)
            .tickSizeOuter(0)
        d3.select("#plot").select(".xaxis")
            .transition().duration(DURATION_LONG)
            .call(xAxis)
            .on("end", make_year_clickable)
        d3.select("#title")
            .transition().duration(DURATION_LONG)
            .style("opacity", 1)
        d3.selectAll("circle")
            .transition().duration(DURATION_LONG)
            .attr("cx", d => xScale(get_date(d, is_event(d))))
        d3.selectAll(points_to_show)
            .style("visibility", "visible")
            .transition().delay(DURATION_LONG - DURATION_SHORT).duration(DURATION_LONG)
            .style("opacity", 1)
            .style("r", "0.25vh")
            .attr("class", new_class)
        d3.selectAll(points_to_update)
            .transition().delay(DURATION_LONG - DURATION_SHORT).duration(DURATION_LONG)
            .style("opacity", 1)
            .attr("fill", '#282828')
            .style("r", "0.25vh")
            .attr("class", new_class)
        count_clicked = 0

    }
    // We are in the case where only one half-window is open and the data points are filtered
    else if (count_clicked == 1 && filtered_data) {
        show_button("#open-menu-button")
        show_only_linked ? show_button("#show-not-only-linked") : show_button("#show-only-linked")
        zoomed_in ? show_button("#unzoom-button") : hide_button("#unzoom-button")
        filtered_data ? show_button("#remove-filter-button") : hide("#remove-filter-button")
        // If we zoomed in the time-line
        if (zoomed_in) {
            xScale.domain([new Date(+current_year - 2, 0, 1), new Date(+current_year + 2, 11, 31)])
            xAxis = fc.axisBottom(xScale)
                .tickArguments([5])
                .tickCenterLabel(true)
                .tickSizeInner(0)
                .tickSizeOuter(0)
            d3.select("#plot").select(".xaxis")
                .transition().duration(DURATION_LONG)
                .call(xAxis)
                .on("end", make_year_clickable())
            d3.select("#title")
                .transition().duration(DURATION_LONG)
                .style("opacity", 1)
            d3.selectAll("circle")
                .transition().duration(DURATION_LONG)
                .attr("cx", d => xScale(get_date(d, is_event(d))))
            // Points to hide
            d3.selectAll(".circle-event-visible-preview-filtered,.circle-song-visible-preview-filtered")
                .transition().duration(DURATION_SHORT)
                .attr("class", d => is_event(d) ? "circle-event-hidden" : "circle-song-hidden")
                .style("opacity", 0)
                .attr("fill", '#282828')
                .style("r", "0.25vh")
                .on("end", function (d) {
                    d3.select(this)
                        .style("visibility", "hidden")
                })
            count_clicked = 0
        }
        // If we did not zoom in the time-line
        else {
            xScale.domain([mindate, maxdate])
            xAxis = fc.axisBottom(xScale)
                .tickArguments([51])
                .tickCenterLabel(true)
                .tickSizeInner(0)
                .tickSizeOuter(0)
            d3.select("#plot").select(".xaxis")
                .transition().duration(DURATION_LONG)
                .call(xAxis)
                .on("end", make_year_clickable())
            d3.select("#title")
                .transition().duration(DURATION_LONG)
                .style("opacity", 1)
            // Points to hide
            d3.selectAll(".circle-event-visible-preview-filtered,.circle-song-visible-preview-filtered")
                .transition().duration(DURATION_SHORT)
                .attr("class", d => is_event(d) ? "circle-event-hidden" : "circle-song-hidden")
                .style("opacity", 0)
                .attr("fill", '#282828')
                .style("r", "0.25vh")
                .on("end", function () {
                    d3.select(this)
                        .style("visibility", "hidden")
                })
            count_clicked = 0
        }
    }
    // We are in the case where both half-window are open
    else if (count_clicked == 2) {
        xScale.domain([mindate, maxdate])
        if (is_event_clicked) {
            xAxis = fc.axisTop(xScale)
                .tickArguments([51])
                .tickCenterLabel(true)
                .tickSizeInner(0)
                .tickSizeOuter(0)
            d3.select("#plot").select(".xaxis")
                .transition().duration(DURATION_LONG)
                .call(xAxis)
        }
        else {
            xAxis = fc.axisBottom(xScale)
                .tickArguments([51])
                .tickCenterLabel(true)
                .tickSizeInner(0)
                .tickSizeOuter(0)
            d3.select("#plot").select(".xaxis")
                .transition().duration(DURATION_LONG)
                .call(xAxis)
        }
        d3.selectAll("#cross1")
            .style("visibility", "visible")
            .transition().duration(DURATION_SHORT)
            .style("opacity", 1)
        count_clicked -= 1
        d3.selectAll(points_to_show)
            .style("visibility", "visible")
            .transition().duration(DURATION_SHORT)
            .style("opacity", 1)
            .style("r", "0.25vh")
            .on("end", function () {
                d3.select(this)
                    .attr("class", new_class)
            })
        d3.selectAll(points_to_update)
            .transition().duration(DURATION_SHORT)
            .style("opacity", 1)
            .attr("fill", '#282828')
            .style("r", "0.25vh")
            .on("end", function () {
                d3.select(this)
                    .attr("class", new_class)
            })
    }
}
