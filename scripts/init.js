const config={
	scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
		width:443,
		height: 259
    },

	parent : "canvasContainer",
	type: Phaser.AUTO,
	scene: [mainScene]
}
var Game;
function initGame(){
	Game=new Phaser.Game(config);
}

initGame();