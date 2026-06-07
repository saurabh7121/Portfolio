/**
 * background-snippets.jsx
 *
 * Two reusable CSS-only background layers (no external deps).
 *
 * GridRadialMask  — fine dark grid faded by a top-centred radial mask.
 *                   Designed to overlay a coloured background.
 *
 * WhiteGridPurple — white grid with a soft purple radial glow.
 *                   Suits light-mode or standalone use.
 */

/**
 * Fine semi-transparent grid with a radial mask that fades it toward the edges.
 * Pair this on top of a coloured shader / gradient background.
 */
export const GridRadialMask = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={[
      "pointer-events-none absolute inset-0",
      // fine grid lines
      "bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]",
      "bg-[size:14px_24px]",
      // fade the grid with a top-centred radial mask
      "[mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_75%,transparent_110%)]",
      "[-webkit-mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_75%,transparent_110%)]",
      "[mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]",
      className,
    ].join(" ")}
  />
);

/**
 * White large-cell grid with a soft purple radial glow in the top-right.
 * Works well as a standalone light-mode background.
 */
export const WhiteGridPurple = ({ className = "" }) => (
  <div
    aria-hidden="true"
    className={[
      "absolute inset-0 -z-10 h-full w-full",
      "bg-white",
      "bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)]",
      "bg-[size:6rem_4rem]",
      className,
    ].join(" ")}
  >
    <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]" />
  </div>
);
