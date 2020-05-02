
let dialogueWindow;
let textTitle;
let textDialogue;
let textInstruction;
let buttonInteract;
let buttonInteractText;
let showingDialogue=false;
let score=0;
let time=0;
let scoreText;
let scoreTitle;
let timeText;
let initialTime;

let testVariable=false;
let PKey;

let everybodyIsSleep=false;
let timeToSleep=999999;

let JOYSTICK;

var hud = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function hud (){
        Phaser.Scene.call(this, { key: 'hud', active: true });
    },
    
    preload: function(){
        this.load.image("messageBoard" , "./assets/images/dialogue window rectangle.png");      // dialogue window       
        this.load.bitmapFont('Antenna', 'assets/fonts/antenna.png', 'assets/fonts/antenna.xml');		//load the font
      
        //------------------------------- Joystick
        var url;
  
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
        this.load.plugin('rexvirtualjoystickplugin', url, true);


    },

    create: function(){
        dialogueWindow= this.add.image(200,50 , "messageBoard");
        dialogueWindow.scaleX=1.5;
        //textTitle=this.add.bitmapText(200,165,'Antenna',"testing",20);
        textTitle=this.add.text(200, 15, 'Hello World', { fontFamily: 'ZCOOL QingKe HuangYou' }).setFontSize(20);
        textTitle.setOrigin(0.5,0.5);

        textDialogue=this.add.text(200,50, "here is the message" , { fontFamily: 'ZCOOL QingKe HuangYou' ,wordWrap: { width: 180, useAdvancedWrap: true } } , ).setFontSize(15);
        textDialogue.setOrigin(0.5,0.5);
        textDialogue.maxWidth = 150;

        textInstruction = this.add.text(240,90,"Press any button to continue",{ fontFamily: 'ZCOOL QingKe HuangYou' }).setFontSize(10);
        textInstruction.setOrigin(0.5,0.5);

        buttonInteract=this.add.image(440,255,"messageBoard");
        buttonInteract.setOrigin(1,1);
        buttonInteract.scaleX=0.7;
        buttonInteract.scaleY=0.2;

        buttonInteract.setInteractive();

        buttonInteractText=this.add.text(390,245,"talk to",{ fontFamily: 'ZCOOL QingKe HuangYou' }).setFontSize(10);
        buttonInteractText.setOrigin(0.5,0.5);

        hideDialogue();

        // ----------------- Time
          
        scoreText=this.add.text(430 ,10,score,{ fontFamily: 'ZCOOL QingKe HuangYou' });


        this.input.keyboard.on('keydown_ENTER', function (event) {
            if(!showingDialogue) interact();
            else hideDialogue();
        });

        buttonInteract.on('pointerdown' , ()=>{interact()});
        buttonInteract.on('pointerover', ()=> {	buttonInteract.setScale(0.8,0.2);});
        buttonInteract.on('pointerout', ()=> {	buttonInteract.setScale(0.7,0.2);});

        PKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);        // ONLY FOR TESTING


        // ------------------------- Joystick
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: 50,
            y: 200,
            radius: 40,
            base: this.add.circle(0, 0, 40, 0xCF000000).setAlpha(0.5),
            thumb: this.add.circle(0, 0, 20, 0xcccccc),
        });
        
        JOYSTICK=this.joyStick;

        this.usingJoystick=false;


        //this.dumpJoyStickState;


    },

    update: function(t,delta){

        if(PKey.isDown && !testVariable) {              // ONLY FOR TESTING
            NPCS.forEach((el)=>{
                el.timeToDisappear=time+Math.random()*10000+5000;
            })
            timeToSleep=time+100; 
            testVariable=true
        }

        time+=delta;

        if(t>timeToSleep && !everybodyIsSleep){
            sleepEveryone();
            everybodyIsSleep=true;
        }

        let nearest=minDistance();
        if(nearest[0]<radiusInteraction){
            buttonInteract.visible=true;
            buttonInteractText.visible=true;
            buttonInteractText.text="talk to " + nearest[1]["name"];
        }
        else {

            buttonInteract.visible=false;
            buttonInteractText.visible=false;
        }


        NPCS.forEach((el)=>{
            if(el.timeToDisappear<time && el.sleeping===1){
                el.visible=false;
                el.avatar.visible=false;
                el["zzz"].visible=false;
            }

            if(el.timeToSleep<time && el.sleeping!==1){
                sleepNPC(el);
                el.timeToDisappear=getTimeToDisappear(time)+time;
                
            }

        })

        this.dumpJoyStickState();

    } ,
        
    dumpJoyStickState: function() {
        // var cursorKeys = this.joyStick.createCursorKeys();
        // let counterKeys=0;
        // for (var name in cursorKeys) { 
        //     if (cursorKeys[name].isDown) {
        //         if(name=== "left"){
        //             player.move(left);
        //             this.usingJoystick=true;
        //             counterKeys++;
        //         }
        //         if(name=== "right"){
        //             player.move(right);
        //             this.usingJoystick=true;
        //             counterKeys++;
        //         }
        //         if (name==="up"){
        //             player.move(up);
        //             this.usingJoystick=true;
        //             counterKeys++;
        //         }
        //          if(name=== "down"){
        //             player.move(down);
        //             this.usingJoystick=true;
        //             counterKeys++;
        //         }       
        //     }
            
        // }if(this.usingJoystick && counterKeys===0){
        // console.log(counterKeys)
        //     this.usingJoystick=false;
        //     player.returnToIdle();
        //     player.direction=null;
        //     player.moving=false;
        //     console.log("its not moving");
        // }
        player.moveJoystic(this.joyStick.forceX,this.joyStick.forceY)
    }   
    
})

function hideDialogue(){
    showingDialogue=false;
    textTitle.visible=false;
    textDialogue.visible=false;
    textInstruction.visible=false;
    dialogueWindow.visible=false;
    let nearest=minDistance();
    nearest[1].avatar.anims.play("idle"+nearest[1].name);
}

function showDialogue(){
    
    showingDialogue=true;
    textTitle.visible=true;
    textDialogue.visible=true;
    textInstruction.visible=true;
    dialogueWindow.visible=true;
}

function interact(){
    let nearest=minDistance();
    
    if(nearest[1].sleeping===0) {           // the NPC is awake at the beggining
        showDialogue();
        textTitle.text=nearest[1]["name"];
        if(nearest[1].message===0){
        textDialogue.text=nearest[1]["message1"];
            if(nearest[1].message2!==null){
                nearest[1].message=1;
            }
        }
        else if(nearest[1].message===1){
            textDialogue.text=nearest[1]["message2"];
        }
        NpcLookPlayer(nearest[1]);
    }
    else if(nearest[1].sleeping===1) {      // the NPC is asleep, awake him/her!
        console.log(getTimeToSleep(time))
        awakeNPC(nearest[1]);
        nearest[1].timeToSleep=time + getTimeToSleep(time);
        nearest[1].timeToDisappear=999999;
        nearest[1].sleeping=2;
        score++;
        scoreText.text=score;
    }   

    
}







