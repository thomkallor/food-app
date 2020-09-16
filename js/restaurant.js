$(document).ready(function(){
    $("#feedbackTrue").hide();
    $("#feedbackFalse").hide();
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    var base_url = "https://sachinedward.pythonanywhere.com/";

    var url = base_url + "restaurant/" + getParameterByName('res_id');
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        crossDomain: true,
        xhrFields: {
           'withCredentials': true
        },
        success: function(data) {
            if (data.status) {
                data = data.result;
                if (data.featured_image == "") {
                    // $("#banner_img").hide();    
                    $("#banner_img").attr("src", '/images/no-image.png');
                } else {
                    $("#banner_img").attr("src", data.featured_image);
                }
                $("#res_name").text(data.name);
                var rating = "<h2 class='card-text float-right' style='color: #" + data.user_rating.rating_color + "'>" + data.user_rating.aggregate_rating + " / 5</h2>"
                $("#rating").append(rating);
                $("#event").attr("href", data.events_url);
                $("#menu").attr("href", data.menu_url);
                $("#gallery").attr("href", data.photos_url);
                $("#order_url").attr("href", data.order_url);
                $("#cuisines").text(data.cuisines);
                $("#cost").text(data.currency);
                $("#direction").attr("href", "http://maps.google.com/maps?q=" + data.location.latitude + "," + data.location.longitude);
                $("#location").text(data.location.address);
            }
        },
        error: function(data) {
            console.log(data);
        }
    });

    var url = base_url + "feedback/" + getParameterByName('res_id');
    $.ajax({
        type: 'GET',
        url: url,
        dataType: 'json',
        crossDomain: true,
        xhrFields: {
           'withCredentials': true
        },
        success: function(data) {
            if (data.status) {
                data = data.result;
                data.forEach(element => {
                    html = "<div class='card gap'>";
                    html += "<div class='card-header'>";
                    html += "<span class='float-left'>" + element.name + "</span>";
                    html += "<span class='float-right'>" + element.rating+ "/5</span>";
                    html += "</div>";
                    html += "<div class='card-body'>";
                    html += "<p class='card-text'>" + element.content + "</p>";
                    html += "</div>";
                    html += "</div>";
                    $("#content-val").append(html);
                });

            }
        },
        error: function(data) {
            console.log(data);
        }
    });


    $("#feedbackForm").submit(function(e) {
        e.preventDefault();
        console.log($("#feedbackForm").serialize());
        var url =  base_url + "feedback/" + getParameterByName('res_id') + "/";
        $.ajax({
            type: 'POST',
            url: url,
            data: $("#feedbackForm").serialize(),
            dataType: 'json',
            crossDomain: true,
            xhrFields: {
               'withCredentials': true
            },
            success: function(data) {
                if (data.status) {
                    $("#feedbackTrue").show();
                }
            },
            error: function(data) {
                console.log(data);
                $("#feedbackFalse").show();
            }
        });
    });

    

    
});