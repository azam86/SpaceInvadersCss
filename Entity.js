class Entity {
    constructor(x,y, width, height, id, life) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
        this.color = undefined;
        this.id = id;
        this.hspd = 0;
        this.vspd = 0;
        this.removed = false;
        this.maxLife = life;
        this.life = this.maxLife;

      
    }

    tick() {
        this.x += this.hspd;
        this.y += this.vspd;
    }

    render() {
        let e = document.getElementById(this.id);
        e.style.left = this.x + "px";
        e.style.top  = this.y + "px";
        e.style.backgroundColor = this.color;
     
        e.style.width = this.width + "px";
        e.style.height  = this.height + "px";
        return e;
    }

    hurt(dmg) {
        this.life-=dmg;
        if(this.life <= 0) {
            this.removeSelf();
        }
    }

    removeSelf() {
        this.removed = true;
    }
}
