
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

        //------------------------------- Joystick
        
        if(window.mobileAndTabletCheck()){
            var url;      
            url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
            this.load.plugin('rexvirtualjoystickplugin', url, true);
        }
    },

    create: function(){
        music.play();
        dialogueWindow= this.add.image(400,100 , "messageBoard");
        dialogueWindow.scaleX=3.5;
        dialogueWindow.scaleY=1.7;
        //textTitle=this.add.bitmapText(200,165,'Antenna',"testing",20);
        textTitle=this.add.text(400, 40, 'Hello World', { fontFamily: 'ZCOOL QingKe HuangYou' }).setFontSize(35);
        textTitle.setOrigin(0.5,0.5);

        textDialogue=this.add.text(400,100, "here is the message" , { fontFamily: 'ZCOOL QingKe HuangYou' ,wordWrap: { width: 450, useAdvancedWrap: true } }).setFontSize(25);
        textDialogue.setOrigin(0.5,0.5);

        textInstruction = this.add.text(480,160,"Press space bar or interact to continue",{ fontFamily: 'ZCOOL QingKe HuangYou' }).setFontSize(20);
        textInstruction.setOrigin(0.5,0.5);

        buttonInteract=this.add.image(880,470,"interactButton");
        buttonInteract.setOrigin(1,1);
        buttonInteract.scaleX=1;
        buttonInteract.scaleY=1;

        buttonInteract.setInteractive();

        buttonStartText=this.add.text(790,450,"talk to",{ fontFamily: 'ZCOOL QingKe HuangYou' }).setFontSize(20);
        buttonStartText.setOrigin(0.5,0.5);

        showingDialogue=false;
        textTitle.visible=false;
        textDialogue.visible=false;
        textInstruction.visible=false;
        dialogueWindow.visible=false;

        // GeneralInstructions
        this.instructionText = this.add.text(300,450,"WASD or arrows to move \n Spacebar or Enter to interact",{ fontFamily: 'ZCOOL QingKe HuangYou' ,fontSize:30, align:'center'});

        this.instructionText.visible=false;

        flashingTextTween = this.tweens.add({
            targets: this.instructionText,
            alpha: { from: 0, to: 1 },
            duration: 500,
            ease: 'Sine.easeInOut',
            loop: -1,
        }).stop();
        

        //----------------------------------------S O C I A L     M E D I A
        //---------------Share button
        this.share=this.add.image(40,40,"shareIcon").setScale(0.09);
        this.share.setInteractive();
        this.share.on('pointerover', ()=> {	this.share.setScale(0.1);});
        this.share.on('pointerout', ()=> {	this.share.setScale(0.09);});
        this.share.on('pointerdown' , ()=>{   
            if(!this.facebook.visible){     // show the icons
                this.facebook.visible=true;
                this.facebook.tweenIn.play();
                this.twitter.visible=true;
                this.twitter.tweenIn.play();
                this.copyURL.visible=true;
                this.copyURL.tweenIn.play();
            }
            else{  //hide the icons
                this.time.delayedCall(200, ()=>{
                    this.facebook.visible=false;
                    this.twitter.visible=false;
                    this.copyURL.visible=false;
                });
                this.facebook.tweenOut.play();               
                this.twitter.tweenOut.play();
                this.copyURL.tweenOut.play();

            }
        });


        //---------------Facebook
        this.facebook=this.add.image(40,100,"facebook").setScale(0.4).setVisible(false);
        this.facebook.setInteractive();
        this.facebook.on('pointerdown' , ()=>{   
            shareFacebook();
            
        });

        this.facebook.on('pointerover', ()=> {	this.facebook.setScale(0.5);});
        this.facebook.on('pointerout', ()=> {	this.facebook.setScale(0.4);});

        this.facebook.tweenIn=this.tweens.add({
            targets: this.facebook,
            y: { from: 40, to: 100 },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        });

        this.facebook.tweenOut=this.tweens.add({
            targets: this.facebook,
            y: { from: 100, to: 40 },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        });

        //----------------Twitter
        this.twitter=this.add.image(40,160,"twitter").setScale(0.4).setVisible(false);
        this.twitter.setInteractive();
        this.twitter.on('pointerdown' , ()=>{   
            shareTwitter();
        });

        this.twitter.on('pointerover', ()=> {	this.twitter.setScale(0.5);});
        this.twitter.on('pointerout', ()=> {	this.twitter.setScale(0.4);});

        this.twitter.tweenIn=this.tweens.add({
            targets: this.twitter,
            y: { from: 40, to: 150 },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        });

        
        this.twitter.tweenOut=this.tweens.add({
            targets: this.twitter,
            y: { from: 150, to: 40 },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        });

         //----------------Copy to clipboard
         this.copyURL=this.add.image(40,210,"copyIcon").setScale(1).setVisible(false);
         this.copyURL.setInteractive();
         this.copyURL.on('pointerdown' , ()=>{   
             copyStringToClipboard();
         });
 
         this.copyURL.on('pointerover', ()=> {	this.copyURL.setScale(1.2);});
         this.copyURL.on('pointerout', ()=> {	this.copyURL.setScale(1);});
 
         this.copyURL.tweenIn=this.tweens.add({
             targets: this.copyURL,
             y: { from: 40, to: 210 },
             duration: 200,
             ease: 'Linear',
             loop: 0,
         });
 
         
         this.copyURL.tweenOut=this.tweens.add({
             targets: this.copyURL,
             y: { from: 210, to: 40 },
             duration: 200,
             ease: 'Linear',
             loop: 0,
         });
 



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
            else if(!buttonsLocked) hideDialogue();
        });

        this.input.keyboard.on('keydown_SPACE', function (event) {
            if(!showingDialogue) interact();
            else if(!buttonsLocked)hideDialogue();
        });



        // this.input.keyboard.on('keydown' , (event)=>{
        //     if(showingDialogue && timeShowingDialog>100 && !buttonsLocked) hideDialogue();
        // })

        buttonInteract.on('pointerdown' , ()=>{   
            if(!showingDialogue) interact();
            else if(!buttonsLocked) hideDialogue();
        });

        this.input.on('pointerdown' , ()=>{
            
            if(showingDialogue && timeShowingDialog>100 && !buttonsLocked) hideDialogue();
        })
        
        if(window.mobileAndTabletCheck()){ //--------------------MOBILE
            // ------------------------- Joystick
            this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: 100,
                y: 400,
                radius: 80,
                base: this.add.circle(0, 0, 80, 0xCF000000).setAlpha(0.5),
                thumb: this.add.circle(0, 0, 40, 0xcccccc),
            });

            buttonInteract.scaleX=1.5;
            buttonInteract.scaleY=1.5;
            buttonStartText.setFontSize(30);
            buttonStartText.x=750;
            buttonStartText.y=440;

            this.instructionText.text="use the virtual joystick to move \n Press the button to interact"
        }
        else {      //-------------------DESKTOP
            buttonInteract.on('pointerover', ()=> {	buttonInteract.setScale(1,1.1);});
            buttonInteract.on('pointerout', ()=> {	buttonInteract.setScale(1,1);});
        }


        // ------------------------- Time events
        console.log("initial time: " +initialTime)
        timedEvent = this.time.delayedCall(50+ initialTime, ()=>{
            showDialogue("This is one of my favorite spots, Shea Stadium.");
            textInstruction.visible=false;
            
        });
        timedEvent = this.time.delayedCall(3000+ initialTime, ()=>{
            showDialogue("I wonder what’s happening tonight, let’s ask around.");
            textInstruction.visible=false;
        });

        timedEvent =this.time.delayedCall(6000+initialTime, ()=>{
            this.instructionText.visible=true;
            joystickLocked=false;
            buttonsLocked=false;
        })


        timedEvent=this.time.delayedCall(15000+initialTime , ()=>{
            this.instructionText.visible=false;
        })

        timedEvent = this.time.delayedCall(68000+ initialTime, ()=>{

            if(showingDialogue) endAllDialogs();
            sleepEveryone();

            //doors now show the secondary message
            NPCS[16].message=1;
            NPCS[17].message=1;
            NPCS[18].message=1;


        });

        timedEvent = this.time.delayedCall(70000+ initialTime, ()=>{
            buttonsLocked=true;
            joystickLocked=true;
            player.avatar.play("idleDown"+shirt);
            textInstruction.visible=false;
            showDialogue("What the hell is happening? We have to wake these people up!");
        });

        timedEvent = this.time.delayedCall(74000+ initialTime, ()=>{ 
            buttonsLocked=false;
            joystickLocked=false;
            showScore();
            this.instructionText.visible=true;
            flashingTextTween.play();
            this.instructionText.text='Interact with people to wake them up'
        })
        
        timedEvent = this.time.delayedCall(140000+ initialTime, ()=>{ 
            flashingTextTween.stop();
            this.instructionText.visible=false;
            
        })

         //when the game loses its focus it should stop the clock
         this.game.events.on('blur',  ()=>{
            this.scene.pause();
            this.time.paused=true
        });
        this.game.events.on('focus',  ()=>{
            this.time.paused=false
            this.scene.resume();
        });

        this.texto=this.add.text(10,10,"aaaaaa");

    },

    update: function(t,delta){

        time+=delta;

        this.texto.text=Math.floor( (time+initialTime)/10)/100 + "- Audio:" + Math.floor(music.seek*100)/100;
        
        if(showingDialogue) timeShowingDialog+=delta;

        if (showingDialogue && timeShowingDialog>3000) hideDialogue();


        let nearest=minDistance();
        if(nearest[0]<radiusInteraction && nearest[1].sleeping!==2){
            buttonInteract.visible=true;
            buttonStartText.visible=true;
            if(nearest[1].sleeping===1) {
                if(nearest[1].name!=="Guy Blue"){
                    buttonStartText.text="wake up " + nearest[1]["name"] + "!";
                }
            }
            else { 
                if(nearest[1].name!=="Guy Blue"){
                    if(nearest[1].sequence!==undefined) buttonStartText.text="talk to " + nearest[1].sequence.sequentialName;
                    
                    else buttonStartText.text="talk to " + nearest[1]["name"];
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

        NPCS.forEach((el, index, object)=>{
            if(el.timeToDisappear<time+5000 && el.sleeping && !el["tween"].isPlaying()){
                el["tween"].play();
            }

            if(el.timeToDisappear<time && el.sleeping===1){
                el.visible=false;
                el.avatar.visible=false;
                el["zzz"].visible=false;
                el["tween"].stop();
                object.splice(index, 1);
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
    }  , 
    

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
        let NPCSpeaking=NPCS[this.NPCDIalogueIndex];
        if(NPCSpeaking!==undefined)
            if(NPCSpeaking.avatar.anims!=undefined) NPCSpeaking.avatar.anims.play("idle"+NPCSpeaking.name);
        this.NPCDIalogueIndex=-1;
    }
}

function endAllDialogs(){   // hide any dialog when NPCS go to sleep
    sequentialText=false;
    timeShowingDialog=0;
    showingDialogue=false;
    textTitle.visible=false;
    textDialogue.visible=false;
    textInstruction.visible=false;
    dialogueWindow.visible=false;
    let NPCSpeaking=NPCS[this.NPCDIalogueIndex];
    if(NPCSpeaking!==undefined)
        if(NPCSpeaking.avatar.anims!=undefined) NPCSpeaking.avatar.anims.play("idle"+NPCSpeaking.name);
    this.NPCDIalogueIndex=-1;
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
        this.NPCDIalogueIndex=NPCS.indexOf(nearest[1]);
        if(nearest[1].sleeping===0) {           // the NPC is awake at the beggining
            showDialogue();
            if(nearest[1]["sequence"]===undefined){ // for non-sequential conversation
                textTitle.text=nearest[1]["name"];
                if(nearest[1].message===0){
                    if(nearest[1].name==="Alex") {
                        shirt="Red";
                        player.move(up);
                    }
                    textDialogue.text=nearest[1]["message1"];
                        if(nearest[1].message2!==null && nearest[1].name!=="Guy Blue"){
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
            if(nearest[1]["tween"].isPlaying()){
                nearest[1]["tween"].stop();
                nearest[1].avatar.alpha=1;
            }
        }   
    }
}

function copyStringToClipboard () {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = window.location.href;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
 }





