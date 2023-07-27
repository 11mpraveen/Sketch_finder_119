function setup(){
    canvas = createCanvas(380,380)
    canvas.center()
    background("white")
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
classifier = "";

function preload(){
    classifier = ml5.imageClassifier('DoodleNet');
}



function clearcanvas(){
    background("white")
}

function draw(){
    strokeWeight(13)
    stroke(0)
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    document.getElementById("label_object").innerHTML = results[0].label;
    document.getElementById("confidence").innerHTML = Math.floor(results[0].confidence*100)+"%";

    utterThis = SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}
}