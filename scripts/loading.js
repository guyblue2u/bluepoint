window.onerror = function (e) {
    document.getElementById('prompt').innerHTML = e.toString();
    console.log(e);
};


var loading = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function loading() {

        Phaser.Scene.call(this, {
            key: 'loading',
            active: true
        });
    },

    preload: function () { //loads all the assets from the complete game

        //this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        this.load.html('form', './scripts/form.html');

        this.load.image("black", "./assets/images/level_1/black.png");
        this.load.image("background_1", "./assets/images/level_1/base1.png");
        this.load.image("background_2", "./assets/images/level_1/base2.png");
        this.load.image("bloom", "./assets/images/level_1/lights_bloom.png");
        this.load.image("whiteSquare", "./assets/images/level_1/white_square.png");
        this.load.image("hambugerIcon", "./assets/images/Hamburger_icon.png");
        this.load.image("mutedIcon", "./assets/images/level_1/unmute-icon-12.png");

        this.load.spritesheet("discoBall", "./assets/images/level_1/disco ball.png", {
            frameWidth: 36,
            frameHeight: 36
        }); //ball
        this.load.spritesheet("blueGuy", "./assets/images/level_1/guy blue sprites.png", {
            frameWidth: 36,
            frameHeight: 36
        }); // blue character
        this.load.spritesheet("redGuy", "./assets/images/level_1/red guy blue sprites.png", {
            frameWidth: 36,
            frameHeight: 36
        }); // blue character
        this.load.spritesheet("collapsingRed", "./assets/images/level_1/collapsing_red.png", {
            frameWidth: 36,
            frameHeight: 36
        });
        this.load.spritesheet("collapsingBlue", "./assets/images/level_1/collapsing_blue.png", {
            frameWidth: 36,
            frameHeight: 36
        });

        this.load.spritesheet("NPC", "./assets/images/level_1/NPC sprites.png", {
            frameWidth: 36,
            frameHeight: 36
        }); // NPC
        this.load.spritesheet("ZZZ", "./assets/images/level_1/white z.png", {
            frameWidth: 36,
            frameHeight: 36
        }); // zzz when sleeping

        this.load.image("drums", "./assets/images/level_1/drums.png"); //Objects
        this.load.image("table", "./assets/images/level_1/table.png");
        this.load.image("speakers", "./assets/images/level_1/speakers.png");

        this.load.image("messageBoard", "./assets/images/level_1/dialogue window rectangle.png"); // dialogue window       
        this.load.image("startButton", "./assets/images/level_1/start_button.png"); // start button       
        this.load.image("interactButton", "./assets/images/level_1/interact_button.png"); // interact window       
        this.load.bitmapFont('Antenna', 'assets/fonts/antenna.png', 'assets/fonts/antenna.xml'); //load the font
        this.load.spritesheet("ZZZIcon", "./assets/images/level_1/white z.png", {
            frameWidth: 36,
            frameHeight: 36
        });

        // initial screen
        this.load.image("guttedText", "./assets/images/level_1/Lvl 1_and_name_updated.png");
        this.load.image("bluepointLogo", "./assets/images/level_1/logo_updated.png");


        // social media icons
        this.load.image("facebook", "./assets/images/facebook.png");
        this.load.image("twitter", "./assets/images/twitter.png");
        this.load.image("shareIcon", "./assets/images/pngwave.png");
        this.load.image("copyIcon", "./assets/images/copy.png");




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


        //---------- Level 2
        this.load.image("level2_back1", "./assets/images/level_2/collisions layer.png");
        this.load.image("level2_back2", "./assets/images/level_2/base walkable area.png");
        this.load.image("level2_back3", "./assets/images/level_2/dust layer.png");

        this.load.image("level2_outside", "./assets/images/level_2/Matchless outside.png");

        this.load.image("footsteps", "./assets/images/level_2/footsteps.png");


        //--------- Intro
        this.load.video('background_intro_1', './assets/videos/start screen background.mp4');
        this.load.video('background_intro_1a', './assets/videos/Transition to Intro.mp4');
        this.load.video('background_intro_1b', './assets/videos/Intro Background.mp4');

        // audios
        this.load.audio("start_Sound", "./assets/audio/Start_Sound.m4a");
        this.load.audio("intro_Synth", "./assets/audio/Bluepoint_Intro_Synth.mp3");
        this.load.audio("intro_Rythm", "./assets/audio/Bluepoint_Intro_Rhythm.mp3");
        this.load.audio("song", "./assets/audio/Gutted.mp3");
        this.load.audio("loading", "./assets/audio/Bluepoint_Loading_Sound.m4a");
        this.load.audio("outro", "./assets/audio/Bluepoint_Outro_Music.m4a");
        this.load.audio("map_music", "./assets/audio/Bluepoint_Menu_Theme.mp3");
        this.load.audio("map_select", "./assets/audio/map_select_sound.mp3");

        // load audio
        this.load.audio("start_Sound", "./assets/Start_Sound.m4a");


        // loading text
        this.loadingText = this.add.text(444, 260, "Loading Bluepoint ", {
            fontFamily: 'euroStyle',
            fontSize: 50
        }).setOrigin(0.5);


        // loading files text
        this.fileText = this.add.text(444, 350, " ", {
            fontFamily: 'euroStyle',
            fontSize: 30
        }).setOrigin(0.5);

        this.tweens.add({
            targets: this.loadingText,
            alpha: 0,
            duration: 2000,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true,
        });

        this.time.delayedCall(2000, () => {
            this.loadingText.text = "Rendering Environment "
        });
        this.time.delayedCall(6000, () => {
            this.loadingText.text = "Populating Lobby "
        });

        this.time.delayedCall(10000, () => {
            this.loadingText.text = "Awaiting Clearance "
        });


        this.load.on('complete', () => {

            document.getElementById('prompt').innerHTML = "carga";

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            if (urlParams.get('lvl') == 1) {
                this.scene.start("intro_1");
            } else if (urlParams.get('lvl') == 2) {
                this.scene.start("level_2");
            } else if (urlParams.get('lvl') == 3) {
                this.scene.start("level_1");
            } else if (urlParams.get('lvl') === null) {
                //this.scene.start("map");
                this.scene.start("tests");
            }

        });

        this.load.on('fileprogress', (file) => {
            this.fileText.text = (file.src);
        });


    },

    create: function () {


    },




    update: function () {


    }
})