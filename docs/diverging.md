---
title: Diverging
---

# Where do Indians go?

Topic for day five, **diverging** of #30DayChartChallenge. Indian emigrants and the countries they emigrated to in
<span class="year" style="color: #e25d05;">1990</span> vs 
<span class="year" style="color: #bd2803;">2020</span>.

[Data Source: Our World in Data](https://ourworldindata.org/migration)

```js
const emigrantData = FileAttachment("./data/day5/indian_emigrants.csv").csv();
```

```js
const chartWidth = Generators.width(document.querySelector(".card"));

const groupCountry = d3.group(emigrantData, d=>d.country)

import {createBarChart} from "./components/day5/emigrantBarChart.js";

```

<div class="grid grid-cols-1">
    <div class="card">${createBarChart(groupCountry, chartWidth)}</div>
</div>


<style>
    * {
        font-family: sans-serif;
    }

    

    .year {
        border-radius: 3px;
        padding: 3px;
        font-weight: bold;
    }
</style>