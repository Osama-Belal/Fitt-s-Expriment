/*global $, alert, console*/
// ----------------------------- home button style -----------------------------

var homeWidth = Math.random() * 100 + 10,
    stckWidth = Math.random() * 300 + 5;


$('.stick').css("width", stckWidth + 'px');
$('.stick').css("top", (window.innerHeight - $(".stick").height()) / 2);

$('.stick.left').css("left", window.innerWidth/50 + 'px');
$('.stick.right').css("right", window.innerWidth/50 + 'px');



var homeLft = window.innerWidth / 2 - homeWidth / 2;
$('.home').css({
    width: homeWidth + 'px',
    height: homeWidth + 'px'
});
$('.home').css("left", homeLft);
$('.home').css("top", (window.innerHeight - $(".home").height()) / 2);

$('.timer').css("left", (window.innerWidth - $(".timer").width()) / 2);
$('.timer').css("bottom", (window.innerHeight - $(".stick").height()) / 2);

$('.reset').css("left", (window.innerWidth - $(".reset").width()) / 2);
$('.reset').css("bottom", (window.innerHeight - $(".stick").height()) / 2 + 50);


$(window).on("resize", function () {
    'use strict';
    $('.stick').css("top", (window.innerHeight - $(".stick").height()) / 2);
    $('.timer').css("left", (window.innerWidth - $(".timer").width()) / 2);
    
    homeLft = window.innerWidth / 2 - homeWidth / 2;
    $('.home').css("left", homeLft);
    $('.home').css("top", (window.innerHeight - $(".home").height()) / 2);
    
    $('.reset').css("left", (window.innerWidth - $(".reset").width()) / 2);
    $('.reset').css("bottom", (window.innerHeight - $(".stick").height()) / 2 + 50);
});



// ------------------------------ timer ------------------------------



// ------------------------------ click effect ------------------------

(function ($, window, document, undefined) {
    
    'use strict';
    var $stick = $('.stick');

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
            width: 5000 + 'px',
            height: 2000 + 'px'
        });
        
//        $(this).removeClass('is-active');
        
        
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
                
                homeWidth = Math.random() * 100 + 10,
                stckWidth = Math.random() * 300 + 5,
                stckWidth = Math.random() * 300 + 5;

                $('.stick').css("width", stckWidth + 'px');
                $('.stick').css("top", (window.innerHeight - $(".stick").height()) / 2);
                
                $('.stick.left').css("left", window.innerWidth/50 + 'px');
                $('.stick.right').css("right", window.innerWidth/50 + 'px');


                homeLft = window.innerWidth / 2 - homeWidth / 2;
                $('.home').css({ width: homeWidth + 'px', height: homeWidth + 'px' });
                $('.home').css("left", homeLft);
                $('.home').css("top", (window.innerHeight - $(".home").height()) / 2);
        }
        
    });

})(jQuery, window, document);
    

(function ($, window, document, undefined) {
    
    'use strict';
    $('.home').on("click", function(){
       $('.home').addClass('is-active');
    });
        
})(jQuery, window, document);


























// ---------------------------------------- plot ------------------------


            var process = {
                x: [],
                y: [],
                mode: 'markers',
                type: 'scatter',
                name: "Your process"
            };
            var idle = {
                x: [1, 2, 3, 4],
                y: [10, 15, 13, 17],
                mode: 'lines',
                type: 'scatter',
                name: "Regression Line"
            };
            
            var layout = {
                title: 'Your process'
            };


            let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
            let timerRef = document.querySelector('.timer');
            let int = null;
            let [pmil, psec] = [0, 0];

            document.getElementById('home').addEventListener('click', ()=>{
                if(int !== null){
                    clearInterval(int);
                }
                int = setInterval(displayTimer, 10);
                
                let W = stckWidth;
                let d = window.innerWidth - window.innerWidth/25 - W*2;
                process.x.push(Math.log2(2*d/W));
            });

            document.getElementById('left').addEventListener('click', ()=>{
                if(milliseconds + seconds * 1000 && 
                   document.getElementById("right").classList.contains("is-active")){
                    process.y.push(milliseconds - pmil + (seconds - psec) * 1000);
                    pmil = milliseconds;psec = seconds;
                    clearInterval(int);
                }
            });
            document.getElementById('right').addEventListener('click', ()=>{
                if(milliseconds + seconds * 1000 && 
                   document.getElementById("left").classList.contains("is-active")){
                    process.y.push(milliseconds - pmil + (seconds - psec) * 1000);
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