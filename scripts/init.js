const config={
	scale: {
        mode: Phaser.Scale.FIT,
		parent : 'gameContainer',
		autoCenter: Phaser.Scale.CENTER_BOTH,	
		width:444,
		height: 260
    },
	pixelArt: true,
	type: Phaser.AUTO,
	scene: [ mainScene ,hud ]
}
var Game;
function initGame(){
	Game=new Phaser.Game(config);
}

initGame();