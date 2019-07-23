class UnitVector2D {

    constructor(x, y, angle) {
        if (arguments.length === 0) {
            this.x = this.y = this._x = this._y = this.angleRadians = 0;
            return;
        }

        if (arguments.length === 1) {
            this.x = this.y = this._x = this._y = arguments[0] || 0;
            this.angleRadians = 0;
            return;
        }
        if (arguments.length === 2) {
            this.x = this._x = x || 0;
            this.y = this._y = y || 0;
            this.angleRadians = 0;
            return;
        }

        this.x = this._x = x || 0;
        this.y = this._y = y || 0;
        this.angleRadians = angle || 0;
    }

    rotateBy = (degrees) => {
        let angle = degreesToRadians(degrees);
        this.angleRadians += angle;
        this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        this.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    };

    rotateTo = (degrees) => {
        let angle = degreesToRadians(degrees);
        this.angleRadians = angle;
        this.x = this._x * Math.cos(angle) - this._y * Math.sin(angle);
        this.y = this._x * Math.sin(angle) + this._y * Math.cos(angle);
    }
}

class Drop {

    constructor(vector, level) {
        this.x = this.makeX();
        this.y = intInRange(-h, 0);
        this.z = level;
        this.thickness = map(this.z, -1, dropsMaxLevels -1, 0, dropsMaxThickness);
        this.len = map(this.z, -1, dropsMaxLevels -1, dropsMinLen, dropsMaxLen);
        this.speed = map(this.z, -1, dropsMaxLevels -1, dropsMinSpeed, dropsMaxSpeed);
        this.alpha = map(this.z, -1, dropsMaxLevels - 1, 40, 100) / 100;
        // console.log(this.alpha);

        if (vector instanceof UnitVector2D) {
            this.vector = vector;
        }
    }

    draw = (c) => {
        if (c instanceof CanvasRenderingContext2D) {

            c.beginPath();
                c.moveTo(this.x, this.y);
                c.lineTo(this.x + this.len * this.vector.x, this.y + this.len * this.vector.y);
            c.stroke();

            this.x = this.x + this.speed * this.vector.x;
            this.y = this.y + this.speed * this.vector.y;

            if (
              this.y > h ||
              this.x < (dropSpawnXoffset > 0 ? 0 : dropSpawnXoffset) ||
              this.x > (dropSpawnXoffset > 0 ? w + dropSpawnXoffset : w)
            ) {
                this.y = 0 - this.len;
                this.x = this.makeX();
            }
        }
    };

    makeX = () => {
        if (dropSpawnXoffset > 0)
            return intInRange(0, w + dropSpawnXoffset);
        else
            return intInRange(dropSpawnXoffset, w);
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

function degreesToRadians(degrees) {
    if (degrees >= 360) degrees = degrees % 360;
    return degrees * Math.PI / 180;
}

function makeSpawnXoffset(degrees) {
    let offset = h * Math.tan(degreesToRadians(degrees));
    return Math.round(offset);
}

function getElapsedTimeMs(start) {
    return (new Date() - start);
}
