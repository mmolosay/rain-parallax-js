"use strict";

const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

let w = document.body.clientWidth;
let h = document.body.clientHeight;

canvas.width = w;
canvas.height = h;

prepareCanvas();

function prepareCanvas() {
    c.fillStyle = '#0e131b';
    c.fillRect(0, 0, w, h);
}
