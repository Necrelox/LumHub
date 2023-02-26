export abstract class AbstractScene {
  private isWebGLAvailable(): boolean {
    try {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  protected constructor() {
    if (!this.isWebGLAvailable()) {
      throw new Error('WebGL is not available');
    }
  }
}
