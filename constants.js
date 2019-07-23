const fps = 60;
const updateDelta = Math.floor(1000 / fps);

const dropsInitLevel = 50;
const dropsPerLevelIncr = 5;
const dropsMaxThickness = 1.5;

const dropsMinLen = 40;
const dropsMaxLen = 40;

const dropsMaxLevels = dropsInitLevel / dropsPerLevelIncr;
const dropsPerLevelCount = getDropsPerLevelCount();
const dropsTotalCount = getDropsTotalCount();

const dropsSpawnDeltaTime = 40;

const dropsMinSpeed = 5;
const dropsMaxSpeed = 30;

const rainMaxAbsAngle = 40;

const windForceChangeChance = 0.05;

const bgColor = '#0e131b';
const rainColor = '#f0f8ff';

function getDropsPerLevelCount() {
    let d = [];
    for (let i = 0; i < dropsMaxLevels; i++)
        d[i] = dropsInitLevel - i * dropsPerLevelIncr;
    return d;
}

function getDropsTotalCount() {
    let cnt = 0;
    dropsPerLevelCount.forEach( (item) => {cnt += item;} );
    return cnt;
}
