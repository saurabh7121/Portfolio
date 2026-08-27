import React from 'react';

export const GeometricMeshBackground = ({ theme }) => {
  const lineColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.14)' : 'rgba(15, 23, 42, 0.18)';
  const nodeColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.28)' : 'rgba(15, 23, 42, 0.25)';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none"
    >
      {/* Soft Vignette Base matching reference image */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background:
            theme === 'dark'
              ? 'radial-gradient(circle at 50% 45%, #121418 0%, #08090b 100%)'
              : 'radial-gradient(circle at 50% 45%, #ffffff 0%, #e9ecef 100%)',
        }}
      />

      {/* SVG Geometric Low-Poly Wireframe Constellation */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="mesh-fade" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
          </radialGradient>

          <mask id="center-fade-mask">
            <rect width="1440" height="900" fill="url(#mesh-fade)" />
          </mask>
        </defs>

        <g mask="url(#center-fade-mask)" stroke={lineColor} strokeWidth="1" fill="none">
          {/* Top-Right Cluster */}
          <polygon points="1440,0 1250,0 1320,120 1440,80" />
          <polygon points="1250,0 1020,0 1160,110 1320,120" />
          <polygon points="1020,0 780,0 940,90 1160,110" />
          <polygon points="780,0 520,0 680,100 940,90" />
          <polygon points="1160,110 1320,120 1280,260 1080,210" />
          <polygon points="1320,120 1440,80 1440,240 1280,260" />
          <polygon points="1440,240 1280,260 1380,410 1440,360" />
          <polygon points="1280,260 1080,210 1210,400 1380,410" />
          <polygon points="1080,210 940,90 1010,320 1210,400" />
          <polygon points="1380,410 1440,360 1440,540 1340,580" />
          <polygon points="1380,410 1210,400 1260,610 1340,580" />
          <polygon points="1210,400 1010,320 1090,560 1260,610" />
          <polygon points="1340,580 1440,540 1440,720 1290,740" />
          <polygon points="1340,580 1260,610 1290,740" />
          <polygon points="1260,610 1090,560 1150,780 1290,740" />
          <polygon points="1290,740 1440,720 1440,900 1220,900 1150,780" />

          {/* Top-Left Cluster */}
          <polygon points="0,0 210,0 110,130 0,100" />
          <polygon points="210,0 440,0 290,120 110,130" />
          <polygon points="440,0 520,0 680,100 290,120" />
          <polygon points="0,100 110,130 160,280 0,220" />
          <polygon points="110,130 290,120 330,270 160,280" />
          <polygon points="290,120 680,100 480,240 330,270" />
          <polygon points="0,220 160,280 90,430 0,390" />
          <polygon points="160,280 330,270 240,450 90,430" />

          {/* Bottom-Left Cluster */}
          <polygon points="0,390 90,430 0,580" />
          <polygon points="90,430 240,450 140,620 0,580" />
          <polygon points="0,580 140,620 0,760" />
          <polygon points="140,620 240,450 360,640 280,780" />
          <polygon points="140,620 360,640 280,780 160,820 0,760" />
          <polygon points="0,760 160,820 0,900" />
          <polygon points="160,820 280,780 340,900 0,900" />
          <polygon points="280,780 360,640 510,810 340,900" />

          {/* Bottom-Right Additional Lines */}
          <polygon points="1150,780 1220,900 980,900 940,790" />
          <polygon points="940,790 1150,780 1090,560 880,660" />
          <polygon points="980,900 940,790 760,900" />
          <polygon points="760,900 940,790 880,660 690,810" />

          {/* Node circles */}
          {[
            [1250, 0], [1320, 120], [1160, 110], [940, 90], [1280, 260], [1080, 210],
            [1380, 410], [1210, 400], [1010, 320], [1340, 580], [1260, 610], [1090, 560],
            [1290, 740], [1150, 780], [110, 130], [290, 120], [160, 280], [330, 270],
            [90, 430], [240, 450], [140, 620], [360, 640], [280, 780], [160, 820],
            [940, 790], [880, 660]
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5" fill={nodeColor} stroke="none" />
          ))}
        </g>
      </svg>
    </div>
  );
};
