import {
  Mesh,
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  PlaneGeometry,
  ShaderMaterial,
  DoubleSide,
  Clock,
  Color
} from 'three';

// @ts-ignore
import vertex from '@/utils/three/shaders/LavaBackground.vert';
// @ts-ignore
import fragment from '@/utils/three/shaders/LavaBackground.frag';

import { AbstractScene } from '@/utils/three/AbstractScene';

export class LavaBackground extends AbstractScene {
  private render: WebGLRenderer | undefined;
  private scene: Scene = new Scene();
  private camera: PerspectiveCamera = new PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10);
  private material: ShaderMaterial = new ShaderMaterial();
  private time = 0;
  private clock: Clock = new Clock();

  constructor (nameCanvas = 'canvas') {
    super();
    this.createRenderer(nameCanvas);
    this.initScene();
    window.addEventListener('resize', this.updateRenderSize.bind(this));
  }

  private createRenderer (nameCanvas: string): void {
    this.render = new WebGLRenderer({
      canvas: document.getElementById(nameCanvas) as HTMLCanvasElement,
      precision: 'lowp',
      powerPreference: 'low-power'
    });
    this.render.setSize(window.innerWidth, window.innerHeight);
  }

  private initScene (): void {
    const geometry = new PlaneGeometry(2.05, 2.05, 64, 64);
    const colors = [
      new Color('#090125'),
      new Color('#260840'),
      new Color('#090125'),
      new Color('#090125'),
      new Color('#260840'),
      new Color('#876813'),
      new Color('#090125'),
      new Color('#090125'),
      new Color('#260840'),
      new Color('#090125')
    ];

    this.material = new ShaderMaterial({
      extensions: {
        derivatives: false
      },
      side: DoubleSide,
      uniforms: {
        time: { value: 0 },
        uColor: { value: colors }
      },
      wireframe: false,
      vertexShader: vertex,
      fragmentShader: fragment
    });
    const planeGeometry = new Mesh(geometry, this.material);
    this.camera.position.set(0, 0.1, 0.23);
    this.scene.add(planeGeometry as Mesh);
  }

  private updateRenderSize (): void {
    if (this.render && this.camera) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.render.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    }
  }

  public renderScene (): void {
    let lastTime = 0;
    const interval = 1000 / 24;
    const animate = (time: number) => {
      if (time - lastTime >= interval) {
        lastTime = time;
        this.time += 0.007 * this.clock.getDelta();
        this.material.uniforms.time.value = this.time;
        this.render?.render(this.scene as Scene, this.camera as PerspectiveCamera);
      }
      requestAnimationFrame(animate);
    };
    animate(0);
  }
}
