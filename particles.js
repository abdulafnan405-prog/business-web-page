/* ==========================
   LUXURY GOLD PARTICLES
========================== */

class LuxuryParticles {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx    = this.canvas.getContext("2d");
    this.canvas.id = "particle-canvas";

    document.body.appendChild(this.canvas);

    this.particles = [];
    this.resize();

    window.addEventListener("resize", () => this.resize());
    this.createParticles();
    this.animate();
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < 80; i++) {
      this.particles.push({
        x:       Math.random() * this.canvas.width,
        y:       Math.random() * this.canvas.height,
        radius:  Math.random() * 1.5 + 0.5,
        speed:   Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.4 + 0.05
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(p => {
      p.y -= p.speed;
      if (p.y < 0) p.y = this.canvas.height;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(212,175,55,${p.opacity})`;
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

new LuxuryParticles();