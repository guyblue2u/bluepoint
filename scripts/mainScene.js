let prueba;

let upKey;
let downKey;
let rightKey;
let leftKey;
let AKey;
let SKey;
let DKey;
let WKey;


let poly;
let background;

var mainScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function mainScene (){
        Phaser.Scene.call(this, { key: 'mainScene', active: true });
    },

    preload: function(){
        this.load.image("background_1","./assets/images/base1.png");

        this.load.spritesheet("discoBall","./assets/images/disco ball.png",{frameWidth:36,frameHeight:36}); //ball
        this.load.spritesheet("blueGuy" , "./assets/images/guy blue sprites.png",{frameWidth:36,frameHeight:36}); // blue character
        this.load.spritesheet("redGuy" , "./assets/images/red guy blue sprites.png",{frameWidth:36,frameHeight:36}); // blue character
        this.load.spritesheet("NPC" ,"./assets/images/NPC sprites.png",{frameWidth:36,frameHeight:36} );  // NPC
        this.load.spritesheet("ZZZ" , "./assets/images/white z.png" , {frameWidth:36 , frameHeight:36} ) // zzz when sleeping

        this.load.image("drums" , "./assets/images/drums.png");                 //Objects
        this.load.image("table" , "./assets/images/table.png");
        this.load.image("speakers" , "./assets/images/speakers.png");

    },

    create: function(){
        background = this.add.image(0,0,"background_1").setOrigin(0,0);
        player["avatar"]= this.add.sprite(player.x, player.y , "blueGuy" , 0);


        //----------------------------------------     Player Blue shirt
        this.anims.create({
            key: "walkRight",
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNumbers('blueGuy', { frames: [ 14,15 ] })           
        })
        this.anims.create({
            key: "walkLeft",
            repeat: -1,
            frameRate: 7,
            frames: this.anims.generateFrameNumbers('blueGuy', { frames: [ 12,13 ] })           
        })
        this.anims.create({
            key: "walkDown",
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('blueGuy', { frames: [ 4,5,6,7 ] })           
        })
        this.anims.create({
            key: "walkUp",
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('blueGuy', { frames: [ 8,9,10,11 ] })           
        })
        this.anims.create({
            key: "idleDown",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('blueGuy', { frames: [ 0 ] })           
        })
        this.anims.create({
            key: "idleLeft",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('blueGuy', { frames: [ 1 ] })           
        })
        this.anims.create({
            key: "idleRight",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('blueGuy', { frames: [ 3 ] })           
        })
        this.anims.create({
            key: "idleUp",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('blueGuy', { frames: [ 2 ] })           
        })


        //--------------------------------------------------     NPC's

        this.anims.create({
            key: "idleJon",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 5,6 ] })           
        })

        this.anims.create({
            key: "idleSally",
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 16,17 ] })           
        })

        this.anims.create({
            key: "idleDillon",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 27,28,29] })           
        })

        this.anims.create({
            key: "idleChester",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 38,39,40] })           
        })

        this.anims.create({
            key: "idleElla",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 49,50,51] })           
        })

        this.anims.create({
            key: "idleBela",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 60,61,62,63] })           
        })

        this.anims.create({
            key: "idleAnna",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 71,72,73,74] })           
        })

        this.anims.create({
            key: "idleTyler",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 82,83,84,85] })           
        })

        this.anims.create({
            key: "idleNick",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 93,94,95] })           
        })

        this.anims.create({
            key: "idleAaron",
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 104,104,104,105] })           
        })

        this.anims.create({
            key: "idleSam",
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 115,116,115,115] })           
        })

        this.anims.create({
            key: "idleAlex",
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 137,138,139,140] })           
        })

        this.anims.create({
            key: "idleBenny",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 121,122,123] })           
        })

        this.anims.create({
            key: "idleBassist",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 143,144,145] })           
        })

        this.anims.create({
            key: "idleGuitarrist",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 154,155,156] })           
        })

        this.anims.create({
            key: "idleDrummer",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 165,166] })           
        })


        //----------------------------------------     sleep NPC's  -------------------------------------------
        this.anims.create({
            key: "sleepJon",
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 9,10 ] })           
        })

        this.anims.create({
            key: "sleepSally",
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 20,21 ] })           
        })

        this.anims.create({
            key: "sleepDillon",
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 31,32] })           
        })

        this.anims.create({
            key: "sleepChester",
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [42,43] })           
        })

        this.anims.create({
            key: "sleepElla",
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 53,54] })           
        })

        this.anims.create({
            key: "sleepBela",
            repeat: -1,
            frameRate: 1.5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 64,65] })           
        })

        this.anims.create({
            key: "sleepAnna",
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 75,76] })           
        })

        this.anims.create({
            key: "sleepTyler",
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 86,87] })           
        })

        this.anims.create({
            key: "sleepNick",
            repeat: -1,
            frameRate: 1.5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 97,98] })           
        })

        this.anims.create({
            key: "sleepAaron",
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 108,109] })           
        })

        this.anims.create({
            key: "sleepSam",
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 119,120] })           
        })

        this.anims.create({
            key: "sleepBenny",
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 130,131] })           
        })

        this.anims.create({
            key: "sleepAlex",
            repeat: -1,
            frameRate: 1.5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 141,142] })           
        })

        this.anims.create({
            key: "sleepBassist",
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 152,153] })           
        })

        this.anims.create({
            key: "sleepGuitarrist",
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 163,164] })           
        })

        this.anims.create({
            key: "sleepDrummer",
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 174,175] })           
        })

        this.anims.create({
            key: "ZZZ",
            repeat: -1,
            frameRate: 3,
            frames: this.anims.generateFrameNumbers('ZZZ', { frames: [ 0,1] })           
        })        


        this.anims.create({
            key: "discoBall",
            repeat: -1,
            frameRate: 1,
            frames: this.anims.generateFrameNumbers('discoBall', { frames: [ 0,1] })           
        })


        Ella.avatar= this.add.sprite(Ella.x, Ella.y , "NPC" , 0);
        Ella.avatar.depth=Ella.y;
        Ella["avatar"].play("idleElla");

        Jon.avatar= this.add.sprite(Jon.x, Jon.y , "NPC" , 0);
        Jon.avatar.depth=Jon.y;
        Jon["avatar"].play("idleJon");
        
        Sally.avatar= this.add.sprite(Sally.x, Sally.y , "NPC" , 0);
        Sally.avatar.depth=Sally.y;
        Sally["avatar"].play("idleSally");

        Dillon.avatar= this.add.sprite(Dillon.x, Dillon.y , "NPC" , 0);
        Dillon.avatar.depth=Dillon.y;
        Dillon["avatar"].play("idleDillon");

        Chester.avatar= this.add.sprite(Chester.x, Chester.y , "NPC" , 0);
        Chester.avatar.depth=Chester.y;
        Chester["avatar"].play("idleChester");

        Bela.avatar= this.add.sprite(Bela.x, Bela.y , "NPC" , 0);
        Bela.avatar.depth=Bela.y;
        Bela["avatar"].play("idleBela");
        
        Anna.avatar= this.add.sprite(Anna.x, Anna.y , "NPC" , 0);
        Anna.avatar.depth=Anna.y;
        Anna["avatar"].play("idleAnna");

        Tyler.avatar= this.add.sprite(Tyler.x, Tyler.y , "NPC" , 0);
        Tyler.avatar.depth=Tyler.y;
        Tyler["avatar"].play("idleTyler");

        Nick.avatar= this.add.sprite(Nick.x, Nick.y , "NPC" , 0);
        Nick.avatar.depth=Nick.y;
        Nick["avatar"].play("idleNick");

        Aaron.avatar= this.add.sprite(Aaron.x, Aaron.y , "NPC" , 0);
        Aaron.avatar.depth=Aaron.y;
        Aaron["avatar"].play("idleAaron");

        Sam.avatar= this.add.sprite(Sam.x, Sam.y , "NPC" , 0);
        Sam.avatar.depth=Sam.y;
        Sam["avatar"].play("idleSam");

        Alex.avatar= this.add.sprite(Alex.x, Alex.y , "NPC" , 0);
        Alex.avatar.depth=Alex.y;
        Alex["avatar"].play("idleAlex");

        bassist.avatar= this.add.sprite(bassist.x, bassist.y , "NPC" , 0);
        bassist.avatar.depth=bassist.y;
        bassist["avatar"].play("idleBassist");

        guitarrist.avatar= this.add.sprite(guitarrist.x, guitarrist.y , "NPC" , 0);
        guitarrist.avatar.depth=guitarrist.y;
        guitarrist["avatar"].play("idleGuitarrist");

        drummer.avatar= this.add.sprite(drummer.x, drummer.y , "NPC" , 0);
        drummer.avatar.depth=drummer.y;
        drummer["avatar"].play("idleDrummer");

        Benny.avatar= this.add.sprite(Benny.x, Benny.y , "NPC" , 0);
        Benny.avatar.depth=Benny.y;
        Benny["avatar"].play("idleBenny");


        NPCS.forEach(el => {
            el["zzz"]=this.add.sprite(el.avatar.x,el.avatar.y-20,"ZZZ").play("ZZZ");
            el["zzz"].setDepth(el.avatar.depth);
            el["zzz"].visible=false;
        });


        this.add.image(234,96,"table").setDepth(96);
        this.add.image(371,162,"drums").setDepth(162);
        prueba=this.add.image(335,136 , "speakers").setDepth(136);
        this.add.sprite(281,55,"discoBall").play("discoBall");

        player["avatar"].play("idleDown");

        this.input.keyboard.on('keyup', (event)=> {
            player.returnToIdle();
            player.direction=null;
            player.moving=false;
        })

        upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        AKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        SKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        DKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        WKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        // polygon for the floor boundaries
        poly=new Phaser.Geom.Polygon([new Phaser.Geom.Point(0,257.33),new Phaser.Geom.Point(0,210.39),new Phaser.Geom.Point(5.22,204.13),new Phaser.Geom.Point(14.95,204.13),new Phaser.Geom.Point(39.3,180.13),new Phaser.Geom.Point(43.82,180.13),new Phaser.Geom.Point(63.64,160.66),new Phaser.Geom.Point(52.86,157.88),new Phaser.Geom.Point(95.98,114.76),new Phaser.Geom.Point(119.28,128.67),new Phaser.Geom.Point(146.4,114.76),new Phaser.Geom.Point(148.14,97.02),new Phaser.Geom.Point(199.95,98.06),new Phaser.Geom.Point(199.95,113.36),new Phaser.Geom.Point(269.16,112.32),new Phaser.Geom.Point(269.5,98.06),new Phaser.Geom.Point(316.45,98.06),new Phaser.Geom.Point(353.66,132.84),new Phaser.Geom.Point(296.28,132.84),new Phaser.Geom.Point(295.58,143.27),new Phaser.Geom.Point(374.52,222.56),new Phaser.Geom.Point(440.59,220.82),new Phaser.Geom.Point(443.03,223.25),new Phaser.Geom.Point(443.03,258.03),new Phaser.Geom.Point(0,257.33)]);

        prueba=this.cameras.main;
        this.cameras.main.zoom=2;
        this.cameras.main.startFollow(player.avatar, true)
        this.cameras.main.setBounds(0,20,440,250 );

    },

    update: function(time,delta){
        if (downKey.isDown || SKey.isDown){
            player.move(down)
        }
        if (upKey.isDown || WKey.isDown){
            player.move(up)
        }
        if (rightKey.isDown || DKey.isDown){
            player.move(right)
        }
        if (leftKey.isDown || AKey.isDown){
            player.move(left)
        }


    }
})
