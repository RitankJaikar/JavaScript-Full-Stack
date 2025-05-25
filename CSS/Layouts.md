# CSS Layouts - Flexbox & Grid

## 🎯 Flexbox (1D Layout – Row OR Column)

Flexbox ek **1D layout system** hai jo ya to **row-wise** ya **column-wise** layout ke liye use hota hai.

- Ye elements ko **align** karne, **center** karne, ya unke beech **spacing** manage karne ke liye best hota hai.
- Bahut helpful hota hai jab aapko ek simple, flexible layout banana ho.

---

### 🧩 Flex Parent Properties

| Property             | Description |
|----------------------|-------------|
| `display: flex;`     | Container ko flex context deta hai |

#### 🔁 Direction
| Property                 | Description |
|--------------------------|-------------|
| `flex-direction:`        | `row` *(default)*, `column`, `row-reverse`, `column-reverse` |
| 2 Axis:                 | **Main axis** (direction of items) & **Cross axis** (perpendicular to main axis) |

#### 📏 Main Axis Alignment
| Property            | Values |
|---------------------|--------|
| `justify-content:`  | `flex-start` *(default)*, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`<br>`left` and `right` (work in Chrome but not standardized) |

#### 📐 Cross Axis Alignment (Single Row)
| Property         | Values |
|------------------|--------|
| `align-items:`   | `stretch` *(default)*, `flex-start`, `flex-end`, `center` |
> Works well with **no-wrap**

#### 🔄 Wrapping
| Property       | Description |
|----------------|-------------|
| `flex-wrap:`   | `nowrap` *(default)*, `wrap`, `wrap-reverse` |

#### 🧱 Gaps Between Items
| Property     | Description |
|--------------|-------------|
| `row-gap:`   | Row ke beech gap |
| `column-gap:`| Column ke beech gap |
| `gap:`       | Shorthand for both |

#### 📐 Cross Axis Alignment (Multiple Rows)
| Property         | Values |
|------------------|--------|
| `align-content:` | `stretch` *(default)*, `flex-start`, `flex-end`, `center` |
> Works only when items are wrapped into **multiple rows**

---

### 🧩 Flex Child / Item Properties

| Property        | Description |
|-----------------|-------------|
| `order:`        | Control item order (e.g. `-1`, `0`, `1`, `2`...) |

#### 📈 Space Growth & Shrinking
| Property         | Meaning |
|------------------|---------|
| `flex-grow:`     | Kitna extra space mile (like `fr` in Grid) <br> `0` *(default)*, `1`, `2`, etc. |
| `flex-shrink:`   | Kitna shrink kare item <br> `1` *(default)*, `0` (no shrink), `5` (5x faster shrink) |
| `flex-basis:`    | Base size (e.g. `200px`, `10%`, `0`, `auto` *(default)*) |
| `flex:`          | Shorthand: `flex-grow flex-shrink flex-basis`<br>`auto` → `1 1 auto`<br>`1` → `1 1 0`<br>`default` → `0 1 auto` |

#### 🧍‍♂️ Individual Alignment
| Property         | Values |
|------------------|--------|
| `align-self:`    | `stretch` *(default)*, `flex-start`, `flex-end`, `center` |

---

> 💡 Flexbox is best for **1D layouts** – when you want to align items in **a row or a column**, and need **dynamic spacing or alignment**.



---

---


## 🧱 Grid (2D Layout System)

Grid ek **2D layout** technique hai – iska use **rows aur columns** dono direction mein layout banane ke liye hota hai.

---

### 🔲 Grid Parent Properties

| Property | Description |
|----------|-------------|
| `display: grid;` | Grid container banata hai |

#### 📏 Gaps Between Items

| Property            | Description |
|---------------------|-------------|
| `row-gap` / `grid-row-gap` | Row ke beech ka gap |
| `column-gap` / `grid-column-gap` | Column ke beech ka gap |
| `gap` / `grid-gap` | Shorthand for both row and column gaps |

#### 📊 Grid Size Definition

##### `grid-template-columns:`  
- Define karta hai **columns ka number aur unka size**  
- Examples:
  - `100px 1fr 2fr` → 3 columns: 1st = 100px, 2nd = 1fr, 3rd = 2fr
  - `minmax(150px, 1fr) 2fr repeat(auto-fit, 300px)` → responsive layout
  - `repeat(3, 300px)` → 3 columns : each 300px wide
  - `repeat(auto-fit, minmax(100px, 1fr))` → responsive with flexible resizing (Creates as many columns as fit in the container → each column is at least 100px, expands up to fill available space)

##### `grid-template-rows:`  
- Similar to columns, but for **rows**

#### 📥 Auto-Generated Tracks

| Property | Description |
|----------|-------------|
| `grid-auto-columns:` | Size of auto-generated columns (e.g. `1fr`, `200px`, `minmax(150px, 1fr)`) |
| `grid-auto-rows:`    | Size of auto-generated rows |

#### 🔄 Flow Direction

| Property | Description |
|----------|-------------|
| `grid-auto-flow:` | Defines flow direction: `row` *(default)*, `column`, `dense`, `row dense`, `column dense`<br>*(Similar to flex-direction + controls how new items fill empty spaces)* |

---

### 🧭 Grid Alignment Properties

| Property            | Target | Direction | Scope |
|---------------------|--------|-----------|-------|
| `justify-items`     | Items inside cells | Horizontal (X) | Each individual item |
| `align-items`       | Items inside cells | Vertical (Y) | Each individual item |
| `justify-content`   | Entire grid         | Horizontal (X) | Whole grid inside container |
| `align-content`     | Entire grid         | Vertical (Y) | Whole grid inside container |

#### 🎯 Supported Values for All 4

| Value            | Meaning (Hinglish) |
|------------------|--------------------|
| `start`          | Left ya Top align |
| `center`         | Bilkul beech mein |
| `end`            | Right ya Bottom align |
| `stretch`        | Poora space bhar de *(default for items)* |
| `space-between`  | Items ke beech equal gap (no outer gap) |
| `space-around`   | Items ke 4o taraf equal gap (outer half) |
| `space-evenly`   | Har jagah equal gap (between + outside) |

---

### ✨ Shorthand Properties

| Shorthand | Equivalent |
|-----------|------------|
| `place-items:` | `align-items` + `justify-items` |
| `place-content:` | `align-content` + `justify-content` |

**Example:**

```css
place-items: center;
place-content: space-between center;
```

---

### 🗂️ Grid Template Areas
* Visual way to define named sections and position items:
```css
grid-template-areas:
  "header header"
  "sidebar content"
  "footer footer";
```

* Then in child items:
```css
.item-1 { grid-area: header; }
.item-2 { grid-area: sidebar; }
.item-3 { grid-area: content; }
.item-4 { grid-area: footer; }
```

---

### 📌 Grid Child / Item Properties

#### 📐 Grid Item Placement

| Property                                | Description                        |
| --------------------------------------- | ---------------------------------- |
| `grid-row-start` / `grid-row-end`       | Row line numbers or span values    |
| `grid-column-start` / `grid-column-end` | Column line numbers or span values |

#### Shorthand:

```css
grid-row: 1 / 3;        /* From row line 1 to 3 */
grid-row: span 2;       /* Span 2 rows */
grid-column: 2 / 5;     /* From column line 2 to 5 */
grid-column: 1 / -1;    /* Full width */
```

##### `grid-area:` (Shorthand for 4 props)

```css
grid-area: row-start / column-start / row-end / column-end;
/* Example */
grid-area: 3 / 1 / 7 / -1;
```

---

#### 🎛 Item Alignment (Overrides)

| Property       | Description                                                         |
| -------------- | ------------------------------------------------------------------- |
| `justify-self` | Align item horizontally within its cell (overrides `justify-items`) |
| `align-self`   | Align item vertically within its cell (overrides `align-items`)     |

Supported values: `start`, `end`, `center`, `stretch`

---

This completes the **CSS Grid** layout notes in a well-structured Markdown format for easy reference. ✅