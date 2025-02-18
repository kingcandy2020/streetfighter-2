class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    preload() {
        this.load.image('background', 'background.png');
        this.load.image('ryo', 'ryo.png');
        this.load.image('kaida', 'kaida.png');
        this.load.image('jin', 'jin.png');
        this.load.image('luna', 'luna.png');
        this.load.image('taro', 'taro.png');
        this.load.image('maya', 'maya.png');
        this.load.image('frame', 'frame.png');
        this.load.audio('menu_music', 'menu_music.wav');
    }

    create() {
        this.add.image(400, 300, 'background');
        this.sound.play('menu_music', { loop: true });

        this.add.text(250, 100, 'Choose Your Fighter', { fontSize: '32px', fill: '#ffd700', fontStyle: 'bold' });

        const characters = ['ryo', 'kaida', 'jin', 'luna', 'taro', 'maya'];
        let xPosition = 200;

        characters.forEach((character, index) => {
            let portrait = this.add.image(xPosition, 300, character).setInteractive();
            this.add.image(xPosition, 300, 'frame');
            portrait.on('pointerdown', () => this.selectCharacter(character));
            xPosition += 100;
        });
    }

    selectCharacter(character) {
        this.scene.start('GameScene', { selectedCharacter: character });
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data) {
        this.selectedCharacter = data.selectedCharacter || 'ryo';
    }

    preload() {
        this.load.image('background', 'background.png');
        this.load.image('ryo', 'ryo.png');
        this.load.image('kaida', 'kaida.png');
        this.load.image('jin', 'jin.png');
        this.load.image('luna', 'luna.png');
        this.load.image('taro', 'taro.png');
        this.load.image('maya', 'maya.png');
        this.load.audio('ryo_intro', 'ryo_intro.wav');
        this.load.audio('kaida_intro', 'kaida_intro.wav');
        this.load.audio('jin_intro', 'jin_intro.wav');
        this.load.audio('luna_intro', 'luna_intro.wav');
        this.load.audio('taro_intro', 'taro_intro.wav');
        this.load.audio('maya_intro', 'maya_intro.wav');
        this.load.audio('attack_sound', 'attack.wav');
    }

    create() {
        this.add.image(400, 300, 'background');
        player1 = this.add.sprite(200, 450, this.selectedCharacter);
        player2 = this.add.sprite(600, 450, 'kaida');

        healthBar1 = this.add.rectangle(100, 50, 200, 20, 0x00ff00);
        healthBar2 = this.add.rectangle(700, 50, 200, 20, 0x00ff00);

        this.sound.play(this.selectedCharacter + '_intro');
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('A'))) {
            player1.x -= 10;
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('D'))) {
            player1.x += 10;
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('LEFT'))) {
            player2.x -= 10;
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('RIGHT'))) {
            player2.x += 10;
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('SPACE'))) {
            this.sound.play('attack_sound');
            healthBar2.width -= 20;
        }
        if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('ENTER'))) {
            this.sound.play('attack_sound');
            healthBar1.width -= 20;
        }
    }
}

// ✅ Ensure Phaser Config is Defined AFTER Class Definitions
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MainMenu, GameScene]
};

let player1, player2;
let healthBar1, healthBar2;

const game = new Phaser.Game(config);
