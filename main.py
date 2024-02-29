@namespace
class SpriteKind:
    Crosshair = SpriteKind.create()
    camera = SpriteKind.create()
    death = SpriteKind.create()
    enemyProjectile = SpriteKind.create()

def on_up_pressed():
    animation.run_image_animation(player1,
        [img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """)],
        100,
        True)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_on_overlap(sprite, otherSprite):
    sprites.destroy(sprite)
    info.change_life_by(-1)
    scene.camera_shake(4, 500)
sprites.on_overlap(SpriteKind.enemyProjectile, SpriteKind.player, on_on_overlap)

def on_a_pressed():
    global bullet
    bullet = darts.create(assets.image("""
            projectile
        """),
        SpriteKind.projectile,
        player1.x,
        player1.y)
    bullet.angle = 0 - spriteutils.radians_to_degrees(spriteutils.angle_from(player1, xhair))
    bullet.pow = speed3 * 4
    bullet.gravity = 0
    bullet.throw_dart()
    bullet.set_flag(SpriteFlag.DESTROY_ON_WALL, True)
    projectileList.append(bullet)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def enemyMov(enemylist: List[Sprite], speed: number):
    for value in enemylist:
        if spriteutils.distance_between(value, player1) <= 100:
            value.follow(player1, speed)
            enemyAtt(enemylist, speed)

def on_left_pressed():
    animation.run_image_animation(player1,
        [img("""
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
            """),
            img("""
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
            """),
            img("""
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
            """)],
        100,
        True)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_left_released():
    animation.stop_animation(animation.AnimationTypes.ALL, player1)
    player1.set_image(img("""
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
    """))
controller.left.on_event(ControllerButtonEvent.RELEASED, on_left_released)

def on_on_overlap2(sprite2, otherSprite2):
    global explosion
    EnemyList.remove_at(EnemyList.index(sprite2))
    info.change_life_by(-1)
    scene.camera_shake(4, 500)
    sprites.destroy(sprite2)
    explosion = sprites.create_projectile_from_sprite(assets.image("""
        clearSprite
    """), sprite2, 0, 0)
    explosion.set_kind(SpriteKind.death)
    animation.run_image_animation(explosion,
        assets.animation("""
            explosionAnim
        """),
        100,
        False)
    pause(500)
    sprites.destroy(explosion)
sprites.on_overlap(SpriteKind.enemy, SpriteKind.player, on_on_overlap2)

def on_up_released():
    animation.stop_animation(animation.AnimationTypes.ALL, player1)
    player1.set_image(img("""
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
    """))
controller.up.on_event(ControllerButtonEvent.RELEASED, on_up_released)

def on_life_zero():
    game.set_game_over_message(False, "bruh")
    game.game_over(False)
info.on_life_zero(on_life_zero)

def projMov(speed2: number, projList: List[Dart]):
    for value2 in projList:
        value2.pow = speed2 * 4
        value2.throw_dart()
def enemyAtt(list2: List[Sprite], num: number):
    global enemyBullet
    for value3 in list2:
        if randint(0, 500) == 1 and (speed3 != 0 and spriteutils.distance_between(value3, player1) <= 100):
            enemyBullet = darts.create(assets.image("""
                    enemyProj
                """),
                SpriteKind.projectile,
                value3.x,
                value3.y)
            enemyBullet.angle = 0 - spriteutils.radians_to_degrees(spriteutils.angle_from(value3, player1))
            enemyBullet.pow = speed3 * 4
            enemyBullet.gravity = 0
            enemyBullet.throw_dart()
            enemyBullet.set_kind(SpriteKind.enemyProjectile)
            enemyBullet.set_flag(SpriteFlag.DESTROY_ON_WALL, True)
            projectileList.append(enemyBullet)

def on_on_overlap3(sprite3, otherSprite3):
    global explosion
    EnemyList.remove_at(EnemyList.index(otherSprite3))
    sprites.destroy(sprite3)
    sprites.destroy(otherSprite3)
    explosion = sprites.create_projectile_from_sprite(assets.image("""
        clearSprite
    """), otherSprite3, 0, 0)
    explosion.set_kind(SpriteKind.death)
    animation.run_image_animation(explosion,
        assets.animation("""
            explosionAnim
        """),
        100,
        False)
    pause(400)
    sprites.destroy(explosion)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap3)

EnemySprite: Sprite = None
SpawnLocations: List[tiles.Location] = []
enemyBullet: Dart = None
explosion: Sprite = None
projectileList: List[Dart] = []
speed3 = 0
bullet: Dart = None
EnemyList: List[Sprite] = []
xhair: Sprite = None
player1: Sprite = None
tiles.set_current_tilemap(tilemap("""
    level1
"""))
player1 = sprites.create(assets.image("""
    playerDef
"""), SpriteKind.player)
controller.move_sprite(player1, 100, 100)
player1.set_stay_in_screen(False)
info.set_life(10)
xhair = sprites.create(assets.image("""
    xhair
"""), SpriteKind.Crosshair)
controller.player2.move_sprite(xhair, 150, 150)
xhair.set_stay_in_screen(True)
CameraSprite = sprites.create(assets.image("""
    clearSprite
"""), SpriteKind.camera)
scene.camera_follow_sprite(CameraSprite)
EnemyImages = [img("""
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
    """),
    img("""
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
    """),
    img("""
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
    """)]
EnemyList = []

def on_on_update():
    global SpawnLocations, EnemySprite
    CameraSprite.set_position((player1.x + xhair.x) / 2, (player1.y + xhair.y) / 2)
    if len(EnemyList) == 0:
        SpawnLocations = tiles.get_tiles_by_type(sprites.dungeon.floor_light2)
        for index in range(10):
            EnemySprite = sprites.create(EnemyImages._pick_random(), SpriteKind.enemy)
            tiles.place_on_tile(EnemySprite,
                SpawnLocations.remove_at(randint(0, len(SpawnLocations) - 1)))
            EnemyList.append(EnemySprite)
game.on_update(on_on_update)

def on_forever():
    global speed3
    if player1.vx == 0 and player1.vy == 0:
        speed3 = 0
    else:
        speed3 = 50
    enemyMov(EnemyList, speed3)
    projMov(speed3, projectileList)
forever(on_forever)
