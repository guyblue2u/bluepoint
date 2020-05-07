let music;
let complete=false;

var loading = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function loading (){
        
        Phaser.Scene.call(this, { key: 'loading', active: true });
    },

    preload: function(){
        
        this.load.image("background_1","./assets/images/base1.png");
        this.load.image("background_2","./assets/images/base2.png");
        this.load.image("bloom","./assets/images/lights_bloom.png");

        this.load.spritesheet("discoBall","./assets/images/disco ball.png",{frameWidth:36,frameHeight:36}); //ball
        this.load.spritesheet("blueGuy" , "./assets/images/guy blue sprites.png",{frameWidth:36,frameHeight:36}); // blue character
        this.load.spritesheet("redGuy" , "./assets/images/red guy blue sprites.png",{frameWidth:36,frameHeight:36}); // blue character
        this.load.spritesheet("NPC" ,"./assets/images/NPC sprites.png",{frameWidth:36,frameHeight:36} );  // NPC
        this.load.spritesheet("ZZZ" , "./assets/images/white z.png" , {frameWidth:36 , frameHeight:36} ) // zzz when sleeping

        this.load.image("drums" , "./assets/images/drums.png");                 //Objects
        this.load.image("table" , "./assets/images/table.png");
        this.load.image("speakers" , "./assets/images/speakers.png");

        this.load.image("messageBoard" , "./assets/images/dialogue window rectangle.png");      // dialogue window       
        this.load.bitmapFont('Antenna', 'assets/fonts/antenna.png', 'assets/fonts/antenna.xml');		//load the font
        this.load.spritesheet("ZZZIcon" , "./assets/images/white z.png" , {frameWidth:36 , frameHeight:36} ) // zzz when sleeping
      
        this.load.audio("song" , "./assets/audio/Gutted.mp3");
        text = this.add.text(400, 300, 'Loading...', { font: '40px Courier', fill: '#00ff00' });

        
        this.load.on('complete', function () {
            complete=true;
        });


    },

    create: function(){
        
    },

    update: function(){
        if (complete) this.scene.start("menu")
    }

    
})


var menu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function menu (){
        
        Phaser.Scene.call(this, { key: 'menu', active: false });
    },

    preload: function(){
        
    },

    create: function(){
        

        let buttonStart=this.add.image(440,230,"messageBoard");
        buttonStart.setOrigin(1,1);
        buttonStart.scaleX=1.2;
        buttonStart.scaleY=0.4;

        buttonStart.setInteractive();

        let buttonStartText=this.add.text(440,230,"Start",{ fontFamily: 'ZCOOL QingKe HuangYou' }).setFontSize(40);
        buttonStartText.setOrigin(0.5,0.5);

        music=this.sound.add('song');

        buttonStart.on('pointerdown' , ()=>{   
            
            this.scene.start("mainScene");
            music.play();
        })

        


    },

    update: function(){}

    
})