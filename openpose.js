var fs = require('fs');
var gm = require('gm');

function main() {
    // Get first image's path
    var imagePath = "";
    var imageName = "";
    fs.readdirSync('./examples').forEach(file => {
        var path = require('path');
        if (path.extname(file) == '.jpg' || path.extname(file) == '.png')
            imagePath = file;
    });

    imageName += imagePath.slice(0, -4);

    // Run openpose
    //runOpenPose("./examples/", "./output/");

    jsonPath = "./output/" + imageName + "_keypoints.json";
    var poseData = extractAngles(jsonPath);

    // Pose data
    console.log("Pose angles:");
    console.log(poseData);

    //convert to grayscale
    console.log('Converting to greyscale');

    gm('./examples/imagePath')
        .resizeExact(100, 100)
        .write('./examples/imageName' + '_gray.jpg', function (err) {
            if (!err) console.log('done');
    });
    

}


/*
Main command:./OpenPoseDemo.exe
Arguments:  --image_dir [DIRECTORY]
            --write_images [DIRECTORY]
            --write_keypoint_json [DIRECTORY]
            --no_display
*/
function runOpenPose(inputDir, outputDir) {
    console.log("Running OpenPose on " + inputDir)
    'use strict';
    const
        { spawnSync } = require( 'child_process' ),
        ls = spawnSync( './openPoseDemo.exe', [ '--image_dir', inputDir,
                                                '--write_keypoint_json', outputDir,
                                                '--no_display'] );
    console.log('Done');
}


/*
Takes in a path to a .JSON file that has pose data
Outputs an array with the following angles
Angle definition can be found near getAngle() declaration below
    neck
    l_shoulder
    r_shoulder
    l_arm
    r_arm
    l_farm
    r_farm
    l_spine
    r_spine
    1_thigh
    r_thigh
    l_leg
    r_leg
*/
function extractAngles(poseDataPath) {
    // Read JSON file
    var openposeData = JSON.parse(fs.readFileSync(poseDataPath, 'utf8'));
    // Extract pose data
    // Array of 54 numbers    
    var keypoints = openposeData.people[0].pose_keypoints;

    /*
    Reference for reading keypoint array
    https://github.com/CMU-Perceptual-Computing-Lab/openpose/blob/master/doc/media/keypoints_pose.png
    X = x coord
    Y = y coord
    C = confidence

    #  X  Y  C
    0  0  1  2
    1  3  4  5
    2  6  7  8
    3  9  10 11
    4  12 13 14
    5  15 16 17
    6  18 19 20
    7  21 22 23
    8  24 25 26
    9  27 28 29
    10 30 31 32
    11 33 34 35
    12 36 37 38
    13 39 40 41
    ...
    */

    var neck =          getAngle(keypoints[3],  keypoints[4],  keypoints[0],  keypoints[1]);
    var l_shoulder =    getAngle(keypoints[3],  keypoints[4],  keypoints[15], keypoints[16]);
    var r_shoulder =    getAngle(keypoints[3],  keypoints[4],  keypoints[6],  keypoints[7]);
    var l_arm =         getAngle(keypoints[15], keypoints[16], keypoints[18], keypoints[19]);
    var r_arm =         getAngle(keypoints[6],  keypoints[7],  keypoints[9],  keypoints[10]);
    var l_farm =        getAngle(keypoints[18], keypoints[19], keypoints[21], keypoints[22]);
    var r_farm =        getAngle(keypoints[9],  keypoints[10], keypoints[12], keypoints[13]);
    var l_spine =       getAngle(keypoints[3],  keypoints[4],  keypoints[33], keypoints[34]);
    var r_spine =       getAngle(keypoints[3],  keypoints[4],  keypoints[24], keypoints[25]);
    var l_thigh =       getAngle(keypoints[33], keypoints[34], keypoints[36], keypoints[37]);
    var r_thigh =       getAngle(keypoints[24], keypoints[25], keypoints[27], keypoints[28]);
    var l_leg =         getAngle(keypoints[36], keypoints[37], keypoints[39], keypoints[40]);
    var r_leg =         getAngle(keypoints[27], keypoints[28], keypoints[30], keypoints[31]);

    var output = [neck,
                  l_shoulder,
                  r_shoulder,
                  l_arm,
                  r_arm,
                  l_farm,
                  r_farm,
                  l_spine,
                  r_spine,
                  l_thigh,
                  r_thigh,
                  l_leg,
                  r_leg];
    return output;
}


/*
Returns an angle between two points. Angle is determined as the following:

Degree  Shape (points 1 and 2)
-------------
        2
0       |
        1
-------------
          2
30       /
        1
-------------

90      1--2

-------------
        1
180     |
        2
-------------
        
270  2--1

-------------
*/
function getAngle(x1, y1, x2, y2) {
    // Convert lines to vectors
    var vectorX = x2 - y1;
    var vectorY = y2 - y1;
    var magnitude = Math.pow((Math.pow(vectorX, 2) + Math.pow(vectorY, 2)), 0.5);

    var angle = radiansToDegrees(Math.acos(vectorY / magnitude));
    if (x2 >= x1)
        return angle;
    return 360 - angle;
}

function radiansToDegrees(radians) {
    return (radians * 180 / Math.PI);
}

function degreesToRadians(degrees) {
    return (degrees * Math.PI / 180);
}


// Execute
main();

