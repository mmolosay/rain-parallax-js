"use strict";

const canvasElement = document.getElementById("canvas");
const c = canvasElement.getContext("2d");

let w = document.body.clientWidth;
let h = document.body.clientHeight;

let rainAngle = -30;
let dropSpawnXoffset;
const dropsAtLevels = [];


function init() {
    canvasElement.width = w;
    canvasElement.height = h;

    dropSpawnXoffset = getSpawnXoffset(rainAngle);

    for (let level = 0; level < dropsMaxLevels; level++) {
        dropsAtLevels[level] = [];
        for (let drop = 0; drop < dropsInitLevel - dropsPerLevelIncr * level; drop++) {
            let vector = new UnitVector2D(0, 1);
            vector.rotateTo(rainAngle);
            dropsAtLevels[level][drop] = new Drop(vector,  level);
        }
    }

    console.log(dropSpawnXoffset);
    console.log(h / 2);
}

function recompute() {
    w = document.body.clientWidth;
    h = document.body.clientHeight;
    dropSpawnXoffset = getSpawnXoffset(rainAngle);
    for (let level = 0; level < dropsMaxLevels; level++) {
        for (let drop = 0; drop < dropsInitLevel - dropsPerLevelIncr * level; drop++) {
            dropsAtLevels[level][drop].vector.rotateTo(rainAngle);
        }
    }
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
        c.lineWidth = dropsAtLevels[i][0].thickness;
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
window.onclick = () => {
    rainAngle += 5;
    recompute();
};
init();
setInterval(loop, updateDelta);
