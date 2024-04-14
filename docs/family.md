---
title: Family
---

# Pandava and Kaurava

Topic for day thirteen, **family** of #30DayChartChallenge. An infographic of the character relationships in the epic **Mahabharata**.

[Data Source: List of characters in the Mahabharata](https://en.wikipedia.org/wiki/List_of_characters_in_the_Mahabharata)

```js
const familyData = FileAttachment("./data/day13/mini-mahabharata.csv").csv();
```


```js
const chartWidth = Generators.width(document.querySelector(".infographic"));

import {drawInfographic} from "./components/day13/infographic.js";

const familyGroup = d3.group(familyData, d=>d.type);

const godColorScale = d3.scaleOrdinal().domain(["Yama", "Vayu", "Indra", "Ashvini Kumaras"]).range(['#363636','#9895f9','#72caff','#a4295f']);
```

<br>

## The rival cousins

The pandavas and kauravas were cousins, from paternal grandfather **Vichitravirya**, the kuru king. Vichitravirya had two wives Ambika and Ambalika. Ambika and Ambalika both had sons <span class="father" style="background-color:#401F71;">Dhritarashtra</span> and <span class="father" style="background-color:#e9b9b9;">Pandu</span> respectively. <span class="father" style="background-color:#e9b9b9;">King Pandu</span> was cursed by a sage and was unable to bear children. He was the foster father of the Pandavas, his wives <span class="father" style="background-color:#d37676;">Kunti</span> and <span class="father" style="background-color:#EE4266;">Madri</span> were given **boons** by the gods to bear children.
The **Kurukshetra War** was subsequently fought by the pandavas and kauravas.

---


<div class="grid grid-cols-1 infographic">${drawInfographic(familyGroup, chartWidth)}</div>

<style>
    * {
        font-family: sans-serif;
    }

    .father {
        border-radius: 3px;
        padding: 3px;
        font-weight: bold;
        color: white;
    }

    text {
        font-family: sans-serif;
    }

    .infographic {
        max-width: 450px;
    }

    path .Yudhishthira {
        background: rgb(232,131,23);
        background: linear-gradient(90deg, rgba(232,131,23,1) 50%, rgba(211,118,118,1) 50%);
    }
</style>