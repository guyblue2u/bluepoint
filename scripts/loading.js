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

        this.load.image("black", "./assets/images/black.png");
        this.load.image("background_1", "./assets/images/base1.png");
        this.load.image("background_2", "./assets/images/base2.png");
        this.load.image("bloom", "./assets/images/lights_bloom.png");
        this.load.image("dust", "./assets/images/dust.gif");
        this.load.image("whiteSquare", "./assets/images/white_square.png");
        this.load.image("hambugerIcon", "./assets/images/Hamburger_icon.png");
        this.load.image("mutedIcon", "./assets/images/unmute-icon-12.png");

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
        this.load.image("guttedText", "./assets/images/Lvl 1_and_name_updated.png");
        this.load.image("bluepointLogo", "./assets/images/logo_updated.png");


        // social media icons
        this.load.image("facebook", "./assets/images/facebook.png");
        this.load.image("twitter", "./assets/images/twitter.png");
        this.load.image("shareIcon", "./assets/images/pngwave.png");
        this.load.image("copyIcon", "./assets/images/copy.png");

        // audios
        this.load.audio("start_Sound", "./assets/audio/Start Sound.mp3");
        this.load.audio("intro_Synth", "./assets/audio/Bluepoint Intro Synth.mp3");
        this.load.audio("intro_Rythm", "./assets/audio/Bluepoint Intro Rhythm.mp3");
        this.load.audio("song", "./assets/audio/Gutted.mp3");
        this.load.audio("loading", "./assets/audio/Bluepoint Loading Sound.m4a");
        this.load.audio("outro", "./assets/audio/Bluepoint Outro Music.m4a");
        this.load.audio("map_music", "./assets/audio/Bluepoint Menu Theme.mp3");
        this.load.audio("map_select", "./assets/audio/map select sound.mp3");


        // map
        this.load.image("map_trees", "./assets/images/map/trees.png");
        this.load.image("map_logo", "./assets/images/map/map_logo.png");

        this.load.image("map_golden_road", "./assets/images/map/golden_20road_20.png");
        this.load.image("map_golden_road_grey", "./assets/images/map/golden road  grey.png");
        this.load.image("map_golden_road_glow", "./assets/images/map/golden road  grey_glow.png");

        this.load.image("map_204_grey", "./assets/images/map/building_204_20grey.png");
        this.load.image("map_204_glow", "./assets/images/map/building_204_20grey_glow.png");
        this.load.image("map_204_color", "./assets/images/map/building_204_20color.png");

        this.load.image("map_203_grey", "./assets/images/map/building_203_20grey.png");
        this.load.image("map_203_glow", "./assets/images/map/building_203_20grey_glow.png");
        this.load.image("map_203_color", "./assets/images/map/building_203_20color.png");

        this.load.image("map_202_grey", "./assets/images/map/building_202_20grey.png");
        this.load.image("map_202_glow", "./assets/images/map/building_202_20grey_glow.png");
        this.load.image("map_202_color", "./assets/images/map/building_202_20color.png");

        this.load.image("map_201_grey", "./assets/images/map/building_201_20grey.png");
        this.load.image("map_201_glow", "./assets/images/map/building_201_20grey_glow.png");
        this.load.image("map_201_color", "./assets/images/map/building_201_20color.png");

        this.load.image("map_bridge_grey", "./assets/images/map/bridge_20grey.png");
        this.load.image("map_bridge_glow", "./assets/images/map/bridge_20grey_glow.png");
        this.load.image("map_bridge_color", "./assets/images/map/bridge_20color.png");

        this.load.image("map_base", "./assets/images/map/base.png");


        this.load.video('background_intro_1', './assets/videos/start screen background.mp4');
        this.load.video('background_intro_1a', './assets/videos/Transition to Intro.mp4');
        this.load.video('background_intro_1b', './assets/videos/Intro Background.mp4');

        // fonts
        this.loadingText = this.add.text(444, 260, "Loading Bluepoint ", {
            fontFamily: 'euroStyle',
            fontSize: 50
        }).setOrigin(0.5)

        this.tweens.add({
            targets: this.loadingText,
            alpha: 0,
            duration: 2000,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true,
        });

        this.time.delayedCall(2000 + initialTime, () => {
            this.loadingText.text = "Rendering Environment "
        });
        this.time.delayedCall(6000 + initialTime, () => {
            this.loadingText.text = "Populating Lobby "
        });

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
        //if (complete == 2) this.scene.start("menu");
        //if (complete == 2) this.scene.start("loserBoard", {     type: 1,            name: "Davido",            score: 10        });
        //if (complete == 2) this.scene.start("mainScene");
        //if (complete == 2) this.scene.start("map");


        if (complete == 2) {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            if (urlParams.get('lvl') == 1) {
                this.scene.start("menu");
            }
            if (urlParams.get('lvl') === null) {
                this.scene.start("map");
            }


        }


    }
})