class Snake {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.dims = 20;
        this.direction = "d";
        this.tailLength = 3;
        this.tail = new Array(200);
        this.tail[0] = new Position(this.x-this.dims, this.y);
        this.tail[1] = new Position(this.x-this.dims*2, this.y);
        this.tail[2] = new Position(this.x-this.dims*3, this.y);
    }
    increment() {
        let xDelta = 0;
        let yDelta = 0;
        switch(this.direction) {
            case "w":
                yDelta = this.dims*-1;
                break;
            case "a":
                xDelta = this.dims*-1;
                break;
            case "s":
                yDelta = this.dims;
                break;
            case "d":
                xDelta = this.dims;
                break;
        }
        for(let i = this.tailLength-1; i > 0; i--) {
            this.tail[i] = this.tail[i-1];
        }
        this.tail[0] = new Position(this.x,this.y);
        this.x = this.x + xDelta;
        this.y = this.y + yDelta;

    }
    changeDirection(keycode) {
        let switchAllowed = false;
        switch(this.direction) {
            case "w":
                switchAllowed = (keycode !== "s");
                break;
            case "a":
                switchAllowed = (keycode !== "d");
                break;
            case "s":
                switchAllowed = (keycode !== "w");
                break;
            case "d":
                switchAllowed = (keycode !== "a");
                break;
        }
        if(switchAllowed) {
            this.direction = keycode;
        }
    }

    increaseTail() {
        this.tail[this.tailLength] = new Position(this.tail[this.tailLength-1]);
        this.tailLength++;
        console.log("Updated!")
    }
}

class Position {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

}

class Apple {
    constructor(x,y) {
        this.r = 255;
        this.g = 0;
        this.b = 0;
        this.score = 40;
        this.color = `rgb(${this.r},${this.g},${this.b})`;
        this.position = new Position(x,y);
        this.interval = setInterval(() => {
            if(this.score-5 >= 10) {
                this.score = this.score - 5;
                this.r = this.r - 15;
                this.g = this.g + 17;
                this.color = `rgb(${this.r},${this.g},${this.b})`;
            }
        }, 500);
    }
}