$(document).ready(function(){
    var base_url = "https://sachinedward.pythonanywhere.com/";
    $("#list-value").hide();
    
    var next = null;
    var prev = null;
    function initGeolocation() {
        if( navigator.geolocation ) {
            navigator.geolocation.getCurrentPosition( success, fail );
        } else {
            alert("Sorry, your browser does not support geolocation services.");
        }
    }

    function success(position) {
        document.getElementById('lon').value = position.coords.longitude;
        document.getElementById('lat').value = position.coords.latitude
        // console.log(position.coords.latitude, position.coords.longitude);
        // $("#inputGroupSelect01").prop("readonly", true);
        $("#inputGroupSelect01").val("Chennai");
    }

    function fail() {
        // console.log("not");
    }

    $('#inputGroupSelect01').on('change', function() {
        $("#lat").val("");
        $("#lon").val("");
    });

    function get_html(data) {
        console.log(data);
        html = "<a href='restaurant/?res_id=" + data.id + "' class='list-group-item list-group-item-action flex-column align-items-start'>";
        html += "<div class='container column'>";
        html += "<div>";
        html += "<div class='d-flex w-100 justify-content-between'>";
        html += "<h5 class='mb-1'>" + data.name + "</h5>";
        html += "<small>Rating: " + data.user_rating.aggregate_rating + "</small>";
        html += "</div>";
        html += "<p class='mb-1'>" + data.cuisines + "</p>";
        html += "<small>" + data.location.locality_verbose + "</small>";
        html += "</div>";
        html += "<div class='ml-5'>";
        html += "<img src='" + data.thumb + "'>";
        html += "</div>";
        html += "</div>";
        html += "</a>";
        return html;
    }

    initGeolocation();

    $("#searchform").submit(function(e) {
        $("#content-res").empty();
        e.preventDefault();
        var url = base_url + "search/";
        $.ajax({
            type: 'POST',
            url: url,
            data: $("#searchform").serialize(),
            dataType: 'json',
            crossDomain: true,
            xhrFields: {
               'withCredentials': true
            },
            success: function(data) {
                if (data.status) {
                        $("#list-value").show();
                        if (data.result.results_found > 20) {
                            page_current = (data.result.results_start / 20) + 1;
                            if (page_current > 1) {
                                $("#previousButton").show();
                                prev = page_current - 1;
                            } else {
                                $("#previousButton").hide();
                            }
                            next = page_current + 1;
                        }
                        restaurants = data.result.restaurants;
                        restaurants.forEach(element => {
                        restaurant = element.restaurant;
                        data = restaurant;
                        html = "<a href=restaurant.html?res_id=" + data.id + " class='list-group-item item-content'>";
                        html += "<div class='container column'>";
                        html += "<div class='float-left'>";
                        html += "<div class='d-flex w-100 justify-content-between'>";
                        html += "<h5 class='mb-1'>" + data.name + "</h5>";
                        html += "</div>";
                        html += "<p class='mb-1'>" + data.cuisines + "</p>";
                        html += "<small>" + data.location.locality_verbose + "</small> <br/>";
                        html += "<small>Rating: " + data.user_rating.aggregate_rating + "</small>";
                        html += "</div>";
                        html += "<div class='ml-5 d-none d-sm-block float-right'>";
                        if (data.thumb == "") {
                            html += "<img src='/images/no-image.png' height='200px'>";
                        } else {
                            html += "<img src='" + data.thumb + "'>";
                        }
                        html += "</div>";
                        html += "</div>";
                        html += "</a>";
                        // console.log(html);
                        $("#content-res").append(html);
                        
                    });
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    });

    $("#previousButton").click(function(e) {
        e.preventDefault();
        $("#content-res").empty();
        e.preventDefault();
        var url = base_url + "search/";
        var data =$("#searchform").serialize() + '&page=' + prev;
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            crossDomain: true,
            xhrFields: {
               'withCredentials': true
            },
            success: function(data) {
                if (data.status) {
                        $("#list-value").show();
                        if (data.result.results_found > 20) {
                            page_current = (data.result.results_start / 20) + 1;
                            if (page_current > 1) {
                                $("#previousButton").show();
                                prev = page_current - 1;
                            } else {
                                $("#previousButton").hide();
                            }
                            next = page_current + 1;
                        }
                        restaurants = data.result.restaurants;
                        restaurants.forEach(element => {
                        restaurant = element.restaurant;
                        data = restaurant;
                        html = "<a href=restaurant.html?res_id=" + data.id + " class='list-group-item item-content'>";
                        html += "<div class='container column'>";
                        html += "<div class='float-left'>";
                        html += "<div class='d-flex w-100 justify-content-between'>";
                        html += "<h5 class='mb-1'>" + data.name + "</h5>";
                        html += "</div>";
                        html += "<p class='mb-1'>" + data.cuisines + "</p>";
                        html += "<small>" + data.location.locality_verbose + "</small> <br/>";
                        html += "<small>Rating: " + data.user_rating.aggregate_rating + "</small>";
                        html += "</div>";
                        html += "<div class='ml-5 d-none d-sm-block float-right'>";
                        if (data.thumb == "") {
                            html += "<img src='/images/no-image.png' height='200px'>";
                        } else {
                            html += "<img src='" + data.thumb + "'>";
                        }
                        html += "</div>";
                        html += "</div>";
                        html += "</a>";
                        $("#content-res").append(html);
                        
                    });
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    });
    $("#nextButton").click(function(e) {
        e.preventDefault();
        $("#content-res").empty();
        e.preventDefault();
        var data =$("#searchform").serialize() + '&page=' + next;
        var url = base_url + "search/";
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            dataType: 'json',
            crossDomain: true,
            xhrFields: {
               'withCredentials': true
            },
            success: function(data) {
                if (data.status) {
                        $("#list-value").show();
                        if (data.result.results_found > 20) {
                            page_current = (data.result.results_start / 20) + 1;
                            if (page_current > 1) {
                                $("#previousButton").show();
                                prev = page_current - 1;
                            } else {
                                $("#previousButton").hide();
                            }
                            next = page_current + 1;
                        }
                        restaurants = data.result.restaurants;
                        restaurants.forEach(element => {
                        restaurant = element.restaurant;
                        data = restaurant;
                        html = "<a href=restaurant.html?res_id=" + data.id + " class='list-group-item item-content'>";
                        html += "<div class='container column'>";
                        html += "<div class='float-left'>";
                        html += "<div class='d-flex w-100 justify-content-between'>";
                        html += "<h5 class='mb-1'>" + data.name + "</h5>";
                        html += "</div>";
                        html += "<p class='mb-1'>" + data.cuisines + "</p>";
                        html += "<small>" + data.location.locality_verbose + "</small> <br/>";
                        html += "<small>Rating: " + data.user_rating.aggregate_rating + "</small>";
                        html += "</div>";
                        html += "<div class='ml-5 d-none d-sm-block float-right'>";
                        if (data.thumb == "") {
                            html += "<img src='/images/no-image.png' height='200px'>";
                        } else {
                            html += "<img src='" + data.thumb + "'>";
                        }
                        html += "</div>";
                        html += "</div>";
                        html += "</a>";
                        // console.log(html);
                        $("#content-res").append(html);
                        
                    });
                }
            },
            error: function(data) {
                console.log(data);
            }
        });
    });

    
});
