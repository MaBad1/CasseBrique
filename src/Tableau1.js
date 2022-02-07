class Tableau1 extends Phaser.Scene{
    preload(){
        //Preload des les assets.

        this.load.image('cercle',"assets/cercle.png");
        this.load.image('carre',"assets/carre.png");

    }
    create(){
        this.hauteur=800;
        this.largeur=800;

        //Sprite de la balle et paramètres

        this.balle=this.physics.add.sprite(this.largeur/2,this.hauteur/2,'cercle');
        this.balle.setDisplaySize(20,20);
        this.balle.body.setBounce(1.1,1.1);
        this.balle.body.setMaxVelocity(500,500);
        this.balle.setVelocityY(200);

        //Limites haute et basse du terrain

        this.haut=this.physics.add.sprite(0,0,'carre').setOrigin(0,0);
        this.haut.setDisplaySize(this.largeur,20);
        this.haut.body.setAllowGravity(false);
        this.haut.setImmovable(true);

        this.gauche=this.physics.add.sprite(0,0,'carre').setOrigin(0,0);
        this.gauche.setDisplaySize(20,this.hauteur);
        this.gauche.body.setAllowGravity(false);
        this.gauche.setImmovable(true);

        this.droite=this.physics.add.sprite(this.largeur-20,0,'carre').setOrigin(0,0);
        this.droite.setDisplaySize(20,this.hauteur);
        this.droite.body.setAllowGravity(false);
        this.droite.setImmovable(true);

        //raquette
        this.raquette=this.physics.add.sprite(this.largeur/2,this.hauteur-20,'carre').setOrigin(0,0);
        this.raquette.setDisplaySize(200,20);
        this.raquette.body.setAllowGravity(false);
        this.raquette.setImmovable(true);

        let me=this;

        //briques placées avec un tableau

        for(let j=1; j<=5; j++){
            for(let i=1; i<=9; i++){

                let brique=  this.physics.add.sprite(60+(i*61),100+(j*31),'carre').setOrigin(0,0);
                brique.setDisplaySize(60,30);
                brique.body.setAllowGravity(false);
                brique.setImmovable(true);
                brique.setVisible(true);
                this.physics.add.collider(this.balle,brique, function (){
                    brique.destroy(true)
                });
                //couleur des briques spéciales
                if(i==4 && j==4){
                    brique.setTintFill(0x00ff00);
                }
                if(i==5 && j==4){
                    brique.setTintFill(0xff0000);
                }

            }


        }


        //joueur

        this.joueur = new Joueur('j1','Jscore')

        //colliders

        this.physics.add.collider(this.balle,this.gauche);
        this.physics.add.collider(this.balle,this.haut);
        this.physics.add.collider(this.balle,this.droite);
        this.physics.add.collider(this.raquette,this.droite);
        this.physics.add.collider(this.raquette,this.gauche);

        this.physics.add.collider(this.balle,this.raquette, function (){
            me.rebond(me.raquette);
        });


        this.initKeyboard();
    }

    //reset de la balle
    reset(){
        if(this.balle.y>800){
            this.balle.setX(this.largeur/2);
            this.balle.setY(this.hauteur/2);
            this.balle.setVelocityX(0);
            this.balle.setVelocityY(200);
        }
    }
    rebond(raquette){

        let hauteurRaquette = raquette.displayWidth;

        let positionRelativeRaquette = (this.balle.x - raquette.x);

        positionRelativeRaquette = (positionRelativeRaquette / hauteurRaquette);

        positionRelativeRaquette = positionRelativeRaquette*2-1;

        console.log(positionRelativeRaquette);

        this.balle.setVelocityX(this.balle.body.velocity.x + positionRelativeRaquette * hauteurRaquette);

    }

    //gain de score pour le joueur (inutile, j'ai pas réussi à l'utiliser correctement)
    win(joueur){
        joueur.score ++;
    }


    initKeyboard(){
        let me=this;
        this.input.keyboard.on('keydown', function(kevent) {

            //inputs de la raquette

            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    if(me.raquette.x<20){
                        me.raquette.setVelocityX(0)
                    }
                    else{
                        me.raquette.setVelocityX(-450);
                    }
                    break;

                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    if(me.raquette.x>580){
                        me.raquette.setVelocityX(0)
                    }
                    else{
                        me.raquette.setVelocityX(450);
                    }
                    break;

            }
        });
        this.input.keyboard.on('keyup', function(kevent) {

            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.raquette.setVelocityX(0);
                    break;
                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.raquette.setVelocityX(0);
                    break;

            }
        });
    }

    update(){
        this.reset()
    }
}
