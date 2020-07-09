var hud_2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function hud_2() {
            Phaser.Scene.call(this, {
                key: 'hud_2',
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
        }



        this.dialogueWindow = this.add.image(400, 100, "messageBoard").setScale(3.5, 1.7);


        this.textTitle = this.add.text(400, 40, 'Guy Blue', {
            fontFamily: 'ZCOOL QingKe HuangYou'
        }).setFontSize(35).setOrigin(0.5, 0.5);



        this.textInstruction = this.add.text(480, 160, "Press space bar or interact to continue", {
            fontFamily: 'ZCOOL QingKe HuangYou'
        }).setFontSize(20).setOrigin(0.5, 0.5);

        this.buttonInteract = this.add.image(720, 420, "interactButton").setOrigin(0.5).setScale(1).setInteractive();

        this.buttonInteractText = this.add.text(this.buttonInteract.x, this.buttonInteract.y, "talk to", {
            fontFamily: 'ZCOOL QingKe HuangYou'
        }).setFontSize(20).setOrigin(0.5, 0.5);


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


        createSocialMediaMenu(this);



        // restart the game 
        this.restartRect = this.add.rectangle(750, 140, 250, 40).setFillStyle(0x4063FF, 0.6).setInteractive().setVisible(false);
        this.restartText = this.add.text(750, 140, "Restart ", {
            fontFamily: 'euroStyle',
            fontSize: 30
        }).setOrigin(0.5, 0.5).setVisible(false);

        this.restartRect.on('pointerover', () => {
            this.restartRect.setFillStyle(0x4063FF, 1);
        });
        this.restartRect.on('pointerout', () => {
            this.restartRect.setFillStyle(0x4063FF, 0.6);
        });

        this.restartRect.on('pointerdown', () => {
            this.game.sound.stopAll();
            this.scene.stop("level_1");
            resetGame();
            this.scene.start("level_1", {})
        });

        this.restartRect.tweenIn = this.tweens.add({
            targets: this.restartRect,
            y: {
                from: 40,
                to: 140
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        }).stop();

        this.restartRect.tweenOut = this.tweens.add({
            targets: this.restartRect,
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
            this.scene.stop("level_1");
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

        // go to Loser board 
        this.loserBoardRect = this.add.rectangle(750, 260, 250, 40).setFillStyle(0x4063FF, 0.6).setInteractive().setVisible(false);
        this.loserBoardtext = this.add.text(750, 260, "Loser Board ", {
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
            this.scene.stop("level_1");
            resetGame();
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
                to: 260
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        }).stop();

        this.loserBoardRect.tweenOut = this.tweens.add({
            targets: this.loserBoardRect,
            y: {
                from: 260,
                to: 40
            },
            duration: 200,
            ease: 'Linear',
            loop: 0,
        }).stop();

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
                this.restartRect.visible = true;
                this.restartRect.tweenIn.play();
                this.time.delayedCall(200, () => {
                    this.loserBoardtext.setVisible(true);
                    this.returnText.setVisible(true);
                    this.restartText.setVisible(true);
                });

            } else { //hide the icons
                this.loserBoardtext.setVisible(false);
                this.returnText.setVisible(false);
                this.restartText.setVisible(false);
                this.time.delayedCall(200, () => {
                    this.loserBoardRect.visible = false;
                    this.returnRect.visible = false;
                    this.restartRect.visible = false;

                });
                this.loserBoardRect.tweenOut.play();
                this.returnRect.tweenOut.play();
                this.restartRect.tweenOut.play();
            }
        })



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
            this.buttonInteractText.setFontSize(30).setOrigin(0.5).setPosition(this.buttonInteract.x, this.buttonInteract.y);


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


        this.beerPoints = [
            [59, 145, "Careful, these cans are rusty."],
            [50, 190, "This one is full...of dust."],
            [159, 173, "Gross, nothing but dead bugs."],
            [260, 189, "Bupkis."],
            [370, 178, "Both empty."],
            [320, 100, "Not a drop in any of these."],
            [292, 130, "Whatever that is, it’s not beer."],
            [259, 96, "Bingo! Wait, nope, just dust."],
            [208, 105, "Nope, nothing in these."],
            [171, 96, "Crap, more empties."]
        ]

        // this.beerPoints.forEach(element => {     //uncomment to show circles over the bottles
        //     this.add.circle(element[0]*2,element[1]*2,20,0xff0000);
        // });


        // ------------------------- Time events
        this.timedEvent = this.time.delayedCall(50 + initialTime, () => {
            this.showDialogue("Oh wow, this place has seen better days. Jeez look at all this dust.");
            this.textInstruction.visible = false;

        });

        this.timedEvent = this.time.delayedCall(4000 + initialTime, () => {
            this.showDialogue("Let’s see if there’s beer left in any of these cans.");
            this.textInstruction.visible = false;

        });



    },

    update: function (t, delta) {

        this.playTime += delta;

        let nearest = this.minDistance();
        if (nearest[0] < radiusInteraction) {
            this.buttonInteract.visible = true;
            this.buttonInteractText.visible = true;

            this.buttonInteractText.text = "check bottle";

        } else {

            this.buttonInteract.visible = false;
            this.buttonInteractText.visible = false;
        }


        if (this.joyStick != null) this.dumpJoyStickState();

    },

    dumpJoyStickState: function () {
        if (!controls.joystickLocked)
            player.moveJoystic(this.joyStick.forceX, this.joyStick.forceY)
    },

    hideDialogue() { // hide the current dialogue or goes to the next one in a sequential dialog


        this.showingDialogue = false;
        this.textTitle.visible = false;
        this.textDialogue.visible = false;
        this.textInstruction.visible = false;
        this.dialogueWindow.visible = false;
        controls.joystickLocked = false;


    },

    minDistance() { // compute the min distance between the player and the NPCS from the npc array
        return this.beerPoints.reduce((acc, val) => {
            if (distance(player.avatar.x, player.avatar.y, val[0], val[1]) < acc[0]) {
                acc[0] = distance(player.avatar.x, player.avatar.y, val[0], val[1]);
                acc[1] = val[2];
            }
            return acc;
        }, [999])
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


    interact() { //when button is pressed for interact, show the dialog

        let nearest = this.minDistance();
        console.log(nearest);

        this.beerPoints.forEach(val => {
            console.log(distance(player.avatar.x, player.avatar.y, val[0], val[1]))
        });


        if (nearest[0] < radiusInteraction) {
            this.showDialogue();
            this.typingEffect(nearest[1]);
        }

    }

})