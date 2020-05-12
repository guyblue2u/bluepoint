const left=37;
const up=38;
const right=39;
const down=40;
const speed=1;
const radiusInteraction=30;
let shirt="Blue";
let NPCS=[];

const timeStartGame=68000;
const timeEndGame = 142000;


let player={
    x:98,
    y:141,
    shirt:"blue",
    points:0,
    moving:false,
    direction: null,
    avatar:null,
    move(params){      
        if (params===left) { 
            if(Phaser.Geom.Polygon.Contains(poly,this.avatar.x-speed,this.avatar.y+16)
            && !checkColisionNPCS(this.avatar.x-speed,this.avatar.y+16))
                this.avatar.x-=speed;           
            if (!this.moving) {
                this.direction=left;
                this.avatar.play("walkLeft"+ shirt);
            }
            this.moving=true;}
            
        if(params===right){
            if(Phaser.Geom.Polygon.Contains(poly,this.avatar.x+speed,this.avatar.y+16) 
            && !checkColisionNPCS(this.avatar.x+speed,this.avatar.y+16))
                this.avatar.x+=speed;
            if(!this.moving) {
                this.avatar.play("walkRight"+ shirt);
                this.direction=right;
            }            
            this.moving=true;
            }
        if (params===up){
            if(Phaser.Geom.Polygon.Contains(poly,this.avatar.x,this.avatar.y-speed+16)
            && !checkColisionNPCS(this.avatar.x,this.avatar.y+16-speed))
                this.avatar.y-=speed;
            if(this.direction!=up ) this.avatar.play("walkUp"+ shirt);              
            this.direction=up;
            this.moving=true;
            this.avatar.depth=this.avatar.y;
            }
        if (params===down){
            if(Phaser.Geom.Polygon.Contains(poly,this.avatar.x,this.avatar.y+speed+16)
            && !checkColisionNPCS(this.avatar.x,this.avatar.y+16+speed))
                this.avatar.y+=speed;
            if(this.direction!=down ) this.avatar.play("walkDown"+ shirt);
            this.direction=down;
            this.moving=true;
            this.avatar.depth=this.avatar.y;}   
    },

    moveJoystic(x,y){
        // movement
        if(x>20 && Phaser.Geom.Polygon.Contains(poly,this.avatar.x+speed,this.avatar.y+16) 
        && !checkColisionNPCS(this.avatar.x+speed,this.avatar.y+16)){ 
            this.avatar.x+=speed;
        }
        if(x<-20 && Phaser.Geom.Polygon.Contains(poly,this.avatar.x-speed,this.avatar.y+16)
        && !checkColisionNPCS(this.avatar.x-speed,this.avatar.y+16)) {
            this.avatar.x-=speed;
        }
        if(y<-20 && Phaser.Geom.Polygon.Contains(poly,this.avatar.x,this.avatar.y+16-speed)
        && !checkColisionNPCS(this.avatar.x,this.avatar.y+16-speed)){
             this.avatar.y-=speed;
             this.avatar.depth=this.avatar.y;
        }
        if(y>20 && Phaser.Geom.Polygon.Contains(poly,this.avatar.x,this.avatar.y+16+speed) 
        && !checkColisionNPCS(this.avatar.x,this.avatar.y+16+speed)) {
            this.avatar.y+=speed;
            this.avatar.depth=this.avatar.y;
        }

        // direction
        if(Math.abs(x)>20 || Math.abs(y)>20){
            this.moving=true;
            if(Math.abs(x)>Math.abs(y)){
                if (x>0) {
                    this.direction=right;
                    if(this.avatar.anims.currentAnim.key!=="walkRight"+shirt) this.avatar.play("walkRight" + shirt);
                }
                else {
                    this.direction=left;
                    if(this.avatar.anims.currentAnim.key!=="walkLeft"+shirt) this.avatar.play("walkLeft"+ shirt);
                }
            }
            else{
                if(y>0) {
                    this.direction=down;
                    if(this.avatar.anims.currentAnim.key!=="walkDown"+shirt) this.avatar.play("walkDown"+ shirt);
                }
                else {
                    this.direction=up;
                    if(this.avatar.anims.currentAnim.key!=="walkUp"+shirt) this.avatar.play("walkUp"+ shirt);
                }
            }
        }
        else{
            this.returnToIdle();
        }
        


    },



    returnToIdle(){
        switch (this.direction){
            case up:
                this.avatar.play("idleUp"+ shirt);
                break;
            case down:
                this.avatar.play("idleDown"+ shirt);
                break;
            case right:
                this.avatar.play("idleRight"+ shirt);
                break;
            case left:
                this.avatar.play("idleLeft"+ shirt);
                break;
        }
    }
}

class NPC{
    constructor(name , x , y , message1 , message2 , numberSprite, idleSprite){
        this.x=x;
        this.y=y;
        this.message1=message1;
        this.message2=message2;
        this.name=name;
        this.numberSprite=numberSprite;
        this.message=0;
        this.sleeping=0; //0--> normal , 1-->slept , 2-->awaken
        this.timeToSleep=999999.9;
        this.timeToDisappear=Math.random()*74000 + 112000;
        this.visible=true;
        this.idleSprite=idleSprite;
    }
}

// with rotation
let Ella=new NPC("Ella" , 210,190 , "All my friends are out on the balcony but this bassist can really hold it down." , null,44,46);
let Chester= new NPC("Chester" , 270, 200 , "It’s not that crowded tonight. I’m gonna graffiti the bathroom while I have the chance." , null,33,35);
let Tyler = new NPC ("Tyler" , 350,200 , "Did you see Future Islands on Letterman? Crazy. I saw them play here back in 2010." , null,77,79);
let Bela = new NPC ("Bela" , 310,110 , "Did you know that Titus Andronicus practices here? The lead singer took my ticket at the door.", null,55,56);
let Nick = new NPC ("Nick" , 300, 150 , "Shhh... I hear they record the shows here. Don’t want to mess it up." , null , 88,90);
let Jon = new NPC ("Jon" , 330 , 180 , "I threw up last time I saw these guys.", "Don’t worry, it probably won’t happen this time" , 0,2);

// without rotation
let Sally = new NPC ("Sally" , 100, 110 , "You shouldn’t sit on this couch. It’s disgusting." , null , null,13);
let Benny = new NPC ("Benny" , 140, 100 , "I don’t care what she thinks. This couch is comfy" , null,null,121);

// without rotation , with sequential interaction
let Anna = new NPC ("Anna" , 240, 160 , "" , "",null,68);
Anna.sequence={
    name1:"Anna",
    name2:"Dillon",
    msg1_1:"Have you noticed companies are hiring people to graffiti their warehouses? Just be a fucking warehouse, man!",
    msg2_1: "Huh. I guess I haven’t really noticed.",
    msg1_2: "Corporate jocks desperately trying to appeal to the youth. It’s pathetic",
    msg2_2: "ok...",
    message:0,
    sequentialName: "Anna and Dillon"
}
let Dillon = new NPC ("Dillon" , 255, 150 , "Huh. I guess I haven’t really noticed." , null,null,24);
Dillon.sequence=Anna.sequence;

let Sam = new NPC("Sam", 50, 200, "*why is this guy creeping?*" , "Piss off, creep" , null,110);
Sam.sequence={
    name1:"Sam",
    name2:"Aaron",
    msg1_1:"*why is this guy creeping?*",
    msg2_1: "...and so with the coupon it only ended up being--hey, can I help you asshole?",
    msg1_2: " *he’s still here…*",
    msg2_2: "Piss off, creep",
    message:0,
    sequentialName:"Sam and Aaron"
}
let Aaron = new NPC("Aaron", 65, 190, "" , '' ,null,100);
Aaron.sequence=Sam.sequence;


let Alex = new NPC("Alex" , 235, 87, "You wanna buy a shirt? Sure thing." , "You already have a shirt.",null,132);
let Door1= new NPC("Door" , 180,55,"It's locked", "I don’t want to leave yet, we gotta do something!",null,null);
let Door2= new NPC("Door" ,350,105,"It's locked", "I don’t want to leave yet, we gotta do something!",null,null);
let Exit= new NPC("Exit" , 80,115," I don’t want to leave yet, the concert just started.", "I don’t want to leave yet, we gotta do something!",null,null);


// without interaction
let drummer= new NPC("Drummer" , 380,150 , "" ,"", null,165)
let bassist= new NPC("Bassist" , 400,185 , "slap* slap" ,"", null,143)
let guitarist= new NPC("Guitarist" , 330,140 , "can’t you see I’m shredding?" ,"", null,154)



// --------------------------------- M E T H O D S ----------------------------------

NPCS.push(Ella,Chester,Tyler,Bela,Nick,Jon,Sally,Benny,Anna,Dillon,Sam,Aaron,Alex,guitarist,bassist,drummer , Door1,Door2,Exit);

function minDistance() {
    return NPCS.reduce((acc,val)=>{
        if (Math.sqrt((player.avatar.x - val.avatar.x)**2 + (player.avatar.y - val.avatar.y)**2) < acc[0] && val.visible) {
             acc[0]=Math.sqrt((player.avatar.x - val.avatar.x)**2 + (player.avatar.y - val.avatar.y)**2);
             acc[1]=val;
        }
        return acc;
    } , [999])
} 

function NpcLookPlayer(npc){
    if(npc.numberSprite!=null){
        let x=npc.avatar.x - player.avatar.x ;
        let y=npc.avatar.y - player.avatar.y ;
        let lookDirection;
        if(Math.abs(x)>Math.abs(y)){
            if(x>0) lookDirection = 3;
            else lookDirection = 2;
        } 
        else{
            if(y>0) lookDirection = 0
            else lookDirection = 1;
        }
        npc.avatar.anims.stop();
        npc.avatar.setTexture('NPC', npc.numberSprite+lookDirection );
    }
}

function sleepEveryone(){
    NPCS.forEach((el)=>{
        if(el.avatar.anims!==undefined){
            el.avatar.anims.play("sleep" + el.name);
            el.sleeping=1;
            el["zzz"].visible=true;
        }
    })
}

function sleepNPC(npc){
    npc.sleeping=1;
    npc.avatar.anims.play("sleep" + npc.name);    
    npc["zzz"].visible=true;
}

function awakeNPC(npc){
    npc.avatar.anims.stop();
    npc.avatar.setTexture("NPC", npc.idleSprite);  
    npc.sleeping=2; 
    npc["zzz"].visible=false;
    
}

function getTimeToSleep(currentTime){
    return (Math.sqrt(142000-currentTime)*31.62)/2-0.5;   //multiply by 31.62 to convert from miliseconds to seconds in the square root
}

function getTimeToDisappear(currentTime){
    return Math.sqrt(142000-currentTime)*31.62;
}

function checkColisionNPCS(X,Y){
   return NPCS.some((el)=>{
        X1=el.avatar.x;
        Y1=el.avatar.y+16;
        return (X>X1-10 && X<X1+10 && Y<Y1+5 && Y>Y1-5)        
    })
}

function hideAllCharacters(){
    if(NPCS.length>0){
        NPCS.forEach((el, index, object) => {
            el.visible=false;
            el.avatar.visible=false;
            if(el.zzz!==undefined) el["zzz"].visible=false;
            if(el.tween!==undefined) el["tween"].stop();
        });
    }
}

// -------------------------------------- Social Media

function shareTwitter(){        //share score on twitter        
    var tweetbegin = 'https://twitter.com/intent/tweet?text=';   
    var tweettxt = 'I%20scored%20'+score+'%20at%20this%20game%20-&url='+ 'https://www.facebook.com/sharer/sharer.php?u=http://davidmoncas.epizy.com/';    
    var finaltweet = tweetbegin +tweettxt;
    window.open(finaltweet,'_blank');    
}

function shareFacebook(){
    window.open( 'https://www.facebook.com/sharer/sharer.php?u=http://davidmoncas.epizy.com/' , '_blank')
}