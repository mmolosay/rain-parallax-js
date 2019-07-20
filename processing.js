class Vector {

    constructor(x, y) {
        if (arguments.length === 0) {
            this.x = Math.random();
            this.y = Math.random();
            return;
        }

        if (arguments.length === 1) {
            this.x = this.y = arguments[0] || 0;
            return;
        }

        this.x = x || 0;
        this.y = y || 0;
    }

}

class Drop {

    constructor(vector, level) {
        this.x = intInRange(0, w);
        this.y = intInRange(-1000, 0);
        this.z = level;
        this.thickness = map(this.z, -1, dropsMaxLevels -1, 0, dropsMaxThickness);
        this.len = map(this.z, -1, dropsMaxLevels -1, dropsMinLen, dropsMaxLen);
        this.speed = map(this.z, -1, dropsMaxLevels -1, dropsMinSpeed, dropsMaxSpeed);
        this.alpha = map(this.z, -1, dropsMaxLevels - 1, 40, 100) / 100;
        console.log(this.alpha);

        if (vector instanceof Vector) {
            this.vector = vector;
        }
    }

    draw = (c) => {
        if (c instanceof CanvasRenderingContext2D) {
            c.lineWidth = this.thickness;

            c.beginPath();
                c.moveTo(this.x, this.y);
                c.lineTo(this.x, this.y + this.len);
            c.stroke();

            this.y += this.speed;
            if (this.y > h) this.y = intInRange(-1000, 0);
        }
    }

}


function intInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function map(fromValue, fromBottomLimit, fromTopLimit, toBottomLimit, toTopLimit) {
    let initFract = (fromValue - fromBottomLimit) / (fromTopLimit - fromBottomLimit);
    let givenRange = toTopLimit - toBottomLimit;
    return initFract * givenRange + toBottomLimit;
}
