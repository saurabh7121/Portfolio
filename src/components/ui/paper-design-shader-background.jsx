import { GrainGradient } from "@paper-design/shaders-react";

/**
 * GradientBackground
 * Drop-in full-screen shader background using @paper-design/shaders-react.
 * Place as the first child inside any `position: relative` container.
 *
 * Props mirror GrainGradient props – override as needed.
 */
export function GradientBackground({
  colorBack   = "hsl(0, 0%, 0%)",
  softness    = 0.76,
  intensity   = 0.45,
  noise       = 0,
  shape       = "corners",
  offsetX     = 0,
  offsetY     = 0,
  scale       = 1,
  rotation    = 0,
  speed       = 1,
  colors      = [
    "hsl(14, 100%, 57%)",
    "hsl(45, 100%, 51%)",
    "hsl(340, 82%, 52%)",
  ],
}) {
  return (
    <div className="absolute inset-0 -z-10">
      <GrainGradient
        style={{ height: "100%", width: "100%" }}
        colorBack={colorBack}
        softness={softness}
        intensity={intensity}
        noise={noise}
        shape={shape}
        offsetX={offsetX}
        offsetY={offsetY}
        scale={scale}
        rotation={rotation}
        speed={speed}
        colors={colors}
      />
    </div>
  );
}
