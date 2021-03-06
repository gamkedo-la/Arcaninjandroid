
// The idea of "terrain" is still fairly undecided. To be honest, I'm starting to think this game should have no platforms and only one long ground collider.
// So yeah, this class prob won't be expanded upon too much

terrain = [];
function Terrain (x,y, width,height, movable = false) {

    terrain.push(this);
    
    this.x = x;
    this.y = y;
    var width = width;
    var height = height;

    //var animation = new Animation (this, Images.getImage("groundLong"));
    //var animation;

    this.movable = movable;

    this.collider = new RectCollider(this,width,height);

    this.draw = function () {
        //if (animation) {animation.draw();}
        if (debug) this.collider.draw();
    }

}

var protoGround = new Terrain(120,141, 300,30);

function drawAllTerrain () {
    for (var i = 0, l = terrain.length; i<l; i++){
        terrain[i].draw();
    }
}