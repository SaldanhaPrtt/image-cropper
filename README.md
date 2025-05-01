# @origin/image-cropper

[![npm version](https://badge.fury.io/js/%40origin%2Fimage-cropper.svg)](https://badge.fury.io/js/%40origin%2Fimage-cropper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A flexible, headless React component for interactive image cropping.

## Features

*   **Headless & Composable:** Provides building blocks (`Cropper.Root`, `Cropper.Image`, `Cropper.CropArea`, `Cropper.Description`) for full control over structure and styling.
*   **Interactive:** Supports zooming (mouse wheel, pinch gesture) and panning (mouse drag, touch drag, arrow keys).
*   **Aspect Ratio:** Enforces a specified aspect ratio for the crop area.
*   **Controlled/Uncontrolled:** Manage zoom state internally or control it via props.
*   **Crop Calculation:** Outputs precise pixel coordinates of the cropped area relative to the original image.
*   **Accessible:** Designed with ARIA attributes and requires a description element for screen reader users.
*   **Customizable:** Control zoom limits, sensitivity, padding, keyboard steps, and apply custom styles.

## Installation

```bash
npm install @origin/image-cropper
# or
yarn add @origin/image-cropper
# or
pnpm add @origin/image-cropper
```

## Components

*   **`Cropper.Root`**: The main container and controller. It handles logic, state, and interactions.
*   **`Cropper.Image`**: Renders the actual `<img>` tag. It's positioned and scaled by `Cropper.Root`.
*   **`Cropper.CropArea`**: A simple `<div>` representing the visual crop area. You style this component to show the bounds.
*   **`Cropper.Description`**: Renders a `<div>` intended for accessibility instructions. Its `id` is automatically linked via `aria-describedby` on the `Root` element. **This component is required for accessibility.**

## `Cropper.Root` Props

| Prop             | Type                           | Default     | Description                                                                                                  |
|------------------|--------------------------------|-------------|--------------------------------------------------------------------------------------------------------------|
| `image`          | `string`                       | **Required**| URL of the image to crop.                                                                                    |
| `children`       | `React.ReactNode`              | **Required**| Should include `Cropper.Image`, `Cropper.CropArea`, and `Cropper.Description`.                             |
| `aspectRatio`    | `number`                       | `1`         | The desired width/height aspect ratio of the crop area.                                                      |
| `cropPadding`    | `number`                       | `25`        | Minimum padding (in pixels) between the crop area edges and the container edges.                             |
| `minZoom`        | `number`                       | `1`         | Minimum zoom level (1 = 100% original size relative to crop area).                                           |
| `maxZoom`        | `number`                       | `3`         | Maximum zoom level.                                                                                          |
| `zoomSensitivity`| `number`                       | `0.005`     | Multiplier for mouse wheel delta to control zoom speed.                                                      |
| `keyboardStep`   | `number`                       | `10`        | Number of pixels to pan the image when using arrow keys.                                                    |
| `zoom`           | `number`                       | `undefined` | Controlled zoom level. If provided, component zoom state is controlled externally.                           |
| `onCropChange`   | `(pixels: Area \| null) => void` | `undefined` | Callback function triggered whenever the crop area changes. Receives pixel data or `null` if invalid.      |
| `onZoomChange`   | `(zoom: number) => void`       | `undefined` | Callback function triggered when the zoom level changes interactively. Essential for controlled `zoom` prop. |
| `className`      | `string`                       | `undefined` | CSS class for the root container element.                                                                    |
| `style`          | `React.CSSProperties`          | `undefined` | Inline styles for the root container element.                                                                |
| *...restProps*   |                                |             | Any other standard `HTMLDivElement` props are passed to the root container.                                  |

### `onCropChange` Data (`Area`)

The `Area` object received by `onCropChange` contains the following properties relative to the *original* image dimensions:

*   `x`: The x-coordinate of the top-left corner of the cropped area.
*   `y`: The y-coordinate of the top-left corner of the cropped area.
*   `width`: The width of the cropped area in pixels.
*   `height`: The height of the cropped area in pixels.

## Accessibility

It is crucial to include a `Cropper.Description` component within `Cropper.Root`. This provides necessary context for screen reader users about how to interact with the cropper. If you don't provide one, a warning will appear in the console. You can visually hide the description using standard CSS techniques (e.g., an `sr-only` class).

## Styling

The component is headless, meaning it doesn't come with built-in styles beyond basic positioning for the image. You are expected to style the `Cropper.Root`, `Cropper.Image`, and especially the `Cropper.CropArea` using CSS classes (`className`) or inline styles (`style`) to match your application's design. The `Cropper.CropArea` typically needs styling to appear as an overlay (e.g., border, semi-transparent background outside the area).

## License

MIT
