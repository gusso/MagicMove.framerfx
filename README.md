# Animate components without using code

1. Create a design component with **`⌘+K`**, and at least one instance of it with **`⌘+D`**.
2. Double click on your instances to change the children's properties you want to animate.
3. Connect Magic Move to one of the instances as its **`Initial`** state, and to any other instances as **`✦︎ Events`** to be triggered.
4. Preview and be happy forever ✨

## Supported Components

Only Frames animate as of right now. However you can wrap anything in a Frame (such as Text and Stacks) to be able to animate its position, rotation and opacity.

Any component inside a Stack will not animate, but you can press **`⌘+⌫`** to unwrap the children and maintain their location before creating your animations.

## Trigger Events

| Event       | Description                                                       |
| ----------- | ----------------------------------------------------------------- |
| Automatic   | Initiates the animation when the Frame is rendered on the screen. |
| Tap         | Tapping the target, also triggers on mouse click.                 |
| Tap Start   | Touching the target.                                              |
| Tap End     | Releasing your finger from the target.                            |
| Mouse Over  | Moving the mouse over the target.                                 |
| Mouse Leave | Moving the mouse away from the target.                            |

## Animatable Properties

| Property   | Observations       |
| ---------- | ------------------ |
| Size       |                    |
| Position   |                    |
| Opacity    |                    |
| Rotation   |                    |
| Background | Solid colors only. |

## Version History

**1.12.0**  
• Support for new events: `Tap Start`, `Tap End`, `Mouse Over`, `Mouse Leave`  
• Connected Frames are now previewed on Property Panel.  
• Improved rendering speed to stop errors on the canvas.

**1.5.0**  
• Parent Frame properties are now animatable: `background`, `opacity`, `rotation`

**1.0.0**  
• Initial release.

### 💬 Hit me up with feedback [@gusso](https://twitter.com/gusso)
