// Settings panel:
// Speed
// Single Switch
// Hold or tap
// restart on input after 5 secs screen freezw

var panel;
var panelvisible = false;
var settings;
var splash;

var speed;
var s1;
var s2;
var s3;
var s4;
var speed;
var mute;
var firstTime = true;
var resizing = false;
var bombSound;
var stepSound;
window.onload = () => {
    'use strict';

    //    if ('serviceWorker' in navigator) {
    //        navigator.serviceWorker
    //            .register('./sw.js');
    //    }
    panel = document.querySelector('panel');
    settings = document.querySelector('settings');
    splash = document.querySelector('splash');
    setUpPanel();
    splash.onclick = function () {
        startfullScreen();
        bombSound = document.createElement('audio');
        bombSound.src = explosion;
        stepSound = document.createElement('audio');
        stepSound.src = stepSnd;
        stepSound.volume = 0;
        stepSound.play();
        bombSound.volume = 0;
        bombSound.play();
        setTimeout(function () {
            stepSound.volume = 1;
            bombSound.volume = 1;
            stepSound.pause();
            bombSound.pause();
        }, 50);


    }
}

window.onresize = () => {
    resizing = true;
    alive = false;
}

function startfullScreen() {
    if (document.body.webkitRequestFullscreen) document.body.webkitRequestFullscreen();
    if (document.body.mozRequestFullScreen) document.body.mozRequestFullScreen();
    if (document.body.requestFullscreen) document.body.requestFullscreen();
    splash.hidden = true;
    if (!alive) {
        setTimeout(start, 300);
    }
}

function setUpPanel() {
    panel.style.left = "130vw";
    slideTo(panel, 130);
    mute = document.createElement("INPUT");
    mute.style.position = "absolute";
    mute.style.height = "3vh";
    mute.style.width = "3vw";
    mute.style.left = "16vw";
    mute.style.top = "3.5vh";
    mute.checked = false;
    mute.setAttribute("type", "checkbox");
    mute.checked = false;
    speed = document.createElement("INPUT");
    speed.setAttribute("type", "range");
    speed.style.position = "absolute";
    speed.style.height = "2vh";
    speed.style.width = "15vw";
    speed.style.left = "4.3vw";
    speed.style.top = "11.6vh";
    speed.style.color = 'green';
    speed.value = 3;
    speed.min = 1;
    speed.max = 5;

    s1 = document.createElement("INPUT");
    s1.style.position = "absolute";
    s1.style.height = "3vh";
    s1.style.width = "3vw";
    s1.style.left = "1.1vw";
    s1.style.top = "18vh";
    s2 = document.createElement("INPUT");
    s2.style.position = "absolute";
    s2.style.height = "3vh";
    s2.style.width = "3vw";
    s2.style.left = "1.1vw";
    s2.style.top = "23.1vh";
    s3 = document.createElement("INPUT");
    s3.style.position = "absolute";
    s3.style.height = "3vh";
    s3.style.width = "3vw";
    s3.style.left = "13vw";
    s3.style.top = "18vh";
    s4 = document.createElement("INPUT");
    s4.style.position = "absolute";
    s4.style.height = "3vh";
    s4.style.width = "3vw";
    s4.style.left = "13vw";
    s4.style.top = "23.2vh";
    s1.setAttribute("type", "radio");
    s2.setAttribute("type", "radio");
    s3.setAttribute("type", "radio");
    s4.setAttribute("type", "radio");

    s2.checked = true;
    s4.checked = true;

    function switchOption(i) {
        switch (i) {
            case 1:
                s1.checked = true;
                s2.checked = false;
                localStorage.setItem("Glitch.oneSwitch", 1);
                break;
            case 2:
                s2.checked = true;
                s1.checked = false;
                localStorage.setItem("Glitch.oneSwitch", 0);
                break;
            case 3:
                s3.checked = true;
                s4.checked = false;
                localStorage.setItem("Glitch.holdSwitch", 1);
                break;
            case 4:
                s4.checked = true;
                s3.checked = false;
                localStorage.setItem("Glitch.holdSwitch", 0);
                break;
        }
    }

    s1.onclick = function (e) {
        switchOption(1);
    }
    s2.onclick = function (e) {
        switchOption(2);
    }
    s3.onclick = function (e) {
        switchOption(3);
    }
    s4.onclick = function (e) {
        switchOption(4);
    }

    panel.appendChild(mute);
    panel.appendChild(speed);
    panel.appendChild(s1);
    panel.appendChild(s2);
    panel.appendChild(s3);
    panel.appendChild(s4);

    settings.style.left = "92vw";
    // Retrieve settings
    var s = localStorage.getItem("Glitch.mute");
    mute.checked = (s == "true");
    s = parseInt(localStorage.getItem("Glitch.speed"));
    if (s < 1 || s > 5)
        s = 3;
    speed.value = s.toString();
    s = localStorage.getItem("Glitch.oneSwitch");
    if (s == 1)
        switchOption(1);
    else
        switchOption(2);
    s = localStorage.getItem("Glitch.holdSwitch");
    if (s == 1)
        switchOption(3);
    else
        switchOption(4);

    mute.onclick = function (e) {
        localStorage.setItem("Glitch.mute", mute.checked);
    }
    speed.onclick = function (e) {
        localStorage.setItem("Glitch.speed", speed.value);
    }

    panel.onmousedown = function (e) { // speed, paddle size, ball size
        e.stopPropagation();
    }

    settings.onmousedown = function (e) { // speed, paddle size, ball size
        e.stopPropagation();
        if (panelvisible) { // save stored values
            slideTo(panel, 130);
            slideTo(settings, 92);
        } else {
            slideTo(panel, 75);
            slideTo(settings, 78);
        }
        panelvisible = !panelvisible;
    }

    function slideTo(el, left) {
        var steps = 5;
        var timer = 50;
        var elLeft = parseInt(el.style.left) || 0;
        var diff = left - elLeft;
        var stepSize = diff / steps;
        console.log(stepSize, ", ", steps);

        function step() {
            elLeft += stepSize;
            el.style.left = elLeft + "vw";
            if (--steps) {
                setTimeout(step, timer);
            }
        }
        step();
    }
}

var ctx = c.getContext('2d'),
    ratio = 2, //window.devicePixelRatio * 2,
    w = 0,
    h = 0,
    pi = Math.PI,
    alive = false,
    usrX = 200,
    usrFrame = 0,
    bombs = [],
    escapedCounter = 0;

function start() {
    resizing = false;
    try {
        for (o = 0; o < bombs.length; o++)
            delete bombs[o];
    } catch (e) {};
    w = 0,
        h = 0,
        usrX = 200;
    usrFrame = 0;
    bombs = [];
    escapedCounter = 0;
    ticCounter = 0;

    document.body.className = 'started';

    w = c.width = 500; // window.innerWidth / 2; //document.body.clientWidth / ratio;
    h = c.height = 300; //window.innerHeight / 2; // document.body.clientHeight / ratio;
    usrX = Math.round(w / 2);
    alive = true;
    // Paint Sky
    var grd = ctx.createLinearGradient(0, 0, 0, h);
    grd.addColorStop(0, '#00F');
    grd.addColorStop(1, '#0FF');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, w, h);
    // Make First Bombs - don't do any
    //    for (var i = 5;
    //    i < w - 30;//    i += 100)
    //        bombs.push({
    //            x: i + Math.random() * 30,
    //            y: -150 + Math.random() * 150,
    //            c: '#F0' + Math.floor(Math.random() * 15).toString(16)
    //        });
    tic();
}

function dot(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.closePath();
}

function boneco(dir, x, y, frame1) {
    if (frame1 == 1 || frame1 == 11)
        if (!mute.checked)
            stepSound.play();
    var frame2 = frame1 + 10;
    if (frame2 >= 20) frame2 -= 20;
    var waveX1 = frame1;
    var waveX2 = frame2;
    if (waveX1 > 10) waveX1 = 20 - waveX1;
    if (waveX2 > 10) waveX2 = 20 - waveX2;
    var waveY1 = Math.sin(2 * pi * frame1 / 20);
    if (waveY1 > 0) waveY1 /= 3;
    var waveY2 = Math.sin(2 * pi * frame2 / 20);
    if (waveY2 > 0) waveY2 /= 3;

    ctx.lineWidth = 12;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    if (frame1 == -1) { // stoped
        ctx.strokeStyle = 'rgba(255,160,0,1)';
        ctx.beginPath();
        ctx.arc(x, y - 55, 5, 1.5, pi * 2.5, true);
        ctx.lineTo(x, y - 25);
        ctx.moveTo(x - 10, y - 23);
        ctx.lineTo(x - 5, y - 40);
        ctx.lineTo(x + 5, y - 40);
        ctx.lineTo(x + 10, y - 23);
        ctx.moveTo(x - 10, y - 7);
        ctx.lineTo(x, y - 25);
        ctx.lineTo(x + 10, y - 7);
        ctx.stroke();
        ctx.closePath();
    } else { // walk
        ctx.strokeStyle = 'rgba(255,160,0,.6)';
        ctx.beginPath();
        ctx.moveTo(x, y - 45);
        ctx.lineTo(x + (5 - waveX1 * 2) * dir, y - 33);
        ctx.lineTo(x + (17 - waveX1 * 2) * dir, y - 38);
        ctx.moveTo(x, y - 25);
        ctx.lineTo(x + (15 - waveX2 * 2.5) * dir, y - 7 - waveY2 * -7);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = 'rgba(255,160,0,1)';
        ctx.beginPath();
        ctx.moveTo(x, y - 45);
        ctx.lineTo(x + (5 - waveX2 * 2) * dir, y - 33);
        ctx.lineTo(x + (17 - waveX2 * 2) * dir, y - 38);
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(x, y - 55, 5, 1.5, pi * 2.5, true);
        ctx.lineTo(x, y - 25);
        ctx.lineTo(x + (15 - waveX1 * 2.5) * dir, y - 7 - waveY1 * -7);
        ctx.stroke();
        ctx.closePath();
    }
}

function explode(bomb) {
    var i = bombs.indexOf(bomb);
    bombs = bombs.slice(0, i).concat(bombs.slice(i + 1));
    var grd = ctx.createRadialGradient(bomb.x, bomb.y, 0, bomb.x, bomb.y, 60);
    grd.addColorStop(1.0, 'rgba(255,0,0,0)');
    grd.addColorStop(0.6, bomb.c);
    grd.addColorStop(0.5, bomb.c);
    grd.addColorStop(0.2, '#F8F');
    dot(bomb.x, bomb.y, 60, grd);
    //<audio id="explosion" src=""></audio>
    if (!mute.checked)
        bombSound.play();
}

function gameOver() {
    alive = false;
    usrX = -100;
    firstTime = false;
    setTimeout(start, 5000);
}

var ticCounter = 0;
var tmr = null;

function tic() {
    if (resizing) {
        try {
            clearTimeout(tmr);
        } catch (e) {}
        tmr = setTimeout(start, 500);
    }
    ticCounter++;
    // Bombs...
    if (alive)
        if (ticCounter % 12 == 0) bombs.push({ // PB % 12 make bigger for less bombs - vary with speed
            x: Math.random() * (w - 10) + 5,
            y: -30 + Math.random() * 20, // -30
            c: '#F0' + Math.floor(Math.random() * 15).toString(16)
        });
    if (alive)
        for (var bomb, i = 0; bomb = bombs[i]; i++) {
            bomb.y += 1 + parseInt(speed.value) / 3; // PB 2 speed
            dot(bomb.x, bomb.y, 10, bomb.c);
            if (bomb.y > h - 95 && Math.abs(bomb.x - usrX) < 25) {
                explode(bomb);
                gameOver();
            }
            if (bomb.y > h - 24) {
                explode(bomb);
                if (alive) escapedCounter++;
                //              if (!resizing) notifyEscaped();
            }
        }
    // Blur...
    var even = true;
    var px = {},
        W, E, sum, pixels = ctx.getImageData(0, 0, w, h);
    var data = pixels.data;
    if (alive) {
        for (px.r = 0; px.r < data.length; px.r += 4) {
            px.g = px.r + 1;
            px.b = px.r + 2;
            for (var unit, i = 0; unit = ['r', 'g', 'b'][i]; i++) {
                if (even) {
                    W = data[px[unit] - w * 4] || 0;
                    E = data[px[unit] + w * 4] || 0;
                    sum = 2 * (W + E);
                } else {
                    W = data[px[unit] - 4] || 0;
                    E = data[px[unit] + 4] || 0;
                    sum = 2 * (W + E);
                }
                even = !even;
                if (data[px[unit]] * 4 > sum) {
                    data[px[unit]] = (data[px[unit]] * 4 + sum) / 8;
                } else {
                    data[px[unit]] = (data[px[unit]] + sum * 2) / 9;
                }
                if (data[px[unit]] > 200) data[px[unit]] -= 5;
                data[px[unit]] += Math.round(Math.random() * 5 - 3);
            }
        }
        ctx.putImageData(pixels, 0, 0);
    }

    if (escapedCounter > 0)
        notifyEscaped();
    if (alive) {
        if (keyRight) {
            usrX += 2;
            usrFrame++;
        }
        if (keyLeft) {
            usrX -= 2;
            usrFrame++
        }
        if (!keyRight && !keyLeft) usrFrame = -1;
        if (usrFrame == 20) usrFrame = 0;
        console.log('usrFrame', usrFrame);
        if (usrX < 18) usrX = 18;
        if (usrX > w - 18) usrX = w - 18;
        boneco(keyRight ? 1 : -1, usrX, h - 20, usrFrame);
    } else {
        ctx.fillStyle = 'rgba(255,255,100,1)';
        var f = (window.innerHeight / 30);
        ctx.font = "bold " + f.toString() + "px sans-serif"; // 48
        ctx.textAlign = 'left';
        if (!resizing)
            ctx.fillText('💥💣💥💣💥 ' + escapedCounter.toString() + ' 💥💣💥💣💥!', 20, h / 8);
        ctx.font = "bold " + (f * 1.5).toString() + "px sans-serif";
        ctx.textAlign = 'center';
        if (!resizing)
            ctx.fillText("💀💀💀 😢 💀💀💀", w / 2, h / 2);
    }

    if (!resizing) {
        ctx.fillStyle = '#4A0';
        ctx.fillRect(0, h - 20, w, 20);

        for (var x = 0; x < w; x += 8) dot(x, h - 20, 3, '#4A0');

        setTimeout(tic, 80); // PB frame rate
    }
}

function notifyEscaped() {
    ctx.fillStyle = 'rgba(255,255,100,1)';
    var f = (window.innerHeight / 30);
    ctx.font = "bold " + f.toString() + "px sans-serif"; // 48
    ctx.textAlign = 'left';
    if (!resizing)
        ctx.fillText('💥💣💥💣💥 ' + escapedCounter.toString() + ' 💥💣💥💣💥!', 20, h / 8);
}

var keyTop = false,
    keyDown = false,
    keyLeft = false,
    keyRight = false;
var mouseDn = false;

var lastDirectionLeft = false;
// handle different switch options
function SwitchOneDown() {
    if (s1.checked) {
        if (lastDirectionLeft) {
            keyLeft = false;
            keyRight = true;
        } else {
            keyRight = false;
            keyLeft = true;
        }
        lastDirectionLeft = !lastDirectionLeft;
    } else {
        keyRight = false;
        keyLeft = true;
    }
}

function SwitchTwoDown() {
    if (s1.checked) {
        if (lastDirectionLeft) {
            keyLeft = false;
            keyRight = true;
        } else {
            keyRight = false;
            keyLeft = true;
        }
        lastDirectionLeft = !lastDirectionLeft;
    } else {
        keyRight = true;
        keyLeft = false;
    }
}

function SwitchOneUp() {
    if (s3.checked)
        return;
    keyRight = false;
    keyLeft = false;
}

function SwitchTwoUp() {
    if (s3.checked)
        return;
    keyRight = false;
    keyLeft = false;
}

document.body.onkeydown = function (ev) {
    if (ev.repeat)
        return;
    switch (ev.keyCode) {
        case 37:
        case 32:
        case 49:
            SwitchOneDown();
            break;
        case 39:
        case 13:
        case 50:
        case 51:
        case 52:
            SwitchTwoDown();
            break;
    }
    //          if (ev.keyCode == 38) keyUp = true;
    //          if (ev.keyCode == 40) keyDown = true;
}
document.body.onkeyup = function (ev) {
    switch (ev.keyCode) {
        case 37:
        case 32:
        case 49:
            SwitchOneUp();
            break;
        case 39:
        case 13:
        case 50:
        case 51:
        case 52:
            SwitchTwoUp();
            break;
    }
}

document.body.onmousedown = function (ev) {
    mouseDn = true;
    if (ev.clientX < window.innerWidth / 2) SwitchOneDown();
    if (ev.clientX >= window.innerWidth / 2) SwitchTwoDown();
}
document.body.onmousemove = function (ev) {
    if (!mouseDn)
        return;
    if (ev.clientX < window.innerWidth / 2) SwitchOneDown();
    if (ev.clientX >= window.innerWidth / 2) SwitchTwoDown();
}
document.body.onmouseup = function (ev) {
    mouseDn = false;
    SwitchOneUp();
}

document.body.ontouchstart = function (ev) {
    if (ev.touches[0].clientX < window.innerWidth / 2) SwitchOneDown();
    if (ev.touches[0].clientX >= window.innerWidth / 2) SwitchTwoDown();
}
document.body.ontouchmove = function (ev) {
    if (ev.touches[0].clientX < window.innerWidth / 2) SwitchOneDown();
    if (ev.touches[0].clientX >= window.innerWidth / 2) SwitchTwoDown();
}
document.body.ontouchEnd = function (ev) {
    SwitchOneUp();
}


var currentButton = 0;

function showPressedButton(index) {
    if (!splash.hidden) { // splash screen
        splash.hidden = true;
    } else {
        switch (index) {
            case 0: // A
            case 2: // X
            case 14: // Dpad left
            case 4: // LT
            case 6:
                SwitchOneDown();
                break;
            case 1: // B
            case 3: // Y
            case 15: // Dpad right
            case 5:
            case 7:
                SwitchTwoDown();
                break;
            case 10: // XBox
                break;
            case 12: // dpad handled by timer elsewhere
            case 13:
                break;
            default:
        }
    }
}

function removePressedButton(index) {
    SwitchOneUp();
    console.log("Releasd: ", index);
}

var gpad;

function getAxes() {
    //       console.log('Axis', gpad.getAxis(0), gpad.getAxis(1), gpad.getButton(14).value);

    if (splash.hidden) {
        if (gpad.getAxis(0) < -.1 || gpad.getAxis(2) < -.1)
            SwitchOneDown();
        else if (gpad.getAxis(0) > -.1 || gpad.getAxis(2) > -.1)
            SwitchTwoDown();
        else if (keyRight || keyLeft)
            SwitchOneUp();
    }
    setTimeout(function () {
        getAxes();
    }, 50);
}

gamepads.addEventListener('connect', e => {
    //        crosshairs.hidden = false;
    console.log('Gamepad connected:');
    console.log(e.gamepad);
    gpad = e.gamepad;
    e.gamepad.addEventListener('buttonpress', e => showPressedButton(e.index));
    e.gamepad.addEventListener('buttonrelease', e => removePressedButton(e.index));
    //       e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, true),
    //            StandardMapping.Axis.JOYSTICK_LEFT);
    //        e.gamepad.addEventListener('joystickmove', e => moveJoystick(e.values, false),
    //            StandardMapping.Axis.JOYSTICK_RIGHT);
    setTimeout(function () {
        getAxes();
    }, 50);
});

gamepads.addEventListener('disconnect', e => {
    console.log('Gamepad disconnected:');
    console.log(e.gamepad);
});

gamepads.start();

var stepSnd = 'data:audio/wav;base64,UklGRtgAAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0YbQAAAAAhISEfnFxcXF9hISEhHN2dnZ4emtra3eDkpKSkZCAgIB9f4ODiI6ZoaF/d3Z2eISEgYGAf4SJiYSDZF1eYmNvb3N9fHp6enp2dXViYmVma3p+hoaHiIiIiHh2ZmVodHmFhYB7fX5+g4R2dXRvcnt7fX97d3h4eX1+foGAfX16dXd4eHp7fHx8fHx+fn+DgX19e3l7e3yAgYCAf3x9f39/f359fXx9f39/gH9+fn9/f39/f38=';
var explosion = 'data:audio/wav;base64,UklGRksUAABXQVZFZm10IBAAAAABAAEAiBUAAIgVAAABAAgAZGF0YScUAABK/wAA/wAAAAAAAAD//////wAAHv/////4to5DR///////AAAAAAAAAADWAAAhAAAAAMz//wAAAAAAAAAAAP////8kKkn//////////////////wAAAAAAAAAAAAAAAAAAAAAAAF3//////////////////////////4cAAAAAAAD/////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//////////6UAAAAAAAAAAAAAAAAAAAAAAAAAJKn//////+xYAAAAAAAAAOj//////////74AAAAAAAAAAAAAAAAAAAAAAAAAAJGJiIiIiIeHh2toUElKS0xNTk9QUU4sLw0NDxETFRcZGx0fIf///////wAAAAAAAAAAAAACBAYICw0PERMVFxkbHR8gIiQlJykqLC0vMDIzNTY3OTo7PD5eZGyKioqKiomJiYmJiYiIiIiIiIiHh4eHh4eHhoaGhoaGhoaGhYWFhYWFhYWFhYWEo6Oiwb++vby7urm4t7a1tLSzsrGwr6+uraysq6qpqainp6ampaSko6OioaGgoJ+fbQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABeXV70/////////////////////////////////fv5+Pb08vHv7ezq6efm5OPh4N///////////////////////////////////////////////////////////////////6SlpCEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKvNzMv///////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL6SioaGh//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8XAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABA///////////////////////////////////////////////////////////////////////////zioqKioqKioqKiomJiYmJiYmJiYmJiYmJiYiIiIiIiIiIiIiIiIiIiP7/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIeRkZGRkJCQkP////////////////////////////////////////////////////////////////8qAAAAAAECAwMEBQUGBwcICQkKCwsMDA0ODg8QEBEREhMTFBQVFRYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsf//////////////////////////////////////////////////////////////////////////////0tPT09LS0tHR0NDQz8/Pzs7Nzc3MzMzLy8vKysrJycnIyMjHx7lAQ0NDRERERUVFKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAwMEBAUFBgYHOkBBQUFCQkJCQ0NDQ0RERERFRUVFRUZGRkZHR0dHR0hISEhJSSoaGhobGxwcHB0dHQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9OTk5PT09PT09PUFBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACoKGhoaGhoaGhoKCgoP//////////////////////////////////////////////zldYWFhYWFlZWVlZWVkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtLi4uLi3t7e3t7e3trb//////////////////////////////////////////////////////////////////////////////////////////////////////////////5oNCwsLCwwMDAwNDQ0ODg4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcW9vb29vb29vb29vb29v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v7+/f39/cIPCgoKCwsLCwwMDAwNDQ0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMS4uLi8vLy8vLzAwMDAwkv//////////////////////////////////////////+Nvb29ra2tra2dnZ2dnZ2LGWlpaWlpaWlpaWlZWVlZWVlZWVlZWVlZWVlZWVlZWVlbbCwsLCwsLBwcHBwcHBwcDi7e3t7ezs7Ozs6+vr6+vr6urq6urp6enp6ejo6Ojo5+f//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////6qjo6Ojo6Ojo6Ojo6OjokoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcWlpaWlpaWlpaWlpaWlq5/////////////////////////////////////////////////////////////////fLx8fHx8fHx8PDw8PDw7+/v7+/v7+7u7u7u7u7t7e3tt6ampqampqampqampqampm9gYGBgYGBgYGBgYGBgYGBgYGBgYGBhYWFhYWFhYWFhYW1tbW1tbW1tbm5ubm5ubm55enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6enAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQ0ZGRkZGRkZGRkZGR0dHgf//////////////////////////////////////////8t/g39/f39/f39/f3t7e3s68vby8vLy8vLy8vLy8vLy8u7u7u7u7u7u7u7u7u7u6urazs7Ozs7OysrKysrKysrKtqqqqqqqqqqqqqqqqqqqqqqqqqqqqqampqampqampqamhn5+fn5+fn5+fn5+fn5+fl5aWlpWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWV//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+5Y2NjY2NjY2NjY2NjZGRkEQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARYmJiIiIiIiIiIiIiIiIiP////////////////////////////////////////////jp6enp6eno6Ojo6Ojo6OeekZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGQkJCQkJCQkJA5OTk5OTk5Ojo6Ojo6Ojo6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjs7Ozs7Ozw8PDw8PDw8TIuMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMZRYXFxgYGBgYGBgYGRkZGQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAfICAgICAgISEhISEhISFekJGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZGRkZBvX2BgYGBgYGBgYGBgYGBgPjAwMDAwMDExMTExMTExMTEyMjIyMjIyMjIzMzMzMzMzAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuMDAwMDExMTExMTExMTJQra+vr6+vr6+vr6+vr66urq6urq6urq6urq6urq2tra2ALzExMTExMTIyMjIyMjIyBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHWVnZ2dnZ2dnZ2dnZ2dnZ8X//////////////////////////////////////////8CjpKSkpKSko6Ojo6Ojo6NeQ0RERERERERFRUVFRUVFRUVFRUZGRkZGRkZGRkZGRkd/hoaGhoaGhoaGhoaGhoaGv8XFxcTExMTExMTExMPDw8PDw8PDw8PCwsLCwsLCwsLAlJWVlZWVlZWVlZWVlZWVk2hqampqampqampqampqampqampqampqampqampqa2trZFFRUVFRUVFRUVFRUVJSUks5ODg5OTk5OTk5OTk6Ojo6Ojo6Ojo7Ozs7Ozs7Ozs8PGGcm5qampqampqampqamprA+Pf29vb29vX19fX19PT09PTz8/Pz8/Py8vLy8vHx8fGvgYCAgICAgICAgICAgICAPhISEhISEhMTExMTFBQUFBQVFRUVFRUWFhYWFhcXFxcXPElJSUlJSUlJSUlJSkpKSm96enp6enp6enp6enp6enp6enp6enp6enp6enp6enp6ent7e3t7e3t7e3t7e3t7e3t8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fH2KiYmJiYmJiYmJiYmJiYmKlpaWlpaWlpWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZSZo6Ojo6OjoqKioqKioqKiprCwsLCvr6+vr6+vr6+vr66urq6urq6urq6tra2tra2tl3p7e3t7e3t7e3t7e3t7e2VJSkpKSkpKS0tLS0tLS0tLTExMTExMTExMTU1NTU1NTT40NDQ0NTU1NTU1NjY2NjYnHh4eHh8fHx8fICAgICAhISEhIiIiIiIjIyMjJCQkJCRSX19fX19gYGBgYGBgYGBgjpmZmZmZmZmZmZmYmJiYmJiYmJiYmJiYmJiYmJeXl5eXjY2NjYyMjIyMjIyMjIyMjIKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoODg4ODg4ODg4ODg4ODg4OEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhHliYmJiYmJjY2NjY2NjY2NZQ0NDQ0REREREREVFRUVFRkZGRkZGR0dHR0dHSEhISEhPV1dYWFhYWFhYWFlZWVlZYGdnZ2hoaGhoaGhoaGhoaGlpaWlpaWlpaWlpaWlqampqeYKCgoKCgoKCgoKCgoKCgpGZmZmZmZmYmJiYmJiYmJiYmJeXl5eXl5eXl5eWlpaWlpSTk5OTk5OTk5OSkpKSkpKQj4+Pj4+Pj4+Pj4+Pjo6Ojo6Ojo6Ojo6Ojo6Ojo2NjY2Xl5eXl5eXlpaWlpaWlpaWn5+enp6enp6enZ2dnZ2dnJycnJycnJubm5ubm5qampqWgYGBgYGBgYGBgYGBgYGBfGpqampqampqa2tra2tra2xsbGxsbGxsbW1tbW1tbW5ubm9vb29vb29vcHBwcHBwcHFxcXFxcnJycnJycnJzc3Nzc3Nzc3N0dHR0dHR0dHR1dXd4eXl5eXl5eXl5eXl5eXp7fX19fX19fX19fX19fX19fX19fX19fX19fn5+fn5+fn5/gICAgICAgICAgICAgICAgYGBgYGBgYGBgYGBgYGBgYCAgICAgICAgICAgICAgICAgA==';
