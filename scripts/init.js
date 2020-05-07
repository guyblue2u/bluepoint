const config={
	scale: {
        mode: Phaser.Scale.FIT,
		parent : 'gameContainer',
		autoCenter: Phaser.Scale.CENTER_BOTH,	
		width:888,
		height: 520
    },
	pixelArt: true,
	type: Phaser.AUTO,
	scene: [ loading , mainScene ,hud ],
	transparent: true,
	audio: {
		disableWebAudio: true,
    }
}
let loadingMain=0;
let loadingHUD=0; 
var Game;
function initGame(){
	Game=new Phaser.Game(config);
}

initGame();