import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Scene } from '@babylonjs/core/scene';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { GridMaterial } from '@babylonjs/materials/grid/gridMaterial';
const canvas = document.getElementById("renderCanvas");
const engine = new Engine(canvas);
let scene = new Scene(engine);
let camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
camera.setTarget(Vector3.Zero());
camera.attachControl(canvas, true);
let light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
light.intensity = 0.7;
let material = new GridMaterial("grid", scene);
const mesh = MeshBuilder.CreateBox("box", { size: 1 }, scene);
// Render every frame
engine.runRenderLoop(() => {
    scene.render();
});
