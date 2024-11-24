class Bullet extends Entity {
    constructor(x, y, id, dir, lvl) {
        super(x,y, [32,16,48,48,32][lvl], 64, id); 
        console.log(dir);
        this.vspd = 12 * Math.sin(dir * (Math.PI/180));
        this.hspd = 12 * Math.cos(dir * (Math.PI/180));
        console.log(Math.sin(dir * (Math.PI/180)));
        this.removed = false;
        this.sprites = ["res/shote.png","res/shot1.png","res/shot2.png","res/shot3.png","res/shote2.png"];
        this.lvl = lvl;
        this.maxHspd = this.hspd;
        document.getElementById(this.id).style.backgroundImage = "url('" + this.sprites[lvl] + "')"
        document.getElementById(this.id).style.backgroundSize = [32,16,48,48,32][lvl] + 'px';    
        
    }

    tick() {
        this.hspd = lerp(this.hspd, -this.maxHspd, .02);
        super.tick();
    }
}