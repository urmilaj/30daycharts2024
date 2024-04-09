---
title: Makeover
---

# Disney movie remakes

Topic for day three, **makeover** of #30DayChartChallenge. *Slope charts*, one showing the **budget** for the original movie and the remake, the other showing the subsequent **box office earnings** of the original movie and remake.

[Data Source: Wikipedia | List of adaptations and remakes of Disney animated films](https://en.wikipedia.org/wiki/List_of_Disney_live-action_adaptations_and_remakes_of_Disney_animated_films#Box_office_performance)



```js
const disneyMovies = FileAttachment("./data/day3/disney.csv").csv({typed: true});
```

```js
import {getMovie, createSlopeChart} from "./components/day3/getMovieInfo.js";

const originalMovieGroup = d3.group(disneyMovies, d=>d.original);

const movieChartWidth = Generators.width(document.querySelector(".slope"));

```

<div class="card">
    <div>${getMovie(originalMovieGroup.get("The Jungle Book"))}</div>
    <div class="grid grid-cols-2">
        <div class="slope">${createSlopeChart(originalMovieGroup.get("The Jungle Book"), movieChartWidth, 'budget')}</div>
        <div class="slope">${createSlopeChart(originalMovieGroup.get("The Jungle Book"), movieChartWidth, 'boxoffice')}</div>
    </div>
</div>

<div class="card">
    <div>${getMovie(originalMovieGroup.get("One Hundred and One Dalmatians"))}</div>
    <div class="grid grid-cols-2">
        <div class="slope">${createSlopeChart(originalMovieGroup.get("One Hundred and One Dalmatians"), movieChartWidth, 'budget')}</div>
        <div class="slope">${createSlopeChart(originalMovieGroup.get("One Hundred and One Dalmatians"), movieChartWidth, 'boxoffice')}</div>
    </div>
</div>

<div class="card">
    <div>${getMovie(originalMovieGroup.get("Alice in Wonderland"))}</div>
    <div class="grid grid-cols-2">
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Alice in Wonderland"), movieChartWidth, 'budget')}</div>
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Alice in Wonderland"), movieChartWidth, 'boxoffice')}</div>
    </div>
</div>

<div class="card">
    <div>${getMovie(originalMovieGroup.get("Fantasia"))}</div>
    <div class="grid grid-cols-2">
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Fantasia"), movieChartWidth, 'budget')}</div>
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Fantasia"), movieChartWidth, 'boxoffice')}</div>
    </div>
</div>

<div class="card">
    <div>${getMovie(originalMovieGroup.get("Sleeping Beauty"))}</div>
    <div class="grid grid-cols-2">
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Sleeping Beauty"), movieChartWidth, 'budget')}</div>
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Sleeping Beauty"), movieChartWidth, 'boxoffice')}</div>
    </div>
</div>

<div class="card">
    <div>${getMovie(originalMovieGroup.get("Cinderella"))}</div>
    <div class="grid grid-cols-2">
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Cinderella"), movieChartWidth, 'budget')}</div>
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Cinderella"), movieChartWidth, 'boxoffice')}</div>
    </div>
</div>

<div class="card">
    <div>${getMovie(originalMovieGroup.get("Beauty and the Beast"))}</div>
    <div class="grid grid-cols-2">
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Beauty and the Beast"), movieChartWidth, 'budget')}</div>
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Beauty and the Beast"), movieChartWidth, 'boxoffice')}</div>
    </div>
</div>

<div class="card">
    <div>${getMovie(originalMovieGroup.get("Dumbo"))}</div>
    <div class="grid grid-cols-2">
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Dumbo"), movieChartWidth, 'budget')}</div>
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Dumbo"), movieChartWidth, 'boxoffice')}</div>
    </div>
</div>

<div class="card">
    <div>${getMovie(originalMovieGroup.get("Aladdin"))}</div>
    <div class="grid grid-cols-2">
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Aladdin"), movieChartWidth, 'budget')}</div>
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Aladdin"), movieChartWidth, 'boxoffice')}</div>
    </div>
</div>

<div class="card">
    <div>${getMovie(originalMovieGroup.get("The Lion King"))}</div>
    <div class="grid grid-cols-2">
        <div class="slope">${createSlopeChart(originalMovieGroup.get("The Lion King"), movieChartWidth, 'budget')}</div>
        <div class="slope">${createSlopeChart(originalMovieGroup.get("The Lion King"), movieChartWidth, 'boxoffice')}</div>
    </div>
</div>

<div class="card">
    <div>${getMovie(originalMovieGroup.get("Mulan"))}</div>
    <div class="grid grid-cols-2">
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Mulan"), movieChartWidth, 'budget')}</div>
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Mulan"), movieChartWidth, 'boxoffice')}</div>
    </div>
</div>

<div class="card">
    <div>${getMovie(originalMovieGroup.get("Pinocchio"))}</div>
    <div class="grid grid-cols-2">
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Pinocchio"), movieChartWidth, 'budget')}</div>
        <div class="slope">${createSlopeChart(originalMovieGroup.get("Pinocchio"), movieChartWidth, 'boxoffice')}</div>
    </div>
</div>

<div class="card">
    <div>${getMovie(originalMovieGroup.get("The Little Mermaid"))}</div>
    <div class="grid grid-cols-2">
        <div class="slope">${createSlopeChart(originalMovieGroup.get("The Little Mermaid"), movieChartWidth, 'budget')}</div>
        <div class="slope">${createSlopeChart(originalMovieGroup.get("The Little Mermaid"), movieChartWidth, 'boxoffice')}</div>
    </div>
</div>

<style>
    * {
        font-family: sans-serif;
    }


    .card h2 {
        font-size: 1.5rem;
        font-weight: bold;
    }

    .card p {
        font-size: 1rem;
    }

    text {
        font-family: sans-serif;
        fill: white;
    }

    svg {
        background-color: #333333;
    }

    circle {
        fiil: #333333;
        stroke: white;
        stroke-width: 3;
    }
</style>