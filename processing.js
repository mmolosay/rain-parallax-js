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

    constructor(vector) {
        this.x = intInRange(0, w);
        this.y = intInRange(-1000, 0);
        this.z = intInRange(0, dropsMaxLevels);
        this.thickness = map(this.z, 0, dropsMaxLevels, 0, dropsMaxThickness);
        this.len = map(this.z, 0, dropsMaxLevels, 0, dropsMaxLen);
        this.speed = map(this.z, 0, dropsMaxLevels, dropsMinSpeed, dropsMaxSpeed);

        if (vector instanceof Vector) {
            this.vector = vector;
        }
    }

    draw = (canvas) => {
        if (canvas instanceof CanvasRenderingContext2D) {
            canvas.lineWidth = this.thickness;
            canvas.beginPath();
                canvas.moveTo(this.x, this.y);
                canvas.lineTo(this.x, this.y + this.len);
            canvas.stroke();

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
