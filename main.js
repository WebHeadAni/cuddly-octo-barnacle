Objects = [];
Status = "";
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}
function draw(){
    image(video,0,0,480,380);
    if (Status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i< Objects.length; i++){
            document.getElementById("status").innerHTML = " Status: Objects Detected ";
            document.getElementById("numberOfObjects").innerHTML = " Number of Objects detected are:" + Objects.length;
            fill("cyan");
            percent = floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + percent + "% ", Objects[i].x + 15, Objects[i].y + 15);
            noFill();
            stroke("cyan");
            rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height); 

            if(objects[i].label == object_name) { 
                video.stop(); 
                objectDetector.detect(gotResult); 
                document.getElementById("status").innerHTML = object_Name + " Found"; synth = window.speechSynthesis; 
                utterThis = new SpeechSynthesisUtterance(object_Name + "Found"); synth.speak(utterThis); 
            } else {
                 document.getElementById("status").innerHTML = object_Name + " Not Found"; 
                }
        }
    }
}
function gotResults(error, results){
 if(error){
    console.log(error);
 }
 console.log(results);
 Objects = results;
}
function Start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_Name = document.getElementById("object_Name").value;
}
function modelLoaded(){
    console.log("Model Loaded");
    Status = true
}
