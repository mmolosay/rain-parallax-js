"use strict";

const canvasElement = document.getElementById("canvas");
const c = canvasElement.getContext("2d");

let w = document.body.clientWidth;
let h = document.body.clientHeight;

let rainAngle = -30;
let dropSpawnXoffset = undefined;
let lastSpawnTime = new Date();
const dropsAtLevels = [];

let currDropsCount = 0;


function init() {
    canvasElement.width = w;
    canvasElement.height = h;

    dropSpawnXoffset = makeSpawnXoffset(rainAngle);

    // for (let lvl = 0; lvl < dropsMaxLevels; lvl++) {
    //     dropsAtLevels[lvl] = [];
    //     for (let drop = 0; drop < dropsInitLevel - dropsPerLevelIncr * lvl; drop++) {
    //         let vector = new UnitVector2D(0, 1);
    //         vector.rotateTo(rainAngle);
    //         dropsAtLevels[lvl][drop] = new Drop(vector, lvl);
    //     }
    // }

    for (let lvl = 0; lvl < dropsMaxLevels; lvl++) {
        dropsAtLevels[lvl] = [];
    }


}

function recompute() {
    w = document.body.clientWidth;
    h = document.body.clientHeight;
    dropSpawnXoffset = makeSpawnXoffset(rainAngle);
    for (let lvl = 0; lvl < dropsMaxLevels; lvl++) {
        if (dropsAtLevels[lvl].length === 0) continue;
        for (let drop = 0; drop < dropsAtLevels[lvl].length; drop++) {
            dropsAtLevels[lvl][drop].vector.rotateTo(rainAngle);
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
            v.rotateTo(rainAngle);
            dropsAtLevels[lvl].push(new Drop(v, lvl));
            console.log(++currDropsCount + " / " + dropsTotalCount);
        }
    }
}

function draw() {
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

function loop() {
    clearCanvas();
    update();
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
