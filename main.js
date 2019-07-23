"use strict";

const canvasElement = document.getElementById("canvas");
const c = canvasElement.getContext("2d");

let w = document.body.clientWidth;
let h = document.body.clientHeight;

let initRainAngle = 0;
let currRainAngle = initRainAngle;
let dropSpawnXoffset = undefined;
let lastSpawnTime = new Date();
let currDropsCount = 0;
let frame = 0;
const dropsAtLevels = [];
const noise = new Simple1DNoise(-10, updateDelta / 1000);


function init() {
    canvasElement.width = w;
    canvasElement.height = h;

    dropSpawnXoffset = makeSpawnXoffset(currRainAngle);

    for (let lvl = 0; lvl < dropsMaxLevels; lvl++) {
        dropsAtLevels[lvl] = [];
    }
}

function recompute() {
    w = document.body.clientWidth;
    h = document.body.clientHeight;

    dropSpawnXoffset = makeSpawnXoffset(currRainAngle);

    for (let lvl = 0; lvl < dropsMaxLevels; lvl++) {
        if (dropsAtLevels[lvl].length === 0) continue;
        for (let drop = 0; drop < dropsAtLevels[lvl].length; drop++) {
            dropsAtLevels[lvl][drop].vector.rotateTo(currRainAngle);
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

function update() {
    if (currDropsCount !== dropsTotalCount) {
        if (getElapsedTimeMs(lastSpawnTime) >= dropsSpawnDeltaTime) {
            lastSpawnTime = new Date();
            let v = new UnitVector2D(0, 1);
            let lvl = intInRange(0, dropsMaxLevels - 1);
            while (true) {
                if (dropsAtLevels[lvl].length === dropsPerLevelCount[lvl])
                    lvl = intInRange(0, dropsMaxLevels - 1);
                else break;
            }
            v.rotateTo(currRainAngle);
            dropsAtLevels[lvl].push(new Drop(v, lvl));
            currDropsCount++;
        }
    }

    currRainAngle = initRainAngle + noise.getVal(frame++);
    console.log(currRainAngle);
    applyWind();

    if (frame % fps === 0) {
        initRainAngle = currRainAngle;
        noise.amplitude = -noise.amplitude;
    }
}

function drawRain() {
    c.strokeStyle = rainColor;
    for (let lvl = 0; lvl < dropsAtLevels.length; lvl++) {
        if (dropsAtLevels[lvl].length === 0) continue;
        c.globalAlpha = dropsAtLevels[lvl][0].alpha;
        c.lineWidth = dropsAtLevels[lvl][0].thickness;
        for (let j = 0; j < dropsAtLevels[lvl].length; j++) {
            dropsAtLevels[lvl][j].draw(c);
        }
    }
}

function applyWind() {
    dropSpawnXoffset = makeSpawnXoffset(currRainAngle);
    for (let lvl = 0; lvl < dropsMaxLevels; lvl++) {
        if (dropsAtLevels[lvl].length === 0) continue;
        for (let drop = 0; drop < dropsAtLevels[lvl].length; drop++) {
            dropsAtLevels[lvl][drop].vector.rotateTo(currRainAngle);
        }
    }
}

function drawWind() {

}

function loop() {
    clearCanvas();
    update();
    drawRain();
    drawWind()
}


window.onresize = () => {
    recompute();
    resetCanvas();
};
init();
setInterval(loop, updateDelta);
