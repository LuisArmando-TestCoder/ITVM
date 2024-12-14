export default `
float lightCircle(vec2 uv, float radius, vec2 position, float radiusReduction) {
    float d = length(uv - position) * radiusReduction;
    d = smoothstep(d, 0.0, radius);
    return 1.0 - d;
}

// Basic noise function
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // Normalized pixel coordinates (from -0.5 to 0.5)
    vec2 uv = fragCoord / iResolution.xy - 0.5;
    uv.x *= iResolution.x / iResolution.y;
    
    // Time scaling and animation parameters
    float timeSlow = 0.5;
    float chosenTime = iTime * timeSlow;
    float radiusReduction = 20.0;
    float spinSpeed = 1.0;
    
    // Starfield and light circles
    float combinedEffect = 0.0;
    int numStars = 100;
    vec2 center = vec2(0.);
    for (int i = 0; i < numStars; i++) {
        // Original static star position
        vec2 starPos = vec2(
            noise(vec2(float(i) * 13.1, 47.7)) * 2.0 - 1.0, // Random X in [-1, 1]
            noise(vec2(float(i) * 91.3, 21.9)) * 2.0 - 1.0  // Random Y in [-1, 1]
        );

        // Convert to polar coordinates
        float radius = length(starPos);
        float angle = atan(starPos.y, starPos.x);
        
        // Adjust angle over time to make stars spin
        angle += chosenTime * spinSpeed * distance(center, uv * .002) * sin(iTime * .1) / cos(iTime * .1);
        
        // Convert back to Cartesian coordinates
        starPos = vec2(cos(angle), sin(angle)) * radius * distance(center, uv);
        
        // Introduce new stars over time by modulating their intensity
        float starLife = fract(chosenTime + float(i) / float(numStars));
        float starIntensity = smoothstep(0.0, 0.1, starLife) * smoothstep(1.0, 0.9, starLife);
        
        // Fixed circle radius
        float circleRadius = 0.1;
        
        // Draw the spinning stars with intensity
        combinedEffect += lightCircle(uv, circleRadius, starPos, radiusReduction) * starIntensity;
    }
    
    // Time-varying color effect
    vec3 baseColor = 0.5 + 0.5 * cos(iTime + vec3(0, 4, 4));
    
    // Mix the starfield and base color
    vec3 finalColor = vec3(1., 1., 6.) - baseColor * combinedEffect;
    
    // Output the final color to the screen
    fragColor = vec4(finalColor, 1.0);
}

`;
