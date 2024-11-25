class EnemyGenerator {
    constructor() {
        this.enemies = [];
        this.idAtivos = [];
        this.enemyDelay = FPS * 3; // 2 segundos
        this.enemyTimer = this.enemyDelay;

        this.asteroidDelay = FPS * 2; // 2 segundos
        this.asteroidTimer = this.asteroidDelay;
        this.boss = false;
        this.bossScore = 3000;
    }

    tick(player, bullets) {
        if(!this.boss && score >= this.bossScore) {
            this.createEnemy(0,-64, Boss1);
            this.boss = true;
        }

        if(this.asteroidTimer > 0) {
            this.asteroidTimer--;
        } else {

            let rPos = Math.random()*(WIDTH-64);
          
         
            let enemy = [Asteroid1,Asteroid2,Asteroid3,Asteroid4,Asteroid5][Math.floor(Math.random() * 5)];
            this.createEnemy(rPos,-64, enemy);
        

            this.asteroidTimer = this.asteroidDelay; 
        }

        if(this.enemyTimer > 0) {
            this.enemyTimer--;
        } else {
            let r = Math.random();
            let rPos = Math.random()*(WIDTH-64);
          
            if(r < .5) {
                let enemy = [Enemy1, Enemy2, Enemy3, Enemy4, Enemy5, Enemy7][Math.floor(Math.random() * 5)];
                this.createEnemy(rPos,-64, enemy);
            } else {
                let enemy = [Enemy1, Enemy2, Enemy5, Enemy7][Math.floor(Math.random() * 4)];
                this.createEnemy(rPos,-64, enemy);
                this.createEnemy(rPos + 64 + 8,-64, enemy);     
            }
            this.enemyTimer = this.enemyDelay + (1-Math.random()*2) * FPS * 1; // 1 segundo randomizado
        }

        for(var i = 0; i < this.enemies.length; i++) {
            
            var e = this.enemies[i];

            if(!player.removed) {
                if(rectRect(e.x, e.y, e.width, e.height, player.x, player.y, player.width, player.height)) {
                    this.removeEnemy(i);
                    this.genExplosion(e);
                    player.hurt(1);
                    i++;
                    continue;
                }
            }

            for(var j = 0; j < bullets.length; j++) {
                const b = bullets[j];
                const bHurtLevels = [0,4];
                if(rectRect(e.x, e.y, e.width, e.height, b.x, b.y, b.width, b.height) && bHurtLevels.indexOf(b.lvl) == -1) {
                    e.hurt(1 * b.lvl);
                    
                    if(e.life <= 0) {
                        let sound = new Audio("res/enemyexplosion.wav");
                        sound.play(); 
                        score += e.scoreValue;
                        xshake = 10;
                        if(score >= 2000 && player.shotLvl < 2) {
                            player.updateShotLvl(2);
                            this.enemyDelay = FPS * 2;
                        }

                        if(score >= 4000 && player.shotLvl < 3) {
                            player.updateShotLvl(3);
                            this.enemyDelay = FPS * 1;
                        }
                        document.getElementById("score").innerHTML = score;
                        this.genExplosion(e);
                    } else {
                        let sound = new Audio("res/enemyhit.wav");
                        sound.play(); 
                    }
                    b.removed = true;
                }
            }

            if(e.removed || this.enemies[i].y > HEIGHT) {
                this.removeEnemy(i);
                console.log(i);
                i++;
                continue;
            }
            this.enemies[i].tick();
            
            this.enemies[i].render();
        }

    }

    genExplosion(e) {
        for(let k = 0; k < 15; k++) {
            let esize = 5 + Math.random() * 15;
            let rhue = 60 + Math.random()*200;
            let ecolor = "rgb(255,"+rhue+",0)";
            explosionManager.createExplosion(e.x + Math.random() * (e.width), e.y + Math.random() * (e.width), esize, ecolor);
        }
    }

    removeEnemy(i) {
        document.getElementById(this.enemies[i].hId).remove();
        document.getElementById(this.enemies[i].id).remove();
        this.enemies.splice(i,1);
        this.idAtivos.splice(i,1);
       
    }

    getEnemyId() {
        let novoId = 1;
        while(this.idAtivos.indexOf(novoId) != -1) {
            novoId++;
        }
        this.idAtivos.push(novoId);
        return "enemy" + novoId;
    }
    
    createEnemy(x, y, type) {
        const enemyDiv = document.createElement("div");
        enemyDiv.setAttribute("class","enemyclass");
        const enemyId = this.getEnemyId();
        enemyDiv.setAttribute("id", enemyId);
        document.getElementById("fundo").appendChild(enemyDiv);
        const enemy = new type(x,y,enemyId);
    
        this.enemies.push(enemy);
    }

    reset() {
        for(let i = 0; i < this.enemies.length; i++) {
            document.getElementById(this.enemies[i].hId).remove();
            document.getElementById(this.enemies[i].id).remove();
        }
    }
}