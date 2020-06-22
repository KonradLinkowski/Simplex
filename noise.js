// https://www.michaelbromley.co.uk/blog/simple-1d-noise-in-javascript/
class Simple1DNoise {
  #MAX_VERTICES = 256;
  #MAX_VERTICES_MASK = this.#MAX_VERTICES - 1;
  amplitude = 1;
  scale = 0.5;
  #r = [];
  constructor() {
    for (let i = 0; i < this.#MAX_VERTICES; ++i) {
      this.#r.push(Math.random());
    }
  }

  getVal(x) {
    const scaledX = x * this.scale;
    const xFloor = Math.floor(scaledX);
    const t = scaledX - xFloor;
    const tRemapSmoothstep = t * t * (3 - 2 * t);

    const xMin = xFloor & this.#MAX_VERTICES_MASK;
    const xMax = (xMin + 1) & this.#MAX_VERTICES_MASK;
    const y = this.#lerp(this.#r[xMin], this.#r[xMax], tRemapSmoothstep);

    return y * this.amplitude;
  }
 
  #lerp(a, b, t) {
    return a * (1 - t) + b * t;
  }
}

const val = document.querySelector('strong')
const generator = new Simple1DNoise();
let x = 1;

const calc = () => {
  const y = generator.getVal(x++);
  val.textContent = y
}

calc()

setInterval(calc, 500)
