class Enemy extends Entity {
    constructor(x,y, id, life, spd, img, scoreValue, width, height) {
        super(x,y, width, height, id, life); 
  
        this.vspd = spd;
        this.scoreValue = scoreValue;
        let healthBarDiv = document.createElement("div");
        healthBarDiv.setAttribute("class","healthBar");
        healthBarDiv.setAttribute("id",this.id + "healthBar")
        this.hId = this.id + "healthBar";
        document.getElementById("fundo").appendChild(healthBarDiv);
        this.timer = 0;
        this.xStart = this.x;
   
        document.getElementById(this.id).style.backgroundImage = "url('" + img + "')";
    }

    tick() {
        this.timer++;
        super.tick();
    }

    render() {
        let h = document.getElementById(this.hId);
        h.style.left = this.x-8 + "px";
        h.style.top  = this.y-20-8 + "px";
        h.style.width = (this.life/this.maxLife) * this.width + "px";
        super.render();
    }
} 

class Asteroid extends Enemy{
    constructor(x,y, id, life, spd, img, scoreValue, width, height) {
        super(x,y, id, life, spd, img, scoreValue, width, height); }
        render() {
            let e = document.getElementById(this.id);
            e.style.left = this.x + "px";
            e.style.top  = this.y + "px";
            e.style.width = this.width + "px";
            e.style.height  = this.height + "px";
        }
}
class Asteroid1 extends Asteroid{
    constructor(x,y,id) {
        super(x,y,id, 1,4, "res/asteroid1.png", 0, 16 * 8, 8 * 8); }
}
class Asteroid2 extends Asteroid{
    constructor(x,y,id) {
        super(x,y,id, 1,4, "res/asteroid2.png", 0, 12 * 8, 12 * 8); } 
}
class Asteroid3 extends Asteroid{
    constructor(x,y,id) {
        super(x,y,id, 1,4, "res/asteroid3.png", 0, 11 * 8, 9 * 8); } 
}
class Asteroid4 extends Asteroid{
    constructor(x,y,id) {
        super(x,y,id, 1,4, "res/asteroid4.png", 0, 6 * 8, 5 * 8); } 
}
class Asteroid5 extends Asteroid{
    constructor(x,y,id) {
        super(x,y,id, 1,4, "res/asteroid5.png", 0, 7 * 8, 7 * 8); } 
}


class Enemy1 extends Enemy{
    constructor(x,y,id) {
        super(x,y,id, 6,2, "res/enemy1.gif", 100, 8 * 8, 8 * 8);
    }

    tick() {
        this.x = this.xStart + Math.sin(this.timer/11)*30;
        super.tick();
    }
}

class Enemy2 extends Enemy{
    constructor(x,y,id) {
        super(x,y,id, 2, 2, "res/enemy2.gif", 150, 8 * 8, 8 * 8);
        this.choiceDelay = FPS * 1;
        this.choiceTimer = this.choiceDelay;
        this.go = false;     
   
        this.spx = 0;
        this.spy = 0;
    }

    tick() {
        if(this.choiceTimer > 0) this.choiceTimer--;
        else {
            this.go = !this.go;
            if(this.go) {
                this.spx = player.x;
                this.spy = player.y-192;
            }
            this.choiceTimer = this.choiceDelay;
        }

        if(this.go) {
            let distx = this.spx - this.x;
            let disty = this.spy - this.y;
            let mag = Math.sqrt(distx*distx + disty*disty);
            let dirx = distx/mag;
            let diry = disty/mag;
            
            if(this.y >= player.y-200) {
                this.y += 4;
            } else {
                this.x += dirx * 4;
                this.y += diry * 4;
            }
            
        } else {
            this.vspd = 0;
        }

        super.tick();
    }
}

class Enemy3 extends Enemy{
    constructor(x,y,id) {
        super(x,y,id, 10, 1, "res/enemy3.gif", 200, 8 * 8, 8 * 8);
      
    }

    tick() {
        this.x = lerp(this.x, player.x, .01);
        super.tick();
    }
}

class Enemy5 extends Enemy{
    constructor(x,y,id) {
        super(x,y,id, 1, 8, "res/enemy5.gif", 120, 8 * 8, 8 * 8);
      
    }

    tick() {
        
        super.tick();
    }
}

class Enemy7 extends Enemy{
    constructor(x,y,id) {
        super(x,y,id, 10, 2, "res/enemy7.gif", 300, 8 * 8, 8 * 8);
        this.shotDelay = FPS * 3; 
        this.shotTimer = this.shotDelay;     
        this.shotLvl = 0;
    }

    tick() {
        if(this.shotTimer > 0) {
            this.shotTimer--;
        } else {
          
            const bulletHalfWidth = [16,8,24,24][this.shotLvl];
            bulletGenerator.createBullet(this.x + 32 - bulletHalfWidth,this.y+this.height, 90, this.shotLvl); 
            this.shotTimer = this.shotDelay;
        }
        super.tick();
    }
}

class Enemy4 extends Enemy{
    constructor(x,y,id) {
        super(x,y,id, 6, 3, "res/enemy4.gif", 300, 8 * 8, 8 * 8);
        this.shotDelay = FPS * 2;
        this.shotTimer = this.shotDelay;     
        this.shotLvl = 4;
    }

    tick() {
        if(this.shotTimer > 0) {
            this.shotTimer--;
        } else {
          
            const bulletHalfWidth = [16,8,24,24,16][this.shotLvl];
            bulletGenerator.createBullet(this.x + 32 - bulletHalfWidth,this.y+this.height, 90, this.shotLvl); 
            this.shotTimer = this.shotDelay;
        }
        super.tick();
    }
}


class Boss1 extends Enemy {
    constructor(x,y,id) {
        super(WIDTH/2 - 30*8/2,y,id, 100, 3, "res/boss1.png", 2000, 30 * 8, 23 * 8);
        this.shotDelay = FPS * 3;
        this.shotTimer = this.shotDelay;     
        this.shotLvl = 4;
        
        this.xshake = 0;
    }

    tick() {
        if(this.shotTimer > 0) {
            this.shotTimer--;
        } else {
          
            const bulletHalfWidth = [16,8,24,24,16][this.shotLvl];
            bulletGenerator.createBullet(this.x + this.width/2 - bulletHalfWidth,this.y+this.height, 90, this.shotLvl); 
            bulletGenerator.createBullet(this.x + this.width/2 - bulletHalfWidth - 110,this.y+this.height - 40, 90 + 45, this.shotLvl);
            bulletGenerator.createBullet(this.x + this.width/2 - bulletHalfWidth + 110,this.y+this.height - 40, 90 - 45, this.shotLvl);  
            let sound = new Audio("res/eshot.mp3");
            sound.volume = 0.2;
            sound.play(); 
            this.shotTimer = this.shotDelay;
        }

        if(this.y > 240) {
            this.vspd = 0;
        }
        super.tick();
    }

    render() {
        this.xshake*=0.9;
        let xshakeChoice = [this.xshake, -this.xshake][Math.floor(Math.random()*2)];
        let yshakeChoice = [this.xshake, -this.xshake][Math.floor(Math.random()*2)];
    
        let e = document.getElementById(this.id);
        e.style.left = this.x+ xshakeChoice + 'px';
        e.style.top  = this.y + yshakeChoice + "px";
        e.style.backgroundColor = this.color;

        e.style.width = this.width + "px";
        e.style.height  = this.height + "px";

        let h = document.getElementById(this.hId);
        h.style.left = this.x-8 + "px";
        h.style.top  = this.y-20-8 + "px";
        h.style.width = (this.life/this.maxLife) * this.width + "px";
    }

    hurt(dmg) {
        this.xshake = 5;
        if(this.life-dmg <= 0) {
            enemyGenerator.bossScore+=score+2000+3000;
            enemyGenerator.boss = false;
        }
        super.hurt(dmg);
    }
}





