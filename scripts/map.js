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

        this.selectedGlow = null;
        this.selectedLevel = -1;

        // ------------------------------------------------------------------------texts
        this.levelTitle = this.add.text(650, 475, "Tap or click an icon to explore", {
            fontFamily: 'euroStyle_condensed',
            fontSize: 20
        }).setDepth(2).setOrigin(0.5);

        this.levelNumber = this.add.text(370, 475, "", {
            fontFamily: 'euroStyle_condensed',
            fontSize: 20
        }).setDepth(2).setOrigin(0.5).setVisible(false);

        this.levelSubtitle = this.add.text(650, 485, "", {
            fontFamily: 'euroStyle_condensed',
            fontSize: 15
        }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setDepth(2).setOrigin(0.5).setVisible(false);

        this.separator = this.add.text(430, 475, "|", {
            fontSize: 40
        }).setDepth(2).setOrigin(0.5).setVisible(false);

        this.base = this.add.image(0, 0, "map_base").setOrigin(0).setScale(2);


        //----road (level 3)
        this.map_golden_glow = this.add.image(258, 0, "map_golden_road_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        //this.map_golden_road = this.add.image(258, 0, "map_golden_road").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_golden_road_grey = this.add.image(258, 0, "map_golden_road_grey").setOrigin(0).setScale(2).setInteractive();

        this.map_golden_road_grey.on('pointerdown', () => {
            this.selectIcon("No Vision | Manhattan Ave ", 3, false, this.map_golden_glow);
        })


        //---building 204   (level 6)
        this.map_204_glow = this.add.image(190, 160, "map_204_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_204_grey = this.add.image(190, 160, "map_204_grey").setOrigin(0).setScale(2).setInteractive();
        //this.map_204_color = this.add.image(190, 160, "map_204_color").setOrigin(0).setScale(2).setInteractive().setVisible(false);

        this.map_204_grey.on('pointerdown', () => {

            this.selectIcon("Sermon | Death By Audio ", 6, false, this.map_204_glow);

        })


        //---building 203  (level 2)
        this.map_203_glow = this.add.image(250, 85, "map_203_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_203_grey = this.add.image(250, 85, "map_203_grey").setOrigin(0).setScale(2).setInteractive();
        //this.map_203_color = this.add.image(250, 85, "map_203_color").setOrigin(0).setScale(2).setInteractive().setVisible(false);

        this.map_203_grey.on('pointerdown', () => {

            this.selectIcon("New Pallet Theme | Matchless ", 2, false, this.map_203_glow);

        })

        //---building 202  (level 4)
        this.map_202_glow = this.add.image(480, 305, "map_202_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_202_grey = this.add.image(480, 305, "map_202_grey").setOrigin(0).setScale(2).setInteractive();
        //this.map_202_color = this.add.image(480, 305, "map_202_color").setOrigin(0).setScale(2).setInteractive().setVisible(false);

        this.map_202_grey.on('pointerdown', () => {

            this.selectIcon("Let’s Get Out of Here | Silent Barn ", 4, false, this.map_202_glow);

        })

        //---building 201  (level 1)
        this.map_201_glow = this.add.image(430, 170, "map_201_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        //this.map_201_grey = this.add.image(430, 170, "map_201_grey").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_201_color = this.add.image(430, 170, "map_201_color").setOrigin(0).setScale(2).setInteractive();


        this.map_201_color.on('pointerdown', () => {

            if (this.selectedLevel === 1)
                this.scene.start("menu");
            else
                this.selectIcon("Gutted | Shea Stadium ", 1, true, this.map_201_glow);
        })


        //---bridge (Lvl 5)
        this.map_bridge_glow = this.add.image(540, 90, "map_bridge_glow").setOrigin(0).setScale(2).setInteractive().setVisible(false);
        this.map_bridge_color = this.add.image(540, 90, "map_bridge_color").setOrigin(0).setScale(2).setInteractive();
        //this.map_bridge_color = this.add.image(540, 90, "map_bridge_grey").setOrigin(0).setScale(2).setInteractive().setVisible(false);

        this.map_bridge_color.on('pointerdown', () => {

            this.selectIcon("Idle | Old Kosciuszko Bridge ",5,false , this.map_bridge_glow);
        })




        this.trees = this.add.image(0, 0, "map_trees").setOrigin(0).setScale(2);


        this.banner = this.add.rectangle(444, 480, 888, 100).setFillStyle(0x000000).setInteractive();
        this.banner.on('pointerdown', () => {
            if (this.selectedLevel === 1) {
                this.scene.start("menu");
            }

        })


        map_logo = this.add.image(20, 450, "map_logo").setOrigin(0).setScale(0.8);

        
        //---------------Share button
        this.share = this.add.image(40, 40, "shareIcon").setScale(0.09).setInteractive().setAlpha(0.6);
        this.share.on('pointerover', () => {
            this.share.setScale(0.1);
        });
        this.share.on('pointerout', () => {
            this.share.setScale(0.09);
        });
        this.share.on('pointerdown', () => {

            if (!this.facebook.visible) { // show the icons
                this.facebook.visible = true;
                this.facebook.tweenIn.play();
                this.twitter.visible = true;
                this.twitter.tweenIn.play();
                this.copyURL.visible = true;
                this.copyURL.tweenIn.play();
            } else { //hide the icons
                this.time.delayedCall(200, () => {
                    this.facebook.visible = false;
                    this.twitter.visible = false;
                    this.copyURL.visible = false;
                });
                this.facebook.tweenOut.play();
                this.twitter.tweenOut.play();
                this.copyURL.tweenOut.play();

            }
        });


        //---------------Facebook
        this.facebook = this.add.image(40, 100, "facebook").setScale(0.4).setVisible(false);
        this.facebook.setInteractive();
        this.facebook.on('pointerdown', () => {
            shareFacebook();

        });

        this.facebook.on('pointerover', () => {
            this.facebook.setScale(0.5);
        });
        this.facebook.on('pointerout', () => {
            this.facebook.setScale(0.4);
        });

        this.facebook.tweenIn = this.tweens.add({
            targets: this.facebook,
            y: {
                from: 40,
                to: 100
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        });

        this.facebook.tweenOut = this.tweens.add({
            targets: this.facebook,
            y: {
                from: 100,
                to: 40
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        });

        //----------------Twitter
        this.twitter = this.add.image(40, 160, "twitter").setScale(0.4).setVisible(false);
        this.twitter.setInteractive();
        this.twitter.on('pointerdown', () => {
            shareTwitter("Explore%20closed%20Brooklyn%20Venues%20in%20%23Bluepoint.%20");
        });

        this.twitter.on('pointerover', () => {
            this.twitter.setScale(0.5);
        });
        this.twitter.on('pointerout', () => {
            this.twitter.setScale(0.4);
        });

        this.twitter.tweenIn = this.tweens.add({
            targets: this.twitter,
            y: {
                from: 40,
                to: 150
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        });


        this.twitter.tweenOut = this.tweens.add({
            targets: this.twitter,
            y: {
                from: 150,
                to: 40
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        });

        //----------------Copy to clipboard
        this.copyURL = this.add.image(40, 210, "copyIcon").setScale(1).setVisible(false);
        this.copyURL.setInteractive();
        this.copyURL.on('pointerdown', () => {
            copyStringToClipboard();
        });

        this.copyURL.on('pointerover', () => {
            this.copyURL.setScale(1.2);
        });
        this.copyURL.on('pointerout', () => {
            this.copyURL.setScale(1);
        });

        this.copyURL.tweenIn = this.tweens.add({
            targets: this.copyURL,
            y: {
                from: 40,
                to: 210
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        });
        this.copyURL.tweenOut = this.tweens.add({
            targets: this.copyURL,
            y: {
                from: 150,
                to: 40
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        });








    },

    update: function () {},


    selectIcon: function (textLevel, levelNumber, available, glow) {
        if (this.selectedGlow !== null) this.selectedGlow.setVisible(false);
        this.levelTitle.y = 465;
        this.selectedGlow = glow;
        this.selectedGlow.setVisible(true);

        this.levelNumber.text = "Lvl " + levelNumber + " ";
        this.levelTitle.text = textLevel;
        this.levelSubtitle.text = available ? "Tap or click to start " : "Comming Soon ";

        this.levelNumber.setVisible(true);
        this.levelTitle.setVisible(true);
        this.levelSubtitle.setVisible(true);
        this.separator.setVisible(true);

        this.selectedLevel = levelNumber;


    }

})