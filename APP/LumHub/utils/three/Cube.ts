import { Mesh, Scene, WebGLRenderer, PerspectiveCamera, BoxGeometry, MeshBasicMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AbstractBasic } from '@/utils/three/AbstractBasic';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class Cube extends AbstractBasic {
  private cube: Mesh | undefined;
  private scene: Scene | undefined;
  private render: WebGLRenderer | undefined;
  private camera: PerspectiveCamera | undefined;
  private orbitControls: OrbitControls | undefined;
  private loader: GLTFLoader | undefined;

  constructor (nameCanvas = 'canvas') {
    super();
    this.createRenderer(nameCanvas);
    this.createScene();
    this.createCamera();
    this.createOrbitControls();
    this.createCube();
    this.createLoader();
    this.manageScene();
    window.addEventListener('resize', this.updateRenderSize.bind(this));
  }

  private createRenderer (nameCanvas: string): void {
    this.render = new WebGLRenderer({
      canvas: document.getElementById(nameCanvas) as HTMLCanvasElement,
      antialias: true,
      alpha: true
    });
    this.render.setSize(window.innerWidth, window.innerHeight);
  }

  private createScene (): void {
    this.scene = new Scene();
  }

  private createCube (): void {
    const geometry = new BoxGeometry();
    const material = new MeshBasicMaterial({
      color: 0x00FF00,
    });
    this.cube = new Mesh(geometry, material);
  }

  private createCamera (): void {
    this.camera = new PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;
  }

  private manageScene (): void {
    this.scene?.add(this.cube as Mesh);
  }

  private createOrbitControls () {
    this.orbitControls = new OrbitControls(this.camera as PerspectiveCamera, this.render?.domElement);
  }

  private updateRenderSize (): void {
    if (this.render && this.camera) {
      this.render?.setSize(window.innerWidth, window.innerHeight);
      this.camera!.aspect = (window.innerWidth / window.innerHeight);
      this.camera?.updateProjectionMatrix();
    }
  }

  private createLoader () {
    this.loader = new GLTFLoader();
    this.loader.load('/threeAssets/models/test.glb', (glb: GLTF) => {
      this.scene?.add(glb.scene);
    }, (xhr) => {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    });
  }

  public renderScene (): void {
    requestAnimationFrame(this.renderScene.bind(this));
    this.render?.render(this.scene as Scene, this.camera as PerspectiveCamera);
    this.orbitControls?.update();
  }
}
