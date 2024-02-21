namespace SpriteKind {
    export const Crosshair = SpriteKind.create()
    export const camera = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    bullet = darts.create(assets.image`projectile`, SpriteKind.Projectile, player1.x, player1.y)
    bullet.angle = 0 - spriteutils.radiansToDegrees(spriteutils.angleFrom(player1, xhair))
    bullet.pow = 200
    bullet.throwDart()
    bullet.setFlag(SpriteFlag.DestroyOnWall, true)
})
function enemyMov (list: any[]) {
	
}
function bulletTime (list: Sprite[]) {
    for (let value of list) {
        animation.stopAnimation(animation.AnimationTypes.All, value)
        if (player1.vx == 0 && player1.vy == 0) {
            value.setVelocity(0, 0)
        } else {
            value.setVelocity(randint(-100, 100), randint(-100, 100))
        }
    }
}
let EnemySprite: Sprite = null
let SpawnLocations: tiles.Location[] = []
let bullet: Dart = null
let xhair: Sprite = null
let player1: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
player1 = sprites.create(assets.image`playerDef`, SpriteKind.Player)
controller.moveSprite(player1, 100, 100)
player1.setStayInScreen(false)
xhair = sprites.create(assets.image`xhair`, SpriteKind.Crosshair)
controller.player2.moveSprite(xhair, 125, 125)
xhair.setStayInScreen(true)
let CameraSprite = sprites.create(assets.image`cameraSprite`, SpriteKind.camera)
scene.cameraFollowSprite(CameraSprite)
let EnemyImages = [img`
    . . f f f . . . . . . . . f f f 
    . f f c c . . . . . . f c b b c 
    f f c c . . . . . . f c b b c . 
    f c f c . . . . . . f b c c c . 
    f f f c c . c c . f c b b c c . 
    f f c 3 c c 3 c c f b c b b c . 
    f f b 3 b c 3 b c f b c c b c . 
    . c b b b b b b c b b c c c . . 
    . c 1 b b b 1 b b c c c c . . . 
    c b b b b b b b b b c c . . . . 
    c b c b b b c b b b b f . . . . 
    f b 1 f f f 1 b b b b f c . . . 
    f b b b b b b b b b b f c c . . 
    . f b b b b b b b b c f . . . . 
    . . f b b b b b b c f . . . . . 
    . . . f f f f f f f . . . . . . 
    `, img`
    . . . . c c c c c c . . . . . . 
    . . . c 6 7 7 7 7 6 c . . . . . 
    . . c 7 7 7 7 7 7 7 7 c . . . . 
    . c 6 7 7 7 7 7 7 7 7 6 c . . . 
    . c 7 c 6 6 6 6 c 7 7 7 c . . . 
    . f 7 6 f 6 6 f 6 7 7 7 f . . . 
    . f 7 7 7 7 7 7 7 7 7 7 f . . . 
    . . f 7 7 7 7 6 c 7 7 6 f c . . 
    . . . f c c c c 7 7 6 f 7 7 c . 
    . . c 7 2 7 7 7 6 c f 7 7 7 7 c 
    . c 7 7 2 7 7 c f c 6 7 7 6 c c 
    c 1 1 1 1 7 6 f c c 6 6 6 c . . 
    f 1 1 1 1 1 6 6 c 6 6 6 6 f . . 
    f 6 1 1 1 1 1 6 6 6 6 6 c f . . 
    . f 6 1 1 1 1 1 1 6 6 6 f . . . 
    . . c c c c c c c c c f . . . . 
    `, img`
    . . . . f f f f f . . . . . . . 
    . . . f e e e e e f . . . . . . 
    . . f d d d d e e e f . . . . . 
    . c d f d d f d e e f f . . . . 
    . c d f d d f d e e d d f . . . 
    c d e e d d d d e e b d c . . . 
    c d d d d c d d e e b d c . f f 
    c c c c c d d d e e f c . f e f 
    . f d d d d d e e f f . . f e f 
    . . f f f f f e e e e f . f e f 
    . . . . f e e e e e e e f f e f 
    . . . f e f f e f e e e e f f . 
    . . . f e f f e f e e e e f . . 
    . . . f d b f d b f f e f . . . 
    . . . f d d c d d b b d f . . . 
    . . . . f f f f f f f f f . . . 
    `]
let EnemyList: Sprite[] = []
game.onUpdate(function () {
    CameraSprite.setPosition((player1.x + xhair.x) / 2, (player1.y + xhair.y) / 2)
    if (EnemyList.length == 0) {
        SpawnLocations = tiles.getTilesByType(sprites.dungeon.floorLight2)
        sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
        for (let index = 0; index < 10; index++) {
            let enemyVel = 0
            EnemySprite = sprites.create(EnemyImages._pickRandom(), SpriteKind.Enemy)
            EnemySprite.setVelocity(enemyVel, enemyVel)
            tiles.placeOnTile(EnemySprite, SpawnLocations.removeAt(randint(0, SpawnLocations.length - 1)))
            EnemyList.push(EnemySprite)
        }
    }
    bulletTime(EnemyList)
})
