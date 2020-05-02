const left=37;
const up=38;
const right=39;
const down=40;
const speed=1;
const radiusInteraction=30;

let NPCS=[];

let player={
    x:176,
    y:88,
    shirt:"blue",
    points:0,
    moving:false,
    direction: null,
    avatar:null,
    move(params){      
        if (params===left) { 
            if(Phaser.Geom.Polygon.Contains(poly,this.avatar.x-speed,this.avatar.y+16))
                this.avatar.x-=speed;           
            if (!this.moving) {
                this.direction=left;
                this.avatar.play("walkLeft");
            }
            this.moving=true;}
            
        if(params===right){
            if(Phaser.Geom.Polygon.Contains(poly,this.avatar.x+speed,this.avatar.y+16))
                this.avatar.x+=speed;
            if(!this.moving) {
                this.avatar.play("walkRight");
                this.direction=right;
            }            
            this.moving=true;
            }
        if (params===up){
            if(Phaser.Geom.Polygon.Contains(poly,this.avatar.x,this.avatar.y-speed+16))
                this.avatar.y-=speed;
            if(this.direction!=up ) this.avatar.play("walkUp");              
            this.direction=up;
            this.moving=true;
            this.avatar.depth=this.avatar.y;
            }
        if (params===down){
            if(Phaser.Geom.Polygon.Contains(poly,this.avatar.x,this.avatar.y+speed+16))
                this.avatar.y+=speed;
            if(this.direction!=down ) this.avatar.play("walkDown");
            this.direction=down;
            this.moving=true;
            this.avatar.depth=this.avatar.y;}   
    },

    moveJoystic(x,y){
        // movement
        if(x>20 && Phaser.Geom.Polygon.Contains(poly,this.avatar.x+speed,this.avatar.y+16)){ 
            this.avatar.x+=speed;
        }
        if(x<-20 && Phaser.Geom.Polygon.Contains(poly,this.avatar.x-speed,this.avatar.y+16)) {
            this.avatar.x-=speed;
        }
        if(y<-20 && Phaser.Geom.Polygon.Contains(poly,this.avatar.x,this.avatar.y+16-speed)){
             this.avatar.y-=speed;
             this.avatar.depth=this.avatar.y;
        }
        if(y>20 && Phaser.Geom.Polygon.Contains(poly,this.avatar.x,this.avatar.y+16+speed)) {
            this.avatar.y+=speed;
            this.avatar.depth=this.avatar.y;
        }

        // direction
        if(Math.abs(x)>20 || Math.abs(y)>20){
            this.moving=true;
            if(Math.abs(x)>Math.abs(y)){
                if (x>0) {
                    this.direction=right;
                    if(this.avatar.anims.currentAnim.key!=="walkRight") this.avatar.play("walkRight");
                }
                else {
                    this.direction=left;
                    if(this.avatar.anims.currentAnim.key!=="walkLeft") this.avatar.play("walkLeft");
                }
            }
            else{
                if(y>0) {
                    this.direction=down;
                    if(this.avatar.anims.currentAnim.key!=="walkDown") this.avatar.play("walkDown");
                }
                else {
                    this.direction=up;
                    if(this.avatar.anims.currentAnim.key!=="walkUp") this.avatar.play("walkUp");
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
                this.avatar.play("idleUp");
                break;
            case down:
                this.avatar.play("idleDown");
                break;
            case right:
                this.avatar.play("idleRight");
                break;
            case left:
                this.avatar.play("idleLeft");
                break;
        }
    }
}

class NPC{
    constructor(name , x , y , message1 , message2 , numberSprite){
        this.x=x;
        this.y=y;
        this.message1=message1;
        this.message2=message2;
        this.name=name;
        this.numberSprite=numberSprite;
        this.message=0;
        this.sleeping=0; //0--> normal , 1-->slept , 2-->awaken
        this.timeToSleep=999999.9;
        //this.timeToDisappear=Math.random()*144000 + 174000;
        this.timeToDisappear=Math.random()*93000;
        this.visible=true;
    }
}

// with rotation
let Ella=new NPC("Ella" , 210,190 , "All my friends are out on the balcony but this bassist can really hold it down." , null,44);
let Chester= new NPC("Chester" , 270, 200 , "It’s not that crowded tonight. I’m gonna graffiti the bathroom while I have the chance." , null,33);
let Tyler = new NPC ("Tyler" , 350,200 , "Did you see Future Islands on Letterman? Crazy. I saw them play here back in 2010." , null,77);
let Bela = new NPC ("Bela" , 310,110 , "Did you know that Titus Andronicus practices here? The lead singer took my ticket at the door.", null,55);
let Nick = new NPC ("Nick" , 300, 150 , "Shhh... I hear they record the shows here. Don’t want to mess it up." , null , 88);
let Jon = new NPC ("Jon" , 330 , 180 , "I threw up last time I saw these guys.", "Don’t worry, it probably won’t happen this time" , 0);

// without rotation
let Sally = new NPC ("Sally" , 100, 120 , "You shouldn’t sit on this couch. It’s disgusting." , null , null);
let Benny = new NPC ("Benny" , 140, 100 , " I don’t care what she thinks. This couch is comfy" , null,null);
let Anna = new NPC ("Anna" , 240, 160 , "Have you noticed companies are hiring people to graffiti their warehouses? Just be a fucking warehouse, man!" ,
     "Corporate jocks desperately trying to appeal to the youth. It’s pathetic",null);
let Dillon = new NPC ("Dillon" , 255, 150 , "Huh. I guess I haven’t really noticed." , null,null);
let Sam = new NPC("Sam", 50, 200, "why is this guy creeping?*" , "Piss off, creep" , null);
let Aaron = new NPC("Aaron", 65, 190, "...and so with the coupon it only ended up being--hey, can I help you asshole?" ,
 '*he’s still here…*' ,null);
let Alex = new NPC("Alex" , 235, 87, "You wanna buy a shirt? Sure thing." , "You already have a shirt.",null);
let Door1= new NPC("Door" , 140,150,"It's locked", "I don’t want to leave yet, we gotta do something!",null);
let Door2= new NPC("Door" , 150,160,"It's locked", "I don’t want to leave yet, we gotta do something!",null);
let Exit= new NPC("Exit" , 150,160," I don’t want to leave yet, the concert just started.", "I don’t want to leave yet, we gotta do something!",null);

// TO DO ----- I HAVE TO INCLUDE THE DOORS



// without interaction
let drummer= new NPC("Drummer" , 380,150 , "" , "")
let bassist= new NPC("Bassist" , 330,140 , "" , "")
let guitarrist= new NPC("Guitarrist" , 400,185 , "" , "")

NPCS.push(Ella,Chester,Tyler,Bela,Nick,Jon,Sally,Benny,Anna,Dillon,Sam,Aaron,Alex,guitarrist,bassist,drummer);

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
        el.avatar.anims.play("sleep" + el.name);
        el.sleeping=1;
        el["zzz"].visible=true;
    })
}

function sleepNPC(npc){
    npc.avatar.anims.play("sleep" + npc.name);
    npc.sleeping=1;
    npc["zzz"].visible=true;
}

function awakeNPC(npc){
    npc.avatar.anims.play("idle"+npc.name);
    npc.sleeping=2;
    npc["zzz"].visible=false;
    
}

function getTimeToSleep(currentTime){
    return (Math.sqrt(174000-currentTime)*31.62)/2-0.5;   //multiply by 31.62 to convert from miliseconds to seconds in the square root
}

function getTimeToDisappear(currentTime){
    return Math.sqrt(174000-currentTime)*31.62;
}