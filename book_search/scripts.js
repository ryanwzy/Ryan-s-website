console.log("Ryan");

(function musicDatabase() {
    this.init = function() {
        this.search();
    };

    this.search = function() {

        var form = document.querySelector("#searchForm");

        form.addEventListener("submit", function(e) {
            e.preventDefault();
            var value = document.querySelector("#SearchBox").value;

            form.reset();

            getData(value.split(' ').join("+"));

        });
    };
    this.getData = function(artist) {
        window.location.href = "#book_list";
        document.body.style.overflow = "scroll";
        var http = new XMLHttpRequest();

        http.open(method, url);

        http.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
        http.setRequestHeader("Access-Control-Allow-Origin", "*");

        artist = artist.toString();
        var url = "https://itunes.apple.com/search?term=" + artist + "&entity=ebook";
        var method = "GET";
        var container = document.querySelector('#book_list_container');
        container.innerHTML = '';

        http.open(method, url);
        http.onreadystatechange = function() {
            if (http.readyState = 4 && http.status == 200) {
                console.log("SUCCESS - connected to itunes API");

                showArtist(JSON.parse(http.responseText));
            } else if (http.readyState == XMLHttpRequest.DONE && http.status != 200) {
                console.log("ERROR - connecting to Itunes API")
            }
        }
        http.send();
    };




    this.showArtist = function(obj) {

        console.log(obj);
        var container = document.querySelector("#book_list_container");
        var template = '';
        document.querySelector('#not_match').style.display = "none";
        if (obj.results.length > 0) {
            for (var i = 0; i < obj.results.length; i++) {

                template += '<li class = "col-sm-3 book_item">';
                template += '<div class = "book_thmb">';
                template += '<a href="' + obj.results[i].trackViewUrl + '">';
                template += '<div class = "book_thmb" style = "background: url(' + obj.results[i].artworkUrl100 + ')" >';
                template += '</div>';
                template += '</a>';
                template += '</div>';

                template += '<div class="book"><b>' + obj.results[i].trackName + '</b><br>';
                
                template +=  obj.results[i].artistName + '<br>$'
                template +=  obj.results[i].price + '</div>'
                template += '</li>';

            }
            container.innerHTML = '';
            container.insertAdjacentHTML('afterbegin', template);
        } else {
            document.querySelector('#not_match').style.display = "block";
        }

    };

    this.init();
})();