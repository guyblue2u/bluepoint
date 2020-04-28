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
        
        switch(params){
            case left:
                if(Phaser.Geom.Polygon.Contains(poly,this.avatar.x-speed,this.avatar.y+16))
                    this.avatar.x-=speed;
                if(this.direction!=left && !this.moving) this.avatar.play("walkLeft");
                this.direction=left;
                this.moving=true;
                break
            case right:
                if(Phaser.Geom.Polygon.Contains(poly,this.avatar.x+speed,this.avatar.y+16))
                 this.avatar.x+=speed;
                if(this.direction!=right && !this.moving) this.avatar.play("walkRight");
                this.direction=right;
                this.moving=true;
                break;
            case up:
                if(Phaser.Geom.Polygon.Contains(poly,this.avatar.x,this.avatar.y-speed+16))
                    this.avatar.y-=speed;
                if(this.direction!=up && !this.moving) this.avatar.play("walkUp");
                this.direction=up;
                this.moving=true;
                this.avatar.depth=this.avatar.y;
                break;
            case down:
                if(Phaser.Geom.Polygon.Contains(poly,this.avatar.x,this.avatar.y+speed+16))
                    this.avatar.y+=speed;
                if(this.direction!=down && !this.moving) this.avatar.play("walkDown");
                this.direction=down;
                this.moving=true;
                this.avatar.depth=this.avatar.y;
                break;
            default:
                break;
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
    constructor(name , x , y , message1 , message2 ){
        this.x=x;
        this.y=y;
        this.message1=message1;
        this.message2=message2;
        this.name=name;
    }
}

// with rotation
let Ella=new NPC("Ella" , 210,190 , "All my friends are out on the balcony but this bassist can really hold it down." , "");
let Chester= new NPC("Chester" , 270, 200 , "It’s not that crowded tonight. I’m gonna graffiti the bathroom while I have the chance." , "");
let Tyler = new NPC ("Tyler" , 350,200 , "Did you see Future Islands on Letterman? Crazy. I saw them play here back in 2010." , "");
let Bela = new NPC ("Bella" , 310,110 , "Did you know that Titus Andronicus practices here? The lead singer took my ticket at the door.", "");
let Nick = new NPC ("Nick" , 300, 150 , "Shhh... I hear they record the shows here. Don’t want to mess it up." , "");
let Jon = new NPC ("Jon" , 330 , 180 , "I threw up last time I saw these guys.", "Don’t worry, it probably won’t happen this time");

// without rotation
let Sally = new NPC ("sally" , 100, 120 , "You shouldn’t sit on this couch. It’s disgusting." , " ");
let Benny = new NPC ("Benny" , 140, 100 , " I don’t care what she thinks. This couch is comfy" , "");
let Anna = new NPC ("Anna" , 240, 160 , "Have you noticed companies are hiring people to graffiti their warehouses? Just be a fucking warehouse, man!" , "Corporate jocks desperately trying to appeal to the youth. It’s pathetic");
let Dillon = new NPC ("Dillon" , 255, 150 , "Huh. I guess I haven’t really noticed." , "");
let Sam = new NPC("Sam", 50, 200, "why is this guy creeping?*" , "Piss off, creep.");
let Aaron = new NPC("Aaron", 65, 190, "...and so with the coupon it only ended up being--hey, can I help you asshole?" , "*he’s still here…*");
let Alex = new NPC("Alex" , 235, 87, "You wanna buy a shirt? Sure thing." , "You already have a shirt.");
let Door1= new NPC("Door" , 140,150,"It's locked", "I don’t want to leave yet, we gotta do something!");
let Door2= new NPC("Door" , 150,160,"It's locked", "I don’t want to leave yet, we gotta do something!");
let Exit= new NPC("Exit" , 150,160," I don’t want to leave yet, the concert just started.", "I don’t want to leave yet, we gotta do something!");

// TO DO ----- I HAVE TO INCLUDE THE DOORS
NPCS.push(Ella,Chester,Tyler,Bela,Nick,Jon,Sally,Benny,Anna,Dillon,Sam,Aaron,Alex);


// without interaction
let drummer= new NPC("" , 380,150 , "" , "")
let bassist= new NPC("" , 330,140 , "" , "")
let guitarrist= new NPC("" , 400,185 , "" , "")


function minDistance() {
    return NPCS.reduce((acc,val)=>{
        if (Math.sqrt((player.avatar.x - val.avatar.x)**2 + (player.avatar.y - val.avatar.y)**2) < acc[0] ) {
             acc[0]=Math.sqrt((player.avatar.x - val.avatar.x)**2 + (player.avatar.y - val.avatar.y)**2);
             acc[1]=val;
        }
        return acc;
    } , [999])
} 

