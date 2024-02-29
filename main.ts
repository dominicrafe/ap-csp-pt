namespace SpriteKind {
    export const Crosshair = SpriteKind.create()
    export const camera = SpriteKind.create()
    export const death = SpriteKind.create()
    export const enemyProjectile = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    player1,
    [img`
        . . . . f f f f . . . . 
        . . f f e e e e f f . . 
        . f e e e e e e e f f . 
        f f e f e e e e e e f f 
        f f f e e e e e e e e f 
        f f f e e e e e e f e f 
        f f f f e e e e f f f f 
        f f f f f f f f f f f f 
        f f f f f f f f f f f f 
        . f f f f f f f f f f . 
        . e f f f f f f f f e . 
        e 4 f b b b b b b f 4 e 
        4 d f d d d d d d c d 4 
        4 4 f 6 6 6 6 6 6 f 4 4 
        . . . f f f f f f . . . 
        . . . f f . . f f . . . 
        `,img`
        . . . . . . . . . . . . 
        . . . . f f f f . . . . 
        . . f f e e e e f f . . 
        . f e e e e e e e f f . 
        f e e f e e e e e e f f 
        f f f e e e e e e e e f 
        f f e e e e e e e f e f 
        f f f e e e e f f f f f 
        f f f f f f f f f f f f 
        f f f f f f f f f f f f 
        . f f f f f f f f f f . 
        . e f f f f f f f f e . 
        . 4 f b b b b b f e 4 e 
        . 4 f d d d d d e d d 4 
        . e f f f f f f e e 4 . 
        . . f f f . . . . . . . 
        `,img`
        . . . . . . . . . . . . 
        . . . . f f f f . . . . 
        . . f f e e e e f f . . 
        . f e e e e e e e f f . 
        f f e f e e e e e e f f 
        f f f e e e e e e e e f 
        f f f f e e e e e f e f 
        f f f f f e e e e f f f 
        f f f f f f f f f f f f 
        f f f f f f f f f f f f 
        . f f f f f f f f f f . 
        . e f f f f f f f f e . 
        e 4 e f b b b b b f 4 . 
        4 d d e d d d d d f 4 . 
        . 4 e e f f f f f f e . 
        . . . . . . . f f f . . 
        `],
    100,
    true
    )
})
sprites.onOverlap(SpriteKind.enemyProjectile, SpriteKind.Player, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite2, otherSprite2) {
    EnemyList.removeAt(EnemyList.indexOf(sprite2))
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    sprites.destroy(sprite2)
    explosion = sprites.createProjectileFromSprite(assets.image`clearSprite`, sprite2, 0, 0)
    explosion.setKind(SpriteKind.death)
    animation.runImageAnimation(
    explosion,
    assets.animation`explosionAnim`,
    100,
    false
    )
    pause(500)
    sprites.destroy(explosion)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    bullet = darts.create(assets.image`projectile`, SpriteKind.Projectile, player1.x, player1.y)
    bullet.angle = 0 - spriteutils.radiansToDegrees(spriteutils.angleFrom(player1, xhair))
    bullet.pow = speed3 * 4
    bullet.gravity = 0
    bullet.throwDart()
    bullet.setFlag(SpriteFlag.DestroyOnWall, true)
    projectileList.push(bullet)
})
function enemyMov (enemylist: Sprite[], speed: number) {
    for (let value of enemylist) {
        if (spriteutils.distanceBetween(value, player1) <= 100) {
            value.follow(player1, speed)
            enemyAtt(enemylist, speed)
        }
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    player1,
    [img`
        . . . f f f f f . . . . 
        . . f e e e e e f f . . 
        . f e e e e e e e f f . 
        f e e e e e e e f f f f 
        f e e 4 e e e f f f f f 
        f e e 4 4 e e e f f f f 
        f f e 4 4 4 4 4 f f f f 
        f f e 4 4 f f 4 e 4 f f 
        . f f d d d d 4 d 4 f . 
        . . f b b d d 4 f f f . 
        . . f e 4 4 4 e e f . . 
        . . f 1 1 1 e d d 4 . . 
        . . f 1 1 1 e d d e . . 
        . . f 6 6 6 f e e f . . 
        . . . f f f f f f . . . 
        . . . . . f f f . . . . 
        `,img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . . f e e e e e f f f . 
        . f e e e e e e e f f f 
        f e e e e e e e f f f f 
        f e e 4 e e e f f f f f 
        f e e 4 4 e e e f f f f 
        f f e 4 4 4 4 4 f f f f 
        . f e 4 4 f f 4 e 4 f f 
        . . f d d d d 4 d 4 f . 
        . . f b b d e e f f f . 
        . . f e 4 e d d 4 f . . 
        . . f 1 1 e d d e f . . 
        . f f 6 6 f e e f f f . 
        . f f f f f f f f f f . 
        . . f f f . . . f f . . 
        `,img`
        . . . . . . . . . . . . 
        . . . f f f f f f . . . 
        . . f e e e e e f f f . 
        . f e e e e e e e f f f 
        f e e e e e e e f f f f 
        f e e 4 e e e f f f f f 
        f e e 4 4 e e e f f f f 
        f f e 4 4 4 4 4 f f f f 
        . f e 4 4 f f 4 e 4 f f 
        . . f d d d d 4 d 4 f f 
        . . f b b d d 4 f f f . 
        . . f e 4 4 4 e d d 4 . 
        . . f 1 1 1 1 e d d e . 
        . f f 6 6 6 6 f e e f . 
        . f f f f f f f f f f . 
        . . f f f . . . f f . . 
        `],
    100,
    true
    )
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, player1)
    player1.setImage(img`
        . . . f f f f f . . . . 
        . . f e e e e e f f . . 
        . f e e e e e e e f f . 
        f e e e e e e e f f f f 
        f e e 4 e e e f f f f f 
        f e e 4 4 e e e f f f f 
        f f e 4 4 4 4 4 f f f f 
        f f e 4 4 f f 4 e 4 f f 
        . f f d d d d 4 d 4 f . 
        . . f b b d d 4 f f f . 
        . . f e 4 4 4 e e f . . 
        . . f 1 1 1 e d d 4 . . 
        . . f 1 1 1 e d d e . . 
        . . f 6 6 6 f e e f . . 
        . . . f f f f f f . . . 
        . . . . . f f f . . . . 
        `)
})
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    animation.stopAnimation(animation.AnimationTypes.All, player1)
    player1.setImage(img`
        . . . . f f f f . . . . 
        . . f f e e e e f f . . 
        . f e e e e e e e f f . 
        f f e f e e e e e e f f 
        f f f e e e e e e e e f 
        f f f e e e e e e f e f 
        f f f f e e e e f f f f 
        f f f f f f f f f f f f 
        f f f f f f f f f f f f 
        . f f f f f f f f f f . 
        . e f f f f f f f f e . 
        e 4 f b b b b b b f 4 e 
        4 d f d d d d d d c d 4 
        4 4 f 6 6 6 6 6 6 f 4 4 
        . . . f f f f f f . . . 
        . . . f f . . f f . . . 
        `)
})
info.onLifeZero(function () {
    game.setGameOverMessage(false, "u lost")
    game.gameOver(false)
})
function projMov (speed2: number, projList: Dart[]) {
    for (let value2 of projList) {
        value2.pow = speed2 * 4
        value2.throwDart()
    }
}
function enemyAtt (list2: Sprite[], num: number) {
    for (let value3 of list2) {
        if (randint(0, 500) == 1 && (speed3 != 0 && spriteutils.distanceBetween(value3, player1) <= 100)) {
            enemyBullet = darts.create(assets.image`enemyProj`, SpriteKind.Projectile, value3.x, value3.y)
            enemyBullet.angle = 0 - spriteutils.radiansToDegrees(spriteutils.angleFrom(value3, player1))
            enemyBullet.pow = speed3 * 4
            enemyBullet.gravity = 0
            enemyBullet.throwDart()
            enemyBullet.setKind(SpriteKind.enemyProjectile)
            enemyBullet.setFlag(SpriteFlag.DestroyOnWall, true)
            projectileList.push(enemyBullet)
        }
    }
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite3, otherSprite3) {
    EnemyList.removeAt(EnemyList.indexOf(otherSprite3))
    sprites.destroy(sprite3)
    sprites.destroy(otherSprite3)
    explosion = sprites.createProjectileFromSprite(assets.image`clearSprite`, otherSprite3, 0, 0)
    explosion.setKind(SpriteKind.death)
    animation.runImageAnimation(
    explosion,
    assets.animation`explosionAnim`,
    100,
    false
    )
    pause(400)
    sprites.destroy(explosion)
})
let EnemySprite: Sprite = null
let SpawnLocations: tiles.Location[] = []
let enemyBullet: Dart = null
let projectileList: Dart[] = []
let speed3 = 0
let bullet: Dart = null
let explosion: Sprite = null
let EnemyList: Sprite[] = []
let xhair: Sprite = null
let player1: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
player1 = sprites.create(assets.image`playerDef`, SpriteKind.Player)
controller.moveSprite(player1, 100, 100)
player1.setStayInScreen(false)
info.setLife(10)
xhair = sprites.create(assets.image`xhair`, SpriteKind.Crosshair)
controller.player2.moveSprite(xhair, 175, 175)
xhair.setStayInScreen(true)
let CameraSprite = sprites.create(assets.image`clearSprite`, SpriteKind.camera)
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
EnemyList = []
game.onUpdate(function () {
    CameraSprite.setPosition((player1.x + xhair.x) / 2, (player1.y + xhair.y) / 2)
    if (EnemyList.length == 0) {
        SpawnLocations = tiles.getTilesByType(sprites.dungeon.floorLight2)
        for (let index = 0; index < 10; index++) {
            EnemySprite = sprites.create(EnemyImages._pickRandom(), SpriteKind.Enemy)
            tiles.placeOnTile(EnemySprite, SpawnLocations.removeAt(randint(0, SpawnLocations.length - 1)))
            EnemyList.push(EnemySprite)
        }
    }
})
forever(function () {
    if (player1.vx == 0 && player1.vy == 0) {
        speed3 = 0
    } else {
        speed3 = 50
    }
    enemyMov(EnemyList, speed3)
    projMov(speed3, projectileList)
})
