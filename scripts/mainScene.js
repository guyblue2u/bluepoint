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
    }

    create(){
        const background = this.add.image(0,0,"background_1").setOrigin(0,0);
        const blueGuy=this.add.sprite(50,50 , "blueGuy" , 0);

        this.anims.create({
            key: "walkRight",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNames("blueGuy",{start:14,end:15})
        })

        blueGuy.play("walkRight");

    }

    update(time,delta){}

}