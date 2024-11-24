class Player extends Entity {
        constructor(x,y) {
            super(x,y, 64, 64, "player", 3);
        
            this.right = false;
            this.left = false;
            this.removed = false;

            this.sprites = ["res/playerLeft.png", "res/playerIdle.png", "res/playerRight.png"]
            this.shotLvl = 1;
        }

        tick() {
          
            let _hspd = (this.right - this.left) * 10;
            this.hspd = lerp(this.hspd, _hspd, .1);

            if(this.x + this.hspd <= 0) {
                this.hspd = 0;
                this.x = 0;
            }

            if(this.x + this.hspd + this.width > WIDTH) {
                this.hspd = 0;
                this.x = WIDTH - this.width;
            }
            super.tick();
        }

        shot(bulletGenerator) {
            const bulletHalfWidth = [16,8,24,24][this.shotLvl];
            if(!this.removed)bulletGenerator.createBullet(this.x + 32-bulletHalfWidth,this.y-65, 270, this.shotLvl);
            let sound = new Audio("res/shot.wav");
            sound.play(); 
           
        }

        hurt(dmg) {
            if(this.removed) return;
            this.life -= dmg;
            let sound = new Audio("res/hit.wav");
            sound.play();
            if(this.life <= 0) {
                this.removed = true;
                gameOver();
                document.getElementById("player").remove();
            } 
            xshake = 10;
            document.getElementById("life").innerHTML = "X" + this.life;
        }

        render() {
            let e = super.render();
            let hspdIndex = 1 + Math.sign(Math.abs(this.hspd) < .4 ? 0 : this.hspd);
            let bgImg = this.sprites[hspdIndex];
            e.style.backgroundImage = "url('" + bgImg + "')";
        }

        updateShotLvl(lvl) {

     
            let sound = new Audio("res/shotup.wav");
            sound.play(); 
            this.shotLvl = lvl;
            document.getElementById("shotlvl").innerHTML = "X" + this.shotLvl;
            document.getElementById("shoticon").src = ["res/shote.png","res/shot1.png","res/shot2.png","res/shot3.png"][this.shotLvl];
            const bulletHalfWidth = [16,8,24,24][this.shotLvl];
            document.getElementById("shoticon").width = bulletHalfWidth*2;
        }
    }
