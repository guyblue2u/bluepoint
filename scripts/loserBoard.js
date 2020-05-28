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
        this.yt2 = 350;


        graphics = this.add.graphics();
        graphics.fillStyle(0x4063FF, 0.6);
        //elements of the window
        this.rectangleDialog = graphics.fillRect(140, 100, 700, 400);

        console.log(this.sceneType)

        if (this.sceneType !== 3) { // if the scene is not type 3, show the score
            this.add.text(600, 150, "your score")
            this.scoretext = this.add.text(600, 200, this.score) // score
            console.log(this.scoretext);
            
        }

        if (this.sceneType === 2) { // show the submit form
            this.yt2 = 240;
            // submit form
            
            this.form = this.add.dom(300, 400).createFromCache('form');
            this.buttonSubmit = this.add.text(200, 430, "submit").setInteractive();

            this.buttonSubmit.on('pointerdown', () => {

                yt2 = 350;
                this.backgroundTable.commandBuffer[4] = yt2;
                this.buttonSubmit.visible = false;
                this.form.visible = false;

                var inputName = this.form.getChildByID('formName').value;
                var inputEmail = this.form.getChildByID('formEmail').value;
                if (inputName.length > 0 && inputEmail.length > 0) {
                    this.name = inputName;

                    testDB(inputName, this.score, inputEmail)
                    this.populateTable()
                }
            })
        }





        graphics.fillStyle(0xFFFFFF, 0.5);
        backgroundTableGraphics = this.add.graphics();
        this.backgroundTable = backgroundTableGraphics.fillRect(this.xt1, this.yt1, this.xt2, this.yt2);

        container = this.add.container(0, 0); // container

        this.populateTable();

        this.zone = this.add.zone(this.xt1, this.yt1, this.xt2, this.yt2).setOrigin(0).setInteractive();

       

        this.buttonShare = graphics.fillRect(600, 250, 200, 50);
        this.add.text(600, 250, "share score")

        this.buttonPlayAgain = graphics.fillRect(600, 320, 200, 50);
        this.add.text(600, 320, "Play again")

        this.buttonNextLevel = graphics.fillRect(600, 390, 200, 50);
        this.add.text(600, 390, "Next Level")







    },

    update: function () {},

    populateTable: function () {
        let currentScene = this;
        container.removeAll();

        let heightSelectedItem = 0;

        db.collection("scores").orderBy("score", "desc").get().then(function (querySnapshot) { // make the db query
            let i = 1;
            let scoreData = [];
            querySnapshot.forEach(function (doc) {

                scoreData.push([i, doc.data().name, doc.data().score]) // put all the data in the vector scoreData
                i++;
            });

            let heightLastItem = 0;
            let heightContainer = currentScene.yt2;
            const heightCell = 20;

            //headers
            currentScene.add.text(currentScene.xt1 + 0, currentScene.yt1 - 20, 'Rank', {
                fontFamily: 'euroStyle'
            });
            currentScene.add.text(currentScene.xt1 + 70, currentScene.yt1 - 20, 'Name', {
                fontFamily: 'euroStyle'
            });
            currentScene.add.text(currentScene.xt1 + 250, currentScene.yt1 - 20, 'Score', {
                fontFamily: 'euroStyle'
            });

            let fontColor = '#ffffff';
            scoreData.forEach(element => {

                if (element[1] === currentScene.name && element[2] === currentScene.score) {
                    fontColor = '#ff2200';
                    heightSelectedItem = heightLastItem + heightCell;
                } else fontColor = '#102030';


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


            if (heightSelectedItem > heightContainer) {
                // container.y= -(heightSelectedItem - heightContainer)
                currentScene.tweens.add({
                    targets: container,
                    y: {
                        from: 0,
                        to: -(heightSelectedItem - heightContainer)
                    },
                    duration: 1000,
                    ease: 'Sine.easeInOut',
                    loop: 0,
                    yoyo: false,
                })
            }

            var mask = new Phaser.Display.Masks.GeometryMask(currentScene, backgroundTableGraphics);
            container.setMask(mask);


            currentScene.zone.on('pointermove', function (pointer) {

                if (pointer.isDown) {

                    if (heightLastItem > heightContainer) {
                        container.y += (pointer.velocity.y / 10);
                        container.y = Phaser.Math.Clamp(container.y, (heightContainer - heightLastItem - heightCell * 2), 0);

                    }
                }

            });

        });
    }

})