const config={
	scale: {
        mode: Phaser.Scale.FIT,
		parent : 'gameContainer',
		autoCenter: Phaser.Scale.CENTER_BOTH,	
		width:888,
		height: 520
	},
	dom: {
        createContainer: true
    },
	pixelArt: true,
	type: Phaser.AUTO,
	scene: [ loading , tests , level_1,level_2, level_2_2, hud_1, hud_2,map,loserBoard,intro_1,intro_2],
	transparent: true,
	// audio: {
	// 	disableWebAudio: true,
    // }
}

var Game;
function initGame(){
	Game=new Phaser.Game(config);
}



var firebaseConfig = {
    apiKey: "AIzaSyBTSap9fbrByK_VcvmAkNRJgq4Kzifd0zI",
    authDomain: "guyblue-9e13c.firebaseapp.com",
    databaseURL: "https://guyblue-9e13c.firebaseio.com",
    projectId: "guyblue-9e13c",
    storageBucket: "guyblue-9e13c.appspot.com",
    messagingSenderId: "355744734309",
    appId: "1:355744734309:web:4bbbbd29502eb18abf7a8c"
  };
  // Initialize Firebase
  let firebaseApp=firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();


function writeData(_name, _score,_email,colectionName){
	db.collection(colectionName).add({
		name: _name,
		score: _score,
		email: _email
	})
	
}

let items=[];
function getData(colectionName){
	
	db.collection(colectionName).orderBy("score","desc").get().then(function(querySnapshot) {
		console.log(querySnapshot);
		querySnapshot.forEach(function(doc) {
			
			
			items.push({name: doc.data().name  , score: doc.data().score} )
			
			
		});
	});
	
}	



initGame();