import React, { useEffect, useRef, useState, startTransition } from "react";

export default function ParticleText(props) {
  const {
    text = "SAURABH JADHAV",
    particleColor = "#FFFFFF",
    backgroundColor = "transparent",
    particleSize = 1.5,
    particleDensity = 4,
    mouseRadius = 100,
    returnSpeed = 0.05,
    font = {
      fontSize: "80px",
      fontWeight: "900",
      fontFamily: "Inter, sans-serif",
    },
    verticalAlign = "center",
    horizontalAlign = "center",
    style,
  } = props;

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const timeoutId = setTimeout(() => {
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const width = rect.width;
      const height = rect.height;

      // Draw text to get particle positions
      ctx.fillStyle = particleColor;
      if (horizontalAlign === "left") {
        ctx.textAlign = "left";
      } else if (horizontalAlign === "right") {
        ctx.textAlign = "right";
      } else {
        ctx.textAlign = "center";
      }
      ctx.textBaseline = "middle";

      const fontSize = parseInt(font.fontSize) || 80;
      const fontWeight = font.fontWeight || "900";
      const fontStyle = font.fontStyle || "normal";
      const fontFamily = font.fontFamily || "Inter, sans-serif";
      ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;

      const padding = fontSize * 0.3;
      const maxTextWidth = width - padding * 2;

      const wrapText = (inputText) => {
        const inputLines = inputText.split("\n");
        const wrappedLines = [];
        for (const line of inputLines) {
          if (!line.trim()) {
            wrappedLines.push("");
            continue;
          }
          const metrics = ctx.measureText(line);
          if (metrics.width <= maxTextWidth) {
            wrappedLines.push(line);
            continue;
          }
          const words = line.split(" ");
          let currentLine = "";
          for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const testMetrics = ctx.measureText(testLine);
            if (testMetrics.width <= maxTextWidth) {
              currentLine = testLine;
            } else {
              if (currentLine) {
                wrappedLines.push(currentLine);
                currentLine = word;
              } else {
                wrappedLines.push(word);
              }
            }
          }
          if (currentLine) wrappedLines.push(currentLine);
        }
        return wrappedLines;
      };

      const lines = wrapText(text);
      const lineHeight = fontSize * 1.1;
      const totalHeight = lines.length * lineHeight;

      let startY;
      if (verticalAlign === "top") {
        startY = lineHeight / 2 + padding;
      } else if (verticalAlign === "bottom") {
        startY = height - totalHeight + lineHeight / 2 - padding;
      } else {
        startY = (height - totalHeight) / 2 + lineHeight / 2;
      }

      let textX;
      if (horizontalAlign === "left") {
        textX = padding;
      } else if (horizontalAlign === "right") {
        textX = width - padding;
      } else {
        textX = width / 2;
      }

      lines.forEach((line, index) => {
        ctx.fillText(line, textX, startY + index * lineHeight);
      });

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      const particles = [];
      const gap = Math.max(2, particleDensity);

      for (let y = 0; y < canvas.height; y += gap) {
        for (let x = 0; x < canvas.width; x += gap) {
          const index = (y * canvas.width + x) * 4;
          const alpha = pixels[index + 3];
          if (alpha > 128) {
            const px = x / dpr;
            const py = y / dpr;
            particles.push({
              x: px,
              y: py,
              baseX: px,
              baseY: py,
              vx: 0,
              vy: 0,
            });
          }
        }
      }
      particlesRef.current = particles;
      startTransition(() => setIsInitialized(true));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, particleColor, particleDensity, font, horizontalAlign, verticalAlign]);

  // Animation loop
  useEffect(() => {
    if (!isInitialized) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 2;
          particle.vy -= Math.sin(angle) * force * 2;
        }

        particle.vx += (particle.baseX - particle.x) * returnSpeed;
        particle.vy += (particle.baseY - particle.y) * returnSpeed;
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        particle.x += particle.vx;
        particle.y += particle.vy;

        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isInitialized, particleColor, particleSize, mouseRadius, returnSpeed]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        width: "100%",
        height: "100%",
        backgroundColor,
        cursor: "default",
      }}
    />
  );
}
