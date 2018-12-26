# Animate components without using code

1. Create a design component **`⌘+K`**. This is your **Source**.
2. Create an instance of your component **`⌘+D`**. This is your **Target**.
3. Double click on your Target to change the children's properties you want to animate.
4. Connect Magic Move to Source and Target and customise its animation properties.
5. Preview and be happy forever ✨

## Animatable Components

As of version 1, **only Frames** are supported. Good news is you can wrap anything in a Frame (such as Text and Stacks) to be able to animate its position around the canvas.

Any component inside a Stack will not animate, but you can press **`⌘+⌫`** to unwrap the children and maintain their location before animating.

## Animatable Properties

| Property   | Observations          |
| ---------- | --------------------- |
| Size       |                       |
| Position   |                       |
| Background | ⚠️ Solid colors only. |
| Opacity    |                       |
| Rotation   |                       |

## Version History

**1.4.0**  
Parent Frame properties are now animatable: `background`, `opacity`, `rotation`

**1.0.0**  
Initial release

### 💬 Hit me up with feedback [@gusso](https://twitter.com/gusso)
