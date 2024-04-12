---
title: Reuters Graphics
theme: deep-space
---

# Objects launched into outer space

Topic for day twelve, **reuters graphics (theme day)** of #30DayChartChallenge. A interactive bubble chart of cumulative number of objects launched into space by countries and other entity between **1957 and 2023**.

[Data Source: Our World In Data | Space Exploration and Satellites](https://ourworldindata.org/grapher/cumulative-number-of-objects-launched-into-outer-space) <br>
[Spaceship icon: Space by nakals | The Noun Project](https://thenounproject.com/icon/space-6459053/)

```js
const spaceData = FileAttachment("./data/day12/objects-outer-space.csv").csv({typed:true});
```

```js
const formatYear = d3.timeParse("%Y");
const tickFormat = d3.timeFormat("%Y");

const yearGroup = d3.group(spaceData.sort((a,b)=>b.Year-a.Year), d=>formatYear(d.Year), d=>d.Entity);

const chartWidth = Generators.width(document.querySelector(".bubbleChart"));

import {createBubbleChart} from "./components/day12/bubbleChart.js";
```

```js
const selectedEntity = view(Inputs.select([null].concat([...new Set(spaceData.map(d=>d.Entity))]), {label: "Select Entity or Country"}));
```

<div class="card bubbleChart">${createBubbleChart(spaceData, chartWidth, selectedEntity)}</div>

<style>
    * {
        font-family: sans-serif;
    }

    text {
        font-family: sans-serif;
    }
</style>