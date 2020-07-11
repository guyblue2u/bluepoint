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
        this.background2 = this.add.image(0, 0, "level2_back2").setOrigin(0, 0);
        this.background3 = this.add.image(0, 0, "level2_back3").setOrigin(0, 0);
        this.background1 = this.add.image(0, 0, "level2_back1").setOrigin(0, 0);

        this.cameras.main.zoom = 2;
        this.cameras.main.setBounds(0, 20, 440, 250);


        //polygon for the floor boundaries (inside bar)
        this.poly = new Phaser.Geom.Polygon([
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

        //colliders for the tables and chairs
        this.colls = [
            [122, 215, 10],
            [163, 200, 20],
            [265, 200, 20],
            [365, 200, 20],
            [345, 160, 10],
            [321, 135, 10],
            [288, 135, 10],
            [263, 135, 10],
            [199, 145, 10],
            [181, 145, 10],
        ];
        // this.colls.forEach(el => {
        //     this.add.circle(el[0], el[1], el[2], 0xff0000).setAlpha(0.5)
        //     //this.add.rectangle(el[0],el[1],el[2],el[2],0x00ff00).setAlpha(0.5)
        // });

        loadAnimationsPlayer(this);



        //add the player
        player = new Player_Lvl_2(150, 141, this.poly, this.colls);

        player.avatar = this.add.sprite(player.x, player.y, "blueGuy", 0);
        player.avatar.depth = player.avatar.y;
        player.avatar.play("idleDown" + player.shirt);



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

        controls.buttonsLocked = false;
        controls.joystickLocked = false;

        // footsteps
        this.footsteps = [];


        //dust effect
        numberParticles = 100;
        this.dustParticles = [];
        for (let i = 0; i < numberParticles; i++) {
            let particle = this.add.image(Math.random() * 888, Math.random() * 250, 'whiteSquare').setScale(Math.random())
            particle.speed = Math.random() * 4 + 1;
            this.dustParticles.push(
                particle
            )
        }


        NPCS = []; //delete the npcs from the first level
        this.input.keyboard.clearCaptures();
        controls.joystickLocked = false;


        this.input.on('pointerup', () => {
            var pointer = this.input.activePointer;
            points.push([pointer.x / 2, pointer.y / 2])

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

        // creating the footsteps
        if (this.footsteps.length !== 0) {

            let dist = distance(player.avatar.x, player.avatar.y + 15, this.footsteps[this.footsteps.length - 1].x, this.footsteps[this.footsteps.length - 1].y);
            if (dist > 15) {
                this.footsteps.push(this.add.image(player.avatar.x, player.avatar.y + 15, 'footsteps'))
            }

            //reduce the opacity of the footsteps
            for (let i = this.footsteps.length - 1; i >= 0; i--) {
                this.footsteps[i].alpha -= 0.005;
                //delete the footstep object once its opacity is less than 0
                if (this.footsteps[i].alpha < 0) {
                    this.footsteps[i].destroy();
                    this.footsteps.splice(i, 1);
                }
            }

        } else {
            this.footsteps.push(this.add.image(player.avatar.x, player.avatar.y + 15, 'footsteps'))
        }

        //moving the dust particles
        this.dustParticles.forEach(el => {
            el.y += el.speed;
            el.alpha = ((530 - el.y) / 530);
            if (el.y > 530) {
                el.y = -5;
                el.setScale(Math.random())
            }
        })




    }

})