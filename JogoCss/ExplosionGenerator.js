class ExplosionGenerator {
    constructor() {
        this.explosions = [];
        this.idAtivos = [];
    }

    tick() {
        for(var i = 0; i < this.explosions.length; i++) {


            this.explosions[i].tick();

            if(this.explosions[i].removed) {
                this.removeExplosion(i);
                i++
                continue;
            }
            this.explosions[i].render(); 
        }
    }

    removeExplosion(i) {
        document.getElementById("fundo").removeChild(document.getElementById(this.explosions[i].id));
        this.explosions.splice(i,1);
        this.idAtivos.splice(i,1);
        i++;
    }

    getExplosionId() {
        let novoId = 1;
        while(this.idAtivos.indexOf(novoId) != -1) {
            novoId++;
        }
        this.idAtivos.push(novoId);
        return "explosion" + novoId;
    }
    
    createExplosion(x, y, size, color) {
        const explosionDiv = document.createElement("div");
        explosionDiv.setAttribute("class","circle");
        const explosionId = this.getExplosionId();
        explosionDiv.setAttribute("id", explosionId);
        document.getElementById("fundo").appendChild(explosionDiv);
        const explosion  = new Explosion(x,y,explosionId, size, color);
        this.explosions.push(explosion);
        explosion.render(); 
    }
}