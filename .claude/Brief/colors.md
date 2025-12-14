
## 🎨 **“Tranquil Dawn” Palette**

### 🌞 **Light Mode**

| Role                           | Hex       | Description                                              |
| ------------------------------ | --------- | -------------------------------------------------------- |
| **Base background**            | `#F8FAF9` | Misty white with a hint of sage — calm, meditative base. |
| **Surface / card background**  | `#ECF3F2` | Soft seafoam pastel for panels and cards.                |
| **Primary accent**             | `#A8C7C0` | Muted aqua-teal suggesting water and balance.            |
| **Secondary accent**           | `#E5C8B6` | Gentle sand-rose tone for warmth and human touch.        |
| **Tertiary accent**            | `#D4D9EE` | Pale periwinkle that suggests faith and sky.             |
| **Text (primary)**             | `#37413A` | Deep sage-grey — readable, but not harsh black.          |
| **Text (muted)**               | `#6D756C` | Calm mid-grey for secondary text.                        |
| **Highlight / call-to-action** | `#B3D4C0` | Fresh greenish pastel, energizing but not aggressive.    |

---

### 🌜 **Dark Mode**

| Role                           | Hex       | Description                                       |
| ------------------------------ | --------- | ------------------------------------------------- |
| **Base background**            | `#1E2322` | Deep forest-charcoal — grounding, not pure black. |
| **Surface / card background**  | `#2A302F` | Slightly lighter slate with green undertones.     |
| **Primary accent**             | `#7BB0A7` | Muted sea-glass green — same mood, darker tone.   |
| **Secondary accent**           | `#B59382` | Desert-rose warmth against cool backgrounds.      |
| **Tertiary accent**            | `#9BA3C9` | Soft lavender-blue hinting at reflection.         |
| **Text (primary)**             | `#E7ECEA` | Gentle ivory-white — readable, not glaring.       |
| **Text (muted)**               | `#A3A8A6` | Dimmed silver for secondary text.                 |
| **Highlight / call-to-action** | `#8FC5AA` | Calm jade accent for buttons or links.            |

---

### 🌗 **Pairing Suggestions**

| Element         | Light mode                  | Dark mode                   |
| --------------- | --------------------------- | --------------------------- |
| Background      | `#F8FAF9`                   | `#1E2322`                   |
| Cards / Panels  | `#ECF3F2`                   | `#2A302F`                   |
| Buttons / Links | `#A8C7C0` (hover `#B3D4C0`) | `#7BB0A7` (hover `#8FC5AA`) |
| Typography      | `#37413A` / `#6D756C`       | `#E7ECEA` / `#A3A8A6`       |

---

### 🧘 Mood Summary

* **Cool hues (sage, aqua, lavender)** → tranquility and reflection
* **Warm sand & rose undertones** → human warmth and compassion
* **High contrast maintained** for accessibility
* Designed to feel **light, open, and spiritual**, but not sterile or monochrome

---

### 🌈 Tailwind / DaisyUI Theme Example

```js
daisyui: {
  themes: [
    {
      tranquil: {
        "primary": "#A8C7C0",
        "secondary": "#E5C8B6",
        "accent": "#D4D9EE",
        "neutral": "#37413A",
        "base-100": "#F8FAF9",
        "base-200": "#ECF3F2",
        "info": "#B3D4C0",
        "success": "#A8C7C0",
        "warning": "#E5C8B6",
        "error": "#D4D9EE",
      },
      "tranquil-dark": {
        "primary": "#7BB0A7",
        "secondary": "#B59382",
        "accent": "#9BA3C9",
        "neutral": "#E7ECEA",
        "base-100": "#1E2322",
        "base-200": "#2A302F",
        "info": "#8FC5AA",
        "success": "#7BB0A7",
        "warning": "#B59382",
        "error": "#9BA3C9",
      },
    },
  ],
}
```


You can toggle these with:

```html
<html data-theme="tranquil">
<html data-theme="tranquil-dark">
```

---

Would you like me to render this as a **visual palette image** (swatches of both light and dark modes side by side)? It helps when picking component colors or showing it to your design team.
