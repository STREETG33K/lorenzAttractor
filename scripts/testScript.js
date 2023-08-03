let boids = [];

// BOID PARAMETERS
let nBoids = 250;
let maxSpeed = 3;
let maxForce = 0.05;

let sepMult = 2.5;
let alignMult = 1.0;
let cohMult = 1.0;

let dirX = 0;
let dirY = 0;
let dirCoor = [0,0];

let curColor = 212
let color;

let trail = 0;
//let color = [100];


let slider1;
let slider2;
let slider3;
let slider4;
let slider5;

let sliderR;
let sliderG;
let sliderB;


function setup() {
    createCanvas(800, 800);
    for(let i = 0; i < nBoids; i++){
        boids[i] = new Boid(random(width), random(height));
    }


    slider1 = createSlider(0.1,10,2.5,0);
    slider1.position(10,10);
    slider1.style('width', '80px');

    slider2 = createSlider(0.1,10,1.0,0);
    slider2.position(100,10);
    slider2.style('width', '80px');

    slider3 = createSlider(0.1,10,1.0,0);
    slider3.position(190,10);
    slider3.style('width', '80px');

    slider4 = createSlider(-0.02,0.02,0,0);
    slider4.position(280,10);
    slider4.style('width', '80px');

    slider5 = createSlider(-0.02,0.02,0,0);
    slider5.position(280,30);
    slider5.style('width', '80px');

    sliderR = createSlider(0,255,212,0);
    sliderR.position(370,10);
    sliderR.style('width', '80px');

    sliderG = createSlider(0,255,24,0);
    sliderG.position(370,30);
    sliderG.style('width', '80px');

    sliderB = createSlider(0,255,112,0);
    sliderB.position(370,50);
    sliderB.style('width', '80px');

    slider6 = createSlider(0,255,212,0);
    slider6.position(10,30);
    slider6.style('width', '170px');


}
function draw() {

    sepMult = slider1.value();
    alignMult = slider2.value();
    cohMult = slider3.value();

    dirX = slider5.value();
    dirY = slider4.value();
    dirCoor = [dirX,dirY];

    color = [sliderR.value(),sliderG.value(),sliderB.value()];

    trail = slider6.value();


    background(10, trail);
    for(let i = 0; i < boids.length; i++){
        boids[i].run(boids);
    }
}

class Boid {
    constructor(x, y) {
        this.acceleration = createVector(0, 0);
        this.velocity = p5.Vector.random2D();
        this.position = createVector(x, y);
        this.r = 3.0;
    }

    run(boids){
        this.flock(boids);
        this.update();
        this.borders();
        this.render();
    }

    flock(boids){
        this.applyForce(this.separate(boids).mult(sepMult));
        this.applyForce(this.align(boids).mult(alignMult));
        this.applyForce(this.cohesion(boids).mult(cohMult));
        this.applyForce(dirCoor);
    }
    applyForce(force){
        this.acceleration.add(force);
    }

    update(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    borders(){
        if (this.position.x < -this.r) this.position.x = width + this.r;
        if (this.position.y < -this.r) this.position.y = height + this.r;
        if (this.position.x > width + this.r) this.position.x = -this.r;
        if (this.position.y > height + this.r) this.position.y = -this.r;
    }

    render(){
        //let newColor = [random(0,255),color[1],color[2]]

        fill(color);
        stroke(random(0,255),color[1],color[2],random(0,15));
        ellipse(this.position.x, this.position.y, 25, 25);
    }



    seek(target){
        let desired = p5.Vector.sub(target, this.position).normalize().mult(maxSpeed);
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(maxForce);
        return steer;
    }

    separate(boids) {
        let desiredseparation = 25.0;
        let steer = createVector(0, 0);
        let count = 0;
        // For every boid in the system, check if it's too close
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position);
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                let diff = p5.Vector.sub(this.position, boids[i].position);
                diff.normalize();
                diff.div(d); // Weight by distance
                steer.add(diff);
                count++; // Keep track of how many
            }
        }
        // Average -- divide by how many
        if (count > 0) {
            steer.div(count);
        }

        // As long as the vector is greater than 0
        if (steer.mag() > 0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.normalize();
            steer.mult(maxSpeed);
            steer.sub(this.velocity);
            steer.limit(maxForce);
        }
        return steer;
    }

    align(boids){
        let neighbordist = 50;
        let sum = createVector(0, 0);
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].velocity);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(maxSpeed);
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(maxForce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }

    cohesion(boids){
        let neighbordist = 50;
        let sum = createVector(0, 0); // Start with empty vector to accumulate all locations
        let count = 0;
        for (let i = 0; i < boids.length; i++) {
            let d = p5.Vector.dist(this.position, boids[i].position);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(boids[i].position); // Add location
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            return this.seek(sum); // Steer towards the location
        } else {
            return createVector(0, 0);
        }
    }
}