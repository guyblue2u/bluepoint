//constants for the table


let testo;

var loserBoard = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function loserBoard() {

        Phaser.Scene.call(this, {
            key: 'loserBoard',
            active: false
        });
    },

    init: function (data) {
        this.sceneType = data.type; //type 1=> doesnt show submit, type 2=> show submit , type 3=> only shows table, without score
        this.score = data.score;
        this.name = data.name;
    },


    preload: function () {

    },


    create: function () {

        this.xt1 = 152;
        this.xt2 = 320;
        this.yt1 = 133;
        this.yt2 = 320;

        this.scrolling = false;

        this.input.on('pointerup', (pointer) => {

            if (this.scrolling) {
                this.scrolling = false;
            }
        });


        graphics = this.add.graphics();
        graphics.fillStyle(0x4063FF, 0.6);
        graphics.lineStyle(2, 0x616161f, 1.0);
        buttonGraphics = this.add.graphics();
        buttonGraphics.fillStyle(0x334fcb);

        //elements of the window
        this.rectangleDialog = graphics.fillRect(120, 50, 600, 450);
        graphics.strokeRect(120, 50, 600, 450);

        //headers
        this.add.rectangle(312, 120, 320, 25).setFillStyle(0x7187e9);

        this.add.text(this.xt1 + 5, this.yt1 - 25, 'Rank', {
            fontFamily: 'euroStyle',
            fontSize: 18
        }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        this.add.text(this.xt1 + 70, this.yt1 - 25, 'Name', {
            fontFamily: 'euroStyle',
            fontSize: 18
        }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        this.add.text(this.xt1 + 250, this.yt1 - 25, 'Score', {
            fontFamily: 'euroStyle',
            fontSize: 18
        }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);

        this.textTile = this.add.text(150, 60, "Loser Board ", {
            fontFamily: 'euroStyle',
            fontSize: 25

        }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);


        if (this.sceneType !== 3) { // if the scene is not type 3, show the score
            // score
            this.add.text(600, 105, "Your Score", {
                fontFamily: 'euroStyle',
                fontSize: 18
            }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setOrigin(0.5)

            this.scoretext = this.add.text(600, 145, this.score + " ", {
                fontFamily: 'euroStyle',
                fontSize: 40
            }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setOrigin(0.5)


            //show the buttons
            // share score
            this.buttonShare = this.add.rectangle(600, 200, 160, 40).setFillStyle(0x334fcb).setStrokeStyle(1, 0x616161, 1.0).setInteractive();
            this.add.text(this.buttonShare.x, this.buttonShare.y, "Share Score", {
                fontFamily: 'euroStyle',
                fontSize: 20
            }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setOrigin(0.5)

            this.buttonShare.on('pointerover', () => {
                this.buttonShare.setFillStyle(0x1f317d);
            });
            this.buttonShare.on('pointerout', () => {
                this.buttonShare.setFillStyle(0x334fcb);
            });


            //----------------------------------------S O C I A L     M E D I A
            this.containerSocialMedia = this.add.rectangle(780, 260, 80, 300).setFillStyle(0x334fcb, 0.8).setStrokeStyle(1, 0x616161, 1.0).setVisible(false).setDepth(-10);

            this.containerSocialMedia.tweenIn = this.tweens.add({
                targets: this.containerSocialMedia,
                scale: {
                    from: 0,
                    to: 1
                },
                duration: 400,
                ease: 'Linear',
                loop: 0,
            });

            this.containerSocialMedia.tweenOut = this.tweens.add({
                targets: this.containerSocialMedia,
                scale: {
                    from: 1,
                    to: 0
                },
                duration: 400,
                ease: 'Linear',
                loop: 0,
            });


            this.buttonShare.on('pointerdown', () => {
                if (!this.facebook.visible) { // show the icons
                    this.containerSocialMedia.setVisible(true);
                    this.containerSocialMedia.tweenIn.play()
                    this.time.delayedCall(400, () => {
                        this.facebook.visible = true;
                        this.twitter.visible = true;
                        this.copyURL.visible = true;
                    });
                } else { //hide the icons
                    this.facebook.visible = false;
                    this.twitter.visible = false;
                    this.copyURL.visible = false;
                    this.containerSocialMedia.tweenOut.play()
                    this.time.delayedCall(400, () => {
                        this.containerSocialMedia.setVisible(false);


                    });
                }
            })


            //---------------Facebook
            this.facebook = this.add.image(780, 150, "facebook").setScale(0.4).setVisible(false);
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


            //----------------Twitter
            this.twitter = this.add.image(780, 260, "twitter").setScale(0.4).setVisible(false);
            this.twitter.setInteractive();
            this.twitter.on('pointerdown', () => {
                if (this.sceneType !== 3) shareTwitter(`I%20woke%20up%20${this.score}%20people%20at%20Shea%20Stadium%20in%20%23Bluepoint-&url=`);
                else shareTwitter('Shea%20Stadium%20still%20exists%20in%20%23Bluepoint.');
            });

            this.twitter.on('pointerover', () => {
                this.twitter.setScale(0.5);
            });
            this.twitter.on('pointerout', () => {
                this.twitter.setScale(0.4);
            });


            //----------------Copy to clipboard
            this.copyURL = this.add.image(780, 360, "copyIcon").setScale(1).setVisible(false);
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



            // Restart the game
            this.buttonPlayAgain = this.add.rectangle(600, 250, 160, 40).setFillStyle(0x334fcb).setStrokeStyle(1, 0x616161, 1.0).setInteractive();
            this.add.text(this.buttonPlayAgain.x, this.buttonPlayAgain.y, "Play Again", {
                fontFamily: 'euroStyle',
                fontSize: 20
            }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setOrigin(0.5);

            this.buttonPlayAgain.on('pointerover', () => {
                this.buttonPlayAgain.setFillStyle(0x1f317d);
            });
            this.buttonPlayAgain.on('pointerout', () => {
                this.buttonPlayAgain.setFillStyle(0x334fcb);
            });
            this.buttonPlayAgain.on('pointerdown', () => {
                resetGame();
                this.scene.start("mainScene");
                if(outroMusic.isPlaying()) outroMusic.stop();
            })

            // Next Level
            this.buttonNextLevel = this.add.rectangle(600, 300, 160, 40).setFillStyle(0x334fcb).setStrokeStyle(1, 0x616161, 1.0).setInteractive();
            this.buttonNextLevelText = this.add.text(this.buttonNextLevel.x, this.buttonNextLevel.y, "Next Level ", {
                fontFamily: 'euroStyle',
                fontSize: 20,
            }).setOrigin(0.5, 0).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setOrigin(0.5);


            if (!mobileAndTabletCheck()) { // for desktop, let the hover effect
                this.buttonNextLevel.on('pointerover', () => {
                    this.buttonNextLevelText.text = "Coming 8/20 "
                    this.buttonNextLevel.setFillStyle(0xa9afc9);
                });
                this.buttonNextLevel.on('pointerout', () => {
                    this.buttonNextLevelText.text = "Next Level "
                    this.buttonNextLevel.setFillStyle(0x334fcb);
                });
            }
            this.buttonNextLevel.on('pointerdown', () => {
                if (mobileAndTabletCheck()) {
                    this.buttonNextLevelText.text = "Coming 8/20 "
                    this.buttonNextLevel.setFillStyle(0xa9afc9);
                }
                // go to the next level
            })

            // Menu
            this.buttonMenu = this.add.rectangle(600, 350, 160, 40).setFillStyle(0x334fcb).setStrokeStyle(1, 0x616161, 1.0).setInteractive();
            this.buttonMenuText = this.add.text(this.buttonMenu.x, this.buttonMenu.y, "Menu ", {
                fontFamily: 'euroStyle',
                fontSize: 20,
            }).setOrigin(0.5, 0).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setOrigin(0.5);
            this.buttonMenu.on('pointerover', () => {
                this.buttonMenu.setFillStyle(0x1f317d);
            });
            this.buttonMenu.on('pointerout', () => {
                this.buttonMenu.setFillStyle(0x334fcb);
            });
            this.buttonMenu.on('pointerdown', () => {
                if(outroMusic.isPlaying) outroMusic.stop();
                this.scene.stop("mainScene");
                this.scene.start("map");
            })


            if(this.sceneType===1){      // show the upper message
 
                this.add.text(444,30 , `${this.name} Woke Up ${this.score} People: Shea Stadium still closed. `, {
                    fontFamily: 'euroStyle',
                    fontSize: 20
                } ).setOrigin(0.5);
            }

        }

        if (this.sceneType === 2) { // show the submit form
            this.yt2 = 240;
            // submit form

            this.form = this.add.dom(430, 420).createFromCache('form');
            this.textInstructions = this.add.text(215, 385, "Post score to loser board:", {
                fontFamily: 'euroStyle',
                fontSize: 15
            }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);


            this.buttonSubmitRect = this.add.rectangle(430, 470, 200, 40).setFillStyle(0x334fcb).setStrokeStyle(1, 0x616161, 1.0).setInteractive();

            this.buttonSubmit = this.add.text(430, 470, "Submit ", {
                fontFamily: 'euroStyle',
                fontSize: 25
            }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setOrigin(0.5, 0.5);

            this.buttonSubmitRect.on('pointerover', () => {
                this.buttonSubmitRect.setFillStyle(0x1f317d);
            });
            this.buttonSubmitRect.on('pointerout', () => {
                this.buttonSubmitRect.setFillStyle(0x334fcb);
            });


            this.validationForm = this.add.text(430, 400, '', {
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
                this.yt2 = 300;
                this.separatorLine.geom.y2 = this.yt2;
                this.backgroundTable.commandBuffer[7] = this.yt2;
                this.buttonSubmit.visible = false;
                this.form.visible = false;
                this.buttonSubmitRect.visible = false;
                this.textInstructions.setVisible(false);

                var inputName = this.form.getChildByID('formName').value;
                var inputEmail = this.form.getChildByID('formEmail').value;
                if (inputName.length > 0 && inputEmail.length > 0) {
                    this.name = inputName;

                    testDB(inputName, this.score, inputEmail)
                    this.populateTable()

                    this.add.text(444,30 , `${this.name} Woke Up ${this.score} People: Shea Stadium still closed. `, {
                        fontFamily: 'euroStyle',
                        fontSize: 20
                    } ).setOrigin(0.5);

                }
            })
        }

        if (this.sceneType === 3) { // show the particles


            this.particlesAlpha = {};
            this.particlesAlpha.alpha = 0;
            this.particles = []
            createDust(50).forEach(el => {

                var rect = this.add.image(el.x, el.y, "whiteSquare").setDepth(-1).setScale(4);
                rect.speed = Math.random() * 4 + 1;
                this.particles.push(rect);
            })
            this.tweens.add({ // camera zoom in again
                targets: this.particlesAlpha,
                alpha: {
                    from: 0,
                    to: 1
                },
                duration: 5000,
                ease: 'Linear',
                loop: 0,
            });


            // Return to intro
            this.buttonPlayAgain = this.add.rectangle(600, 250, 160, 40).setFillStyle(0x334fcb).setStrokeStyle(1, 0x616161, 1.0).setInteractive();
            this.add.text(this.buttonPlayAgain.x, this.buttonPlayAgain.y, "Return", {
                fontFamily: 'euroStyle',
                fontSize: 20
            }).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setOrigin(0.5);

            this.buttonPlayAgain.on('pointerover', () => {
                this.buttonPlayAgain.setFillStyle(0x1f317d);
            });
            this.buttonPlayAgain.on('pointerout', () => {
                this.buttonPlayAgain.setFillStyle(0x334fcb);
            });
            this.buttonPlayAgain.on('pointerdown', () => {
                this.scene.stop("mainScene");
                this.scene.start("menu");
            })




            // Menu
            this.buttonMenu = this.add.rectangle(600, 300, 160, 40).setFillStyle(0x334fcb).setStrokeStyle(1, 0x616161, 1.0).setInteractive();
            this.buttonMenuText = this.add.text(this.buttonMenu.x, this.buttonMenu.y, "Menu ", {
                fontFamily: 'euroStyle',
                fontSize: 20,
            }).setOrigin(0.5, 0).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setOrigin(0.5);
            this.buttonMenu.on('pointerover', () => {
                this.buttonMenu.setFillStyle(0x1f317d);
            });
            this.buttonMenu.on('pointerout', () => {
                this.buttonMenu.setFillStyle(0x334fcb);
            });
            this.buttonMenu.on('pointerdown', () => {

                this.scene.start("map");
            })

            // Next Level
            this.buttonNextLevel = this.add.rectangle(600, 350, 160, 40).setFillStyle(0x334fcb).setStrokeStyle(1, 0x616161, 1.0).setInteractive();
            this.buttonNextLevelText = this.add.text(this.buttonNextLevel.x, this.buttonNextLevel.y, "Next Level ", {
                fontFamily: 'euroStyle',
                fontSize: 20,
            }).setOrigin(0.5, 0).setShadow(3, 3, 'rgba(0,0,0,0.5)', 5).setOrigin(0.5);


            if (!mobileAndTabletCheck()) { // for desktop, let the hover effect
                this.buttonNextLevel.on('pointerover', () => {
                    this.buttonNextLevelText.text = "Coming 8/20 "
                    this.buttonNextLevel.setFillStyle(0xa9afc9);
                });
                this.buttonNextLevel.on('pointerout', () => {
                    this.buttonNextLevelText.text = "Next Level "
                    this.buttonNextLevel.setFillStyle(0x334fcb);
                });
            }
            this.buttonNextLevel.on('pointerdown', () => {
                if (mobileAndTabletCheck()) {
                    this.buttonNextLevelText.text = "Coming 8/20 "
                    this.buttonNextLevel.setFillStyle(0xa9afc9);
                }
                // go to the next level
            })

        }


        this.separatorLine = this.add.line(0, this.yt1 + this.yt2 / 2, 205, 0, 205, this.yt2, '#9c9c9c'); //line between rank and name
        testo = this.separatorLine;

        backgroundTableGraphics = this.add.graphics();
        backgroundTableGraphics.fillStyle(0xffffff, 0.5);
        this.backgroundTable = backgroundTableGraphics.fillRect(this.xt1, this.yt1, this.xt2, this.yt2);

        container = this.add.container(0, 0); // container
        this.heightLastItem = 0;
        this.populateTable();

        this.zone = this.add.zone(this.xt1, this.yt1, this.xt2, this.yt2).setOrigin(0).setInteractive();



        this.pointer = this.input.activePointer;
        this.scrollHeight = 0;
        this.scrollRatio = 1;
        this.inertia = 0;
        this.endContainer = 0;

    },

    update: function () {

        if (this.particles !== undefined) {
            this.particles.forEach(el => {
                el.y += el.speed;
                el.alpha = ((530 - el.y) / 530) * this.particlesAlpha.alpha
                if (el.y > 530) el.y = -5;
            })
        }

        if (this.pointer.isDown) {
            if (this.scrolling) {
                this.scroller.y = this.pointer.y;
                this.scroller.y = Phaser.Math.Clamp(this.scroller.y, (this.yt1 + this.scrollHeight / 2), this.yt1 + this.yt2 - this.scrollHeight / 2);
                container.y = (-this.scroller.y + (this.scrollHeight / 2) + this.yt1) / this.scrollRatio

            }
        }


        if (Math.abs(this.inertia) > 10) { //move the container and the bar with the inertia from the scroll
            this.inertia *= 0.9
            container.y += this.inertia / 2;
            container.y = Phaser.Math.Clamp(container.y, this.endContainer, 0);
            this.scroller.y = -container.y * this.scrollRatio + this.yt1 + this.scrollHeight / 2;
        }

    },

    populateTable: function () {
        let currentScene = this;
        container.removeAll();

        currentScene.heightSelectedItem = -1;

        db.collection("scores").orderBy("score", "desc").get().then(function (querySnapshot) { // make the db query
            let i = 1;
            let scoreData = [];
            querySnapshot.forEach(function (doc) {

                scoreData.push([i, doc.data().name, doc.data().score]) // put all the data in the vector scoreData
                i++;
            });

            let heightLastItem = 0;
            let heightContainer = currentScene.yt2;
            const heightCell = 40;


            let fontColor = '#ffffff';
            let fontSizeTable = 22;
            scoreData.forEach(element => {

                rank = currentScene.add.text(currentScene.xt1 + 25, currentScene.yt1 + heightLastItem, element[0] + " ", {
                    fontFamily: 'euroStyle',
                    color: fontColor,
                    fontSize: fontSizeTable
                }).setShadow(0, 0, 'rgb(0,0,0)', 4).setOrigin(0.5, 0);

                // truncate the text
                truncatedText = ""
                if (element[1] !== null)
                    truncatedText = element[1].length > 12 ? element[1].substring(0, 12) + "..." : element[1] + " "

                names = currentScene.add.text(currentScene.xt1 + 60, currentScene.yt1 + heightLastItem, truncatedText, {
                    fontFamily: 'euroStyle',
                    color: fontColor,
                    fontSize: fontSizeTable
                }).setShadow(0, 0, 'rgb(0,0,0)', 4);
                score = currentScene.add.text(currentScene.xt1 + 250, currentScene.yt1 + heightLastItem, element[2] + " ", {
                    fontFamily: 'euroStyle',
                    color: fontColor,
                    fontSize: fontSizeTable
                }).setShadow(0, 0, 'rgb(0,0,0)', 4);

                heightLastItem += heightCell;
                container.add(rank);
                container.add(score);
                container.add(names);

                // if he finds the same name and score in the table, highlight it
                if (element[1] === currentScene.name && element[2] === currentScene.score && currentScene.heightSelectedItem === -1 && element[1] !== "") {
                    currentScene.heightSelectedItem = heightLastItem + heightCell;
                    HighlightedRect = currentScene.add.rectangle(300, currentScene.yt1 + heightLastItem - heightCell / 2 - heightCell / 4, 500, heightCell).setFillStyle(0x7187e9, 0.5);
                    container.add(HighlightedRect)
                }

            });


            //----scroll bar

            let scrollHeight = (currentScene.yt2 * currentScene.yt2 / heightLastItem)
            if (scrollHeight > currentScene.yt2) scrollHeight = yt2
            currentScene.scrollRatio = currentScene.yt2 / heightLastItem;
            currentScene.scrollHeight = scrollHeight;
            if (currentScene.scroller !== undefined) currentScene.scroller.destroy();
            currentScene.scroller = currentScene.add.rectangle(currentScene.xt1 + currentScene.xt2 + 10, currentScene.yt1 + scrollHeight / 2, 20, scrollHeight).setInteractive().setFillStyle(0x122266)


            currentScene.scroller.on('pointerdown', () => {
                currentScene.scrolling = true;
            })

            currentScene.input.on('wheel', function (pointer, gameObjects, deltaX, deltaY, deltaZ) {

                container.y -= deltaY * 5;
                container.y = Phaser.Math.Clamp(container.y, currentScene.endContainer, 0);
                currentScene.scroller.y = -container.y * currentScene.scrollRatio + currentScene.yt1 + currentScene.scrollHeight / 2;

            });



            if (currentScene.heightSelectedItem > heightContainer) {

                currentScene.tweens.add({
                    targets: container,
                    y: {
                        from: 0,
                        to: -(currentScene.heightSelectedItem - heightContainer)
                    },
                    duration: 1000,
                    ease: 'Sine.easeInOut',
                    loop: 0,
                    yoyo: false,
                })

                currentScene.tweens.add({
                    targets: currentScene.scroller,
                    y: {
                        from: currentScene.yt1 + scrollHeight / 2,
                        to: -(-currentScene.heightSelectedItem + heightContainer) * currentScene.scrollRatio + currentScene.yt1 + currentScene.scrollHeight / 2
                    },
                    duration: 1000,
                    ease: 'Sine.easeInOut',
                    loop: 0,
                    yoyo: false,
                })

            }



            var mask = new Phaser.Display.Masks.GeometryMask(currentScene, backgroundTableGraphics);
            container.setMask(mask);

            currentScene.endContainer = heightContainer - heightLastItem;

            currentScene.zone.on('pointermove', function (pointer) {

                if (pointer.isDown) {

                    if (heightLastItem > heightContainer) {
                        container.y += (pointer.velocity.y / 10);
                        container.y = Phaser.Math.Clamp(container.y, (heightContainer - heightLastItem - heightCell * 2), 0);

                    }
                }

            });


            currentScene.zone.on('pointerout', function (pointer) {
                if (pointer.isDown) {
                    currentScene.inertia = pointer.velocity.y
                }
            })

            currentScene.zone.on('pointerup', function (pointer) {

                currentScene.inertia = pointer.velocity.y
            })

        });



    }

})