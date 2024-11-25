class Explosion extends Entity {
    constructor(x,y, id, size, color) {
      
        super(x,y, 16, 16, id, 1); 
      
        this.color = color;
        this.psize = size;
        this.decrease = false;
        this.xstart = x;
        this.ystart = y;
        this.opacity = 0.5 + Math.random()*0.5;
        this.maxPsize = size + 20;
    }    

    tick() {
        if(this.decrease) {
            this.psize-=3;
        } else {
            this.psize = lerp(this.psize, this.maxPsize, .2)
            if(this.psize >= this.maxPsize-1) {
                this.decrease = true;
            }
        }
        this.opacity-=.01;
        if(this.opacity <= 0 || this.psize <= 1) {
            this.removed = true;
        } 
        super.tick();
    }

    render() {
        let e = document.getElementById(this.id);
        e.style.backgroundColor = this.color;
        e.style.padding = this.psize + 'px';
        e.style.left = (this.xstart-this.psize) + "px";
        e.style.top  = (this.ystart-this.psize) + "px";
        e.style.opacity = this.opacity;
    }
}   