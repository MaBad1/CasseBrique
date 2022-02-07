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
        this.Initiale();

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
        this.raquette.setDisplaySize(100,20);
        this.raquette.body.setAllowGravity(false);
        this.raquette.setImmovable(true);

        let me=this;

        //colliders

        this.physics.add.collider(this.balle,this.gauche);
        this.physics.add.collider(this.balle,this.haut);
        this.physics.add.collider(this.balle,this.droite);
        this.physics.add.collider(this.raquette,this.droite);
        this.physics.add.collider(this.raquette,this.gauche);

        this.physics.add.collider(this.balle,this.raquette, function (){
            me.rebond(me.gauche);
        });

        this.initKeyboard();
    }

    Initiale (){
        //fonction pour initialiser la vitesse et la direction de la balle au début d'un round
        this.balle.setX(this.largeur/2);
        this.balle.setY(this.hauteur/2);

        let pourcent = Phaser.Math.Between(0, 100)

        if (pourcent >= 50){
            this.balle.setVelocityX(200);
        }
        if (pourcent < 50){
            this.balle.setVelocityX(-200);
        }

        this.balle.setVelocityY(0);

    }

    rebond(raquette){

        let hauteurRaquette = raquette.displayHeight;

        let positionRelativeRaquette = (this.balle.x - raquette.x);

        positionRelativeRaquette = (positionRelativeRaquette / hauteurRaquette);

        positionRelativeRaquette = positionRelativeRaquette*2-1;

        console.log(positionRelativeRaquette);

        this.balle.setVelocityX(this.balle.body.velocity.x + positionRelativeRaquette * hauteurRaquette);

    }

    win(joueur){
        joueur.score ++;
        this.Initiale();
    }


    initKeyboard(){
        let me=this;
        this.input.keyboard.on('keydown', function(kevent) {

            //inputs pour avoir un movement et un arrêt simultané des raquettes en gardant un même écart entre les raquettes du milieu de terrain.

            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.LEFT:
                    me.raquette.setVelocityX(-200);
                    break;

                case Phaser.Input.Keyboard.KeyCodes.RIGHT:
                    me.raquette.setVelocityX(200);
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

    }
}
