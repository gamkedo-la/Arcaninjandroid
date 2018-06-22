
// Kangarobot definition
function Kangarobot (x,y) {

    var char = new Character(x,y);

    char.idleAnim = new Animation(char,Images.getImage("kangarobotIdle"),kangarobotIdleData, {loop : true});
    char.jumpAnim = new Animation(char,Images.getImage("kangarobotJump"),kangarobotJumpData, {loop : true});
    char.walkAnim = new Animation(char,Images.getImage("kangarobotWalk"),kangarobotWalkData, {loop : true});
    char.punchAnim = new Animation(char,Images.getImage("kangarobotPunch"),kangarobotPunchData);
    char.uppercutAnim = new Animation(char,Images.getImage("kangarobotUppercut"),kangarobotUppercutData);
    char.crouchAnim = new Animation(char,Images.getImage("kangarobotCrouch"),kangarobotCrouchData, {loop : true});
    char.stunnedAnim = new Animation(char,Images.getImage("kangarobotStunned"),kangarobotStunnedData, {loop : true});

    char.walkSpeed = 0.75;

    var states = new EnemyStates(char);
    
    char.initMachine(states);

    var enemyXP = new XPclass();
    var enemyStats = new StatsClass(enemyXP.getCurrentLVL(), 1.0,1.0,1.0);
    enemyStats.setStats();

    return char;
}

// Demo until we have a level format with spawn points etc.
var kangarobot = new Kangarobot(150,60);
var kangarobot2 = new Kangarobot(50,60);
kangarobot.flipped = true;