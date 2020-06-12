
var map = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function map() {

        Phaser.Scene.call(this, {
            key: 'map',
            active: false
        });
    },

    preload: function () {},

    create: function () {

        this.selectedGlow=null;
        this.selectedLevel=-1;

        // ------------------------------------------------------------------------texts
        this.levelTitle=this.add.text(650, 470, "", {
            fontFamily: 'euroStyle_condensed',
            fontSize: 20
        }).setDepth(2).setOrigin(0.5).setVisible(false);

        this.levelNumber=this.add.text(370, 475, "", {
            fontFamily: 'euroStyle_condensed',
            fontSize: 20
        }).setDepth(2).setOrigin(0.5).setVisible(false);

        this.levelSubtitle=this.add.text(650, 500, "", {
            fontFamily: 'euroStyle_condensed',
            fontSize: 15
        }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setDepth(2).setOrigin(0.5).setVisible(false);

        this.separator=this.add.text(430, 475, "|", {
            fontSize: 40
        }).setDepth(2).setOrigin(0.5).setVisible(false);

        this.base = this.add.image(0, 0, "map_base").setOrigin(0).setScale(2);

        
        //----road (level 3)
        this.map_golden_glow = this.add.image(258, 0, "map_golden_road_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        //this.map_golden_road = this.add.image(258, 0, "map_golden_road").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_golden_road_grey = this.add.image(258, 0, "map_golden_road_grey").setOrigin(0).setScale(2).setInteractive();

        this.map_golden_road_grey.on('pointerdown' , ()=>{
            if (this.selectedGlow!==null)   this.selectedGlow.setVisible(false);
            this.selectedGlow=this.map_golden_glow;
            this.selectedGlow.setVisible(true);
            this.levelNumber.text="Lvl 3 "
            this.levelTitle.text="No Vision | Manhattan Ave ";
            this.levelSubtitle.text="Comming soon ";

            this.levelNumber.setVisible(true);
            this.levelTitle.setVisible(true);
            this.levelSubtitle.setVisible(true);

            this.selectedLevel=3;
        })


        //---building 204   (level 5)
        this.map_204_glow = this.add.image(190, 160, "map_204_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_204_grey = this.add.image(190, 160, "map_204_grey").setOrigin(0).setScale(2).setInteractive();
        //this.map_204_color = this.add.image(190, 160, "map_204_color").setOrigin(0).setScale(2).setInteractive().setVisible(false);
       
        this.map_204_grey.on('pointerdown' , ()=>{
            if (this.selectedGlow!==null)   this.selectedGlow.setVisible(false);
            this.selectedGlow=this.map_204_glow;
            this.selectedGlow.setVisible(true);
            this.levelNumber.text="Lvl 5 "
            this.levelTitle.text="Sermon | Death By Audio ";
            this.levelSubtitle.text="Comming soon ";

            this.levelNumber.setVisible(true);
            this.levelTitle.setVisible(true);
            this.levelSubtitle.setVisible(true);

            this.selectedLevel=5;
        })


        //---building 203  (level 2)
        this.map_203_glow = this.add.image(250, 85, "map_203_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_203_grey = this.add.image(250, 85, "map_203_grey").setOrigin(0).setScale(2).setInteractive();
        //this.map_203_color = this.add.image(250, 85, "map_203_color").setOrigin(0).setScale(2).setInteractive().setVisible(false);

        this.map_203_grey.on('pointerdown' , ()=>{
            if (this.selectedGlow!==null)   this.selectedGlow.setVisible(false);
            this.selectedGlow=this.map_203_glow;
            this.selectedGlow.setVisible(true);
            this.levelNumber.text="Lvl 2 "
            this.levelTitle.text="New Pallet Theme | Matchless ";
            this.levelSubtitle.text="Comming soon ";

            this.levelNumber.setVisible(true);
            this.levelTitle.setVisible(true);
            this.levelSubtitle.setVisible(true);

            this.selectedLevel=2;
        })

        //---building 202  (level 4)
        this.map_202_glow = this.add.image(480, 305, "map_202_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_202_grey = this.add.image(480, 305, "map_202_grey").setOrigin(0).setScale(2).setInteractive();
        //this.map_202_color = this.add.image(480, 305, "map_202_color").setOrigin(0).setScale(2).setInteractive().setVisible(false);

        this.map_202_grey.on('pointerdown' , ()=>{
            if (this.selectedGlow!==null)   this.selectedGlow.setVisible(false);
            this.selectedGlow=this.map_202_glow;
            this.selectedGlow.setVisible(true);

            this.levelNumber.text="Lvl 4 "
            this.levelTitle.text="Let’s Get Out of Here | Silent Barn ";
            this.levelSubtitle.text="Comming soon ";

            this.levelNumber.setVisible(true);
            this.levelTitle.setVisible(true);
            this.levelSubtitle.setVisible(true);

            this.selectedLevel=4;
        })

        //---building 201  (level 1)
        this.map_201_glow = this.add.image(430, 170, "map_201_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        //this.map_201_grey = this.add.image(430, 170, "map_201_grey").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_201_color = this.add.image(430, 170, "map_201_color").setOrigin(0).setScale(2).setInteractive();
        
        
        this.map_201_color.on('pointerdown' , ()=>{
            if (this.selectedGlow!==null)   this.selectedGlow.setVisible(false);
            this.selectedGlow=this.map_201_glow;
            this.selectedGlow.setVisible(true);
            this.levelNumber.text="Lvl 1 "
            this.levelTitle.text="Gutted | Shea Stadium ";
            this.levelSubtitle.text="Tap or click to start ";

            this.levelNumber.setVisible(true);
            this.levelTitle.setVisible(true);
            this.levelSubtitle.setVisible(true);

            this.selectedLevel=1;
        })


        //---bridge (Lvl 5)
        this.map_bridge_glow = this.add.image(540, 90, "map_bridge_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_bridge_color = this.add.image(540, 90, "map_bridge_color").setOrigin(0).setScale(2).setInteractive();
        //this.map_bridge_color = this.add.image(540, 90, "map_bridge_grey").setOrigin(0).setScale(2).setInteractive().setVisible(false);

        this.map_bridge_color.on('pointerdown' , ()=>{
            if (this.selectedGlow!==null)   this.selectedGlow.setVisible(false);
            this.selectedGlow=this.map_bridge_glow;
            this.selectedGlow.setVisible(true);
            this.levelNumber.text="Lvl 5 "
            this.levelTitle.text="Idle | Old Kosciuszko Bridge ";
            this.levelSubtitle.text="Comming soon ";

            this.levelNumber.setVisible(true);
            this.levelTitle.setVisible(true);
            this.levelSubtitle.setVisible(true);

            this.selectedLevel=5;
        })




        this.trees = this.add.image(0, 0, "map_trees").setOrigin(0).setScale(2);


        this.banner=this.add.rectangle(444,480,888,100).setFillStyle(0x000000).setInteractive();
        this.banner.on('pointerdown' , ()=>{
            if(this.selectedLevel===1){
                this.scene.start("menu");
            }

        })


        map_logo = this.add.image(20, 450, "map_logo").setOrigin(0).setScale(0.8);
    },

    update: function (){}


})