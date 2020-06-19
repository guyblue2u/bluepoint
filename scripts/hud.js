let mobileAndTabletCheck = function () {
    let check = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

let test_function;

var hud = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function hud() {
            Phaser.Scene.call(this, {
                key: 'hud',
                active: false
            });
        },

    preload: function () {
        //------------------------------- Joystick

        if (mobileAndTabletCheck()) {
            var url;
            url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
            this.load.plugin('rexvirtualjoystickplugin', url, true);
        }
    },

    create: function () {





        this.playTime = 0;
        this.score = 0;
        this.textToShow = "";
        this.sequentialText = false;
        this.nextText = '';
        this.eventTyping = undefined;
        this.messageToShow = "";


        this.textDialogue = this.add.text(190, 70, "", { //text showing the message of the NPC or Guy Blue
            fontFamily: 'ZCOOL QingKe HuangYou',
            wordWrap: {
                width: 430,
                useAdvancedWrap: true
            },
            align: 'left'
        }).setFontSize(25).setDepth(2);



        //------------------ Final text
        graphics = this.add.graphics();
        graphics.fillStyle(0x1f317d, 0.6);
        this.rectangleDialog = graphics.fillRect(200, 400, 500, 110).setVisible(false);

        this.buttonSubmitRect = this.add.rectangle(340, 485, 200, 30).setVisible(false).setFillStyle(0x1f317d, 0.6).setStrokeStyle(1, 0x616161, 1.0).setInteractive();
        this.buttonSkipRect = this.add.rectangle(560, 485, 200, 30).setVisible(false).setFillStyle(0x1f317d, 0.6).setStrokeStyle(1, 0x616161, 1.0).setInteractive();
        //------------------form
        this.form = this.add.dom(450, 430).createFromCache('form').setVisible(false);
        graphics.fillStyle(0x334fcb, 0.9);

        this.buttonSubmit = this.add.text(this.buttonSubmitRect.x, this.buttonSubmitRect.y, "Submit", {
            fontFamily: 'euroStyle',
            fontSize: 25
        }).setVisible(false).setOrigin(0.5).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        this.buttonSkip = this.add.text(this.buttonSkipRect.x, this.buttonSkipRect.y, "Skip", {
            fontFamily: 'euroStyle',
            fontSize: 25
        }).setVisible(false).setOrigin(0.5).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        //--------------Hover effect for the buttons
        this.buttonSubmitRect.on('pointerover', () => {
            this.buttonSubmitRect.setFillStyle(0x334fcb);
        });
        this.buttonSubmitRect.on('pointerout', () => {
            this.buttonSubmitRect.setFillStyle(0x1f317d);
        });


        this.buttonSkipRect.on('pointerover', () => {
            this.buttonSkipRect.setFillStyle(0x334fcb);
        });
        this.buttonSkipRect.on('pointerout', () => {
            this.buttonSkipRect.setFillStyle(0x1f317d);
        });


        this.validationForm = this.add.text(430, 510, '', {
            fontFamily: 'euroStyle',
            fontSize: 15,
            color: '#f20a0a'
        }).setOrigin(0.5, 0.5)


        this.buttonSubmitRect.on('pointerdown', () => {

            // validate email and name:
            if (this.form.getChildByID('formName').value.length < 2) {
                this.validationForm.text = "enter a valid name"
                return;
            }
            if (!ValidateEmail(this.form.getChildByID('formEmail').value)) {
                this.validationForm.text = "enter a valid email"
                return;
            }

            this.validationForm.text = ""
            player.avatar.setVisible(false);
            var inputName = this.form.getChildByID('formName').value;
            var inputEmail = this.form.getChildByID('formEmail').value;

            this.form.visible = false;
            this.rectangleDialog.visible = false;

            this.buttonSkip.visible = false;
            this.buttonSkipRect.visible = false;
            this.buttonSubmit.visible = false;
            this.buttonSubmitRect.visible = false;

            testDB(inputName, this.score, inputEmail)
            this.scene.launch("loserBoard", {
                type: 1,
                score: this.score,
                name: inputName
            })
        })

        this.buttonSkipRect.on('pointerdown', () => {

            player.avatar.setVisible(false);
            this.form.visible = false;
            this.rectangleDialog.visible = false;

            this.buttonSkip.visible = false;
            this.buttonSkipRect.visible = false;
            this.buttonSubmit.visible = false;
            this.buttonSubmitRect.visible = false;

            this.scene.launch("loserBoard", {
                type: 2,
                score: this.score,
                name: undefined
            })
        })



        this.finalTypingMessage = (text) => {
            let i = 0;
            this.textToShow = "";
            this.eventTyping = this.time.addEvent({ // create the event that makes the typing effect
                delay: 50,
                callback: (text) => {
                    this.textToShow += text[i]
                    i++
                },
                args: [text],
                repeat: text.length - 1
            });

            this.eventCloseDialog = this.time.addEvent({ // create the event that closes the dialog box after 2 seconds of finished
                delay: text.length * 50 + 2000,
                callback: () => {
                    this.hideDialogue();
                },
                args: [text]
            });
        }


        this.typingEffect = (text) => {

                this.messageToShow = text;
                let i = 0;
                this.textToShow = "";
                this.textDialogue.text = this.textToShow;
                if (this.eventTyping !== undefined) this.eventTyping.remove(false); //stop all the typing events, if exist
                this.eventTyping = this.time.addEvent({ // create the event that makes the typing effect
                    delay: 50,
                    callback: (text) => {
                        this.textToShow += text[i]
                        this.textDialogue.text = this.textToShow;
                        i++
                    },
                    args: [text],
                    repeat: text.length - 1
                });

                if (this.eventCloseDialog !== undefined) this.eventCloseDialog.remove(false); //stop all the timer events, if exist
                this.eventCloseDialog = this.time.addEvent({ // create the event that closes the dialog box after 2 seconds of finished
                    delay: text.length * 50 + 2000,
                    callback: () => {
                        this.hideDialogue();
                    },
                    args: [text]
                });
            },



            this.dialogueWindow = this.add.image(400, 100, "messageBoard");
        this.dialogueWindow.scaleX = 3.5;
        this.dialogueWindow.scaleY = 1.7;

        this.textTitle = this.add.text(400, 40, 'Hello World', {
            fontFamily: 'ZCOOL QingKe HuangYou'
        }).setFontSize(35);
        this.textTitle.setOrigin(0.5, 0.5);


        this.textInstruction = this.add.text(480, 160, "Press space bar or interact to continue", {
            fontFamily: 'ZCOOL QingKe HuangYou'
        }).setFontSize(20);
        this.textInstruction.setOrigin(0.5, 0.5);

        this.buttonInteract = this.add.image(880, 470, "interactButton");
        this.buttonInteract.setOrigin(1, 1);
        this.buttonInteract.scaleX = 1;
        this.buttonInteract.scaleY = 1;

        this.buttonInteract.setInteractive();

        this.buttonStartText = this.add.text(790, 450, "talk to", {
            fontFamily: 'ZCOOL QingKe HuangYou'
        }).setFontSize(20);
        this.buttonStartText.setOrigin(0.5, 0.5);

        this.showingDialogue = false;
        this.textTitle.visible = false;
        this.textDialogue.visible = false;
        this.textInstruction.visible = false;
        this.dialogueWindow.visible = false;

        // GeneralInstructions
        this.instructionText = this.add.text(300, 450, "WASD or arrows to move \n Spacebar or Enter to interact", {
            fontFamily: 'ZCOOL QingKe HuangYou',
            fontSize: 30,
            align: 'center'
        });

        this.instructionText.visible = false;

        this.flashingTextTween = this.tweens.add({
            targets: this.instructionText,
            alpha: {
                from: 0,
                to: 1
            },
            duration: 500,
            ease: 'Sine.easeInOut',
            loop: -1,
        }).stop();


        //----------------------------------------S O C I A L     M E D I A
        //---------------Share button
        this.share = this.add.image(40, 40, "shareIcon").setScale(0.09);
        this.share.setInteractive();
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
        this.facebook.on('pointerup', () => {
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
        this.twitter.on('pointerup', () => {
            shareTwitter(`I%20woke%20up%20${this.score}%20people%20at%20Shea%20Stadium%20in%20%23Bluepoint-&url=`);
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
                from: 210,
                to: 40
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        });

        //-------------hamburger icon
        this.hamburguer = this.add.image(830, 40, "hambugerIcon").setScale(0.4).setInteractive();

        this.hamburguer.on('pointerover', () => {
            this.hamburguer.setScale(0.45);
        });
        this.hamburguer.on('pointerout', () => {
            this.hamburguer.setScale(0.4);
        });

        this.hamburguer.on('pointerdown', () => {
            if (!this.loserBoardRect.visible) { // show the icons
                this.loserBoardRect.visible = true;
                this.loserBoardRect.tweenIn.play();
                this.returnRect.visible = true;
                this.returnRect.tweenIn.play();
                this.time.delayedCall(200, () => {
                    this.loserBoardtext.setVisible(true);
                    this.returnText.setVisible(true);

                });

            } else { //hide the icons
                this.loserBoardtext.setVisible(false);
                this.returnText.setVisible(false);
                this.time.delayedCall(200, () => {
                    this.loserBoardRect.visible = false;
                    this.returnRect.visible = false;

                });
                this.loserBoardRect.tweenOut.play();
                this.returnRect.tweenOut.play();

            }
        })


        // restart the game 
        this.loserBoardRect = this.add.rectangle(750, 140, 250, 40).setFillStyle(0x4063FF, 0.6).setInteractive().setVisible(false);
        this.loserBoardtext = this.add.text(750, 140, "Restart ", {
            fontFamily: 'euroStyle',
            fontSize: 30
        }).setOrigin(0.5, 0.5).setVisible(false);

        this.loserBoardRect.on('pointerover', () => {
            this.loserBoardRect.setFillStyle(0x4063FF, 1);
        });
        this.loserBoardRect.on('pointerout', () => {
            this.loserBoardRect.setFillStyle(0x4063FF, 0.6);
        });

        this.loserBoardRect.on('pointerdown', () => {
            this.game.sound.stopAll();
            this.scene.stop("mainScene");
            resetGame();
            this.scene.start("mainScene", {})
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



        // ---------- return tu menu
        this.returnRect = this.add.rectangle(750, 200, 250, 40).setFillStyle(0x4063FF, 0.6).setInteractive().setVisible(false);
        this.returnText = this.add.text(750, 200, "Menu", {
            fontFamily: 'euroStyle',
            fontSize: 30
        }).setOrigin(0.5, 0.5).setVisible(false);

        this.returnRect.on('pointerover', () => {
            this.returnRect.setFillStyle(0x4063FF, 1);
        });
        this.returnRect.on('pointerout', () => {
            this.returnRect.setFillStyle(0x4063FF, 0.6);
        });
        this.returnRect.on('pointerdown', () => {

            this.game.sound.stopAll();
            this.scene.stop("mainScene");
            this.scene.start("map");
        });

        this.returnRect.tweenIn = this.tweens.add({
            targets: this.returnRect,
            y: {
                from: 40,
                to: 200
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        }).stop();

        this.returnRect.tweenOut = this.tweens.add({
            targets: this.returnRect,
            y: {
                from: 200,
                to: 40
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        }).stop();



        // ----------------- Score

        this.scoreText = this.add.text(750, 55, this.score, {
            fontFamily: 'ZCOOL QingKe HuangYou'
        }).setFontSize(30).setShadow(3, 3, 'rgba(0,0,0,0.5)', 4);
        this.scoreText.visible = false;
        this.iconZZZ = this.add.image(720, 80, "ZZZIcon", [1]);
        this.iconZZZ.visible = false;
        this.scoreTitleText = this.add.text(700, 10, "SCORE", {
            fontFamily: 'ZCOOL QingKe HuangYou'
        }).setFontSize(35).setShadow(3, 3, 'rgba(0,0,0,0.5)', 4);
        this.scoreTitleText.visible = false;
        this.iconZZZ.scaleX = 3;
        this.iconZZZ.scaleY = 3;


        this.input.keyboard.on('keydown_ENTER', (event) => {
            if (!this.showingDialogue) this.interact();
            else if (!controls.buttonsLocked) {
                if (this.textDialogue.text !== this.messageToShow) {
                    this.textDialogue.text = this.messageToShow;
                    if (this.eventTyping !== undefined) this.eventTyping.remove(false);
                } else this.hideDialogue();
            }
        });

        this.input.keyboard.on('keydown_SPACE', (event) => {
            if (!this.showingDialogue) this.interact();
            else if (!controls.buttonsLocked) {
                if (this.textDialogue.text !== this.messageToShow) {
                    this.textDialogue.text = this.messageToShow;
                    if (this.eventTyping !== undefined) this.eventTyping.remove(false);
                } else this.hideDialogue();
            }
        });


        this.buttonInteract.on('pointerdown', () => {
            if (!this.showingDialogue) this.interact();
            else if (!controls.buttonsLocked) {
                if (this.textDialogue.text !== this.messageToShow) {
                    this.textDialogue.text = this.messageToShow;
                    if (this.eventTyping !== undefined) this.eventTyping.remove(false);
                } else this.hideDialogue();
            }
        });


        if (mobileAndTabletCheck()) { //--------------------MOBILE
            // ------------------------- Joystick
            this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
                x: 100,
                y: 400,
                radius: 80,
                base: this.add.circle(0, 0, 80, 0xCF000000).setAlpha(0.5),
                thumb: this.add.circle(0, 0, 40, 0xcccccc),
            });

            this.buttonInteract.scaleX = 1.5;
            this.buttonInteract.scaleY = 1.5;
            this.buttonStartText.setFontSize(30);
            this.buttonStartText.x = 750;
            this.buttonStartText.y = 440;

            this.instructionText.text = "use the virtual joystick to move \n Press the button to interact"
            this.textInstruction.text = "Press interact to continue"
        } else { //-------------------DESKTOP
            this.buttonInteract.on('pointerover', () => {
                this.buttonInteract.setScale(1, 1.1);
            });
            this.buttonInteract.on('pointerout', () => {
                this.buttonInteract.setScale(1, 1);
            });
        }



        // ------------------------- Time events
        this.timedEvent = this.time.delayedCall(50 + initialTime, () => {
            this.showDialogue("This is one of my favorite spots, Shea Stadium.");
            this.textInstruction.visible = false;

        });
        this.timedEvent = this.time.delayedCall(3000 + initialTime, () => {
            this.showDialogue("I wonder what’s happening tonight, let’s ask around.");
            this.textInstruction.visible = false;



        });

        this.timedEvent = this.time.delayedCall(6000 + initialTime, () => {
            this.instructionText.visible = true;
            controls.joystickLocked = false;
            controls.buttonsLocked = false;
        })


        this.timedEvent = this.time.delayedCall(15000 + initialTime, () => {
            this.instructionText.visible = false;
        })

        this.timedEvent = this.time.delayedCall(68000 + initialTime, () => {

            if (this.showingDialogue) this.endAllDialogs();
            sleepEveryone();
            //console.log("people sleeping in: " + music.seek);
            //doors now show the secondary message
            NPCS[16].message = 1;
            NPCS[17].message = 1;
            NPCS[18].message = 1;


        });

        this.timedEvent = this.time.delayedCall(70000 + initialTime, () => {
            controls.buttonsLocked = true;
            controls.joystickLocked = true;
            player.avatar.play("idleDown" + player.shirt);
            this.showDialogue("What the hell is happening? We have to wake these people up!");
            this.textInstruction.visible = false;
        });

        this.timedEvent = this.time.delayedCall(74000 + initialTime, () => {
            controls.buttonsLocked = false;
            controls.joystickLocked = false;
            this.showScore();
            this.instructionText.visible = true;
            this.flashingTextTween.play();
            this.instructionText.text = 'Interact with people to wake them up'
        })

        this.timedEvent = this.time.delayedCall(140000 + initialTime, () => {
            this.flashingTextTween.stop();
            this.instructionText.visible = false;

        })

        this.timedEvent = this.time.delayedCall(144000 + initialTime, () => {
            if (this.joyStick !== undefined) {
                this.joyStick.thumb.setVisible(false);
                this.joyStick.base.setVisible(false);
            }

        })

        this.timedEvent = this.time.delayedCall(170000 + initialTime, () => {

            player.direction = down;
            this.scoreText.visible = false;
            this.scoreTitleText.visible = false;
            this.iconZZZ.visible = false;

            this.rectangleDialog.visible = true;
            this.textDialogue.visible = true;
            this.textDialogue.y = 430;
            this.textDialogue.x = 240;
            this.textDialogue.setShadow(3, 3, 'rgba(0,0,0,0.9)', 4);
            this.typingEffect("Oh, you’re still here?  We should stick together.");
        })
        this.timedEvent = this.time.delayedCall(175000 + initialTime, () => {
            controls.joystickLocked = true;
            this.textDialogue.visible = false;
            this.form.visible = true;
            this.buttonSkipRect.visible = true;
            this.buttonSubmitRect.visible = true;
            this.buttonSubmit.visible = true;
            this.buttonSkip.visible = true;
            outroMusic.play();
            outroMusic.setLoop(true);
            this.tweens.add({
                targets: outroMusic,
                volume: {
                    from: 0,
                    to: 0.8
                },
                duration: 10000,
                ease: 'Sine.easeInOut',
                loop: 0,
            });
        })


        //when the game loses its focus it should stop the clock
        this.game.events.on('blur', () => {
            this.scene.pause();
            this.time.paused = true
        });
        this.game.events.on('focus', () => {
            this.time.paused = false
            this.scene.resume();
        });

        this.texto = this.add.text(10, 10, "");
        music.play();

        outroMusic = this.sound.add('outro', {
            delay: 0
        }).setVolume(0);

    },

    update: function (t, delta) {


        this.playTime += delta;

        let nearest = minDistance();
        if (nearest[0] < radiusInteraction && nearest[1].sleeping !== 2) {
            this.buttonInteract.visible = true;
            this.buttonStartText.visible = true;
            if (nearest[1].sleeping === 1) {
                if (nearest[1].name !== "Guy Blue") {
                    this.buttonStartText.text = "wake up " + nearest[1]["name"] + "!";
                }
            } else {
                if (nearest[1].name !== "Guy Blue") {
                    if (nearest[1].sequence !== undefined) this.buttonStartText.text = "talk to " + nearest[1].sequence.sequentialName;

                    else this.buttonStartText.text = "talk to " + nearest[1]["name"];
                } else {
                    this.buttonStartText.text = "Open door";
                }
            }
        } else {

            this.buttonInteract.visible = false;
            this.buttonStartText.visible = false;
        }

        NPCS.forEach((el, index, object) => {
            if (el.timeToDisappear < this.playTime + 5000 && el.sleeping && !el["tween"].isPlaying()) {
                el["tween"].play();
            }

            if (el.timeToDisappear < this.playTime && el.sleeping === 1) {
                el.visible = false;
                el.avatar.visible = false;
                el["zzz"].visible = false;
                el["tween"].stop();
                object.splice(index, 1);
            }

            if (el.timeToSleep < this.playTime && el.sleeping !== 1) {
                sleepNPC(el);
                el.timeToDisappear = getTimeToDisappear(this.playTime) + this.playTime;
            }
        })
        if (this.joyStick != null) this.dumpJoyStickState();

    },

    dumpJoyStickState: function () {
        if (!controls.joystickLocked)
            player.moveJoystic(this.joyStick.forceX, this.joyStick.forceY)
    },

    hideDialogue() { // hide the current dialogue or goes to the next one in a sequential dialog

        if (this.sequentialText) {
            //this.textDialogue.text=nextText.message;
            this.typingEffect(this.nextText.message);
            this.textTitle.text = this.nextText.title;
            this.sequentialText = false;
        } else {
            this.showingDialogue = false;
            this.textTitle.visible = false;
            this.textDialogue.visible = false;
            this.textInstruction.visible = false;
            this.dialogueWindow.visible = false;
            let NPCSpeaking = NPCS[this.NPCDIalogueIndex];
            if (NPCSpeaking !== undefined)
                if (NPCSpeaking.avatar.anims != undefined) NPCSpeaking.avatar.anims.play("idle" + NPCSpeaking.name);
            this.NPCDIalogueIndex = -1;
        }
        controls.joystickLocked = false;
    },

    endAllDialogs() { // hide any dialog when NPCS go to sleep
        this.sequentialText = false;
        this.showingDialogue = false;
        this.textTitle.visible = false;
        this.textDialogue.visible = false;
        this.textInstruction.visible = false;
        this.dialogueWindow.visible = false;
        let NPCSpeaking = NPCS[this.NPCDIalogueIndex];
        if (NPCSpeaking !== undefined)
            if (NPCSpeaking.avatar.anims != undefined) NPCSpeaking.avatar.anims.play("idle" + NPCSpeaking.name);
        this.NPCDIalogueIndex = -1;
    },

    showDialogue(message) { // shows the dialogue window with a specific message

        if (message != null) {
            this.typingEffect(message);
            this.textTitle.text = "Guy Blue"
        }
        this.showingDialogue = true;
        this.textTitle.visible = true;
        this.textDialogue.visible = true;
        this.textInstruction.visible = true;
        this.dialogueWindow.visible = true;
        player.returnToIdle();
        player.direction = null;
        player.moving = false;
        controls.joystickLocked = true;
    },

    showScore() {
        this.iconZZZ.visible = true;
        this.scoreText.visible = true;
        this.scoreTitleText.visible = true;
    },


    interact() {
        let nearest = minDistance();
        if (nearest[0] < radiusInteraction) {
            this.NPCDIalogueIndex = NPCS.indexOf(nearest[1]);
            if (nearest[1].sleeping === 0) { // the NPC is awake at the beggining
                this.showDialogue();
                if (nearest[1]["sequence"] === undefined) { // for non-sequential conversation
                    this.textTitle.text = nearest[1]["name"];
                    if (nearest[1].message === 0) {
                        if (nearest[1].name === "Alex") {
                            player.shirt = "Red";
                            player.avatar.play("idleUp" + player.shirt);
                        }
                        this.typingEffect(nearest[1]["message1"]);
                        //this.textDialogue.text=nearest[1]["message1"];
                        if (nearest[1].message2 !== null && nearest[1].name !== "Guy Blue") {
                            nearest[1].message = 1;
                        }
                    } else if (nearest[1].message === 1) {
                        this.typingEffect(nearest[1]["message2"]);
                        //this.textDialogue.text=nearest[1]["message2"];
                    }
                    NpcLookPlayer(nearest[1]);
                } else { //for sequential conversations

                    this.sequentialText = true;
                    this.textTitle.text = nearest[1]["sequence"]["name1"];
                    this.nextText = {
                        title: nearest[1]["sequence"]["name2"],
                        message: nearest[1]["sequence"]["msg2_1"]
                    }
                    if (nearest[1].sequence.message === 0) {

                        this.typingEffect(nearest[1]["sequence"]["msg1_1"]);
                        //this.textDialogue.text=nearest[1]["sequence"]["msg1_1"];
                        this.nextText = {
                            title: nearest[1]["sequence"]["name2"],
                            message: nearest[1]["sequence"]["msg2_1"]
                        };
                        if (nearest[1].sequence["msg1_2"] !== null) nearest[1].sequence.message = 1;
                    } else {
                        //this.textDialogue.text=nearest[1]["sequence"]["msg1_2"];
                        this.typingEffect(nearest[1]["sequence"]["msg1_2"]);
                        this.nextText = {
                            title: nearest[1]["sequence"]["name2"],
                            message: nearest[1]["sequence"]["msg2_2"]
                        }
                    }
                }
            } else if (nearest[1].sleeping === 1) { // the NPC is asleep, awake him/her!
                awakeNPC(nearest[1]);
                nearest[1].timeToSleep = this.playTime + getTimeToSleep(this.playTime);
                nearest[1].timeToDisappear = 999999;
                nearest[1].sleeping = 2;
                this.score++;
                this.scoreText.text = "x " + this.score;
                if (nearest[1]["tween"].isPlaying()) {
                    nearest[1]["tween"].stop();
                    nearest[1].avatar.alpha = 1;
                }
            }
        }
    }

})