// store the score 
/* 
                AXIS                ---     OPT   -- 
                z : avant-arrier  <===> { height }  <===>
                x : gauche - droite  <===> { width }  <===>  
                y : haut - bas  

    ----------------------
                        X , Z, Y
    new BABYLON.Vector3(0, 0, 0)

    How to handle collision ? 
        limit betwen x0 = -(paddle_z )
                     xn = ground-height - (paddle_z) / 2 


*/
let r_score = 0;
let l_score = 0;
//// BALL 
let ballPosition =new BABYLON.Vector3(0.2, b_diameter/2, 0.1);


////// WHY by 2 ...
const minZ = - g_height + (paddle_depth * 2 ); 
const maxZ = g_height - (paddle_depth * 2 ); 
// Function to reset the ball 
function resetBall()
{
    ball.position = new BABYLON.Vector3(0, b_diameter, 0);
    // Randomize the initial direction on reset
    ballDirection.x = (Math.random() > 0.5 ? 1 : -1) * ballSpeed;
    ballDirection.z = (Math.random() > 0.5 ? 1 : -1) * ballSpeed;
}

//Handle score 

function handleScore()
{
    if( r_score > 2 || l_score > 2)
        stopGame();
}

function stopGame() {
    isGameRunning = false;
    engine.stopRenderLoop(); // Stops rendering
    console.log("Rendering stopped!");
}

// handle BALL mouvememt
function ballMovement()
{

    // Move the ball
    ball.position.addInPlace(ballDirection)
    ball.position.x+=0.1
    /*========== COLLISSION =========== */

     /* :::::: WALL ::::::: */
    // For simplicity, we’ll use z boundaries for vertical limits:
    if (ball.intersectsMesh(r_paddle, false)) {
   //     ballDirection.z *= -1; // Reverse the Y direction (bounce effect)   
        ballDirection.x *= -1;
        ballDirection.y *= -1;
        console.log(" *** R paddle ! **** ");
        return;
    }
   else if (ball.intersectsMesh(l_paddle, false)) {
     //   ballDirection.z *= -1; // Reverse the Y direction (bounce effect)   
        ballDirection.x *= -1; 
        ballDirection.y *= -1;
        console.log(" *** L paddle ! **** ");
        return;
    }
    if (ball.position.z < minZ || ball.position.z > maxZ) {
        ballDirection.z *= -1;
        return;
        }
        /* 
   else  if (ball.position.x < -g_width/2|| ball.position.x > g_width/2) {
        if(ball.position.x < -g_width/2){
            if(ball.intersectsMesh(r_paddle, false))
                ballDirection.z *= -1; // Reverse the Y direction (bounce effect)   
            else {
                r_score++;
                resetBall()
                console.log("R scored"); 
                return;

            }
        }
        else{
            if(ball.intersectsMesh(l_paddle, false))
                ballDirection.z *= -1; // Reverse the Y direction (bounce effect)   
            else {
                l_score++;
                resetBall()
                console.log("L scored"); 
                return;


            }
        }
      //  ballDirection.x *= -1;
    }
  */
   // console.log("SCORE\n R:",r_score);
   // console.log("SCORE\n l:",l_score);
}


// Handle paddle mouvement
function paddleMovement()
{

    //console.log("valuye : ",- g_height + (paddle_depth * 2 ))
    if (moveUpR) {
        r_paddle.position.z += paddleSpeed;
        
    }
    if (moveDownR){ 
        r_paddle.position.z -= paddleSpeed;
        
    } 
    if (moveUpL) {
        l_paddle.position.z += paddleSpeed;
    }
    if (moveDownL) {l_paddle.position.z -= paddleSpeed;}
    




    // Limit paddles within the scene (assuming ground level y = 0 and ceiling at y = 25)
    l_paddle.position.z = BABYLON.Scalar.Clamp(l_paddle.position.z, minZ, maxZ );
    r_paddle.position.z = BABYLON.Scalar.Clamp(r_paddle.position.z, minZ,maxZ);
      
}
// Main logic Game 
scene.onBeforeRenderObservable.add(() => {

   
    paddleMovement();
    ballMovement();
    /*
    handleScore(); */

});