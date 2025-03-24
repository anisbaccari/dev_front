
/* 
           ===== OBJ NAME ========

        Scene :   scene 
        CAMERa :  camera 
        GROUND :   ground 
        LIGHT: light
        LEFTPADDLE: l_paddle
        RIGHTPADDLE: r_paddle
        BALL: ball 
   
        
            ----------------------
                        X , Z, Y
    new BABYLON.Vector3(0, 0, 0)
*/



/* ================= GROUND ================= */



// Create a ground 

 const g_width = 50; 
 const g_height = 30; // depth ???? 
 const g_opt =  { width: g_width, height: g_height }
 const ground = BABYLON.MeshBuilder.CreateGround("ground", g_opt, scene);
 // Create a material for the ground
 const groundMaterial = new BABYLON.StandardMaterial("groundMaterial", scene);
 groundMaterial.diffuseColor = new BABYLON.Color3.Green(); // Set the ground color (R, G, B)
 ground.material = groundMaterial;

 // Add a light source (e.g., directional light)
const light = new BABYLON.DirectionalLight("dirLight", new BABYLON.Vector3(-1, -2, -1), scene);
light.position = new BABYLON.Vector3(10, 10, 10);
// Ensure the ground receives shadows
ground.receiveShadows = true;



/* ================= PADDLES ================= */ 

    //// COLORS 
const paddle_colors = [  
    new BABYLON.Color3.Red(), // Red
    new BABYLON.Color3.Red(), // Red
    new BABYLON.Color3.Red(), // Red
    new BABYLON.Color3.Red(), // Red
    new BABYLON.Color3.Red(), // Red
    new BABYLON.Color3.Red(), // Red
];

    //// DIMENSION
const paddle_width = 1; 
const paddle_height = 1; 
const paddle_depth = 10; 
const l_paddle_pos_x =   (- g_width / 2 ) + (paddle_width/ 2 );
const r_paddle_pos_x =   ( g_width / 2 ) - (paddle_width/ 2 ); 


    //// OPT

const paddle_opt = {
    width: paddle_width, 
    height:paddle_height,
    depth:paddle_depth,
    faceColors: paddle_colors
};


    /// POSITION 
const l_paddle = BABYLON.MeshBuilder.CreateBox("left paddle",paddle_opt,scene);
l_paddle.position = new BABYLON.Vector3( l_paddle_pos_x, 0, 0); 

const r_paddle = BABYLON.MeshBuilder.CreateBox("Right paddle",paddle_opt,scene);
r_paddle.position = new BABYLON.Vector3(r_paddle_pos_x, 0, 0); 

/* ================= BALLS ================= */ 



/// DIMENSION 
const b_diameter = 1 ; 
const ball  = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: b_diameter }, scene);



// Initial ball movement vectors
let ballSpeed = 0.3;
let ballDirection = new BABYLON.Vector3(ballSpeed, 0, ballSpeed);

ball.position = new BABYLON.Vector3(0, b_diameter/2,0);

// Create a shadow generator
const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
shadowGenerator.addShadowCaster(ball); // Make the sphere cast shadows
shadowGenerator.useBlurExponentialShadowMap = true; // Optional: Enable soft shadows

