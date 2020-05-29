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
        buttonGraphics = this.add.graphics();
        buttonGraphics.fillStyle(0x334fcb);
        //elements of the window
        this.rectangleDialog = graphics.fillRect(100, 60, 720, 420);

        this.textTile = this.add.text(400, 70, "Loser board ", {
            fontFamily: 'euroStyle',
            fontSize: 25
        });


        if (this.sceneType !== 3) { // if the scene is not type 3, show the score
            this.add.text(650, 130, "your score", {
                fontFamily: 'euroStyle',
                fontSize: 18
            })
            this.scoretext = this.add.text(670, 160, this.score + " ", {
                fontFamily: 'euroStyle',
                fontSize: 40
            }) // score

        }

        if (this.sceneType === 2) { // show the submit form
            this.yt2 = 240;
            // submit form

            this.form = this.add.dom(320, 400).createFromCache('form').setScale(0.9);

            this.buttonSubmitRect = this.add.rectangle(330, 450, 200, 40).setFillStyle(0x334fcb).setInteractive();

            this.buttonSubmit = this.add.text(280, 435, "submit", {
                fontFamily: 'euroStyle',
                fontSize: 25
            });

            this.buttonSubmitRect.on('pointerover', () => {
                this.buttonSubmitRect.setFillStyle(0x1f317d);
            });
            this.buttonSubmitRect.on('pointerout', () => {
                this.buttonSubmitRect.setFillStyle(0x334fcb);
            });


            this.buttonSubmitRect.on('pointerdown', () => {

                this.yt2 = 300;
                this.backgroundTable.commandBuffer[7] = this.yt2;
                this.buttonSubmit.visible = false;
                this.form.visible = false;
                this.buttonSubmitRect.visible = false;

                var inputName = this.form.getChildByID('formName').value;
                var inputEmail = this.form.getChildByID('formEmail').value;
                if (inputName.length > 0 && inputEmail.length > 0) {
                    this.name = inputName;

                    testDB(inputName, this.score, inputEmail)
                    this.populateTable()
                }
            })
        }

        backgroundTableGraphics = this.add.graphics();
        backgroundTableGraphics.fillStyle(0xffffff, 0.5);
        this.backgroundTable = backgroundTableGraphics.fillRect(this.xt1, this.yt1, this.xt2, this.yt2);

        container = this.add.container(0, 0); // container
        this.heightLastItem = 0;
        this.populateTable();

        this.zone = this.add.zone(this.xt1, this.yt1, this.xt2, this.yt2).setOrigin(0).setInteractive();


        // share score
        this.buttonShare = this.add.rectangle(700, 260, 200, 40).setFillStyle(0x334fcb).setInteractive();
        this.add.text(650, 250, "Share score", {
            fontFamily: 'euroStyle',
            fontSize: 20
        })
        this.buttonShare.on('pointerover', () => {
            this.buttonShare.setFillStyle(0x1f317d);
        });
        this.buttonShare.on('pointerout', () => {
            this.buttonShare.setFillStyle(0x334fcb);
        });
        this.buttonShare.on('pointerdown', () => {
            // share things
        })


        // Restart the game
        this.buttonPlayAgain = this.add.rectangle(700, 330, 200, 40).setFillStyle(0x334fcb).setInteractive();
        this.add.text(650, 320, "Play again", {
            fontFamily: 'euroStyle',
            fontSize: 20
        })
        this.buttonPlayAgain.on('pointerover', () => {
            this.buttonPlayAgain.setFillStyle(0x1f317d);
        });
        this.buttonPlayAgain.on('pointerout', () => {
            this.buttonPlayAgain.setFillStyle(0x334fcb);
        });
        this.buttonPlayAgain.on('pointerdown', () => {
            resetGame();
            this.scene.start("mainScene");
        })

        //this.buttonNextLevel = buttonGraphics.fillRect(600, 380, 200, 40);
        this.buttonNextLevel = this.add.rectangle(700, 400, 200, 40).setFillStyle(0x334fcb).setInteractive();
        this.buttonNextLevelText = this.add.text(700, 390, "Next Level", {
            fontFamily: 'euroStyle',
            fontSize: 20,
        }).setOrigin(0.5, 0);
        testo = this.buttonNextLevelText;
        this.buttonNextLevel.on('pointerover', () => {
            this.buttonNextLevelText.text = "Coming 8/20"
            this.buttonNextLevel.setFillStyle(0xa9afc9);
        });
        this.buttonNextLevel.on('pointerout', () => {
            this.buttonNextLevelText.text = "Next Level"
            this.buttonNextLevel.setFillStyle(0x334fcb);
        });
        this.buttonNextLevel.on('pointerdown', () => {
            // go to the next level
        })

        this.pointer = this.input.activePointer;
        this.scrollHeight = 0;
        this.scrollRatio = 1;
        this.inertia=0;
        this.endContainer=0;
    },

    update: function () {

        if (this.pointer.isDown) {
            if (this.scrolling) {
                this.scroller.y = this.pointer.y;
                this.scroller.y = Phaser.Math.Clamp(this.scroller.y, (this.yt1 + this.scrollHeight / 2), this.yt1 + this.yt2 - this.scrollHeight / 2);
                container.y = (-this.scroller.y + (this.scrollHeight / 2) + this.yt1) / this.scrollRatio

            }
        }


        if(Math.abs( this.inertia)>10 ){ //move the container and the bar with the inertia from the scroll
            this.inertia*=0.9
            container.y += this.inertia/2;
            container.y = Phaser.Math.Clamp(container.y, this.endContainer, 0);
            this.scroller.y=-container.y*this.scrollRatio+this.yt1+this.scrollHeight/2;
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
            const heightCell = 25;

            //headers
            currentScene.add.rectangle(312, 120, 320, 25).setFillStyle(0x7187e9);

            currentScene.add.text(currentScene.xt1 + 0, currentScene.yt1 - 25, 'Rank', {
                fontFamily: 'euroStyle',
                fontSize: 18
            });
            currentScene.add.text(currentScene.xt1 + 70, currentScene.yt1 - 25, 'Name', {
                fontFamily: 'euroStyle',
                fontSize: 18
            });
            currentScene.add.text(currentScene.xt1 + 250, currentScene.yt1 - 25, 'Score', {
                fontFamily: 'euroStyle',
                fontSize: 18
            });

            let fontColor = 0x102030;
            scoreData.forEach(element => {

                // if he finds the same name and score in the table, highlight it
                if (element[1] === currentScene.name && element[2] === currentScene.score && currentScene.heightSelectedItem===-1) {
                    currentScene.heightSelectedItem = heightLastItem + heightCell;
                    HighlightedRect= currentScene.add.rectangle(300,currentScene.yt1+heightLastItem+heightCell/2,500,heightCell ).setFillStyle(0xfcff21,0.5);
                    container.add(HighlightedRect)
                }


                rank = currentScene.add.text(currentScene.xt1 + 0, currentScene.yt1 + heightLastItem, element[0], {
                    fontFamily: 'euroStyle',
                    color: fontColor
                });

                // truncate the text
                truncatedText = ""
                if (element[1] !== null)
                    truncatedText = element[1].length > 15 ? element[1].substring(0, 15) + "..." : element[1]

                names = currentScene.add.text(currentScene.xt1 + 60, currentScene.yt1 + heightLastItem, truncatedText, {
                    fontFamily: 'euroStyle',
                    color: fontColor
                });
                score = currentScene.add.text(currentScene.xt1 + 250, currentScene.yt1 + heightLastItem, element[2], {
                    fontFamily: 'euroStyle',
                    color: fontColor
                })
                heightLastItem += heightCell;
                container.add(rank);
                container.add(score);
                container.add(names);                
            });


            //----scroll bar
            
            let scrollHeight = (currentScene.yt2 * currentScene.yt2 / heightLastItem)
            if (scrollHeight>currentScene.yt2) scrollHeight=yt2
            currentScene.scrollRatio = currentScene.yt2 / heightLastItem;
            currentScene.scrollHeight = scrollHeight;
            currentScene.scroller = currentScene.add.rectangle(currentScene.xt1 + currentScene.xt2 + 10, currentScene.yt1 + scrollHeight / 2, 20, scrollHeight).setInteractive().setFillStyle(0x122266)


            currentScene.scroller.on('pointerdown', () => {
                currentScene.scrolling = true;
            })




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
                        to: -(-currentScene.heightSelectedItem + heightContainer)*currentScene.scrollRatio+currentScene.yt1+currentScene.scrollHeight/2
                    },
                    duration: 1000,
                    ease: 'Sine.easeInOut',
                    loop: 0,
                    yoyo: false,
                })

            }
            


            var mask = new Phaser.Display.Masks.GeometryMask(currentScene, backgroundTableGraphics);
            container.setMask(mask);

            currentScene.endContainer=heightContainer - heightLastItem;

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
                    currentScene.inertia=pointer.velocity.y
                }
            })

            currentScene.zone.on('pointerup', function (pointer) {

                currentScene.inertia=pointer.velocity.y
            })

        });



    }

})