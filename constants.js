const fps = 60;
const updateDelta = Math.floor(1000 / fps);

const dropsInitLevel = 50;
const dropsPerLevelIncr = 5;
const dropsMaxThickness = 1;

const dropsMinLen = 40;
const dropsMaxLen = 40;

const dropsMaxLevels = dropsInitLevel / dropsPerLevelIncr;

const dropsMinSpeed = 5;
const dropsMaxSpeed = 30;

const bgColor = '#0e131b';
const rainColor = '#f0f8ff';
