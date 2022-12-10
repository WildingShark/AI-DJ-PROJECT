song1="";
song2="";

function preload() { 
    song1 = loadSound("Music 1.mp3");
    song2= loadSound("Music 2.mp3");
 }

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

scoreRightWrist=0;
scoreLeftWrist=0;

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+ rightWristX+ "rightWristY="+ rightWristY);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX= "+leftWristX+ "leftWristY= "+leftWristY);

        scoreRightWrist= results[0].pose.keypoints[10].score;
        scoreLeftWrist= results[0].pose.keypoints[9].score;

        console.log("scoreRightWrist= "+ scoreRightWrist+ "scoreLeftWrist= "+ scoreLeftWrist);
           }

           
}

function play() {
    song.setVolume(1);
    song.rate(1); 
    song.play();

 }

 function draw(){
    image(video,0,0,600,500);

    song1_status= song1.isPlaying();
    song2_status= song2.isPlaying();
   
    fill ("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        
        if(song1_status==false){
            song1.play();
            document.getElementById("song_name").innerHTML="Playing- Peter Pan";
        }
        if(scoreRightWrist>0.2){
            circle(rightWristX,rightWristY,20);
            song1.stop();
            
            if(song2_status==false){
                song2.play();
                document.getElementById("song_name").innerHTML="Playing- Harry Potter Theme";
            }
        
    }
}
 }
    