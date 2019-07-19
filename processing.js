class Vector {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy = (vector) => {
        if (vector instanceof Vector) {
            this.x = vector.x;
            this.y = vector.y;
        }
    }

}
