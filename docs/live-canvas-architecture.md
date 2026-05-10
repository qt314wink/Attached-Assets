# Live Canvas: Architecture, Semantics & 2027 Standards

## 1. Framing, Features, & Angle
**The Angle:** The Live Canvas is not just a drawing board; it is a **Generative Crucible and Semantic Synthesizer**. It is a tactile, physics-driven, multiplayer staging ground where raw language, visual assets, and design intent collide to forge new realities. It bridges the gap between abstract storytelling and concrete design systems.

**Differentiating Features:**
- **Iterative Generative Drop-Ins:** Elements are not just placed; they are *summoned* via natural language, inheriting physics (mass, friction, bounciness) based on their semantic weight.
- **Reverse-Inference Breakdown:** Upload an image, and the engine tears it down into a taxonomy of composition, lighting, palette, abstraction ("feels like..."), and strict design tokens.
- **3D Tactile Pop-Art:** Elements cast hard shadows, respond to velocity, and stack with z-index elevation that feels physically chunky (Neo-Brutalist depth).
- **API Orchestration Hub:** A central node coordinating HuggingFace/Civitai/Grok inference pipelines, managing the routing of prompts to specialized generative models.
- **Storytelling Integrations:** "A wild forest floor with canary yellow daffodils..." — prose is parsed into environmental constraints, spawning background, midground, and foreground assets automatically.

## 2. Customer Experience & Interaction Flow
**Scenario: The Comic Book Architect**
1. **Ingestion:** The user pastes a poetic prompt: *"A wild forest floor with canary yellow daffodils and a little green door. Beyond it theres a mountain range with a proud cat facing north..."*
2. **Translation:** The engine parses the prose. It identifies "forest floor" (background), "canary yellow daffodils" (color tokens, foreground elements), "mountain range" (distant scale), and the "proud cat" (subject, focal point).
3. **Synthesis (API Call Coordination):** The canvas dispatches parallel calls to specialized models (e.g., Civitai for the cat, HuggingFace for the environment).
4. **Drop-In & Physics:** The generated assets drop onto the canvas from the top of the screen, bouncing with rigid-body physics. 
5. **Tactile Iteration:** The user drags the "little green door", resizes it via chunky drag handles, and locks it into the grid.
6. **Reverse Inference:** The user uploads a reference sketch of "Poseidon's lost shore". The sidebar immediately populates with: `[Palette: Golden, Cerulean]`, `[Vibe: Lonesome, Proud]`, `[Lux: High Noon]`. The canvas suggests adapting the current scene's lighting to match.

## 3. Semantics, Parameters & Design System Primitives
**Taxonomy of Composition:**
- `Context`: Background, Midground, Foreground
- `Structural Design`: Golden Ratio, Rule of Thirds, Center-Weighted
- `Camera`: Field of View (FOV), Angle (Low-angle, Isometric, Isometric-Brutalist)
- `Lighting (Lux)`: Clarity, Contrast, Harsh-Directional (Comic-book style), Flat
- `Abstraction Nodes`: `[Feels Like]`, `[Reminds Me Of]`, `[Tastes Like]`, `[Evokes]`

**UI Constraints & Tokens (Neo-Brutalist / Comic Book):**
- **Border:** `border-width: 8px`, `border-color: #000` (Invariable structural anchor).
- **Shadow:** `box-shadow: [X]px [Y]px 0px #000` (Hard drop shadows indicating z-elevation).
- **Colors:** CMYK / Pop-Art constrained (`#FF0055`, `#00FF66`, `#00E5FF`, `#FFFF00`).
- **Typography:** Kinetic, oversized, uppercase, high tracking (`tracking-tighter` to `tracking-[0.5em]`).

## 4. 2027 QA & Standards Checklist
Before outputting any module to MVP, cross-reference against:
- [ ] **Physics Fidelity:** Do elements possess mass? Do they bounce/collide realistically? (Framer Motion spring physics: `stiffness: 400, damping: 25`).
- [ ] **Semantic Clarity:** Are non-visual abstractions accurately mapped to visual tokens? (e.g., Does "feels happy" map to `#FFFF00` and high bounce?).
- [ ] **API Resilience:** Are parallel generative requests orchestrated without blocking the main UI thread? (Optimistic UI updates).
- [ ] **Responsive Brutalism:** Do chunky borders and hard shadows scale proportionally on mobile without breaking the viewport?
- [ ] **Multi-Modal Breakdown:** Does the image upload flow successfully extract: Palette, Content, Subject, FOV, and Abstraction tags?
- [ ] **The "Poetry to Canvas" Pipeline:** Can it handle the "Mushroom King / Poseidon's lost shore" prompt string and output a structured JSON scene graph?

## 5. Module Refinement Strategy
- **Somatic Engine:** Keep. Focus on the raw physical feedback of UI interactions.
- **Component Forge / Labyrinth:** Evolve into the "Design System Blueprint" generator, where the reverse-inference tags are turned into exportable React/Tailwind code.
- **The Enigma Engine:** Keep as the gamified, community-driven discovery layer for uncovering these workflows.
- **Elementalmorphism:** Integrate as the visual feedback layer for data states (e.g., API calls loading represented as gaseous streams).
