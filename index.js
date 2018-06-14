/*
 *  This example show how to load complex shapes created with PhysicsEditor (https://www.codeandweb.com/physicseditor)
 */


var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 960,
    parent: 'game',
    scene: {
        preload: preload,
        create: create
    },
    physics: {
        default: "matter",
        matter: {
            // debug: true
        }
    }
};


var game = new Phaser.Game(config);

function preload() {
    // Load sprite sheet generated with TexturePacker
    this.load.atlas('sheet', 'assets/fruit-sprites.png', 'assets/fruit-sprites.json');

    // Load body shapes from JSON file generated using PhysicsEditor
    this.load.json('shapes', 'assets/fruit-shapes.json');
}

function create() {
    var shapes = this.cache.json.get('shapes');

    this.matter.world.setBounds(0, 0, game.config.width, game.config.height);
    this.add.image(0, 0, 'sheet', 'background').setOrigin(0, 0);

    // sprites are positioned at their center of mass
    var ground = this.matter.add.sprite(0, 0, 'sheet', 'ground', {shape: shapes.ground});
    ground.setPosition(0 + ground.centerOfMass.x, 280 + ground.centerOfMass.y);  // corrected position: (0,280)

    this.matter.add.sprite(200, 50, 'sheet', 'crate', {shape: shapes.crate});
    this.matter.add.sprite(250, 250, 'sheet', 'banana', {shape: shapes.banana});
    this.matter.add.sprite(360, 50, 'sheet', 'orange', {shape: shapes.orange});
    this.matter.add.sprite(400, 250, 'sheet', 'cherries', {shape: shapes.cherries});

    this.input.on('pointerdown', function (pointer) {
        this.matter.add.sprite(pointer.x, pointer.y, 'sheet', 'banana', {shape: shapes.banana});
    }, this);
}
