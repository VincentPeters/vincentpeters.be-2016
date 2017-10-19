'use strict';

/*global $ $:true*/
/*global _ _:true*/
/*eslint no-undef: "error"*/

var PatternBackground = {
    init($el) {
        this.$el = $el;

        this.canvas = this.$el.find('canvas');
        this.context = this.canvas[0].getContext('2d');

        this.image = new Image();
        this.image.src = this.$el.data('image');

        this.reset();
        this.getParameters();
        this.eventHandlers();
    },

    getParameters() {
        this.expand = this.$el.data('expand') === 1;
        this.follow = this.$el.data('follow') === 1;
        this.move = this.$el.data('move') === 1;

        if (!this.follow && !this.move) {
            this.active = false;
        }
    },

    reset() {
        this.canvasWidth = $(window).width();
        this.canvasHeight = $(window).height();
        this.canvas[0].width = this.canvasWidth;
        this.canvas[0].height = this.canvasHeight;

        this.active = true;

        this.addWidth = 0;
        this.addHeight = 0;
    },

    eventHandlers() {
        if (this.follow) {
            $('body').on('mousemove', (e) => this.mouseMove(e));
        }

        $(window).on('resize', _.debounce(() => this.resize(), 500));

        $(this.image).on('load', () => {
            console.log('image loaded');

            this.populateImageArray();
            window.requestAnimationFrame(() => this.draw());
        });
    },

    resize() {
        this.reset();
        this.populateImageArray();
    },

    populateImageArray() {
        this.images = [];

        for (var w = -100; w < this.canvasWidth + 100; w += this.image.width) {
            for (var h = -100; h < this.canvasHeight + 100; h += this.image.height) {
                this.images.push({
                    w: w,
                    h: h
                });
            }
        }
    },

    draw() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

        if (this.move) {
            this.addWidth += 1;
            this.addHeight += 1;
        }

        this.images.forEach((img) => {
            var w = img.w + this.addWidth;
            var h = img.h + this.addHeight;
            var width = this.image.width;
            var height = this.image.height;

            if (this.follow) {
                var targetX = this.cursorX - w;
                var targetY = this.cursorY - h;
                var rotation = Math.atan2(targetY, targetX);
            } else {
                rotation = 0;
            }

            if (this.expand) {
                width += 50;
                height += 50;
            }

            this.drawRotatedImage(this.image, w, h, width, height, rotation);
        });

        // Reset addWidth or addHeight when they become larger then the image
        if (this.addWidth > this.image.width) {
            this.addWidth = 0;
        }

        if (this.addHeight > this.image.height) {
            this.addHeight = 0;
        }

        if (this.active) {
            window.requestAnimationFrame(() => this.draw());
        }
    },

    drawRotatedImage(image, x, y, width, height, angle) {
        // move to the middle of where we want to draw our image
        this.context.translate(x, y);

        // rotate around that point
        this.context.rotate(angle);

        // draw it up and to the left by half the width
        // and height of the image
        this.context.drawImage(image, -(width / 2), -(height / 2));

        // and restore the co-ords to how they were when we began
        this.context.rotate(-angle);
        this.context.translate(-x, -y);
    },

    mouseMove(e) {
        this.cursorX = e.pageX;
        this.cursorY = e.pageY - $(document).scrollTop();
    },

    destroy() {
        this.active = false;

        super.destroy();
    }
};

PatternBackground.init($('.js-pattern-background'));

// <![CDATA[
var colour = "random"; // in addition to "random" can be set to any valid colour eg "#f0f" or "red"
var sparkles = 500;

/****************************
 *  Tinkerbell Magic Sparkle *
 *(c)2005-13 mf2fm web-design*
 *  http://www.mf2fm.com/rv  *
 * DON'T EDIT BELOW THIS BOX *
 ****************************/

var x, ox = 400;
var y, oy = 300;
var swide = 800;
var shigh = 600;
var sleft, sdown = 0;
var tiny = new Array();
var star = new Array();
var starv = new Array();
var starx = new Array();
var stary = new Array();
var tinyx = new Array();
var tinyy = new Array();
var tinyv = new Array();

window.onload = function () {
    if (document.getElementById) {
        var i, rats, rlef, rdow;
        for (var i = 0; i < sparkles; i++) {
            var rats = createDiv(3, 3);
            rats.style.visibility = "hidden";
            rats.style.zIndex = "999";
            document.body.appendChild(tiny[i] = rats);
            starv[i] = 0;
            tinyv[i] = 0;
            var rats = createDiv(5, 5);
            rats.style.backgroundColor = "transparent";
            rats.style.visibility = "hidden";
            rats.style.zIndex = "999";
            var rlef = createDiv(1, 5);
            var rdow = createDiv(5, 1);
            rats.appendChild(rlef);
            rats.appendChild(rdow);
            rlef.style.top = "2px";
            rlef.style.left = "0px";
            rdow.style.top = "0px";
            rdow.style.left = "2px";
            document.body.appendChild(star[i] = rats);
        }
        set_width();
        sparkle();
    }
}

function sparkle() {
    var c;
    if (Math.abs(x - ox) > 1 || Math.abs(y - oy) > 1) {
        ox = x;
        oy = y;
        for (c = 0; c < sparkles; c++) {
            if (!starv[c]) {
                star[c].style.left = (starx[c] = x) + "px";
                star[c].style.top = (stary[c] = y + 1) + "px";
                star[c].style.clip = "rect(0px, 5px, 5px, 0px)";
                star[c].childNodes[0].style.backgroundColor = star[c].childNodes[1].style.backgroundColor = (colour == "random") ? newColour() : colour;
                star[c].style.visibility = "visible";
                starv[c] = 50;
                break;
            }
        }
    }
    for (c = 0; c < sparkles; c++) {
        if (starv[c]) {
            update_star(c);
        }
        if (tinyv[c]) {
            update_tiny(c);
        }
    }
    setTimeout("sparkle()", 40);
}

function update_star(i) {
    if (--starv[i] == 25) {
        star[i].style.clip = "rect(1px, 4px, 4px, 1px)";
    }
    if (starv[i]) {
        stary[i] += 1 + Math.random() * 3;
        starx[i] += (i % 5 - 2) / 5;
        if (stary[i] < shigh + sdown) {
            star[i].style.top = stary[i] + "px";
            star[i].style.left = starx[i] + "px";
        }
        else {
            star[i].style.visibility = "hidden";
            starv[i] = 0;
            return;
        }
    }
    else {
        tinyv[i] = 50;
        tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
        tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
        tiny[i].style.width = "2px";
        tiny[i].style.height = "2px";
        tiny[i].style.backgroundColor = star[i].childNodes[0].style.backgroundColor;
        star[i].style.visibility = "hidden";
        tiny[i].style.visibility = "visible"
    }
}

function update_tiny(i) {
    if (--tinyv[i] == 25) {
        tiny[i].style.width = "1px";
        tiny[i].style.height = "1px";
    }
    if (tinyv[i]) {
        tinyy[i] += 1 + Math.random() * 3;
        tinyx[i] += (i % 5 - 2) / 5;
        if (tinyy[i] < shigh + sdown) {
            tiny[i].style.top = tinyy[i] + "px";
            tiny[i].style.left = tinyx[i] + "px";
        }
        else {
            tiny[i].style.visibility = "hidden";
            tinyv[i] = 0;
            return;
        }
    }
    else {
        tiny[i].style.visibility = "hidden";
    }
}

document.onmousemove = mouse;
function mouse(e) {
    if (e) {
        y = e.pageY;
        x = e.pageX;
    }
    else {
        set_scroll();
        y = event.y + sdown;
        x = event.x + sleft;
    }
}

window.onscroll = set_scroll;
function set_scroll() {
    if (typeof(self.pageYOffset) == 'number') {
        sdown = self.pageYOffset;
        sleft = self.pageXOffset;
    }
    else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
        sdown = document.body.scrollTop;
        sleft = document.body.scrollLeft;
    }
    else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
        sleft = document.documentElement.scrollLeft;
        sdown = document.documentElement.scrollTop;
    }
    else {
        sdown = 0;
        sleft = 0;
    }
}

window.onresize = set_width;
function set_width() {
    var sw_min = 999999;
    var sh_min = 999999;
    if (document.documentElement && document.documentElement.clientWidth) {
        if (document.documentElement.clientWidth > 0) {
            sw_min = document.documentElement.clientWidth;
        }
        if (document.documentElement.clientHeight > 0) {
            sh_min = document.documentElement.clientHeight;
        }
    }
    if (typeof(self.innerWidth) == 'number' && self.innerWidth) {
        if (self.innerWidth > 0 && self.innerWidth < sw_min) {
            sw_min = self.innerWidth;
        }
        if (self.innerHeight > 0 && self.innerHeight < sh_min) {
            sh_min = self.innerHeight;
        }
    }
    if (document.body.clientWidth) {
        if (document.body.clientWidth > 0 && document.body.clientWidth < sw_min) {
            sw_min = document.body.clientWidth;
        }
        if (document.body.clientHeight > 0 && document.body.clientHeight < sh_min) {
            sh_min = document.body.clientHeight;
        }
    }
    if (sw_min == 999999 || sh_min == 999999) {
        sw_min = 800;
        sh_min = 600;
    }
    swide = sw_min;
    shigh = sh_min;
}

function createDiv(height, width) {
    var div = document.createElement("div");
    div.style.position = "absolute";
    div.style.height = height + "px";
    div.style.width = width + "px";
    div.style.overflow = "hidden";
    return (div);
}

function newColour() {
    var c = new Array();
    c[0] = 255;
    c[1] = Math.floor(Math.random() * 256);
    c[2] = Math.floor(Math.random() * (256 - c[1] / 2));
    c.sort(function () {
        return (0.5 - Math.random());
    });
    return ("rgb(" + c[0] + ", " + c[1] + ", " + c[2] + ")");
}
// ]]>
