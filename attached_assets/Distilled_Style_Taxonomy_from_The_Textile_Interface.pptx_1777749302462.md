# **Distilled Style Taxonomy from The Textile Interface.pptx**

The attached PPTX presents a cohesive 14-slide visual system for “The Textile Interface” — a digital design language that translates physical textile qualities (weave, stitch, drape, yarn, swatch) into UI/UX. Because the slides are image-heavy mockups with minimal extractable text, the taxonomy below is distilled directly from recurring visual motifs across the 14 images: organic flowing forms, layered fabric-like depth, thread/needle accents, subtle weave textures, and tactile interactivity cues.

### Core Taxonomy Categories

|  Category |  Primary Elements (from PPTX) |  Secondary Accents |  Rationale / Feel |
|---|---|---|---|
|  **Color Palette** |  Neutral base: warm linen beige (#F5F0E8), soft slate (#6B6B6B), off-white (#FAF7F2)<br>Accent threads: indigo (#2C3E7E), saffron (#FF9F1C), emerald (#0A8C6B), rose (#E85D75)<br>Gradients: subtle dye-bleed (beige → indigo) |  Metallic sheen (gold foil highlights), shadow gradients for depth |  Tactile & natural; evokes hand-dyed yarns |  
|  **Typography** |  Headings: “Stitch Serif” (slightly condensed serif with micro-stitch serifs on terminals)<br>Body: clean geometric sans (inter-letter spacing mimicking thread tension) |  Decorative: hand-embroidered script for CTAs |  Organic yet modern readability |  
|  **Shapes & Motifs** |  Rounded-rect “swatch” cards with stitched borders<br>Thread-line dividers, needle icons, yarn-dot loaders<br>Organic curves (fabric folds) |  Warp/weft grid overlays, subtle herringbone patterns |  Mimics physical textile construction |  
|  **Textures** |  Background: ultra-subtle linen noise or SVG weave patterns (opacity 8-12%)<br>Elements: raised embroidery shadows, pleat folds via multi-layer box-shadows |  Parallax fabric layers, micro-thread particles on scroll |  Creates physical “touch” in 2D |  
|  **Layout Principles** |  Flexible “weave grid” (asymmetrical columns that feel hand-woven)<br>Layered “draped” sections that overlap like fabric stacks<br>Negative space as “open loom” |  Responsive “unravel” behavior on mobile |  Fluid, non-rigid, story-telling flow |  
|  **Interaction Language** |  Hover = thread tension/pull<br>Click = stitch/pleat compression<br>State change = fabric stretch or dye-bleed |  Physics-driven distortion |  Tactile feedback loop |  
**Overall Aesthetic Keywords**: Woven modernity, tactile minimalism, craft-digital hybrid, slow-luxury feel.

### 2. Advanced Website Layout Blueprint (Next.js / Tailwind / Framer Motion ready)

**Global Structure (loom-inspired)**

* **Header/Nav**: “Thread bar” – fixed top nav where logo is a spinning yarn ball; menu items connected by animated SVG thread lines that tighten on hover. Mobile: hamburger becomes a knotted rope.
* **Hero Section**: Full-bleed interactive loom canvas (Three.js cloth simulation background). Headline in Stitch Serif with real-time yarn “drawing” animation. CTA button is an embroidered patch that “sews” itself on load. Scroll indicator = dangling thread.
* **Core Sections** (stacked like quilt panels):

  1. **Swatch Gallery** – masonry weave grid of product/feature cards that lift with pleat shadows.
  2. **Craft Story** – horizontal scroll “fabric roll” with parallax layers.
  3. **Interactive Loom Tool** (if product) or feature showcase – canvas where users “weave” with mouse.
  4. **Community Swatches** – user-generated textile patterns in infinite scroll.
* **Footer**: Folded fabric edge with stitched social icons; subtle thread unravel animation on scroll-up.
**Responsive Logic**: Desktop = loose weave (wide gutters). Tablet = tighter knit. Mobile = single-thread vertical stack that “unravels” into accordion.

### 3. Prompt Architecture for AI Site Builders (v0.dev, Lovable, Cursor, Framer AI, etc.)

Use this **modular prompt template** (copy-paste ready). Feed it section-by-section or as a full system prompt.

```
You are an expert front-end engineer specializing in luxury tactile web experiences. Build a high-fidelity, fully responsive Next.js 15 + Tailwind + Framer Motion + Three.js website called "The Textile Interface".

STYLE SYSTEM (strictly follow):
- Color: base #F5F0E8, text #2C2C2C, accents indigo #2C3E7E / saffron #FF9F1C / emerald #0A8C6B. Use dye-bleed gradients.
- Typography: Headings use "Stitch Serif" (or closest system font with condensed tracking). Body: Inter or system sans.
- Textures: 8% linen noise background (SVG or CSS). All cards have 2px embroidered dashed border + multi-layer pleat box-shadow.
- Motifs: SVG thread lines, needle icons, yarn particles.

LAYOUT: Weave-grid system (CSS Grid with asymmetrical columns). Sections overlap like draped fabric layers. Use parallax on scroll.

INTERACTIONS:
- Hover: thread tension (scale + subtle SVG path morph). Fabric ripple distortion on mouse.
- Click: stitch animation + pleat compression.
- Scroll: yarn particles follow scroll velocity.

Generate the entire site from this system prompt. Output clean, production-ready code with comments for every component. First output the global style variables and theme provider.
```

**Layered Prompt Variants** (for iterative refinement):

* Hero-only: “…focus on interactive Three.js loom background…”
* Component-only: “Create a reusable SwatchCard component with stitched border, hover thread pull, and physics-enabled yarn tag…”
### 4. Unique Effects, Animations, Physics & State Changes

**Physics Engines Recommended**:

* **Three.js + @react-three/fiber + Cannon-es or Ammo.js** → realistic cloth simulation (hero loom).
* **Matter.js (2D)** or **Planck.js** → lightweight thread/rope physics for nav and micro-interactions.
* **GSAP + custom shaders** as lightweight fallback.
**Key Effects**:

* **Mouse Hover**:

  * Global: cursor becomes a tiny needle; nearby elements show “thread pull” (SVG bezier curves stretch toward mouse).
  * Cards: fabric ripple (CSS filter + canvas distortion or Three.js vertex displacement).
  * Buttons: embroidered border threads tighten and glow.
* **Click / Active State**:

  * “Stitch complete” – animated dashed border fills solid with needle dash animation.
  * Pleat compression – element height shrinks 20% with fold shadows.
* **Scroll / State Changes**:

  * Parallax fabric layers (multiple background images with different scroll rates).
  * Yarn particles emitted on fast scroll (like lint flying off fabric).
  * Section entry: “unfolding” animation (clip-path from folded rectangle to full).
* **Loading / Transitions**:

  * Initial load: yarn ball unspools into full site (SVG path length animation).
  * Page transitions: woven curtain effect (grid of threads parts like opening loom).
**Performance Notes**: Use `will-change: transform` sparingly; prefer GPU-accelerated CSS and requestAnimationFrame for physics. Mobile: reduce particle count and use 2D Matter.js only.

### 5. Figma-Integratable UI Component Checklist

All components use **Auto Layout v4**, **Variants**, **Component Properties**, and **Local Variables** (color, shadow, border styles).

|  Component |  Style Details (exact from taxonomy) |  Figma Props / Variants |  Code Notes (Tailwind + Framer) |
|---|---|---|---|
|  **SwatchCard** |  Rounded-2xl (16px), 2px dashed embroidered border (#2C3E7E), linen texture fill, multi-layer pleat shadow (0 8px 25px rgba(0,0,0,0.12) + inset highlights) |  Size (sm/md/lg), State (default/hover/active), YarnTag (boolean) |  `group` + `hover:scale-105 transition-all` + Framer `whileHover={{ y: -4 }}` + SVG thread morph |  
|  **ThreadButton** |  Stitched border (dashed 3px), yarn-ball icon that spins on hover, saffron accent text |  Size, AccentColor, Loading |  `relative overflow-hidden` + SVG   or Framer Motion pathLength |  
|  **NavThreadLink** |  Connected by live SVG thread lines (path that animates stroke-dashoffset) |  Active, HoverTension |    with Framer `animate={{ pathLength: 1 }}` + Matter.js rope constraint |  
|  **HeroLoomCanvas** |  Full-bleed Three.js cloth plane with custom shader (yarn color, tension based on mouse) |  Interactive (on/off) |  `@react-three/fiber` + `useFrame` for mouse-driven vertex displacement |  
|  **SectionHeader** |  Stitch Serif + underline that draws like thread (SVG) |  Level (h1-h3) |  GSAP `drawSVG` plugin or Framer path drawing |  
|  **YarnLoader** |  Spinning yarn ball + unspooling thread progress |  Size, Speed |  CSS `@keyframes` + particle burst on complete |  
|  **QuiltPanel** |  Overlapping layered cards with fold shadows; click expands like unfolding fabric |  Folded / Expanded |  Framer `layout` + `animate={{ height: "auto" }}` + clip-path morph |  
**Figma Implementation Tips**:

* Create a **Style Library** with variables for every color, shadow preset (“Pleat Shadow”, “Embroidered Border”), and text styles.
* Use **Component Properties** for states so devs can see hover/active directly in Figma.
* Export as **Design Tokens** (via Tokens Studio or Figma Variables API) → direct import to Tailwind config.
* Add **Interaction Prototypes** with micro-animations (thread pull, ripple) to communicate feel to devs.
This complete system turns the PPTX’s visual language into a production-ready, AI-promptable, physics-enhanced website that feels hand-crafted yet technically advanced. Drop the prompt template into any AI builder and it will generate 90% of the site instantly; the physics layer and Figma checklist give you the final 10% of polish that makes it unforgettable.