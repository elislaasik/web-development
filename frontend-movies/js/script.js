// here we define the JSON data for the movies
var movies = [
        {"title" : "Spy", "url" : "YrY3v1eDmQY"},
        {"title" : "Bridge of Spies", "url" : "mBBuzHrZBro"},
        {"title" : "Tinker Tailor Soldier Spy", "url" : "VW-F1H-Nonk"},
        {"title" : "Kingsman: the secret service", "url" : "kl8F-8tR8to"},
        {"title" : "SKyfall", "url" : "6kw1UVovByw"},
        {"title" : "The Man from UNCLE", "url" : "-x08iNZ8Mfc"},
        {"title" : "The spy who dumped me", "url" : "CXkUaaVrB_s&t"},
        {"title" : "Atomic blonde", "url" : "aieQrj9Yy8s"},
        {"title" : "Red Sparrow", "url" : "PmUL6wMpMWw&t"},
        {"title" : "Casino Royale", "url" : "36mnx8dBbGE"},


    ]

//this is the API key I'm fetching through
let baseUrl =  "https://www.omdbapi.com/?apikey=ca3f1a0&t="

// This function retrieves the data based on the key and then displays the data in the html
function giveMeStuff() {
    movies.forEach(film => {
        fetch(baseUrl + film.title) // Call the fetch function passing the url of the API as a parameter
            .then(function (elis) {
                return elis.json();
            })
            .then(function (elisabeth) {
                console.log(elisabeth)


                const wrapper = document.querySelector('.main');
                const movieContainer = document.createElement("section");
                movieContainer.classList.add('child');
                const contentContainer = document.createElement("div");
                contentContainer.classList.add('clickEffect');



                const image = document.createElement('img');
                image.src = elisabeth.Poster;

                /* ----- adds the interactivity to the movie posters  -------*/
                image.addEventListener('click', function(){
                    contentContainer.classList.toggle('displayed')

                })




                const title = document.createElement('h2');
                title.innerHTML = elisabeth.Title;

                const director = document.createElement('p');
                director.innerHTML = "Director:" + elisabeth.Director;

                const imbd = document.createElement('p');
                //console.log(elisabeth.Ratings)
                imbd.innerHTML = "IMBD rating:" + elisabeth.Ratings[0].Value;

                let date1 = (new Date()).getTime();
                let date2 = (new Date(elisabeth.Released)).getTime();
                var releaseYear = Math.round((date1 - date2) / 31424105881.8);

                const age = document.createElement('p');
                age.innerHTML = "Movie age: " + releaseYear;

                const plot = document.createElement('p');
                plot.innerHTML = elisabeth.Plot;

                /// youtube thing
                const video = document.createElement('iframe');
                video.setAttribute('src', `https://www.youtube.com/embed/${film.url}`);


                movieContainer.appendChild(image);
                contentContainer.appendChild(title);
                contentContainer.appendChild(director);
                contentContainer.appendChild(imbd);
                contentContainer.appendChild(age);
                contentContainer.appendChild(plot);
                contentContainer.appendChild(video);
                movieContainer.appendChild(contentContainer);
                console.log(movieContainer, contentContainer);
                wrapper.appendChild(movieContainer);


            })
    })
}
giveMeStuff()




// when you click the movie poster then you get the data for the movies




















/* ------- COOL BACKGROUND outsorced from https://codepen.io/Fata-ku/pen/nFlao --------*/
"use strict";

// background animation
(function() {

    var Base, Particle, canvas, colors, context, draw, drawables, i, mouseX, mouseY, mouseVX, mouseVY, rand, update, click, min, max, colors, particles;

    min = 1;
    max = 8;
    particles = 200;
    colors = ["64, 32, 0", "250, 64, 0", "64, 0, 0", "200, 200, 200"];

    rand = function(a, b) {
        return Math.random() * (b - a) + a;
    };

    Particle = (function() {
        function Particle() {
            this.reset();
        }

        Particle.prototype.reset = function() {
            this.color = colors[~~(Math.random()*colors.length)];
            this.radius = rand(min, max);
            this.x = rand(0, canvas.width);
            this.y = rand(-20, canvas.height*0.5);
            this.vx = -5 + Math.random()*10;
            this.vy = 0.7 * this.radius;
            this.valpha = rand(0.02, 0.09);
            this.opacity = 0;
            this.life = 0;
            this.onupdate = undefined;
            this.type = "dust";
        };

        Particle.prototype.update = function() {
            this.x = (this.x + this.vx/3);
            this.y = (this.y + this.vy/3);

            if(this.opacity >=1 && this.valpha > 0) this.valpha *=-1;
            this.opacity += this.valpha/3;
            this.life += this.valpha/3;

            if(this.type === "dust")
                this.opacity = Math.min(1, Math.max(0, this.opacity));
            else
                this.opacity = 1;

            if(this.onupdate) this.onupdate();
            if(this.life < 0 || this.radius <= 0 || this.y > canvas.height){
                this.onupdate = undefined;
                this.reset();
            }
        };

        Particle.prototype.draw = function(c) {
            c.strokeStyle = "rgba(" + this.color + ", " + Math.min(this.opacity, 0.85) + ")";
            c.fillStyle = "rgba(" + this.color + ", " + Math.min(this.opacity, 0.65) + ")";
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
            c.fill();
            c.stroke();
        };

        return Particle;

    })();

    mouseVX = mouseVY = mouseX = mouseY = 0;

    canvas = document.getElementById("bg");
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    drawables = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 1; _i <= particles; i = ++_i) {
            _results.push(new Particle);
        }
        return _results;
    })();

    draw = function() {
        var d, _i, _len;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        context.clearRect(0, 0, canvas.width, canvas.height)

        for (_i = 0, _len = drawables.length; _i < _len; _i++) {
            d = drawables[_i];
            d.draw(context);
        }
    };

    update = function() {
        var d, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = drawables.length; _i < _len; _i++) {
            d = drawables[_i];
            _results.push(d.update());
        }
        return _results;
    };

    document.onmousemove = function(e) {
        mouseVX = mouseX;
        mouseVY = mouseY;
        mouseX = ~~e.pageX;
        mouseY = ~~e.pageY;
        mouseVX = ~~((mouseVX - mouseX)/2);
        mouseVY = ~~((mouseVY - mouseY)/2);

    };

    window.addEventListener('resize', draw, false);
    setInterval(draw, 1000 / 30);
    setInterval(update, 1000 / 60);
}).call(this);
