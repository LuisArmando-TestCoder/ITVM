export default `
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Normalize coordinates to range from -1 to 1
    vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);

    // Animated distortion parameters
    float inverseSpeed = 15.0;
    float LOD = 50.0;
    for (float i = 1.0; i < LOD; i++) {
        uv.x += 0.6 / i * cos(i * 2.5 * uv.y + iTime / inverseSpeed);
        uv.y += 0.6 / i * cos(i * 1.5 * uv.x + iTime / inverseSpeed);
    }

    // Transform UVs for the grid
    vec2 gridUV = uv * 10.0; // Scale UV for grid effect
    vec2 gridPos = floor(gridUV);
    vec2 cell = fract(gridUV) - 0.5;

    // Center and pulsating effect
    vec2 center = vec2(0.0);
    float distance = length(gridPos - center);
    float pulsate = 0.5 + 0.5 * sin(iTime * 3.0 - distance * 1.5);

    // Size of the squares
    float size = 0.2 * pulsate;

    // Check if inside a square
    float inSquare = step(abs(cell.x), size) * step(abs(cell.y), size);

    // Background intensity from distortion
    float intensity = 0.8;
    vec3 bgColor = vec3(intensity) / abs(sin(iTime / inverseSpeed - uv.y - uv.x));

    // Combine effects: distorted background and grid squares
    fragColor = mix(vec4(bgColor, 1.0), vec4(1.0), inSquare);
}

`