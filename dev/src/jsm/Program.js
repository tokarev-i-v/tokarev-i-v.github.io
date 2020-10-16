
import * as THREE from './three.module';
import {ColladaLoader} from  "./ColladaLoader.js"
import {OrbitControls} from './OrbitControls';
import Stats from './stats.module';
import {Detector} from './Detector';
import {CreditsInfoBox} from './CreditsInfoBox';
class Program {
  constructor() {
    this.animate = this.animate.bind(this);

    this.WORLD_CUBE = {
      SCALES_SIZE: {
        x: 10000,
        y: 10000,
        z: 10000
      }
    };

    if (!Detector.webgl) Detector.addGetWebGLMessage();

    this.init();
    this.animate();
  }
  init() {
    this.container = document.getElementById("container");

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xaaccff);
    this.scene.fog = new THREE.FogExp2(0xaaccff, 0.0007);
    this.clock = new THREE.Clock();

    this.camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth/5*4 / window.innerHeight,
      1,
      1000
    );
    this.camera.position.set(10, 10, 70);
    this.camera.lookAt(this.scene.position);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth/5*4, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    // collada

    let loader = new ColladaLoader();

    loader.load("./forest_more_woods.dae", collada => {
      this.scene.add(collada.scene);
      //					scene.add(scene_copy1, scene_copy2);
    });

    loader.load("./fox_sits_1.dae", collada => {
      let animations = collada.animations;
      this.avatar = collada.scene;
      this.avatar.position.set(1, 0.3, 0.1);
      collada.scene.children[1].material.color = new THREE.Color(0x111111);
      collada.scene.children[1].material.needsUpdate = true;

      this.mixer = new THREE.AnimationMixer(this.avatar);
      this.action = this.mixer.clipAction(animations[0]).play();

      this.scene.add(this.avatar);
    });

    //			var startexture = new THREE.ImageUtils.loadTexture("./bg_1_1.png");
    let spotlight = new THREE.SpotLight(0xffffff, 0.1);
    spotlight.position.set(100, 100, 0);
    this.scene.add(spotlight);
    spotlight = new THREE.SpotLight(0xffff11, 0.05);
    spotlight.position.set(-100, -100, 0);
    this.scene.add(spotlight);

    let ambientlight = new THREE.AmbientLight(0xffffff, 18);
    this.scene.add(ambientlight);

    //

    this.controls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.controls.target.set(0, 2, 0);
    this.controls.update();

    //

    this.stats = new Stats();
    this.container.appendChild(this.stats.dom);

    //

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth/5*4 / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth/5*4, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate);

    this.render();
    this.stats.update();
  }

  render() {
    let delta = this.clock.getDelta();

    if (this.mixer !== undefined) {
      this.mixer.update(delta);
    }

    this.renderer.render(this.scene, this.camera);
  }

  clouds_update() {
    for (let i = 0; i < this.clouds_array.length; i++) {
      if (this.clouds_array[i].position.y >= this.WORLD_CUBE.SCALED_SIZE.y) {
        this.clouds_array[i].position.x =
          (Math.random() - 0.5) * this.WORLD_CUBE.SCALED_SIZE.x;
        this.clouds_array[i].position.y = -0.5 * this.WORLD_CUBE.SCALED_SIZE.y;
        this.clouds_array[i].position.z =
          (Math.random() - 0.5) * this.WORLD_CUBE.SCALED_SIZE.z;
        //clouds_array[i].material.color.set(0xffffff*Math.random());
        this.clouds_array[i].MoveSpeed = Math.random() * 5;
      } else {
        this.clouds_array[i].position.y += this.clouds_array[i].MoveSpeed;
      }
    }
  }

  clouds_resetPositionsAndColors() {
    for (let i = 0; i < this.FLYING_OBJECTS.NEAREST_OBJECTS_COUNT; i++) {
      //clouds_array[i].material.color = 0xffffff*Math.random();
      this.clouds_array[i].position.x =
        (Math.random() - 0.5) * this.WORLD_CUBE.SCALED_SIZE.x;
      this.clouds_array[i].position.y =
        (Math.random() - 0.5) * this.WORLD_CUBE.SCALED_SIZE.y;
      this.clouds_array[i].position.z =
        (Math.random() - 0.5) * this.WORLD_CUBE.SCALED_SIZE.z;
    }
  }
}

let ProgramObject = new Program();
window.addEventListener("load", function(){
  let creds = new CreditsInfoBox();
})