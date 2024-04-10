---
title: Waffle
---

# Waffle Discography

Topic for day four, **waffle** of #30DayChartChallenge. *A waffle chart*, of artists' **frequency** of the word **'waffle'** in their song.

[Data Source: The Music Lyrics Database](https://www.mldb.org/search?mq=waffle&si=3&mm=1&ob=1)

---

```js
const waffleData = FileAttachment("./data/day4/lyrics-waffle.csv").csv({typed: true});
```

```js
const artistImg = [{"name":"Beyoncé","link":FileAttachment("./data/day4/images/Beyoncé.jpg").href},
{"name":"Eminem","link":FileAttachment("./data/day4/images/Eminem.jpg").href},
{"name":"Jay-Z","link":FileAttachment("./data/day4/images/Jay-Z.jpg").href},
{"name":"L.L. Cool J","link":FileAttachment("./data/day4/images/LlCoolJ.jpg").href},
{"name":"Lou Reed","link":FileAttachment("./data/day4/images/LouReed.jpg").href},
{"name":"Nirvana","link":FileAttachment("./data/day4/images/Nirvana.jpg").href},
{"name":"Weird Al Yankovic","link":FileAttachment("./data/day4/images/WeirdAlYankovic.jpg").href}];
```

```js
const imgGroup = d3.group(artistImg, d=>d.name);

const chartWidth = Generators.width(document.querySelector(".waffleContainer"));
```

```js
import {createWaffle} from "./components/day4/createWaffle.js";
```

## Waffle frequency

*Weird Al Yankovic* mentions the word *waffle* **26** times in his song the *Waffle King*.

<div class="waffleContainer">${createWaffle(waffleData.sort((a,b) => b.count-a.count), imgGroup)}</div>


<style>
    * {
        font-family: sans-serif;
    }

    text {
        font-family: sans-serif;
        font-size: 11.5px;
    }

    svg image {clip-path: inset(12% round 100%);
    }
</style>


