objects = [];
video = "";
status = "";
function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas = createCanvas(450, 390);
    canvas.center();

}

function draw(){
    image(video, 0, 0, 450, 390);
    if (status != ""){
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("num_of_obj").innerHTML = "Number of objects: "+objects.length;
            percent = floor(objects[i].confidence * 100);
            fill("#f54242");
            text(objects[i].label + " " + percent + " %", objects[i].x, objects[i].y);
            noFill();
            stroke("#f54242");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded());
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error, results){
    if (error){
        console.error(error);
    }
    else{
        // console.log(results);
        objects = results;
    }
}