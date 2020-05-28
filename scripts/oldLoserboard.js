//------------------------------------------------------
const Random = Phaser.Math.Between;
const COLOR_PRIMARY = 0x4063FF;
const COLOR_LIGHT = 0xffffff;
const COLOR_DARK = 0x314cc4;
//------------------------------------------------------

var gridTable;

var loserBoard = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function loserBoard() {

        Phaser.Scene.call(this, {
            key: 'loserBoard',
            active: false
        });
    },

    preload: function () {
        this.load.scenePlugin({ // plugin for the score table
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    },


    create: function () {

        console.log("se crea la escena")

        var scrollMode = 0; // 0:vertical, 1:horizontal
        gridTable = this.rexUI.add.gridTable({
                x: 500,
                y: 300,
                width: (scrollMode === 0) ? 700 : 420,
                height: (scrollMode === 0) ? 420 : 300,

                scrollMode: scrollMode,

                background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 0, COLOR_PRIMARY),

                table: {
                    cellWidth: (scrollMode === 0) ? undefined : 60,
                    cellHeight: (scrollMode === 0) ? 30 : undefined,

                    columns: 3,

                    mask: {
                        padding: 2,
                    },

                    reuseCellContainer: true,
                },

                slider: {
                    track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                    thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
                },

                header: this.rexUI.add.label({
                    width: (scrollMode === 0) ? undefined : 30,
                    height: (scrollMode === 0) ? 30 : undefined,

                    orientation: scrollMode,
                    background: this.rexUI.add.roundRectangle(0, 0, 20, 20, 0, COLOR_DARK),
                    text: this.add.text(0, 0, 'LOSER BOARD' ,{
                        fontFamily: 'euroStyle',
                        color: '#4063FF',
                        fontSize: 30,
                    })
                }),

                footer: GetFooterSizer(this, scrollMode),

                space: {
                    left: 20,
                    right: 20,
                    top: 20,
                    bottom: 20,

                    table: 10,
                    header: 10,
                    footer: 10,
                },

                createCellContainerCallback: function (cell, cellContainer) {
                    var scene = cell.scene,
                        width = cell.width,
                        height = cell.height,
                        item = cell.item,
                        index = cell.index;
                    if (cellContainer === null) {
                        cellContainer = scene.rexUI.add.label({
                            width: item.width,
                            height: height,

                            orientation: scrollMode,
                            background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                            text: scene.add.text(0, 0, '' ,{
                                fontFamily: 'euroStyle',
                                color: '#FFFFFF',
                                fontSize: 20,
                            }),

                            space: {
                                //icon: 10,
                                left: (scrollMode === 0) ? 15 : 0,
                                top: (scrollMode === 0) ? 0 : 15,
                            }
                        });
                        console.log(item.text + ': create new cell-container');
                    } else {
                        console.log(item.text + ': reuse cell-container');
                    }

                    // Set properties from item value
                    cellContainer.setSize(item.width, height); // Size might changed in this demo
                    cellContainer.getElement('text').setText(item.text); // Set text of text object
                    //cellContainer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
                    cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
                    return cellContainer;
                },

            })
            .layout()


        let scoreData = [];
        db.collection("scores").orderBy("score", "desc").get().then(function (querySnapshot) {
            let i = 1;
            console.log(querySnapshot);
            querySnapshot.forEach(function (doc) {

                scoreData.push({
                    text: i,
                    width: 60
                });
                scoreData.push({
                    text: doc.data().name,
                    width: 360
                });
                scoreData.push({
                    text: doc.data().score,
                    width: 80
                });
                i++;
            });
            console.log(scoreData)
            gridTable.setItems(scoreData)
        });


    },

    update: function () {}

})


var CreateItems = function (count) {
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({
            id: i,
            color: Random(0, 0xffffff)
        });
    }
    return data;
}


var GetFooterSizer = function (scene, orientation) {
    return scene.rexUI.add.sizer({
            orientation: orientation
        })
        // .add(
        //     CreateFooterButton(scene, 'Reset', orientation), // child
        //     1, // proportion
        //     'center' // align
        // )
        // .add(
        //     CreateFooterButton(scene, 'Exit', orientation), // child
        //     1, // proportion
        //     'center' // align
        // )
}

// var CreateFooterButton = function (scene, text, orientation) {
//     return scene.rexUI.add.label({
//             height: (orientation === 0) ? 40 : undefined,
//             width: (orientation === 0) ? undefined : 40,
//             orientation: orientation,
//             background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),
//             text: scene.add.text(0, 0, text),
//             icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
//             align: 'center',
//             space: {
//                 icon: 10
//             }
//         })
//         .setInteractive()
//         .on('pointerdown', function () {
//             //console.log(`Pointer down ${text}`)
//         })
//         .on('pointerover', function () {
//             this.getElement('background').setStrokeStyle(1, 0xffffff);
//         })
//         .on('pointerout', function () {
//             this.getElement('background').setStrokeStyle();
//         })
// }