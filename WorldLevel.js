class WorldLevel {
  constructor(levelJson) {
    this.name = levelJson.name ?? "Level";

    this.theme = Object.assign(
      { bg: "#ff7034", platform: "#0000", blob: "#1478FF" },
      levelJson.theme ?? {},
    );

    // Physics knobs
    this.gravity = levelJson.gravity ?? 0.65;
    this.jumpV = levelJson.jumpV ?? -11.0;

    // Camera knob (data-driven view state)
    this.camLerp = levelJson.camera?.lerp ?? 0.12;

    // World size + death line
    this.w = levelJson.world?.w ?? 2400;
    this.h = levelJson.world?.h ?? 360;
    this.deathY = levelJson.world?.deathY ?? this.h + 200;

    // Start
    this.start = Object.assign({ x: 80, y: 220, r: 26 }, levelJson.start ?? {});

    // Platforms
    this.platforms = (levelJson.platforms ?? []).map(
      (p) => new Platform(p.x, p.y, p.w, p.h),
    );

    // Spikes
    this.spikes = (levelJson.spikes ?? []).map(
      (s) => new Platform(s.x, s.y, s.w, s.h),
    );
  }

drawWorld() {
  background(this.theme.bg);
  push();
  rectMode(CORNER);          // critical: undo any global rectMode(CENTER) [web:230]
  noStroke();
  fill(this.theme.platform);

  for (const p of this.platforms) rect(p.x, p.y, p.w, p.h); // x,y = top-left [web:234]
  pop();

  fill("#800020");
  for (const s of this.spikes) triangle(
    s.x, s.y,
    s.x + s.w /2, s.y + s.h,
    s.x + s.w, s.y
  );
}
}
