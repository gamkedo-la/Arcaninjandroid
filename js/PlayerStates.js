
////    All states (ie slick moves and abilities) of the player will be created here. Depending on size, might be split into separate files (for Arcane, Ninja and Android perhaps)

/////    Good format:
// mySheet = new SpriteSheet (...)
// function MyState () {...} (also give the spritesheet in this.animation)
// MyState.prototype = baseState;
// ADD to PlayerStates at the end of the file, just like shown
// Give it to the player and try it out! :D

var baseState = new State(); //give a reference to this state when declaring your custom state's prototype (see above, or below...)


////       Basic, idle Android state        ////

idleSheet = new SpriteSheet(Images.getImage("PH_Android_Idle"), 1, 2);
function IdleAndroidState(parent,relatedStates) {
    var parent = parent;
    var states = relatedStates;
    //console.log(parent.velocity);
    this.animation = new Animation(idleSheet, { loop: true });
    
    this.update = function () {
        //console.log(parent);
        parent.x += parent.velocity.x;
        parent.y += parent.velocity.y;

        //apply some gravity. Fun fact: often times our super awesome main character will flat out ignore gravity,
        //so I feel it's ok to add it (perhaps multiple times) in the update functions of different states
        parent.velocity.y += 0.75;

        parent.velocity.x *= 0.85;
        parent.velocity.y *= 0.85;
        if (Math.abs(parent.velocity.x) < 0.1) parent.velocity.x = 0;
        if (Math.abs(parent.velocity.y) < 0.1) parent.velocity.y = 0;

    }

    this.handleInput = function () {

        if (Input.getLeftClick()) {
            return states.punchingState;
        }

        // Basic movement
        if (Input.getKey("w")) {
            return states.jumpState;
        } else if (Input.getKey("s")) {
            return states.crouchState;
        }

        if (Input.getKey("a")) {
            parent.velocity.x = -parent.walkSpeed;
        } else if (Input.getKey("d")) {
            parent.velocity.x = parent.walkSpeed;
        }
    }

    this.enter = function () {
    }
    this.exit = function () {
    }
}
IdleAndroidState.prototype = baseState;




///////////////////       Android crouch state       ////////////////////////
crouchSheet = new SpriteSheet(Images.getImage("PH_Android_Crouch"), 1, 1);
function CrouchState(parent,relatedStates) {
    var parent = parent;
    var states = relatedStates;

    this.animation = new Animation(crouchSheet);

    this.update = function () {
    }

    this.handleInput = function () {

        if (Input.getKey("s") === false) {
            return "previous";
        }

        if (Input.getLeftClick()) {
            return states.uppercutState;
        }
    }

    this.enter = function () {
    }
    this.exit = function () {
    }
}
CrouchState.prototype = baseState;




///////////////////       Android jump state      ////////////////////////
jumpSheet = new SpriteSheet(Images.getImage("PH_Android_Idle"), 1, 2); //replace with jump at some point
function JumpState(parent,relatedStates) {
    var parent = parent;
    var states = relatedStates;

    this.animation = new Animation(jumpSheet,{loop:true});
    this.fastfall = false;

    this.update = function () {
        if (this.fastfall === false) {
            parent.velocity.y += 0.45;
        } else {
            parent.velocity.y += 2;
        }
        parent.x += parent.velocity.x;
        parent.y += parent.velocity.y;

        parent.velocity.x *= 0.85;
        parent.velocity.y *= 0.85;


        if (Math.abs(parent.velocity.x) < 0.1) parent.velocity.x = 0;
        if (Math.abs(parent.velocity.y) < 0.1) parent.velocity.y = 0;

        
        if (parent.grounded) {
            //console.log("touch ground");
            return states.idleAndroidState;
        }
    }

    this.handleInput = function () {

        // Dampen the apex of the jump (thanks Matt Thorson!)
        if (Input.getKey("w")) {
            if (Math.abs(parent.velocity.y) <=1.6){
                //console.log("damp");
                parent.velocity.y -= 0.2;
            }
        }

        if (Input.getKeyDown("s")) {
            this.fastfall = true;
            new ParticleEmitter(parent.x-10, parent.y-15,fastFallParticlesConfig); //spawn fast fall blinking particles (visual only)
        }

        if (Input.getKey("a")) {
            parent.velocity.x = -parent.walkSpeed;
        } else if (Input.getKey("d")) {
            parent.velocity.x = parent.walkSpeed;
        }

    }

    this.enter = function () {
        //console.log("enter");
        this.fastfall = false;
        parent.velocity.y = -parent.jumpVelocity;
        parent.grounded = false;
        parent.y -= 10;
    }
    this.exit = function () {
    }
}
JumpState.prototype = baseState;



////////////////////       Android regular punch state      /////////////////////////
punchingSheet = new SpriteSheet(Images.getImage("PH_Android_Punch"), 1, 2);
function PunchingState(parent,relatedStates) {
    var parent = parent;
    var states = relatedStates;

    this.animation = new Animation(punchingSheet, { fps: 16 });

    this.update = function () {
        // not applying gravity here is a feature, not an error
    }

    this.handleInput = function () {

        if (this.animation.isActive === false) {
            return "previous";
        }
    }

    this.enter = function () {
    }

    this.exit = function () {
    }
};
PunchingState.prototype = baseState;


///////////////     Android uppercut (colloquially known as the "Sho-ryu-ken")      ///////////////
uppercutSheet = new SpriteSheet(Images.getImage("PH_Android_Uppercut"), 1,1);
function UppercutState(parent,relatedStates) {

    var parent = parent;
    var states = relatedStates;

    this.animation = new Animation(uppercutSheet);
    

    this.update = function () {

        if (parent.grounded) {
            return states.idleAndroidState;
        }

        parent.velocity.y += 0.45;

        parent.x += parent.velocity.x;
        parent.y += parent.velocity.y;

        parent.velocity.x *= 0.85;
        parent.velocity.y *= 0.85;
        if (Math.abs(parent.velocity.x) < 0.1) parent.velocity.x = 0;
        if (Math.abs(parent.velocity.y) < 0.1) parent.velocity.y = 0;
    }

    this.handleInput = function () {

    }

    this.enter = function () {

         parent.velocity.y = -parent.jumpVelocity;
         parent.grounded = false;
         parent.y -= 10;

         new ParticleEmitter(parent.x+10, parent.y-25,fastFallParticlesConfig);
    }

    this.exit = function () {
    }

};
UppercutState.prototype = baseState;


// parent must be a Character
function PlayerStates(parent) {

    // Might refactor?
    this.idleAndroidState = new IdleAndroidState(parent,this);
    this.crouchState = new CrouchState(parent,this);
    this.uppercutState = new UppercutState(parent,this);
    this.punchingState = new PunchingState(parent,this);
    this.jumpState = new JumpState(parent,this);

    this.initial = this.idleAndroidState;
}

function DummyStates() {

}