# Design interactive animated components. No code.

Magic Move 3 uses the power of Framer's [animation library](https://www.framer.com/api/animation/) to smoothly transition between variants of your design components using user-triggered events and powerful timing controls.

## What's New on 3.0

🚴‍ Connect multiple instances to a single event to cycle or toggle between states.  
🤸‍ Three types of looping allow you to create fluid continuous animations, like spinners.  
👯‍ Set staggerred delays to children to simulate natural movement.  
⠀

---

⠀

## Quick Start

1. Create a design component (**`⌘+K`**), and at least one instance of it (**`⌘+D`**).
2. Double click on your instance to change the children's properties you want to animate.
3. Set Magic Move's **`Initial`** state by connecting it to one of your component's instances.
4. Connect to other instances to set the states to be triggered by touch and mouse **`Events`**.
5. Open preview and marvel at your own interactive animated creation 🎩🐇  
   ⠀

## Supported Components

Animation is restricted to **`Frames`**. You can wrap anything in a Frame (such as Text, Stacks, and any code component) to be able to animate its position, rotation and opacity.

## Events

| Event       | Description                               | Cycle |
| ----------- | ----------------------------------------- | ----- |
| Automatic   | On component render.                      |       |
| Tap         | Tapping or clicking the component.        | ✅    |
| Tap Start   | Touching the component.                   | ✅    |
| Hover Start | Moving the mouse over the component.      | ✅    |
| Hover End   | Moving the mouse away from the component. | ✅    |

## Animatable Properties

| Property      | Description                                         |
| ------------- | --------------------------------------------------- |
| Position      |                                                     |
| Size          |                                                     |
| Opacity       |                                                     |
| Rotation      |                                                     |
| Border Radius |                                                     |
| Background    | 🌈 Animates between solid and gradient backgrounds. |
| Border        |                                                     |
| Shadows       | 🔦Animates any number of outer and inner shadows.   |

## Transition Options

| Property   | Description                                                           |
| ---------- | --------------------------------------------------------------------- |
| Transition | Select `Tween` for duration-based animations or `Spring` for physics. |
| Damping    | **`Spring`** Strength of opposing force.                              |
| Mass       | **`Spring`** Mass of the moving object.                               |
| Stifness   | **`Spring`** Stiffness of the spring.                                 |
| Duration   | **`Tween`** Duration of animation (seconds).                          |
| Easing     | **`Tween`** Predefined or custom bézier curve easing function.        |
| Animate    | **`Tween`** Single or continuous animation.                           |
| Repeat     | **`Tween`** Loop, yoyo (reverse easing) or flip the animation.        |

## Timing Options

| Property | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| Delay    | Delay all animations by set time (seconds).                      |
| Stagger  | Animations of child Frames are staggered by this time (seconds). |

⠀

---

⠀

## Version History

**3.3.0**  
• Fixed background images not being visible.  
• Fixed gradient animation.  
⠀

**3.0.0**  
• `Tap`, `Tap Start`, `Hover Start`, and `Hover End` accept multiple instances for cycling.  
• Added looping controls for `Tween` animations.  
• Added `Stagger` property to orchestrate children timing.  
• `Radius`, `Border` and `Shadow` are now animatable.  
• `Background` animations now support gradients.  
• Smoother frame rate on position and size transitions.  
• Removed `Tap End` event, use `Tap` instead for same effect.  
• Redesigned empty state.  
• Complete rewrite, a lot of bugs are gone, but there will be new ones. [Report bugs](https://twitter.com/gusso)  
⠀

**2.0.0**  
• Support for new events: `Tap Start`, `Tap End`, `Mouse Over`, `Mouse Leave`  
• Connected Frames are now previewed on Property Panel.  
• Improved rendering speed to stop errors on the canvas.  
⠀

**1.5.0**  
• Parent Frame properties are now animatable: `background`, `opacity`, `rotation`  
⠀

**1.0.0**  
• Initial release.

### 💬 Feedback and support on Twitter → [@gusso](https://twitter.com/gusso)
