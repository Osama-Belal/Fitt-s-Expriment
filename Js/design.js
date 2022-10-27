/*global $, alert, console*/
$(document).ready(function () {
    'use strict';
    
    var myHeader = $(".header"),
        myLayer = $(".layer"),
        sc = $(window).scrollTop();
    
    // ----------------------- Loading Screen ------------------------------------------
    
    $(".loading").delay(10000).fadeOut("slow", function () {
        $("body").css("overflow", "auto");
        myHeader.addClass("hdr-trnslt");
        $(".navbar").show(1000);
        $(".layer .talk").delay(500).fadeIn(1000);
        $(".layer .links").delay(500).fadeIn(1000);
    });
    
    
    // Navbar-----------------------------------------------------------------
    
    $(window).on("scroll", function () {
        
        var sc = $(window).scrollTop() / 200;
    
        $(".navbar").css("background", "rgba(255, 255, 255, " + sc + ")");
        $(".nav-icon span").css("background",
                                "rgb(" + (sc * 2) + ", " + (sc * 6) + ", " + (sc + 70) + ")");
        
        
        if ($(window).scrollTop() > 150) {
            
            $(".navbar").css("boxShadow", "0px 0px 31px -4px #050475");
            $(".navbar ul li").css("margin", "20px 15px 20px 0");
            
            $(".navbar h5").css({
                margin: "12px 0 0",
                fontSize: "30px"
            });
            
        } else {
                    
            $(".navbar").css("boxShadow", "none");
            $(".navbar ul li").css("margin", "50px 15px 50px 0");
            
            $(".navbar h5").css({
                margin: "30px 0 0",
                fontSize: "40px"
            });
        }
        
    });
    
    //-------------------------Stop Propagation For Navbar---------------------------
    
    $("body").click(function () {
                 
        if ($(window).width() <= 991) {
            
            $(".navbar").removeClass("nav-trslt");
            $(".nav-icon").removeClass("transformed");
            
        }
                 
    });
    
    $(".navbar, .nav-icon").click(function (e) {
                 
        e.stopPropagation();
                 
    });
    
    
    $(".nav-icon").on("click", function () {
        $(this).toggleClass("transformed");
        $(".navbar").toggleClass("nav-trslt");
    });

    
    // ------------------------------ Links ----------------------------------
    
    $(".navbar ul li").click(function () {
        $("html, body").animate({
            scrollTop: $("." + $(this).data("text")).offset().top + 20
        }, 1400);
    });
    
    $(".navbar ul li a").click(function () {
        $(".navbar ul li a").removeClass("active");
        $(this).addClass("active");
    });
    
    $(window).scroll(function () {
        
        if ($(window).scrollTop() >= $('.header').offset().top) {
            
            $(".navbar ul li a").removeClass("active");
            $('.navbar ul li a').eq(0).addClass("active");
            
        }
        
        if ($(window).scrollTop() >= $('.features').offset().top) {
            
            $(".navbar ul li a").removeClass("active");
            $('.navbar ul li a').eq(1).addClass("active");
            
        }
        
        if ($(window).scrollTop() >= $('.about').offset().top) {
            
            $(".navbar ul li a").removeClass("active");
            $('.navbar ul li a').eq(2).addClass("active");
            
            
        }
        
        if ($(window).scrollTop() >= $('.our-works').offset().top) {
            
            $(".navbar ul li a").removeClass("active");
            $('.navbar ul li a').eq(3).addClass("active");
            
            
        }
        
        if ($(window).scrollTop() >= $('.pricing-table').offset().top) {
            
            $(".navbar ul li a").removeClass("active");
            $('.navbar ul li a').eq(4).addClass("active");
            
            
        }
        
        if ($(window).scrollTop() >= $('.testimonials').offset().top) {
            
            $(".navbar ul li a").removeClass("active");
            $('.navbar ul li a').eq(5).addClass("active");
            
            
        }
        
        if ($(window).scrollTop() >= $('.information').offset().top) {
            
            $(".navbar ul li a").removeClass("active");
            $('.navbar ul li a').eq(6).addClass("active");
            
            
        }
        
        if ($(window).scrollTop() >= $('.footer').offset().top) {
            
            $(".navbar ul li a").removeClass("active");
            $('.navbar ul li a').eq(7).addClass("active");
            
            
        }
        
    });
    
    
    // ----------------Header Height & Adjust The Layer In The Middle--------------------
    
    myHeader.height(window.innerHeight);
    
    myLayer.height(window.innerHeight);
    
    myLayer.css("paddingTop", (window.innerHeight - $(".layer .talk").height()) / 2);
    
    $(window).on("resize", function () {
        
        myHeader.height(window.innerHeight);
        
        myLayer.height(window.innerHeight);
        
        $(".layer").css("paddingTop", (window.innerHeight - $(".layer .talk").height()) / 2);
        
        $(".information .shop div span button").css("marginTop", ($(".information .shop div span").height() - $(".information .shop div span button").height()) / 2);
        
    });
    
    
    // -------------------Adjust Features Image Size----------------------
    
    $(".features .feat img").height($(".features .feat").height());
    
    // ----------------------Feats Background--------------------------------
    
    $(".features .feat .info").eq(0).css("background", "#ceddef").end().eq(1).css("background", "#d6f8b8").end().eq(2).css("background", "#dfe2fe").end().eq(3).css("background", "#e9e7a9");
    
    // ----------------------------------Tabs Part---------------------------------
    
    $(".information ul li").click(function () {
        $(this).addClass("selected").siblings("li").removeClass("selected");
        $(".information .content > div").hide();
        $("." + $(this).attr('id')).fadeIn(500);
        
        $(".information .shop div span button").css("marginTop", ($(".information .shop div span").height() - $(".information .shop div span button").height()) / 2);
        
    });
    
});