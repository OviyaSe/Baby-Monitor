song="";
status="";
object=[];

function preload()
{
	song = loadSound("sound1.mp3");
}

function setup(){
    canvas= createCanvas(380,380);
    canvas.position(550,250);
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects";
    
}

function modelLoaded(){
    console.log("Model Loaded !")
    status=true;
    objectDetector.detect(video,gotResults);
    object=results;   
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } 
    console.log(results); 
    objects = results; 
}

function draw(){
    image(video,0,0,380,380);

    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResults);
        for(i=0; i<object.length; i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of Objects: "+object.length;
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+""+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

            if(object[i].label == "person") {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                console.log("stop"); 
                song.stop();
            } 
            else {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                console.log("play");
                song.play();
            } 
            if(object.length == 0) {
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            console.log("play");
            song.play();
            }
        }
    }
}