import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { Scene } from '@babylonjs/core/scene';
import {MeshBuilder} from '@babylonjs/core/Meshes/meshBuilder';
import { GridMaterial } from '@babylonjs/materials/grid/gridMaterial';


let canvas:HTMLCanvasElement;
let engine:Engine;
let scene:Scene;

class Game {
 
  constructor(){
    canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    engine = new Engine(canvas);
    scene = new Scene(engine);
    let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, true);
    
    engine.runRenderLoop(this.renderLoop);
  }


  renderLoop(){
    scene.render();
  }

  makeCube(x:number,y:number,size:number){
    let mesh = MeshBuilder.CreateBox("box",{size},scene);
    mesh.material = new GridMaterial("grid", scene);
    return mesh;
  }

  createLightSimple(){
    let light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
  }

}

let PGame = new Game();
PGame.makeCube(0,-100,10);
PGame.createLightSimple();




