"use strict";

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let w = document.body.clientWidth;
let h = document.body.clientHeight;

const drops = [];


function init() {
    canvas.width = w;
    canvas.height = h;

    for (let i = 0; i < dropsMaxCount; i++) {
        drops[i] = new Drop(new Vector(0, -1));
    }
}

function recompute() {
    w = document.body.clientWidth;
    h = document.body.clientHeight;
}

function resetCanvas() {
    canvas.width = w;
    canvas.height = h;
}

function clearCanvas() {
    c.fillStyle = bgColor;
    c.fillRect(0, 0, w, h);
}

function draw() {
    c.strokeStyle = rainColor;
    for (let i = 0; i < dropsMaxCount; i++) {
        drops[i].draw(c);
    }
}

function loop() {
    clearCanvas();
    draw();
}


window.onresize = () => {
    recompute();
    resetCanvas();
};
init();
setInterval(loop, updateDelta);
