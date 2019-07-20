const fps = 60;
const updateDelta = Math.floor(1000 / fps);

const dropsInitLevel = 200;
const dropsPerLevelIncr = 20;
const dropsMaxThickness = 2;
const dropsMaxLen = 65;
const dropsMaxLevels = dropsInitLevel / dropsPerLevelIncr;

const dropsMinSpeed = 10;
const dropsMaxSpeed = 30;

const bgColor = '#0e131b';
const rainColor = '#f0f8ff';
