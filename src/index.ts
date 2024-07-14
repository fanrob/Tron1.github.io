import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { Scene } from '@babylonjs/core/scene';
import {MeshBuilder} from '@babylonjs/core/Meshes/meshBuilder';
import { GridMaterial } from '@babylonjs/materials/grid/gridMaterial';
import {VolumetricLightScatteringPostProcess} from '@babylonjs/core/PostProcesses/volumetricLightScatteringPostProcess';
import { Texture } from '@babylonjs/core';
import { Material } from '@babylonjs/core';
import { SceneLoader } from '@babylonjs/core';
import "@babylonjs/loaders"

let canvas:HTMLCanvasElement;
let engine:Engine;
let scene:Scene;
let camera:FreeCamera;
class Game {
 
  constructor(){
    canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    engine = new Engine(canvas);
    scene = new Scene(engine);
    camera = new FreeCamera("camera1", new Vector3(0, 0, 0), scene);
    camera.setTarget(new Vector3(0, 2, 30));
    camera.attachControl(canvas, true);
    
    engine.runRenderLoop(this.renderLoop);
  }


  renderLoop(){
    scene.render();
  }
 
  makeCube(x:number,y:number,z:number,size:number){
    let mesh = MeshBuilder.CreateBox("box",{size},scene);
    mesh.position = new Vector3(x,y,z);
    mesh.material = new GridMaterial("grid", scene);
    return mesh;
  }

  makeSkyCrapper(x:number,y:number,z:number,size:number,height:number){
    let mesh = MeshBuilder.CreateBox("sc1",{height:height,size},scene);
    mesh.position = new Vector3(x,y,z);
    mesh.material = new GridMaterial("grid", scene);
    
    return mesh;
  }

  async makeSkyCrapper2(x:number,y:number,z:number){
    const result = await SceneLoader.ImportMeshAsync("","./objs/", "zone2.gltf", scene);
    let env = result.meshes[0];
    env.position = new Vector3(x,y,z);
    let allMeshes = env.getChildMeshes();
  }

  createLightSimple(){
    let light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
  }

  createSun(){
    let godrays = new VolumetricLightScatteringPostProcess('godrays', 1.0, camera, null, 100, Texture.BILINEAR_SAMPLINGMODE, engine, false);
    //godrays.mesh.material.diffuseTexture = new Texture('textures/sun.png', scene, true, false, Texture.BILINEAR_SAMPLINGMODE);
	 // godrays.mesh.material.diffuseTexture.hasAlpha = true;
	  godrays.mesh.position = new Vector3(-150, 150, 0);
    
	  godrays.mesh.scaling = new Vector3(50, 50, 50);

//	light.position = godrays.mesh.position;

  }
}

let PGame = new Game();
/*for (let i=0; i<8; i++)
  for (let j=0; j<8; j++){
    //PGame.makeSkyCrapper(i*15-50,0,j*15-50,10,30);
    PGame.makeSkyCrapper2(i*400-50,0,j*400-50);
  }
*/
PGame.makeSkyCrapper2(50,0,50);
  
PGame.createLightSimple();
PGame.createSun();



