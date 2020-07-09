var points = [];

var level_2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function level_2() {
        Phaser.Scene.call(this, {
            key: 'level_2',
            active: false
        });
    },

    preload: function () {

    },

    create: function () {
        background2 = this.add.image(0, 0, "level2_back2").setOrigin(0, 0);
        background3 = this.add.image(0, 0, "level2_back3").setOrigin(0, 0);
        background1 = this.add.image(0, 0, "level2_back1").setOrigin(0, 0);

        this.cameras.main.zoom = 2;
        this.cameras.main.setBounds(0, 20, 440, 250);


        //polygon for the floor boundaries (inside bar)
        poly = new Phaser.Geom.Polygon([
            new Phaser.Geom.Point(1, 252),
            new Phaser.Geom.Point(1, 211),
            new Phaser.Geom.Point(30, 182),
            new Phaser.Geom.Point(83, 180),
            new Phaser.Geom.Point(121, 142),
            new Phaser.Geom.Point(121, 136),
            new Phaser.Geom.Point(75, 134),
            new Phaser.Geom.Point(102, 109),
            new Phaser.Geom.Point(167, 109),
            new Phaser.Geom.Point(168, 135),
            new Phaser.Geom.Point(175, 139),
            new Phaser.Geom.Point(215, 141),
            new Phaser.Geom.Point(225, 135),
            new Phaser.Geom.Point(353, 134),
            new Phaser.Geom.Point(444, 223),
            new Phaser.Geom.Point(444, 252),

        ]);


        loadAnimationsPlayer(this);

        //add the player
        player = new Player(150, 141, poly);

        player.avatar = this.add.sprite(player.x, player.y, "blueGuy", 0);
        player.avatar.depth = player.avatar.y;
        player.avatar.play("idleDown" + player.shirt);

        player.checkCollisions

        // movement of the player
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        this.input.keyboard.on('keyup', (event) => {
            if (!controls.joystickLocked)
                player.returnToIdle();
            player.direction = null;
            player.moving = false;
        })

        controls.buttonsLocked=false;
        controls.joystickLocked=false;



        NPCS = [];
        this.input.keyboard.clearCaptures();
        controls.joystickLocked = false;


        this.input.on('pointerup', () => {
            var pointer = this.input.activePointer;
            points.push([pointer.x, pointer.y])

        })


        this.scene.launch("hud_2");

    },





    update: function () {
        if (!controls.joystickLocked) {
            if (this.downKey.isDown || this.SKey.isDown) {
                player.move(down)
            }
            if (this.upKey.isDown || this.WKey.isDown) {
                player.move(up)
            }
            if (this.rightKey.isDown || this.DKey.isDown) {
                player.move(right)
            }
            if (this.leftKey.isDown || this.AKey.isDown) {
                player.move(left)
            }
        }

    }

})


