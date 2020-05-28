let music;
let complete = 0;




var loading = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function loading() {

        Phaser.Scene.call(this, {
            key: 'loading',
            active: true
        });
    },

    preload: function () { //loads all the assets from the complete game

        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        
        this.load.html('form', './scripts/form.html');

        this.load.image("black" , "./assets/images/black.png");
        this.load.image("background_1", "./assets/images/base1.png");
        this.load.image("background_2", "./assets/images/base2.png");
        this.load.image("bloom", "./assets/images/lights_bloom.png");
        this.load.image("dust","./assets/images/dust.gif");
        this.load.image("whiteSquare","./assets/images/white_square.png");
        this.load.image("hambugerIcon","./assets/images/Hamburger_icon.png")

        this.load.spritesheet("discoBall", "./assets/images/disco ball.png", {
            frameWidth: 36,
            frameHeight: 36
        }); //ball
        this.load.spritesheet("blueGuy", "./assets/images/guy blue sprites.png", {
            frameWidth: 36,
            frameHeight: 36
        }); // blue character
        this.load.spritesheet("redGuy", "./assets/images/red guy blue sprites.png", {
            frameWidth: 36,
            frameHeight: 36
        }); // blue character
        this.load.spritesheet("collapsingRed", "./assets/images/collapsing_red.png", {
            frameWidth: 36,
            frameHeight: 36
        });
        this.load.spritesheet("collapsingBlue", "./assets/images/collapsing_blue.png", {
            frameWidth: 36,
            frameHeight: 36
        });

        this.load.spritesheet("NPC", "./assets/images/NPC sprites.png", {
            frameWidth: 36,
            frameHeight: 36
        }); // NPC
        this.load.spritesheet("ZZZ", "./assets/images/white z.png", {
            frameWidth: 36,
            frameHeight: 36
        }) // zzz when sleeping

        this.load.image("drums", "./assets/images/drums.png"); //Objects
        this.load.image("table", "./assets/images/table.png");
        this.load.image("speakers", "./assets/images/speakers.png");

        this.load.image("messageBoard", "./assets/images/dialogue window rectangle.png"); // dialogue window       
        this.load.image("startButton", "./assets/images/start_button.png"); // start button       
        this.load.image("interactButton", "./assets/images/interact_button.png"); // interact window       
        this.load.bitmapFont('Antenna', 'assets/fonts/antenna.png', 'assets/fonts/antenna.xml'); //load the font
        this.load.spritesheet("ZZZIcon", "./assets/images/white z.png", {
            frameWidth: 36,
            frameHeight: 36
        })

        // initial screen
        this.load.image("guttedText", "./assets/images/gutted shea stadium solo smaller.png");
        this.load.image("bluepointLogo", "./assets/images/bluepoint solo smaller.png");
        this.load.image("lvl1Text", "./assets/images/lvl 1 solo smaller.png");

        // social media icons
        this.load.image("facebook", "./assets/images/facebook.png");
        this.load.image("twitter", "./assets/images/twitter.png");
        this.load.image("shareIcon", "./assets/images/pngwave.png");
        this.load.image("copyIcon", "./assets/images/copy.png");

        // audios
        this.load.audio("song", "./assets/audio/Gutted.mp3");

        // fonts
        text = this.add.text(350, 300, "Loading...", {
            fontFamily: 'ZCOOL QingKe HuangYou',
            fontSize: 50
        })

        this.load.on('complete', function () {
            complete++;
        });
    },

    create: function () {

     
        WebFont.load({
            google: {
                families: ['ZCOOL QingKe HuangYou']
            },
            active: function () {
                complete++;
            }
        });
        music = this.sound.add('song', {
            delay: 0
        });
    },

    update: function () {
        if (complete == 2) this.scene.start("menu")
    }
})
