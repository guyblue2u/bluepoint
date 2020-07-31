window.onerror = function (e) {
    document.getElementById('prompt').innerHTML = e.toString();
    console.log(e);
}


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


        map
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

        this.load.image("level2_back4", "./assets/images/level_2/base.png");
        this.load.image("level2_lights", "./assets/images/level_2/lights_on.jpg");
        this.load.image("level2_frontBar", "./assets/images/level_2/front bar.png");


        this.load.spritesheet("level2_beerCrane", "./assets/images/level_2/beer crane 39x64.png", {
            frameWidth: 39,
            frameHeight: 64
        });
        this.load.spritesheet("level2_beer", "./assets/images/level_2/beer 32x32.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.image("GB drinks beer_1","./assets/images/level_2/GB drinks beer/1.png");
        this.load.image("GB drinks beer_2","./assets/images/level_2/GB drinks beer/2.png");
        this.load.image("GB drinks beer_3","./assets/images/level_2/GB drinks beer/3.png");
        this.load.image("GB drinks beer_4","./assets/images/level_2/GB drinks beer/4.png");
        this.load.image("GB drinks beer_5","./assets/images/level_2/GB drinks beer/5.png");
        this.load.image("GB drinks beer_6","./assets/images/level_2/GB drinks beer/6.png");
        this.load.image("GB drinks beer_7","./assets/images/level_2/GB drinks beer/7.png");
        this.load.image("GB drinks beer_8","./assets/images/level_2/GB drinks beer/8.png");
        this.load.image("GB drinks beer_9","./assets/images/level_2/GB drinks beer/9.png");
        this.load.image("GB drinks beer_10","./assets/images/level_2/GB drinks beer/10.png");
        this.load.image("GB drinks beer_11","./assets/images/level_2/GB drinks beer/11.png");
        this.load.image("GB drinks beer_12","./assets/images/level_2/GB drinks beer/12.png");
        this.load.image("GB drinks beer_13","./assets/images/level_2/GB drinks beer/13.png");

        
        this.load.image("GB Falling_1","./assets/images/level_2/GB Falling/1.png");
        this.load.image("GB Falling_2","./assets/images/level_2/GB Falling/2.png");
        this.load.image("GB Falling_3","./assets/images/level_2/GB Falling/3.png");
        this.load.image("GB Falling_4","./assets/images/level_2/GB Falling/4.png");
        this.load.image("GB Falling_5","./assets/images/level_2/GB Falling/5.png");
        this.load.image("GB Falling_6","./assets/images/level_2/GB Falling/6.png");
        this.load.image("GB Falling_7","./assets/images/level_2/GB Falling/7.png");
        this.load.image("GB Falling_8","./assets/images/level_2/GB Falling/8.png");
        this.load.image("GB Falling_9","./assets/images/level_2/GB Falling/9.png");
        this.load.image("GB Falling_10","./assets/images/level_2/GB Falling/10.png");

        this.load.image("GB falls asleep_1","./assets/images/level_2/GB falls asleep/1.png");
        this.load.image("GB falls asleep_2","./assets/images/level_2/GB falls asleep/2.png");
        this.load.image("GB falls asleep_3","./assets/images/level_2/GB falls asleep/3.png");
        this.load.image("GB falls asleep_4","./assets/images/level_2/GB falls asleep/4.png");
        this.load.image("GB falls asleep_5","./assets/images/level_2/GB falls asleep/5.png");
        this.load.image("GB falls asleep_6","./assets/images/level_2/GB falls asleep/6.png");
        this.load.image("GB falls asleep_7","./assets/images/level_2/GB falls asleep/7.png");
        this.load.image("GB falls asleep_8","./assets/images/level_2/GB falls asleep/8.png");
        this.load.image("GB falls asleep_9","./assets/images/level_2/GB falls asleep/9.png");

        this.load.image("GB spills beer_1","./assets/images/level_2/GB spills beer/1.png");
        this.load.image("GB spills beer_2","./assets/images/level_2/GB spills beer/2.png");
        this.load.image("GB spills beer_3","./assets/images/level_2/GB spills beer/3.png");
        this.load.image("GB spills beer_4","./assets/images/level_2/GB spills beer/4.png");
        this.load.image("GB spills beer_5","./assets/images/level_2/GB spills beer/5.png");
        this.load.image("GB spills beer_6","./assets/images/level_2/GB spills beer/6.png");
        this.load.image("GB spills beer_7","./assets/images/level_2/GB spills beer/7.png");
        this.load.image("GB spills beer_8","./assets/images/level_2/GB spills beer/8.png");
        this.load.image("GB spills beer_9","./assets/images/level_2/GB spills beer/9.png");
        this.load.image("GB spills beer_10","./assets/images/level_2/GB spills beer/10.png");
        this.load.image("GB spills beer_11","./assets/images/level_2/GB spills beer/11.png");

        this.load.image("GB Talking_1","./assets/images/level_2/GB Talking/1.png");
        this.load.image("GB Talking_2","./assets/images/level_2/GB Talking/2.png");
        this.load.image("GB Talking_3","./assets/images/level_2/GB Talking/3.png");
        this.load.image("GB Talking_4","./assets/images/level_2/GB Talking/4.png");
        this.load.image("GB Talking_5","./assets/images/level_2/GB Talking/5.png");
        this.load.image("GB Talking_6","./assets/images/level_2/GB Talking/6.png");

        this.load.image("GB wakes up, looks at RG_1","./assets/images/level_2/GB wakes up, looks at RG/1.png");
        this.load.image("GB wakes up, looks at RG_2","./assets/images/level_2/GB wakes up, looks at RG/2.png");
        this.load.image("GB wakes up, looks at RG_3","./assets/images/level_2/GB wakes up, looks at RG/3.png");
        this.load.image("GB wakes up, looks at RG_4","./assets/images/level_2/GB wakes up, looks at RG/4.png");
        this.load.image("GB wakes up, looks at RG_5","./assets/images/level_2/GB wakes up, looks at RG/5.png");
        this.load.image("GB wakes up, looks at RG_6","./assets/images/level_2/GB wakes up, looks at RG/6.png");
        this.load.image("GB wakes up, looks at RG_7","./assets/images/level_2/GB wakes up, looks at RG/7.png");
        this.load.image("GB wakes up, looks at RG_8","./assets/images/level_2/GB wakes up, looks at RG/8.png");
        this.load.image("GB wakes up, looks at RG_9","./assets/images/level_2/GB wakes up, looks at RG/9.png");
        this.load.image("GB wakes up, looks at RG_10","./assets/images/level_2/GB wakes up, looks at RG/10.png");
        this.load.image("GB wakes up, looks at RG_11","./assets/images/level_2/GB wakes up, looks at RG/11.png");
        this.load.image("GB wakes up, looks at RG_12","./assets/images/level_2/GB wakes up, looks at RG/12.png");
        this.load.image("GB wakes up, looks at RG_13","./assets/images/level_2/GB wakes up, looks at RG/13.png");
        this.load.image("GB wakes up, looks at RG_14","./assets/images/level_2/GB wakes up, looks at RG/14.png");
        this.load.image("GB wakes up, looks at RG_15","./assets/images/level_2/GB wakes up, looks at RG/15.png");
        this.load.image("GB wakes up, looks at RG_16","./assets/images/level_2/GB wakes up, looks at RG/16.png");

        this.load.image("RG checks on GB after he falls_1","./assets/images/level_2/RG checks on GB after he falls/1.png");
        this.load.image("RG checks on GB after he falls_2","./assets/images/level_2/RG checks on GB after he falls/2.png");
        this.load.image("RG checks on GB after he falls_3","./assets/images/level_2/RG checks on GB after he falls/3.png");
        this.load.image("RG checks on GB after he falls_4","./assets/images/level_2/RG checks on GB after he falls/4.png");

        this.load.image("RG pokes GB_1","./assets/images/level_2/RG pokes GB/1.png");
        this.load.image("RG pokes GB_2","./assets/images/level_2/RG pokes GB/2.png");
        this.load.image("RG pokes GB_3","./assets/images/level_2/RG pokes GB/3.png");
        this.load.image("RG pokes GB_4","./assets/images/level_2/RG pokes GB/4.png");
        this.load.image("RG pokes GB_5","./assets/images/level_2/RG pokes GB/5.png");
        this.load.image("RG pokes GB_6","./assets/images/level_2/RG pokes GB/6.png");
        this.load.image("RG pokes GB_7","./assets/images/level_2/RG pokes GB/7.png");
        this.load.image("RG pokes GB_8","./assets/images/level_2/RG pokes GB/8.png");

        this.load.image("RG talking no beer_1","./assets/images/level_2/RG talking/No beer/1.png");
        this.load.image("RG talking no beer_2","./assets/images/level_2/RG talking/No beer/2.png");
        this.load.image("RG talking no beer_3","./assets/images/level_2/RG talking/No beer/3.png");
        this.load.image("RG talking no beer_4","./assets/images/level_2/RG talking/No beer/4.png");
        this.load.image("RG talking no beer_5","./assets/images/level_2/RG talking/No beer/5.png");
        this.load.image("RG talking no beer_6","./assets/images/level_2/RG talking/No beer/6.png");
        this.load.image("RG talking no beer_7","./assets/images/level_2/RG talking/No beer/7.png");

        this.load.image("RG talking with beer_1","./assets/images/level_2/RG talking/With beer/1.png");
        this.load.image("RG talking with beer_2","./assets/images/level_2/RG talking/With beer/2.png");
        this.load.image("RG talking with beer_3","./assets/images/level_2/RG talking/With beer/3.png");
        this.load.image("RG talking with beer_4","./assets/images/level_2/RG talking/With beer/4.png");
        this.load.image("RG talking with beer_5","./assets/images/level_2/RG talking/With beer/5.png");
        this.load.image("RG talking with beer_6","./assets/images/level_2/RG talking/With beer/6.png");

        this.load.image("RG neutral_nb","./assets/images/level_2/RG neutral_nb.png");
        this.load.image("RG neutral_wb","./assets/images/level_2/RG neutral_wb.png");
        this.load.image("GB neutral","./assets/images/level_2/GB neutral.png");

        //arrows
        this.load.image("level2_up", "./assets/images/level_2/up.png");
        this.load.image("level2_down", "./assets/images/level_2/down.png");
        this.load.image("level2_left", "./assets/images/level_2/left.png");
        this.load.image("level2_right", "./assets/images/level_2/right.png");




        //--------- Intro
        this.load.video('background_intro_1', './assets/videos/start screen background.mp4');
        this.load.video('background_intro_1a', './assets/videos/Transition to Intro.mp4');
        this.load.video('background_intro_1b', './assets/videos/Intro Background.mp4');


        // audios
        this.load.audio("start_Sound", "./assets/audio/Start Sound.m4a");
        this.load.audio("intro_Synth", "./assets/audio/Bluepoint Intro Synth.mp3");
        this.load.audio("intro_Rythm", "./assets/audio/Bluepoint Intro Rhythm.mp3");
        this.load.audio("song", "./assets/audio/Gutted.mp3");
        this.load.audio("song2", "./assets/audio/New Pallet Theme.mp3");
        this.load.audio("loading", "./assets/audio/Bluepoint Loading Sound.m4a");
        this.load.audio("outro", "./assets/audio/Bluepoint Outro Music.mp3");
        this.load.audio("map_music", "./assets/audio/Bluepoint Menu Theme.mp3");
        this.load.audio("map_select", "./assets/audio/map select sound.mp3");



        // loading text
        this.loadingText = this.add.text(444, 260, "Loading Bluepoint ", {
            fontFamily: 'euroStyle',
            fontSize: 50
        }).setOrigin(0.5)


        // loading files text
        this.fileText = this.add.text(444, 350, " ", {
            fontFamily: 'euroStyle',
            fontSize: 30
        }).setOrigin(0.5)

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

        this.time.delayedCall(20000, () => { // TEMPORAL FIX, to go to the next scene after 20 seconds

            document.getElementById('prompt').innerHTML = "load with the timer";
            location.reload(); 
        });


        this.load.on('complete', () => {

            document.getElementById('prompt').innerHTML = "load correctly without timer";

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            if (urlParams.get('lvl') == 1) {
                this.scene.start("intro_1");
            } else if (urlParams.get('lvl') == 2) {
                this.scene.start("level_2");
            } else if (urlParams.get('lvl') == 3) {
                this.scene.start("level_1");
            } else if (urlParams.get('lvl') === null) {
                this.scene.start("map");
                //this.scene.start("tests");
            }

        });

        this.load.on('fileprogress', (file) => {
            this.fileText.text = (file.src);
        });


    },

    create: function () {
        

    },




    update: function () {
        document.getElementById('prompt').innerHTML = "update";

    }
})