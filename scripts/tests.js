
var tests = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function mainScene() {
        Phaser.Scene.call(this, {
            key: 'tests',
            active: false
        });
    },

    preload: function () {

       

    },

    create: function () {
        this.add.rectangle(0,20,500,200).setFillStyle(0x1f317d);
    },

    update: function () { },

})

