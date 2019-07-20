"use strict";

const canvasElement = document.getElementById("canvas");
const c = canvasElement.getContext("2d");

let w = document.body.clientWidth;
let h = document.body.clientHeight;

const dropsAtLevels = [];


function init() {
    canvasElement.width = w;
    canvasElement.height = h;

    for (let level = 0; level < dropsMaxLevels; level++) {
        dropsAtLevels[level] = [];
        for (let drop = 0; drop < dropsInitLevel - dropsPerLevelIncr * level; drop++) {
            dropsAtLevels[level][drop] = new Drop(new Vector(0, -1),  level);
        }
    }
}

function recompute() {
    w = document.body.clientWidth;
    h = document.body.clientHeight;
}

function resetCanvas() {
    canvasElement.width = w;
    canvasElement.height = h;
}

function clearCanvas() {
    c.fillStyle = bgColor;
    c.globalAlpha = 1;
    c.fillRect(0, 0, w, h);
}

function draw() {
    c.strokeStyle = rainColor;
    for (let i = 0; i < dropsMaxLevels; i++) {
        c.globalAlpha = dropsAtLevels[i][0].alpha;
        for (let j = 0; j < dropsInitLevel - dropsPerLevelIncr * i; j++) {
            dropsAtLevels[i][j].draw(c);
        }

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
