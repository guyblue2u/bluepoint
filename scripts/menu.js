let testVariable;


var menu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function menu() {

        Phaser.Scene.call(this, {
            key: 'menu',
            active: false
        });
    },

    preload: function () {},

    create: function () {

        this.cameras.main.setBackgroundColor('#FFFFFF')


        this.guttedText = this.add.image(0, 0, "guttedText").setOrigin(0, 0).setVisible(false).setAlpha(0);
        this.logo = this.add.image(0, 130, "bluepointLogo").setOrigin(0, 0).setVisible(false).setAlpha(0);
        this.level1Text = this.add.image(0, 0, "lvl1Text").setOrigin(0, 0).setVisible(false).setAlpha(0);

        this.flashingText = this.add.text(444, 450, 'TAP OR SPACE TO START ', {
            fontFamily: 'euroStyle',
            color: '#4063FF',
            fontSize: 30,
        }).setOrigin(0.5, 0.5).setVisible(false);

        this.flashingText.setInteractive();

        this.tweens.add({
            targets: this.flashingText,
            alpha: 0,
            duration: 1000,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true,
        });

        this.add.text(444, 500, '© 2020 GUY BLUE', {
            fontFamily: 'euroStyle',
            color: '#787878',
            fontSize: 25,
        }).setOrigin(0.5, 0.5);



        //-------------hamburger icon
        this.hamburguer = this.add.image(820, 50, "hambugerIcon").setScale(0.5).setInteractive();

        this.hamburguer.on('pointerover', () => {
            this.hamburguer.setScale(0.6);
        });
        this.hamburguer.on('pointerout', () => {
            this.hamburguer.setScale(0.5);
        });

        this.hamburguer.on('pointerdown', () => {
            if (!this.loserBoardRect.visible) { // show the icons
                this.loserBoardRect.visible = true;
                this.loserBoardRect.tweenIn.play();
                this.MapRect.visible = true;
                this.MapRect.tweenIn.play();
                this.time.delayedCall(200, () => {
                    this.loserBoardtext.setVisible(true);
                    this.Maptext.setVisible(true);

                });

            } else { //hide the icons
                this.loserBoardtext.setVisible(false);
                this.Maptext.setVisible(false);
                this.time.delayedCall(200, () => {
                    this.loserBoardRect.visible = false;
                    this.MapRect.visible = false;

                });
                this.loserBoardRect.tweenOut.play();
                this.MapRect.tweenOut.play();

            }
        })


        // link to loserboard
        this.loserBoardRect = this.add.rectangle(750, 140, 200, 30).setFillStyle(0x4063FF, 0.6).setInteractive().setVisible(false);
        this.loserBoardtext = this.add.text(750, 140, "Loser Board", {
            fontFamily: 'euroStyle',
            fontSize: 20
        }).setOrigin(0.5, 0.5).setVisible(false);

        this.loserBoardRect.on('pointerover', () => {
            this.loserBoardRect.setFillStyle(0x4063FF, 1);
        });
        this.loserBoardRect.on('pointerout', () => {
            this.loserBoardRect.setFillStyle(0x4063FF, 0.6);
        });

        this.loserBoardRect.on('pointerdown', () => {
            this.scene.start("loserBoard", {
                type: 3,
                name: null,
                score: 0
            })
        });

        this.loserBoardRect.tweenIn = this.tweens.add({
            targets: this.loserBoardRect,
            y: {
                from: 40,
                to: 140
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        }).stop();

        this.loserBoardRect.tweenOut = this.tweens.add({
            targets: this.loserBoardRect,
            y: {
                from: 140,
                to: 40
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        }).stop();



        // ----------link to Map
        this.MapRect = this.add.rectangle(750, 200, 200, 30).setFillStyle(0x4063FF, 0.6).setInteractive().setVisible(false);
        this.Maptext = this.add.text(750, 200, "Map", {
            fontFamily: 'euroStyle',
            fontSize: 20
        }).setOrigin(0.5, 0.5).setVisible(false);

        this.MapRect.on('pointerover', () => {
            this.MapRect.setFillStyle(0x4063FF, 1);
        });
        this.MapRect.on('pointerout', () => {
            this.MapRect.setFillStyle(0x4063FF, 0.6);
        });

        this.MapRect.tweenIn = this.tweens.add({
            targets: this.MapRect,
            y: {
                from: 40,
                to: 200
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        }).stop();

        this.MapRect.tweenOut = this.tweens.add({
            targets: this.MapRect,
            y: {
                from: 200,
                to: 40
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        }).stop();


        //---------------Share button
        this.share = this.add.image(40, 40, "shareIcon").setScale(0.09).setInteractive();
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
            shareTwitter(this.score);
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



        this.input.keyboard.on('keydown_SPACE', (event) => {
            if (!this.rectangleDialog.visible)
                if (this.flashingText.visible) this.startMessage();
                else
                    this.typingEffect();
        });




        this.flashingText.on('pointerdown', () => {
            if (!this.rectangleDialog.visible)
                this.startMessage();
            else
                this.typingEffect();
        });

        // -------------------------------- T I M E D       E V E N T S

        this.cameras.main.fadeIn(500);



        this.time.delayedCall(1000, () => { //     At 0:01
            this.logo.visible = true;
            this.tweens.add({
                targets: this.logo,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 2000,
                ease: 'Linear',
                loop: 0,
                yoyo: false
            });
        });


        this.time.delayedCall(3000, () => { //     At 0:03
            this.level1Text.visible = true;
            this.guttedText.visible = true;
            this.tweens.add({
                targets: [this.level1Text, this.guttedText],
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 2000,
                ease: 'Linear',
                loop: 0,
                yoyo: false
            });
        });


        this.time.delayedCall(5000, () => { //     At 0:05
            this.flashingText.visible = true;
        });



        // ---------------------------------  D I A L O G

        this.startMessage = () => {
            this.logo.visible = false;
            this.guttedText.visible = false;
            this.level1Text.visible = false;
            this.flashingText.visible = false;
            this.rectangleDialog.visible = true;
            this.textDialog.visible = true;
            this.textDialogInstructions.visible = true;
            this.typingEffect();
        }


        this.currentMessageIndex = -1;
        this.dialogMessages = ['Welcome to Bluepoint,',
            'A virtual world where the past can be preserved and explored.',
            'Come with me and rediscover the past, intact and at your fingertips.',
            'Running program brkln2013.exe.',
            'Upload sequence initiated. See you there.'
        ]



        graphics = this.add.graphics();
        graphics.fillStyle(0x4063FF, 0.6);
        this.rectangleDialog = graphics.fillRoundedRect(100, 300, 700, 150, {
            tl: 10,
            tr: 10,
            bl: 10,
            br: 10
        }).setVisible(false).setInteractive();

        this.rectangleDialog = this.add.rectangle(400,375, 700, 150).setVisible(false).setInteractive().setFillStyle(0x4063FF, 0.6);



        this.rectangleDialog.on('pointerdown', () => {
            this.typingEffect();
        })


        this.textDialog = this.add.text(120, 340, this.dialogMessages[this.currentMessageIndex], {
            fontFamily: 'euroStyle',
            wordWrap: {
                width: 600,
                useAdvancedWrap: true
            },
        }).setFontSize(25).setVisible(false);


        this.textDialogInstructions = this.add.text(300, 420, 'Tap or press space to continue', {
            fontFamily: 'euroStyle'
        }).setFontSize(15).setVisible(false);



        this.typingEffect = () => {
            this.currentMessageIndex++;

            if (this.currentMessageIndex > 4) {
                this.scene.start("mainScene");
                return;
            }

            let i = 0;
            this.textDialog.text = "";
            if (this.eventTyping !== undefined) this.eventTyping.remove(false); //stop all the typing events, if exist
            this.eventTyping = this.time.addEvent({ // create the event that makes the typing effect
                delay: 50,
                callback: (text) => {
                    this.textDialog.text += this.dialogMessages[this.currentMessageIndex][i]
                    i++
                },
                args: [],
                repeat: this.dialogMessages[this.currentMessageIndex].length - 1
            });

        }

    },







    update: function () {}
})