---
title: Neo
---

# Conservation status of birds

Topic for day two, **neo** of #30DayChartChallenge. Exploring *Birds of the World Taxonomy list* who's **species names begin with the word Neo.** 

[Data Source: Full Species List - *The Cornell Lab of Ornithology* | Birds of the World](https://birdsoftheworld.org/bow/specieslist)

<br>

## IUCN Risk Category
---

There are **46** bird species beginning with the name **Neo** belonging to various different phylogenetic orders that are categorised as <span class='iucn_category' style="background-color: #C63D2F;">Threatened Species</span> - *which is vulnerable to extinction in the near future* **or**<br> <span class='iucn_category' style="background-color: #FFAE6D;">Lower Risk Species</span> - *with populations levels high enough to ensure its survival.*

<!-- Barchart begins -->

```js
const birdGenusNeo = FileAttachment("./data/day2/birdGenusNeo.csv").csv();
```

```js
const conservation_group = d3.group(birdGenusNeo, d=>d.conservation_status);
const colorCategory = d3.scaleOrdinal().domain(['Lower Risk','Threatened']).range(['#FFAE6D','#C63D2F']);
const vxScale = d3.scaleBand().domain([...conservation_group.keys()]).range([0, width-50]).padding(0.25)
const vyScale = d3.scaleLinear().domain([0, 60]).range([300, 0])
const hxScale = d3.scaleLinear().domain([0, 60]).range([0, width-130])
const hyScale = d3.scaleBand().domain([...conservation_group.keys()]).range([400, 0]).padding(0.25)
```

```js
width > 750 ? svg`<svg width="${width}" height="350">
    <g transform="translate(30,10)">
        ${[0, 10, 20, 30, 40, 50].map(d=>svg`
        <text x='0' y='${vyScale(d)}' dy='3' text-anchor='end' font-size='12'>${d}</text>
        <line/ x1='10' y1='${vyScale(d)}' x2='${width-80}' y2='${vyScale(d)}' stroke='gray' stroke-dasharray='2 2' opacity='0.5'>`)}
        ${[...conservation_group].map(d=>svg`
        <rect x='${vxScale(d[0])}' y='${vyScale(d[1].length)}' width='${vxScale.bandwidth()}' height='${300-vyScale(d[1].length)}' fill='${colorCategory    (d[1][0].category)}'/>
        <text x='${vxScale(d[0])+vxScale.bandwidth()/2}' y='320' text-anchor='middle' font-size='14'>${d[0]}</text>
        <text x='${vxScale(d[0])+vxScale.bandwidth()/2}' y='${vyScale(d[1].length)}' dy=-5 text-anchor='middle' font-weight='bold'>${d[1].length}</text>
        `)}
        <line x1='${vxScale('Critically Endangered')+vxScale.bandwidth()+25}' y1='10' x2='${vxScale('Critically Endangered')+vxScale.bandwidth()+25}' y2='300' stroke='black' stroke-width='1.5'/>
        <text text-anchor='end' font-size='14' font-weight='bold' fill='${colorCategory('Threatened')}'>
            <tspan x='${vxScale('Critically Endangered')+vxScale.bandwidth()+25}' y='20' dx='-10'>&#x2190; Threatened</tspan>
            <tspan x='${vxScale('Critically Endangered')+vxScale.bandwidth()+25}' y='35' dx='-16'>Species</tspan>
        </text>
        <text text-anchor='start' font-size='14' font-weight='bold' fill='${colorCategory('Lower Risk')}'>
            <tspan x='${vxScale('Critically Endangered')+vxScale.bandwidth()+25}' dx='15' y='20'>Lower Risk &#x2192;</tspan>
            <tspan x='${vxScale('Critically Endangered')+vxScale.bandwidth()+25}' dx='13' y='35'>Species</tspan>
        </text>
    </g>
</svg>` : 
svg`<svg width={width} height="450">
    <g transform="translate(150,25)">
        ${[0, 10, 20, 30, 40, 50].map(d=>svg`
        <text x='${hxScale(d)}' y='0' dy='3' text-anchor='middle' font-size='12'>${d}</text>
        <line/ x1='${hxScale(d)}' y1='10' x2='${hxScale(d)}' y2='400' stroke='gray' stroke-dasharray='2 2' opacity='0.5'>`)}
        ${[...conservation_group].map(d=>svg`
        <rect x='0' y='${hyScale(d[0])}' width='${hxScale(d[1].length)}' height='${hyScale.bandwidth()}' fill='${colorCategory(d[1][0].category)}'/>
        <text x='0' y='${hyScale(d[0])+hyScale.bandwidth()/2}' dx='-10' text-anchor='end' font-size='14'>${d[0]}</text>
        <text x='${hxScale(d[1].length)}' y='${hyScale(d[0])+hyScale.bandwidth()/2}' dx='5' text-anchor='start' font-weight='bold'>${d[1].length}</text>
        `)}
        <line x1='0' y1='${hyScale('Critically Endangered')-8}' x2='${width-180}' y2='${hyScale('Critically Endangered')-8}' stroke='black' stroke-width='1.5'/>
        <text text-anchor='start' font-size='14' font-weight='bold' fill='${colorCategory('Lower Risk')}'>
            <tspan x="${width-175}" y="${hyScale('Critically Endangered')-18}" dy="-20" text-anchor="end">&#x2191;</tspan>
            <tspan x="${width-180}" y="${hyScale('Critically Endangered')-18}" text-anchor="end">Lower Risk Species</tspan>
        </text>
        <text text-anchor='start' font-size='14' font-weight='bold' fill='${colorCategory('Threatened')}'>
            <tspan x="${width-175}" y="${hyScale('Critically Endangered')+18}" text-anchor="end">Threatened Species</tspan>
            <tspan x="${width-180}" y="${hyScale('Critically Endangered')+18}" dy="20" text-anchor="end">&#x2193;</tspan>
        </text>
    </g>
</svg>`
```

<!-- Barchart ends -->

<br><br>

## Aves Phylogenentic Tree

Below are the bird orders that belong to class Aves - the families that belong to that order and various birds whose **genus and species names** that begin with **neo**.

---


```js
import {createPhyloTree, getNeoSpecies} from "./components/day2/phylo.js";

const chartWidth = Generators.width(document.querySelector(".card"));

const phyloOrderGroup = d3.group(birdGenusNeo, d=>d.order_name, d=>d.family_name, d=>d.species_name);

const phyloGroup = d3.group(birdGenusNeo, d=>d.class_name, d=>d.order_name, d=>d.family_name,d=>d.species_name);

const phyloOrder = d3.group(birdGenusNeo, d=>d.order_name);


const node = d3.hierarchy(phyloGroup);

const tree = d3.tree().size([700,500])(node);
```

<div class="card">
    <b style="font-size:1.2rem;">Otidiformes - </b><b><i>Bustards</i></b>, are large, terrestrial birds living mainly in dry grassland areas.
    <br><br>
    <div>${createPhyloTree(phyloOrderGroup.get("Otidiformes"), chartWidth, 300, 'horizontal')}</div>
    <br>
    <img width="100" height="100" src="./data/day2/images/Ludwig&apos;sBustard.jpg">
    <div>${getNeoSpecies(phyloOrder.get("Otidiformes"))}</div>
</div>

<div class="card">
    <b style="font-size:1.2rem;">Cuculiformes - </b><b><i>Cuckoos and Roadrunners</i></b>, small- to medium-sized birds.
    <br><br>
    <div>${createPhyloTree(phyloOrderGroup.get("Cuculiformes"), chartWidth, 300, 'horizontal')}</div>
</div>

<div class="card">
    <b style="font-size:1.2rem;">Accipitriformess - </b><b><i>hawks, eagles, vultures, and kites</i></b>, an order of birds that includes most of the diurnal birds of prey but not falcons.
    <br><br>
    <div>${createPhyloTree(phyloOrderGroup.get("Accipitriformes"), chartWidth, 100, 'horizontal')}</div>
</div>

<div class="card">
    <b style="font-size:1.2rem;">Falconiformes - </b><b><i>falcons and caracaras</i></b>, strong flyers and carnivores.
    <br><br>
    <div>${createPhyloTree(phyloOrderGroup.get("Falconiformes"), chartWidth, 100, 'horizontal')}</div>
</div>

<div class="card">
    <b style="font-size:1.2rem;">Psittaciformes - </b> </b><b><i>parrots</i></b>, found mostly in tropical and subtropical regions.
    <br><br>
    <div>${createPhyloTree(phyloOrderGroup.get("Psittaciformes"), chartWidth, 400, 'horizontal')}</div>
</div>

<div class="card">
    <b style="font-size:1.2rem;">Passeriformes - </b> </b><b><i>passerine</i></b>, includes more than half of all bird species. Sometimes known as perching birds, passerines generally have an anisodactyl arrangement of their toes, which facilitates perching.
    <br><br>
    <div>${createPhyloTree(phyloOrderGroup.get("Passeriformes"), chartWidth, 800, 'horizontal')}</div>
</div>



```js
const test = tree.links().slice(1)

const link = d3.link(d3.curveStep).source(d=>[d.source.y, d.source.x]).target(d=>[d.target.y, d.target.x])
```

```js
// tree.descendants()
// tree.links().slice(
    phyloOrder.get("Otidiformes")
// phyloOrderGroup.get("Otidiformes")
```

```js
svg`<svg width=${width} height="750" style="background-color: lightblue;">
    <g transform="translate(25,25)">
        ${test.map(d=>svg`<path d="${link(d)}" fill="none" stroke="black" stroke-width=2/>`)}
        ${tree.descendants().map(d=>svg`<text x="${d.y}" y="${d.x}" text-anchor="${d.depth<3?'end':'start'}">${d.data[0]}</text>`)}
    </g>
</svg>`
```





<style>
    * {
        font-family: sans-serif;
    }

    text {
        font-family: sans-serif;
    }

    /* svg {
        background-color: #fafafa;
    } */

    .iucn_category {
        border-radius: 2.5px;
        padding: 1.3px;
        color:white;
        font-weight: bold;
    }

    .card h2 {
        font-weight:bold;
        font-size:1.2rem;
    }

    img {
        border-radius: 50%;
    }
</style>