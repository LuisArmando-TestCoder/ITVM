export default `
float lightCircle(vec2 uv, float radius, vec2 position, float radiusReduction) {
    float d = length(uv - position) * radiusReduction;
    d = smoothstep(d, 0., radius);
    return 1. - d;
}

// Basic noise function
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec2 swirlWarp(vec2 uv, float time) {
    time *= 2.;
    // Swirl distortion
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);

    // Add swirl
    angle += 0.5 * radius * ((sin(time * .2 + .5) / cos(time * .2 - .5)));

    return vec2(cos(angle) / sin(angle), sin(angle) / cos(angle)) * radius;
}

vec2 tilePattern(vec2 uv, float tiles) {
    // Repeat the space to create a mosaic effect
    uv *= tiles;
    uv = fract(uv) - 0.5; // Wrap coordinates and center
    return uv;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    float timeSlow = 0.5;
    float chosenTime = iTime * timeSlow;
    float radiusReduction = 20.;
    float waveSpeed = .5;
    float intensityGrowRate = .07;

    vec2 uv = fragCoord / iResolution.xy - 0.5;
    uv.x *= iResolution.x / iResolution.y;


    // Star field with circle drawing
    float combinedCircles = 0.0;
    for (int i = 0; i < 100; i++) {
        vec2 starPos = vec2(
            noise(vec2(float(i) * 13.1, 47.7)) * 2.0 - 1.0, // Random X in [-1, 1]
            noise(vec2(float(i) * 91.3, 21.9)) * 2.0 - 1.0  // Random Y in [-1, 1]
        );

        float starRadius = 0.01 + 0.02 * swirlWarp(uv, chosenTime).x / swirlWarp(uv, chosenTime).y; // Random pulsating radius
        float circleRadius = 0.1 + 0.05 * sin(chosenTime * waveSpeed + float(i)) / starRadius; // Circle radius animation

        // Draw both a "star" and a "circle" for each position
        combinedCircles += lightCircle(uv, circleRadius, starPos, 30.0); // Circle
    }

    // Final color output
    fragColor = vec4(vec3(combinedCircles), 1.0);
}
`;
