let prueba;

class mainScene extends Phaser.Scene{

	constructor(){
		super('mainScene');
	}

	init(data){
		
	}

    preload(){
        this.load.image("background_1","./assets/images/base1.png");

        this.load.spritesheet("discoBall","./assets/images/disco ball.png",{frameWidth:36,frameHeight:36}); //ball
        this.load.spritesheet("blueGuy" , "./assets/images/guy blue sprites.png",{frameWidth:36,frameHeight:36}); // blue character
        this.load.spritesheet("redGuy" , "./assets/images/red guy blue sprites.png",{frameWidth:36,frameHeight:36}); // blue character
        this.load.spritesheet("NPC" ,"./assets/images/NPC sprites.png",{frameWidth:36,frameHeight:36} );  // NPC
        this.load.image("drums" , "./assets/images/drums.png")
        this.load.image("table" , "./assets/images/table.png")
    }

    create(){
        const background = this.add.image(0,0,"background_1").setOrigin(0,0);
        player["avatar"]= this.add.sprite(player.x, player.y , "blueGuy" , 0);


        //----------------------------------------     Player Blue shirt
        this.anims.create({
            key: "walkRight",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('blueGuy', { frames: [ 14,15 ] })           
        })
        this.anims.create({
            key: "walkLeft",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('blueGuy', { frames: [ 12,13 ] })           
        })
        this.anims.create({
            key: "walkDown",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('blueGuy', { frames: [ 4,5,6,7 ] })           
        })
        this.anims.create({
            key: "walkUp",
            repeat: -1,
            frameRate: 5,
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
            frameRate: 5,
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
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 104,105,104,104,104] })           
        })

        this.anims.create({
            key: "idleSam",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNumbers('NPC', { frames: [ 115,116] })           
        })

        this.anims.create({
            key: "idleAlex",
            repeat: -1,
            frameRate: 5,
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

        this.anims.create({
            key: "discoBall",
            repeat: -1,
            frameRate: 5,
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


        this.add.image(234,96,"table").setDepth(96);
        this.add.image(371,162,"drums").setDepth(162);
        this.add.sprite(281,55,"discoBall").play("discoBall");

        player["avatar"].play("idleDown");
        

        this.input.keyboard.on('keydown', (event) => {player.move(event.keyCode)})

        this.input.keyboard.on('keyup', (event)=> {
            player.returnToIdle();
            player.direction=null;
            player.moving=false;
        })
     

        //prueba=this;

    }

    update(time,delta){

    }




}
