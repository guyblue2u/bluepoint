
let dialogueWindow;
let textTitle;
let textDialogue;
let textInstruction;
let buttonInteract;
let buttonInteractText;
let showingDialogue=false;

var hud = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function hud (){
        Phaser.Scene.call(this, { key: 'hud', active: true });
    },
    
    preload: function(){
        this.load.image("messageBoard" , "./assets/images/dialogue window rectangle.png");      // dialogue window
        console.load="AAAAAAAAA CArga"
        
		this.load.bitmapFont('Antenna', 'assets/fonts/antenna.png', 'assets/fonts/antenna.xml');		//load the font
    },

    create: function(){
        dialogueWindow= this.add.image(200,200 , "messageBoard");
        dialogueWindow.scaleX=1.5;
        textTitle=this.add.bitmapText(200,165,'Antenna',"testing",20);
        textTitle.setOrigin(0.5,0.5);

        textDialogue=this.add.bitmapText(200,200,'Antenna', "here is the message",12);
        textDialogue.setOrigin(0.5,0.5);
        textDialogue.maxWidth = 150;

        textInstruction = this.add.bitmapText(240,240,'Antenna',"Press any button to continue" , 10);
        textInstruction.setOrigin(0.5,0.5);

        buttonInteract=this.add.image(440,255,"messageBoard");
        buttonInteract.setOrigin(1,1);
        buttonInteract.scaleX=0.7;
        buttonInteract.scaleY=0.2;

        buttonInteract.setInteractive();

        buttonInteractText=this.add.bitmapText(390,245,'Antenna',"talk to" , 10);
        buttonInteractText.setOrigin(0.5,0.5);

        hideDialogue();

        this.input.keyboard.on('keydown_ENTER', function (event) {
            if(!showDialogue) showDialogue();
            else hideDialogue();
        });

        buttonInteract.on('pointerdown' , ()=>{console.log("do something");showDialogue()});
        buttonInteract.on('pointerover', ()=> {	buttonInteract.setScale(0.8,0.2);});
        buttonInteract.on('pointerout', ()=> {	buttonInteract.setScale(0.7,0.2);});
    },

    update: function(){

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

    }    
})

function hideDialogue(){
    showingDialogue=false;
    textTitle.visible=false;
    textDialogue.visible=false;
    textInstruction.visible=false;
    dialogueWindow.visible=false;
}

function showDialogue(){
    console.log("esta aca")
    Interact();
    showingDialogue=true;
    textTitle.visible=true;
    textDialogue.visible=true;
    textInstruction.visible=true;
    dialogueWindow.visible=true;
}

function Interact(){
    let nearest=minDistance();
    textTitle.text=nearest[1]["name"];
    textDialogue.text=nearest[1]["message1"];
    
}