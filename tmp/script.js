// BASED ELEMENT
const canvas  = document.getElementById('renderCanvas'); 
const engine = new BABYLON.Engine(canvas); 
let isRendering = true;

const createScene = function(){

    const scene = new BABYLON.Scene(engine);
    
    // Create a free camera and position it
    //const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10, -100), scene);
    
    const camera = new BABYLON.ArcRotateCamera(
      "camera1", 
      Math.PI /2, // Alpha (rotation around Y-axis)
     - Math.PI , // Beta (rotation around X-axis, top-down view)
      80,          // Radius (distance from the target)
      new BABYLON.Vector3(0, 0, 0), // Target (center of the ground)
      scene
  );
    camera.setTarget(BABYLON.Vector3.Zero());
  //  camera.attachControl(canvas, true);
   camera.inputs.removeByType("FreeCameraKeyboardMoveInput"); 
      camera.inputs.addMouseWheel();
    
    // Add a hemispheric light
    const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.8;



   return scene;
     
}

const scene = createScene(); 

 engine.runRenderLoop(function(){
    if(isRendering)
        scene.render();
 });

 window.addEventListener('resize', function(){
    engine.resize();


 });

