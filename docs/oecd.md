---
title: OECD
---

# Road accidents in India vs the world

Topic for day six, **OECD (data day)** of #30DayChartChallenge. A interactive line chart and a static small multiple chart visualizing accident data of India vs other countries between 2000 - 2020.

[Data Source: OECD | The Organization for Economic Cooperation and Development](https://data.oecd.org/transport/road-accidents.htm)

```js
const chartData = FileAttachment("./data/day6/oecd.csv").csv({typed: true});
```

```js
const chartWidth = Generators.width(document.querySelector(".smallMultiple"));

const lineChartWidth = Generators.width(document.querySelector(".lineChartContainer"));

const groupCountry = d3.group(chartData, d=>d.country);

import {createLineChart, createSmallMultiple} from "./components/day6/smallMultiple.js";

```


## Interactive line chart

```js
const country = view(Inputs.select([null].concat([...groupCountry.keys()].filter(d=>d!=='India')), {label: "Select country"}))
```

<div class="grid grid-cols-1">
    <div class="lineChartContainer card">${createLineChart(groupCountry, lineChartWidth, country)}</div>
</div>

## Small multiples

<div class="grid grid-cols-4">
    <div class="card smallMultiple">${createSmallMultiple([groupCountry.get("Albania"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Argentina"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Armenia"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Australia"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Austria"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Azerbaijan"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Belarus"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Belgium"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Bosnia and Herzegovina"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Bulgaria"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Cambodia"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Canada"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Chile"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Croatia"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Czechia"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Denmark"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Estonia"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Finland"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("France"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Georgia"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Germany"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Greece"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Hungary"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Iceland"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Ireland"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Israel"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Italy"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Japan"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Kazakhstan"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Korea"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Latvia"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Liechtenstein"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Lithuania"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Luxembourg"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Malta"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Mexico"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Moldova"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Montenegro"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Morocco"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Netherlands"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("New Zealand"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("North Macedonia"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Norway"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Poland"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Portugal"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Romania"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Russia"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Serbia"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Slovak Republic"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Slovenia"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Spain"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Sweden"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Switzerland"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Türkiye"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Ukraine"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("United Kingdom"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("United States"), groupCountry.get("India")], chartWidth)}</div>
    <div class="card">${createSmallMultiple([groupCountry.get("Uzbekistan"), groupCountry.get("India")], chartWidth)}</div>
</div>


<style>
    * {
        font-family: sans-serif;
    }

    text {
        font-family: sans-serif;
    }
</style>