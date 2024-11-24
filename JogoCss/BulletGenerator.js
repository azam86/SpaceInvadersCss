class BulletGenerator {
    constructor() {
        this.bullets = [];
        this.idAtivos = [];
    }

    tick() {
        for(var i = 0; i < this.bullets.length; i++) {

            if(rectRect(this.bullets[i].x, this.bullets[i].y, this.bullets[i].width, this.bullets[i].height, player.x, player.y, player.width, player.height)) {
                player.hurt(1);
                this.bullets[i].removed = true;
            }

            if(this.bullets[i].removed) {
                this.removeBullet(i);
                i++
                continue;
            }

            

            this.bullets[i].tick();
            
            var e = this.bullets[i];

            
            if(this.bullets[i].y < 0) {
                this.removeBullet(i);
                i++
                continue;
            }
            
            this.bullets[i].render(); 
        }
    }

    removeBullet(i) {
        document.getElementById("fundo").removeChild(document.getElementById(this.bullets[i].id));
        this.bullets.splice(i,1);
        this.idAtivos.splice(i,1);
        i++;
    }

    getBulletId() {
        let novoId = 1;
        while(this.idAtivos.indexOf(novoId) != -1) {
            novoId++;
        }
        this.idAtivos.push(novoId);
        return "bullet" + novoId;
    }
    
    createBullet(x, y, dir, sprite) {
        const bulletDiv = document.createElement("div");
        bulletDiv.setAttribute("class","bulletclass");
        const bulletId = this.getBulletId();
        bulletDiv.setAttribute("id", bulletId);
        document.getElementById("fundo").appendChild(bulletDiv);
        const bullet = new Bullet(x,y,bulletId, dir, sprite);
        this.bullets.push(bullet);
        bullet.render(); 
    }

    reset() {
        for(let i = 0; i < this.bullets.length; i++) {
            document.getElementById(this.bullets[i].id).remove();
        }
    }
}