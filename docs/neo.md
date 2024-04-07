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

const phyloOrder = d3.group(birdGenusNeo, d=>d.order_name);
```

```js
const imgLinks = [{"order_name":"Otidiformes","species_name":"Neotis ludwigii","common_name":"Ludwig's Bustard","link":FileAttachment("./data/images/Ludwig'sBustard.jpg").href},{"order_name":"Cuculiformes","species_name":"Neomorphus geoffroyi","common_name":"Rufous-vented Ground-Cuckoo","link":FileAttachment("./data/images/Rufous-ventedGround-Cuckoo.jpg").href},{"order_name":"Cuculiformes","species_name":"Neomorphus radiolosus","common_name":"Banded Ground-Cuckoo","link":FileAttachment("./data/images/BandedGround-Cuckoo.jpg").href},{"order_name":"Accipitriformes","species_name":"Neophron percnopterus","common_name":"Egyptian Vulture","link":FileAttachment("./data/images/EgyptianVulture.jpg").href},{"order_name":"Psittaciformes","species_name":"Neophema chrysostoma","common_name":"Blue-winged Parrot","link":FileAttachment("./data/images/Blue-wingedParrot.jpg").href},{"order_name":"Psittaciformes","species_name":"Neophema chrysogaster","common_name":"Orange-bellied Parrot","link":FileAttachment("./data/images/Orange-belliedParrot.jpg").href},{"order_name":"Passeriformes","species_name":"Neodrepanis hypoxantha","common_name":"Yellow-bellied Sunbird-Asity","link":FileAttachment("./data/images/Yellow-belliedSunbird-Asity.jpg").href},{"order_name":"Otidiformes","species_name":"Neotis denhami","common_name":"Denham's Bustard","link":FileAttachment("./data/images/Denham'sBustard.jpg").href},{"order_name":"Otidiformes","species_name":"Neotis heuglinii","common_name":"Heuglin's Bustard","link":FileAttachment("./data/images/Heuglin'sBustard.jpg").href},{"order_name":"Otidiformes","species_name":"Neotis nuba","common_name":"Nubian's Bustard","link":FileAttachment("./data/images/Nubian'sBustard.jpg").href},{"order_name":"Cuculiformes","species_name":"Neomorphus squamiger","common_name":"Scaled Ground-Cuckoo","link":FileAttachment("./data/images/ScaledGround-Cuckoo.jpg").href},{"order_name":"Cuculiformes","species_name":"Neomorphus rufipennis","common_name":"Rufous-winged Ground-Cuckoo","link":FileAttachment("./data/images/Rufous-wingedGround-Cuckoo.jpg").href},{"order_name":"Cuculiformes","species_name":"Neomorphus pucheranii","common_name":"Red-billed Ground-Cuckoo","link":FileAttachment("./data/images/Red-billedGround-Cuckoo.jpg").href},{"order_name":"Falconiformes","species_name":"Neohierax insignis","common_name":"White-rumped Falcon","link":FileAttachment("./data/images/White-rumpedFalcon.jpg").href},{"order_name":"Psittaciformes","species_name":"Neophema bourkii","common_name":"Bourke's Parrot","link":FileAttachment("./data/images/Bourke'sParrot.jpg").href},{"order_name":"Psittaciformes","species_name":"Neophema elegans","common_name":"Elegant Parrot","link":FileAttachment("./data/images/ElegantParrot.jpg").href},{"order_name":"Psittaciformes","species_name":"Neophema petrophila","common_name":"Rock Parrot","link":FileAttachment("./data/images/RockParrot.jpg").href},{"order_name":"Psittaciformes","species_name":"Neophema pulchella","common_name":"Turquoise Parrot","link":FileAttachment("./data/images/TurquoiseParrot.jpg").href},{"order_name":"Psittaciformes","species_name":"Neophema splendida","common_name":"Scarlet-chested Parrot","link":FileAttachment("./data/images/Scarlet-chestedParrot.jpg").href},{"order_name":"Psittaciformes","species_name":"Neopsittacus musschenbroekii","common_name":"Yellow-billed Lorikeet","link":FileAttachment("./data/images/Yellow-billedLorikeet.jpg").href},{"order_name":"Psittaciformes","species_name":"Neopsittacus pullicauda","common_name":"Orange-billed Lorikeet","link":FileAttachment("./data/images/Orange-billedLorikeet.jpg").href},{"order_name":"Passeriformes","species_name":"Neodrepanis coruscans","common_name":"Common Sunbird-Asity","link":FileAttachment("./data/images/CommonSunbird-Asity.jpg").href},{"order_name":"Passeriformes","species_name":"Neoctantes niger","common_name":"Black Bushbird","link":FileAttachment("./data/images/BlackBushbird.jpg").href},{"order_name":"Passeriformes","species_name":"Neopelma pallescens","common_name":"Pale-bellied Tyrant-Manakin","link":FileAttachment("./data/images/Pale-belliedTyrant-Manakin.jpg").href},{"order_name":"Passeriformes","species_name":"Neopelma chrysocephalum","common_name":"Saffron-crested Tyrant-Manakin","link":FileAttachment("./data/images/Saffron-crestedTyrant-Manakin.jpg").href},{"order_name":"Passeriformes","species_name":"Neopelma aurifrons","common_name":"Wied's Tyrant-Manakin","link":FileAttachment("./data/images/Wied'sTyrant-Manakin.jpg").href},{"order_name":"Passeriformes","species_name":"Neopelma chrysolophum","common_name":"Serra do Mar Tyrant-Manakin","link":FileAttachment("./data/images/SerradoMarTyrant-Manakin.jpg").href},{"order_name":"Passeriformes","species_name":"Neopelma sulphureiventer","common_name":"Sulphur-bellied Tyrant-Manakin","link":FileAttachment("./data/images/Sulphur-belliedTyrant-Manakin.jpg").href},{"order_name":"Passeriformes","species_name":"Neopipo cinnamomea","common_name":"Cinnamon Manakin-Tyrant","link":FileAttachment("./data/images/CinnamonManakin-Tyrant.jpg").href},{"order_name":"Passeriformes","species_name":"Neoxolmis coronatus","common_name":"Black-crowned Monjita","link":FileAttachment("./data/images/Black-crownedMonjita.jpg").href},{"order_name":"Passeriformes","species_name":"Neoxolmis salinarum","common_name":"Salinas Monjita","link":FileAttachment("./data/images/SalinasMonjita.jpg").href},{"order_name":"Passeriformes","species_name":"Neoxolmis rubetra","common_name":"Rusty-backed Monjita","link":FileAttachment("./data/images/Rusty-backedMonjita.jpg").href},{"order_name":"Passeriformes","species_name":"Neoxolmis rufiventris","common_name":"Chocolate-vented Tyrant","link":FileAttachment("./data/images/Chocolate-ventedTyrant.jpg").href},{"order_name":"Passeriformes","species_name":"Neosericornis citreogularis","common_name":"Yellow-throated Scrubwren","link":FileAttachment("./data/images/Yellow-throatedScrubwren.jpg").href},{"order_name":"Passeriformes","species_name":"Neolalage banksiana","common_name":"Buff-bellied Monarch","link":FileAttachment("./data/images/Buff-belliedMonarch.jpg").href},{"order_name":"Passeriformes","species_name":"Neomixis tenella","common_name":"Common Jery","link":FileAttachment("./data/images/CommonJery.jpg").href},{"order_name":"Passeriformes","species_name":"Neomixis viridis","common_name":"Green Jery","link":FileAttachment("./data/images/GreenJery.jpg").href},{"order_name":"Passeriformes","species_name":"Neomixis striatigula","common_name":"Stripe-throated Jery","link":FileAttachment("./data/images/Stripe-throatedJery.jpg").href},{"order_name":"Passeriformes","species_name":"Neophedina cincta","common_name":"Banded Martin","link":FileAttachment("./data/images/BandedMartin.jpg").href},{"order_name":"Passeriformes","species_name":"Neolestes torquatus","common_name":"Black-collared Bulbul","link":FileAttachment("./data/images/Black-collaredBulbul.jpg").href},{"order_name":"Passeriformes","species_name":"Neocichla gutturalis","common_name":"Babbling Starling","link":FileAttachment("./data/images/BabblingStarling.jpg").href},{"order_name":"Passeriformes","species_name":"Neocossyphus rufus","common_name":"Red-tailed Ant-Thrush","link":FileAttachment("./data/images/Red-tailedAnt-Thrush.jpg").href},{"order_name":"Passeriformes","species_name":"Neocossyphus poensis","common_name":"White-tailed Ant-Thrush","link":FileAttachment("./data/images/White-tailedAnt-Thrush.jpg").href},{"order_name":"Passeriformes","species_name":"Neochmia phaeton","common_name":"Crimson Finch","link":FileAttachment("./data/images/CrimsonFinch.jpg").href},{"order_name":"Passeriformes","species_name":"Neochmia temporalis","common_name":"Red-browed Firetail","link":FileAttachment("./data/images/Red-browedFiretail.jpg").href},{"order_name":"Passeriformes","species_name":"Neothraupis fasciata","common_name":"White-banded Tanager","link":FileAttachment("./data/images/White-bandedTanager.jpg").href}]
```

```js
const imgGroup = d3.group(imgLinks, d=>d.order_name, d=>d.common_name)
```

<div class="card">
    <b style="font-size:1.2rem;">Otidiformes - </b><b><i>Bustards</i></b>, are large, terrestrial birds living mainly in dry grassland areas.
    <br><br>
    <div>${createPhyloTree(phyloOrderGroup.get("Otidiformes"), chartWidth, 300, 'horizontal')}</div>
    <br>
    <div>${getNeoSpecies(phyloOrder.get("Otidiformes"), imgGroup.get("Otidiformes"))}</div>
</div>

<div class="card">
    <b style="font-size:1.2rem;">Cuculiformes - </b><b><i>Cuckoos and Roadrunners</i></b>, small- to medium-sized birds.
    <br><br>
    <div>${createPhyloTree(phyloOrderGroup.get("Cuculiformes"), chartWidth, 300, 'horizontal')}</div>
    <br>
    <div>${getNeoSpecies(phyloOrder.get("Cuculiformes"), imgGroup.get("Cuculiformes"))}</div>
</div>

<div class="card">
    <b style="font-size:1.2rem;">Accipitriformess - </b><b><i>hawks, eagles, vultures, and kites</i></b>, an order of birds that includes most of the diurnal birds of prey but not falcons.
    <br><br>
    <div>${createPhyloTree(phyloOrderGroup.get("Accipitriformes"), chartWidth, 100, 'horizontal')}</div>
    <br>
    <div>${getNeoSpecies(phyloOrder.get("Accipitriformes"), imgGroup.get("Accipitriformes"))}</div>   
</div>

<div class="card">
    <b style="font-size:1.2rem;">Falconiformes - </b><b><i>falcons and caracaras</i></b>, strong flyers and carnivores.
    <br><br>
    <div>${createPhyloTree(phyloOrderGroup.get("Falconiformes"), chartWidth, 100, 'horizontal')}</div>
    <br>
    <div>${getNeoSpecies(phyloOrder.get("Falconiformes"), imgGroup.get("Falconiformes"))}</div>
</div>

<div class="card">
    <b style="font-size:1.2rem;">Psittaciformes - </b> </b><b><i>parrots</i></b>, found mostly in tropical and subtropical regions.
    <br><br>
    <div>${createPhyloTree(phyloOrderGroup.get("Psittaciformes"), chartWidth, 400, 'horizontal')}</div>
    <br>
    <div>${getNeoSpecies(phyloOrder.get("Psittaciformes"), imgGroup.get("Psittaciformes"))}</div>
</div>

<div class="card">
    <b style="font-size:1.2rem;">Passeriformes - </b> </b><b><i>passerine</i></b>, includes more than half of all bird species. Sometimes known as perching birds, passerines generally have an anisodactyl arrangement of their toes, which facilitates perching.
    <br><br>
    <div>${createPhyloTree(phyloOrderGroup.get("Passeriformes"), chartWidth, 800, 'horizontal')}</div>
    <br>
    <div>${getNeoSpecies(phyloOrder.get("Passeriformes"), imgGroup.get("Passeriformes"))}</div>
</div>

<style>
    * {
        font-family: sans-serif;
    }

    text {
        font-family: sans-serif;
    }

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
        border-radius: 10%;
    }
</style>