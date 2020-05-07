
let dialogueWindow;
let textTitle;
let textDialogue;
let textInstruction;
let buttonInteract;
let buttonStartText;
let showingDialogue=false;
let score=0;
let time=0;
let scoreText;
let scoreTitle;
let timeText;
let initialTime;
let iconZZZ;
let scoreTitleText;

let sequentialText=false;
let nextText;

let testVariable=false;
let PKey;


let timeShowingDialog=0;

window.mobileAndTabletCheck = function() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
  };



var hud = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function hud (){
        Phaser.Scene.call(this, { key: 'hud', active: false });
    },
    
    preload: function(){

        this.load.on('progress', function (value) {
            loadingHUD=value;
        });

        //------------------------------- Joystick
        
        if(window.mobileAndTabletCheck()){
            var url;      
            url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
            this.load.plugin('rexvirtualjoystickplugin', url, true);
        }



    },

    create: function(){
        dialogueWindow= this.add.image(400,100 , "messageBoard");
        dialogueWindow.scaleX=3.5;
        dialogueWindow.scaleY=1.7;
        //textTitle=this.add.bitmapText(200,165,'Antenna',"testing",20);
        textTitle=this.add.text(400, 40, 'Hello World', { fontFamily: 'ZCOOL QingKe HuangYou' }).setFontSize(35);
        textTitle.setOrigin(0.5,0.5);

        textDialogue=this.add.text(400,100, "here is the message" , { fontFamily: 'ZCOOL QingKe HuangYou' ,wordWrap: { width: 450, useAdvancedWrap: true } }).setFontSize(25);
        textDialogue.setOrigin(0.5,0.5);

        textInstruction = this.add.text(500,160,"Press any button to continue",{ fontFamily: 'ZCOOL QingKe HuangYou' }).setFontSize(20);
        textInstruction.setOrigin(0.5,0.5);

        buttonInteract=this.add.image(880,470,"messageBoard");
        buttonInteract.setOrigin(1,1);
        buttonInteract.scaleX=1.2;
        buttonInteract.scaleY=0.4;

        buttonInteract.setInteractive();

        buttonStartText=this.add.text(800,450,"talk to",{ fontFamily: 'ZCOOL QingKe HuangYou' }).setFontSize(20);
        buttonStartText.setOrigin(0.5,0.5);

        showingDialogue=false;
        textTitle.visible=false;
        textDialogue.visible=false;
        textInstruction.visible=false;
        dialogueWindow.visible=false;





        // ----------------- Score
          
        scoreText=this.add.text(800 ,55 ,score,{ fontFamily: 'ZCOOL QingKe HuangYou' }).setFontSize(30);
        scoreText.visible=false;
        iconZZZ=this.add.image(770,80 , "ZZZIcon" , [1]);
        iconZZZ.visible=false;
        scoreTitleText=this.add.text(760 ,10,"SCORE",{ fontFamily: 'ZCOOL QingKe HuangYou' }).setFontSize(35);
        scoreTitleText.visible=false;
        iconZZZ.scaleX=3;
        iconZZZ.scaleY=3;


        this.input.keyboard.on('keydown_ENTER', function (event) {
            if(!showingDialogue) interact();
            else hideDialogue();
        });

        this.input.keyboard.on('keydown_SPACE', function (event) {
            if(!showingDialogue) interact();
            else hideDialogue();
        });



        this.input.keyboard.on('keydown' , (event)=>{
            if(showingDialogue && timeShowingDialog>100) hideDialogue();
        })

        buttonInteract.on('pointerdown' , ()=>{   
            if(!showingDialogue) interact();
            else hideDialogue();
        });

        this.input.on('pointerdown' , ()=>{
            
            if(showingDialogue && timeShowingDialog>100) hideDialogue();
        })

        PKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);        // ONLY FOR TESTING


        
        if(window.mobileAndTabletCheck()){ //--------------------MOBILE
            // ------------------------- Joystick
            this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: 100,
                y: 400,
                radius: 80,
                base: this.add.circle(0, 0, 80, 0xCF000000).setAlpha(0.5),
                thumb: this.add.circle(0, 0, 40, 0xcccccc),
            });

            buttonInteract.scaleX=2;
            buttonInteract.scaleY=0.6;
            buttonStartText.setFontSize(30);
            buttonStartText.x=750;
            buttonStartText.y=440;
        }
        else {      //-------------------DESKTOP
            buttonInteract.on('pointerover', ()=> {	buttonInteract.setScale(1.3,0.5);});
            buttonInteract.on('pointerout', ()=> {	buttonInteract.setScale(1.2,0.4);});
        }
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

        if(showingDialogue) timeShowingDialog+=delta;

        if (showingDialogue && timeShowingDialog>4000) hideDialogue();


        let nearest=minDistance();
        if(nearest[0]<radiusInteraction && nearest[1].sleeping!==2){
            buttonInteract.visible=true;
            buttonStartText.visible=true;
            if(nearest[1].sleeping===1) {buttonStartText.text="wake up " + nearest[1]["name"] + "!";}
            else { 
                if(nearest[1].name!=="Door" && nearest[1].name!=="Exit"){
                    buttonStartText.text="talk to " + nearest[1]["name"];
                }
                else {
                    buttonStartText.text="Open door";
                }
            }       
        }   
        else {

            buttonInteract.visible=false;
            buttonStartText.visible=false;
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

        if(this.joyStick!=null)  this.dumpJoyStickState();

    } ,
        
    dumpJoyStickState: function() {
        if(!joystickLocked)
            player.moveJoystic(this.joyStick.forceX,this.joyStick.forceY)
    }   
    
})

function hideDialogue(){
    if(sequentialText){
        timeShowingDialog=0;
        textDialogue.text=nextText.message;
        textTitle.text=nextText.title;
        sequentialText=false;
    }
    else{   
        timeShowingDialog=0;
        showingDialogue=false;
        textTitle.visible=false;
        textDialogue.visible=false;
        textInstruction.visible=false;
        dialogueWindow.visible=false;
        let nearest=minDistance();
        if(nearest[1].avatar.anims!=undefined) nearest[1].avatar.anims.play("idle"+nearest[1].name);
    }
}

function showDialogue(message){
    if (message!=null){
        textDialogue.text=message;
        textTitle.text="Guy Blue"
        timeShowingDialog=0;
    }
    showingDialogue=true;
    textTitle.visible=true;
    textDialogue.visible=true;
    textInstruction.visible=true;
    dialogueWindow.visible=true;
}

function showScore(){
    iconZZZ.visible=true;
    scoreText.visible=true;
    scoreTitleText.visible=true;
}


function interact(){
    let nearest=minDistance();
    if(nearest[0]<radiusInteraction){
        if(nearest[1].sleeping===0) {           // the NPC is awake at the beggining
            showDialogue();
            if(nearest[1]["sequence"]===undefined){ // for non-sequential conversation
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
            else{           //for sequential conversations

                sequentialText=true;
                textTitle.text=nearest[1]["sequence"]["name1"];
                nextText={title:nearest[1]["sequence"]["name2"] , message:nearest[1]["sequence"]["msg2_1"] }
                if(nearest[1].sequence.message===0){
                    
                    textDialogue.text=nearest[1]["sequence"]["msg1_1"];
                    nextText={title:nearest[1]["sequence"]["name2"] , message:nearest[1]["sequence"]["msg2_1"] };  
                    if(nearest[1].sequence["msg1_2"]!==null) nearest[1].sequence.message=1;
                }
                else{
                    console.log(nearest[1].sequence["msg1_2"]);
                    textDialogue.text=nearest[1]["sequence"]["msg1_2"];
                    nextText={title:nearest[1]["sequence"]["name2"] , message:nearest[1]["sequence"]["msg2_2"] }
                }
                    
                
            }
        }
        else if(nearest[1].sleeping===1) {      // the NPC is asleep, awake him/her!
            awakeNPC(nearest[1]);
            nearest[1].timeToSleep=time + getTimeToSleep(time);
            nearest[1].timeToDisappear=999999;
            nearest[1].sleeping=2;
            score++;
            scoreText.text="x " + score;
        }   
    }
}






