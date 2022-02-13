function setup(){
    canvas= createCanvas(500 , 400);
    canvas.center();
    background("white");
     canvas.mouseReleased(classifyCanvas);
     synth=window.speechSynthesis;
}
function clearCanvas(){
    background("white")
}
function classifyCanvas(){
    classifier.classify(canvas, gotResult);
    
}
function preload(){
    classifier=ml5.imageClassifier('Doodle Net');
}
function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function gotResult(error , results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById('label').innerHTML='Label: ' + results[0].label;
    document.getElementById('confidence').innerHTML='confidence: ' + Math.round(results[0].confidence * 100) + '%';
    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}