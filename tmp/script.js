// BASED ELEMENT
const canvas  = document.getElementById('renderCanvas'); 
const engine = new BABYLON.Engine(canvas); 
let isRendering = true;

const createScene = function(){

    const scene = new BABYLON.Scene(engine);
    
    // Create a free camera and position it
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 10, -100), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
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

