var level_2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function level_2() {
        Phaser.Scene.call(this, {
            key: 'level_2',
            active: false
        });
    },

    preload: function () {
        
    },

    create: function(){
        background2 = this.add.image(0, 0, "level2_back2").setOrigin(0, 0).setScale(2);
        background3 = this.add.image(0, 0, "level2_back3").setOrigin(0, 0).setScale(2);
        background1 = this.add.image(0, 0, "level2_back1").setOrigin(0, 0).setScale(2);
        


    }

    

})