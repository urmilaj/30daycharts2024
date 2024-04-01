---
title: Part to Whole
---

# Thalis of India

Topic for day one, **part-to-whole** of #30DayChartChallenge. So here's a **percentage chart** *showing the values of vegetarian or non-vegetarian dishes* for each state or union territory visualizing each region's thali. **Thali or Bhojanam is a round platter used to serve food in South Asia.** Thali is also used to refer to an Indian-style meal made up of a selection of various dishes which are served on a platter.
<br>
<br>

```js
const chartWidth = Generators.width(document.querySelector(".card"));
import {stateThali} from "./components/day1/stateThali.js";
```

```js
const delhiThali = FileAttachment("./data/day1/delhi_thali.json").json();
const punjabThali = FileAttachment("./data/day1/punjab_thali.json").json();
const uttarakhandThali = FileAttachment("./data/day1/uttarakhand_thali.json").json();
const uttarpradeshThali = FileAttachment("./data/day1/uttarpradesh_thali.json").json();
const westbengalThali = FileAttachment("./data/day1/westbengal_thali.json").json();
const andhrapradeshThali = FileAttachment("./data/day1/andhrapradesh_thali.json").json();
const tamilnaduThali = FileAttachment("./data/day1/tamilnadu_thali.json").json();
const keralaThali = FileAttachment("./data/day1/kerala_thali.json").json();
const karnatakaThali = FileAttachment("./data/day1/karnataka_thali.json").json();
const goaThali = FileAttachment("./data/day1/goa_thali.json").json();
const maharashtraThali = FileAttachment("./data/day1/maharashtra_thali.json").json();
const gujaratThali = FileAttachment("./data/day1/gujarat_thali.json").json();
const rajasthanThali = FileAttachment("./data/day1/rajasthan_thali.json").json();
```

## Northern India
---
<div class="grid grid-cols-2">
        <div class="card">${stateThali(punjabThali, {width: chartWidth, height:45, chordOne:18, chordTwo:32})}</div>
        <div class="card">${stateThali(uttarakhandThali, {width: chartWidth, height:45, chordOne:22, chordTwo:3})}</div>
        <div class="card">${stateThali(delhiThali, {width: chartWidth, height:45, chordOne:22, chordTwo:10})}</div>
        <div class="card">${stateThali(uttarpradeshThali, {width: chartWidth, height:45, chordOne:22, chordTwo:10})}</div>
</div>
<br>

## Eastern India
---
<div class="grid grid-cols-1">
    <div class="card">${stateThali(westbengalThali, {width: chartWidth, height:45, chordOne:22, chordTwo:10})}</div>  
</div>
<br>

## Western India
---
<div class="grid grid-cols-2">
    <div class="card">${stateThali(rajasthanThali, {width: chartWidth, height:45, chordOne:22, chordTwo:10})}</div>
    <div class="card">${stateThali(gujaratThali, {width: chartWidth, height:45, chordOne:22, chordTwo:10})}</div>
</div>
<br>

## Southern India
---
<div class="grid grid-cols-1">
    <div class="card">${stateThali(maharashtraThali, {width: chartWidth, height:45, chordOne:22, chordTwo:10})}</div>
</div>
<div class="grid grid-cols-2">
    <div class="card">${stateThali(goaThali, {width: chartWidth, height:45, chordOne:22, chordTwo:10})}</div>
    <div class="card">${stateThali(karnatakaThali, {width: chartWidth, height:45, chordOne:22, chordTwo:10})}</div>
</div>
<div class="grid grid-cols-2">
    <div class="card">${stateThali(tamilnaduThali, {width: chartWidth, height:45, chordOne:22, chordTwo:10})}</div>
    <div class="card">${stateThali(andhrapradeshThali, {width: chartWidth, height:45, chordOne:22, chordTwo:10})}</div>
    <div class="card">${stateThali(keralaThali, {width: chartWidth, height:45, chordOne:22, chordTwo:10})}</div>
</div>

<style>
    * {
        font-family: sans-serif;
    }

    .card h2 {
        font-weight: 550;
        color: #4b5563;
    }

    .card tspan {
        font-size: 11px;
        font-weight: bold;
    }
</style>
