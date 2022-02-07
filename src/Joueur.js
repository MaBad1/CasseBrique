class Joueur {
    get score() {
        return this._score;
    }
    get vies(){
        return this._vies;
    }

    set vies(value){
        this._vies=value;
        this.$vies.textContent= this._vies
        console.log(this)
    }

    set score(value) {
        this._score = value;
        this.$score.textContent=  this._score
        console.log(this)
    }
    constructor(name,scoreId) {
        this._score = 0;
        this._vies = 3;
        this.scoreId = scoreId;
        this.$el = document.getElementById(scoreId);
        this.$score = this.$el.querySelector(".score")
        this.$vies = this.$el.querySelector(".vies")
        this.$vies.textContent=vies;

    }
}