let r_score = 0;
let l_score = 0;
//// BALL 
let b_diameter = 1 ; 
let ballPosition =new BABYLON.Vector3(0.2, b_diameter/2, 0.1);


////// WHY by 2 ...
let minZ = - g_height + (paddle_depth * 2 ); 
let maxZ = g_height - (paddle_depth * 2 ); 

