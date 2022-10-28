/*global $, alert, console*/
// ----------------------------- home button style -----------------------------

var homeWidth = (Math.random() + .5) * 30,
    stckWidth = Math.random() * 150 + 20,
    margin = Math.random() * window.innerWidth * .25;


$('.stick').css("width", stckWidth + 'px');
$('.stick').css("top", (window.innerHeight - $(".stick").height()) / 2);

$('.stick.left').css("left", margin + 'px');
$('.stick.right').css("right", margin + 'px');



var homeLft = window.innerWidth / 2 - homeWidth / 2;
$('.home').css({
    width: homeWidth + 'px',
    height: homeWidth + 'px'
});

$('.home').css("left", homeLft);
$('.home').css("top", (window.innerHeight - $(".home").height()) / 2);

$('.timer').css("left", (window.innerWidth - $(".timer").width()) / 2);
$('.timer').css("bottom", (window.innerHeight - $(".stick").height()) / 2);

$('.start').css("left", (window.innerWidth - $(".start").width()) / 2 - 5);
$('.start').css("bottom", (window.innerHeight - $(".stick").height()));

$('.info').css("left", (window.innerWidth - $(".info").width()) / 2);
$('.info').css("top", (window.innerHeight/4 - $(".info").height()) / 2);

$('.shape').css("left", (window.innerWidth - $(".shape").width()) / 2);
$('.shape').css("top", (window.innerHeight - $(".shape").height()) / 2);

$('.reset').css("left", (window.innerWidth - $(".reset").width()) / 2);
$('.reset').css("bottom", (window.innerHeight - $(".stick").height()) / 2 + 50);


$(window).on("resize", function () {
    'use strict';
    $('.stick').css("top", (window.innerHeight - $(".stick").height()) / 2);
    $('.timer').css("left", (window.innerWidth - $(".timer").width()) / 2);
    $('.start').css("bottom", (window.innerHeight - $(".stick").height()));
    $('.info').css("top", (window.innerHeight/4 - $(".info").height()) / 2);
    $('.shape').css("top", (window.innerHeight - $(".shape").height()) / 2);
    
    
    homeLft = window.innerWidth / 2 - homeWidth / 2;
    $('.home').css("left", homeLft);
    $('.home').css("top", (window.innerHeight - $(".home").height()) / 2);
    
    $('.reset').css("left", (window.innerWidth - $(".reset").width()) / 2);
    $('.reset').css("bottom", (window.innerHeight - $(".stick").height()) / 2 + 50);
});

// ------------------------------ click effect ------------------------

(function ($, window, document, undefined) {
    
    'use strict';
    var $stick = $('.stick');
    
        
    
    // ----------------------- Loading Screen ------------------------------------------
    
    $('.start').on("click", function(){
        $(".loading").delay(500).fadeOut("slow", function () {
            $("body").css("overflow", "auto");
            $(".header").addClass("hdr-trnslt");
        });
    });


    // ------------------------- click on circle to start ---------------------------------------
    $('.home').on("click", function(){
       $('.home').addClass('is-active');
    });
   
    
    $('.stick').on('click.ui.ripple', function (e) {
        
        // only apply if the user started with home button otherwise no change
        if(document.getElementById("home").classList.contains("is-active")){
            
            var $this = $(this),
                $offset = $this.offset(),
                $circle = $this.find('.circle');

            var x = e.pageX - $offset.left;
            var y = e.pageY - $offset.top;

            $circle.css({
                top: y + 'px',
                left: x + 'px'
            });

            $this.addClass('is-active');
        }
        
    });

    
    
    $stick.on('animationend webkitAnimationEnd oanimationend MSAnimationEnd', function (e) {
        $('.stick.is-active .circle').css({
            width: 500000 + 'px',
            height: 200000 + 'px'
        });
            
        // ------------------------------ Reset ------------------------
        let leftElem = document.getElementById("left");
        let homeElem = document.getElementById("home");
        let rightElem = document.getElementById("right");

        let lftActive = leftElem.classList.contains('is-active'),
            hometActive = rightElem.classList.contains('is-active'),
            rittActive = homeElem.classList.contains('is-active');
        
            if(lftActive && rittActive && hometActive){
                $('.home').removeClass("is-active");
                $('.circle').removeClass("is-active");
                $('.circle').css({width: 0, height: 0});
                $('.stick.left').removeClass("is-active");
                $('.stick.right').removeClass("is-active");
                
                homeWidth = (Math.random() + .5) * 50,
                stckWidth = Math.random() * 150 + 20,
                margin = Math.random() * window.innerWidth * .25;

                $('.stick').css("width", stckWidth + 'px');
                $('.stick').css("top", (window.innerHeight - $(".stick").height()) / 2);
                
                $('.stick.left').css("left", margin + 'px');
                $('.stick.right').css("right", margin + 'px');


                homeLft = window.innerWidth / 2 - homeWidth / 2;
                $('.home').css({ width: homeWidth + 'px', height: homeWidth + 'px' });
                $('.home').css("left", homeLft);
                $('.home').css("top", (window.innerHeight - $(".home").height()) / 2);
        }
        
    });
    
    
})(jQuery, window, document);

























// ---------------------------------------- plot ------------------------

            
            var acuX = 0,
                acuX2 = 0,
                acuY = 0,
                acuXY = 0, 
                a = 0, b = 0,
                minimum = -1, maximum = 4;

            var process = {
                x: [],
                y: [],
                mode: 'markers',
                type: 'scatter',
                name: "Your process"
            };


            let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
            let timerRef = document.querySelector('.timer');
            let int = null;
            let [pmil, psec] = [0, 0];
            let d = 0, W = 0;

            document.getElementById('home').addEventListener('click', ()=>{
                if(int !== null){
                    clearInterval(int);
                }
                int = setInterval(displayTimer, 10);
                
                W = stckWidth;
                d = window.innerWidth - window.innerWidth/25 - W*2;
                
                minimum = Math.min(minimum, Math.log2(2*d/W));
                maximum = Math.max(maximum, Math.log2(2*d/W));
                
                acuX += Math.log2(2*d/W);
                acuX2 += Math.log2(2*d/W) * Math.log2(2*d/W);
                
                process.x.push(Math.log2(2*d/W));
            });

            document.getElementById('left').addEventListener('click', ()=>{
                if(milliseconds + seconds * 1000 && 
                   document.getElementById("right").classList.contains("is-active")){
                    
                    acuY += (milliseconds - pmil + (seconds - psec) * 1000);
                    process.y.push(milliseconds - pmil + (seconds - psec) * 1000);
                    
                    acuXY += (milliseconds - pmil + (seconds - psec) * 1000) * Math.log2(2*d/W);
                    
                    pmil = milliseconds;psec = seconds;
                    clearInterval(int);
                }
            });
            document.getElementById('right').addEventListener('click', ()=>{
                if(milliseconds + seconds * 1000 && 
                   document.getElementById("left").classList.contains("is-active")){
                    
                    acuY += (milliseconds - pmil + (seconds - psec) * 1000);
                    process.y.push(milliseconds - pmil + (seconds - psec) * 1000);
                    
                    acuXY += (milliseconds - pmil + (seconds - psec) * 1000) * Math.log2(2*d/W);
                    
                    pmil = milliseconds;psec = seconds;
                    clearInterval(int);
                }
            });
            
            document.getElementById('resetTimer').addEventListener('click', ()=>{
                [milliseconds,seconds,minutes,hours] = [0,0,0,0];
                timerRef.innerHTML = '00 : 00 : 00 : 000 ';
                $(".stick.left").removeClass("is-active");  
                $(".home").removeClass("is-active");
                $(".stick.right").removeClass("is-active");
                
                var n = process.x.length;
                b = (n * acuXY - acuX * acuY) / (n * acuX2 - acuX * acuX);
                a = (acuY - b * acuX) / n;
                
                var idle = {
                    x: [minimum, maximum],
                    y: [a + b * minimum, a + b * maximum],
                    mode: 'lines',
                    type: 'scatter',
                    name: "Regression Line"
                };
                
                var layout = {
                    title: 'This plot represents Fitt\'s Law.<br>MT = a + b * ID \t\t a = ' + a + ', b = ' + b 
                };
                
                var data = [process, idle];
                $("#Plot").css({width: window.innerWidth, height: window.innerHeight});
                Plotly.newPlot('Plot', data, layout);
            });

            function displayTimer(){
                milliseconds+=10;
                if(milliseconds == 1000){
                    milliseconds = 0;
                    seconds++;
                    if(seconds == 60){
                        seconds = 0;
                        minutes++;
                        if(minutes == 60){
                            minutes = 0;
                            hours++;
                        }
                    }
                }
                let h = hours < 10 ? "0" + hours : hours;
                let m = minutes < 10 ? "0" + minutes : minutes;
                let s = seconds < 10 ? "0" + seconds : seconds;
                let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

                timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
            }
            
            
            
    


// Supposing a designer is confronted with choosing between a linear array type of menu and a round menu in which control buttons are placed radially. Fitts law helps the designer in finding out which would be functionally more efficient and error free given the use context.

// Also the advantage of radial menus can be demonstrated with Fitts’s Law. Since menus pop up at the current cursor position and all items are at same distance from the centre, they can be approximately reached at the same speed in addition pointing is enhanced as the radial slices are of infinite size and thus can be more quickly and reliably selected. (Reference : http://www.betriebsraum.de/blog/2009/12/11/extremely-efficient-menu-selection-marking-menus-for-the-flash-platform/)