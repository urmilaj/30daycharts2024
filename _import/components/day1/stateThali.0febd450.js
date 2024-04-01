import * as htl from "../../../_npm/htl@0.3.1/_esm.js";
import * as d3 from "../../../_npm/d3@7.9.0/_esm.js";

const dishSortOrder = { Main: 1, Side: 2, Dessert: 3, Beverage: 4 };

function compareItems(a, b) {
    return dishSortOrder[a.role] - dishSortOrder[b.role] || a.dish.localeCompare(b.dish);
}


const dishColorCategory = d3.scaleOrdinal()
.domain(["Main", "Side","Dessert","Beverage"])
.range(["#DD5353","#FFB100","#F7A4A4","#8879B0"])


function getDishCategoryValues(dishData) {
    return [...dishData].map((v, i) => htl.html`<span style="display:inline-block; margin-top:20px; background-color:${dishColorCategory(v[0])}; color:white; border-radius: 3px; margin:3px; padding:4px; font-size:12px; font-weight:bold">${v[1].length} ${v[0].toLowerCase()}${v[1].length>1?'s':''}</span>
    `)
}

function getDishNames(dishes) {
    return dishes.map(dish => htl.html`<span style="display:inline-block; background-color:${dishColorCategory(dish.role)}; color:white; border: 1px solid ${dishColorCategory(dish.role)}; border-radius: 3px; margin:1.5px; padding:1px; font-size:12px; font-weight:bold">${dish.dish.toLowerCase().replace(/\b\w/g, function(char) {return char.toUpperCase()})}</span>`)
}

function dishPercentage(dishData, totalItems) {
    return [...dishData].map((d,i)=> htl.html`<div style="display:grid; grid-template-columns: 20% 75%; gap:20px; margin-bottom:5px;">
        <div style="padding:1px;">
            <span style="font-size:18px;font-weight:bold;">${((d[1].length/totalItems)*100).toFixed(1)}%</span><br>
            <span style="background-color:${dishColorCategory(d[0])}; color:white; border-radius: 4px; margin:0px; padding:2px; font-size:11px; font-weight:bold;">${d[0]}</span>
        </div>
        <div style="padding:5px;">
            ${getDishNames(d[1])}
        </div>
    </div><hr style="margin:0px; padding:0px 0px 10px 0px;">`)
}

const pie = d3.pie().value(d=>d[1].length).padAngle(0.02);

const chordChart = (pieData, offset, totalItems) => {
    const pieArc = d3.arc().innerRadius(35).outerRadius(50);
    
    return pieData.map((d, i) => htl.svg`
    <path id="arc_${i}" d=${pieArc(d)} fill="${dishColorCategory(d.data[0])}" stroke="white"/>
    <g>
        <text dx="-3" dy="${pieArc(d).endAngle > 90 * Math.PI/180 ? 18 : -8}" style="font-size:12px">
            <textPath href="#arc_${i}" startOffset="${offset}%" text-anchor="middle">${(d.data[1].length/totalItems*100).toFixed(0)}%</textPath>
        </text>
    </g>
    `)
}

function veggieOrMeaty(thaliData, width, height, chordOne, chordTwo) {
    return thaliData.map((thali, index) => {
        const thaliName = thali.thali_name;
        const thaliTotalItems = thali.num_of_items;
        const thaliVegItems = thali.num_of_veg;
        const thaliNonVegItems = thali.num_of_nonveg;
        const vegPercentage = `${((thaliVegItems/thaliTotalItems)*100).toFixed(1)}%`;
        const nonVegPercentage = `${((thaliNonVegItems/thaliTotalItems)*100).toFixed(1)}%`;
        const thaliGroup = d3.group(thali.dishes.sort(compareItems), d=>d.role)
        const getText = () => {
            thaliVegItems === thaliTotalItems ? `<text x=${vegPercentage} y=-15 text-anchor="end">100% veggie</text>` :
            thaliNonVegItems === thaliTotalItems ? `100% meaty` :
            htl.svg`
            <text x=${vegPercentage} y=-5 dx=-3 text-anchor="end">${vegPercentage}</text>
            <text x=${nonVegPercentage} y=-5 dx=3 text-anchor="start">${nonVegPercentage}</text>
            `

        }
        const offsetValue = index === 0 ? chordOne : chordTwo;
        return htl.html`
        <div class="card" style="background-color:white;">
            <h2 style="display:inline">${thaliName}</h2>
            <span> - This thali includes <b>${thaliTotalItems}</b> dishes in total.</span>
            <svg width="100%" height=${height}>
                <defs>
                    <linearGradient id="${thaliName.replace(/\s/g, "")}_${index}" x1="0%" x2="100%" y1="0%" y2="0%">
                        <stop stop-color="green" offset="${vegPercentage}"/>
                        <stop stop-color="lightgray">
                    </linearGradient>
                </defs>
                <g transform="translate(0,25)">
                    ${thaliVegItems === thaliTotalItems ? htl.svg`<text text-anchor="end">
                        <tspan dx=-1 y=-16 x=${vegPercentage}>&#x2190; 100%<tspan>
                        <tspan dx=-5 y=-4 x=${vegPercentage}>veggie<tspan>
                    </text>` :
                    thaliNonVegItems === thaliTotalItems ? htl.svg`<text text-anchor="start">
                        <tspan dx=1 y=-16 x=${vegPercentage}>100% &#x2192;<tspan>
                        <tspan dx=8 y=-4 x=${vegPercentage}>meaty <tspan>
                    </text>` :
                    htl.svg`<text text-anchor="end">
                        <tspan dx=-3 y=-16 x=${vegPercentage}>&#x2190; ${vegPercentage}<tspan>
                        <tspan dx=-6 y=-4 x=${vegPercentage}>veggie <tspan>
                    </text>
                    <text text-anchor="start">
                        <tspan dx=4 y=-16 x=${vegPercentage}>${nonVegPercentage} &#x2192;<tspan>
                        <tspan dx=3 y=-4 x=${vegPercentage}>meaty <tspan>
                    </text>
                    `
                    }
                    <rect x="0" y="0" width="100%" height="10" rx="5" fill="url(#${thaliName.replace(/\s/g, "")}_${index})"/>
                    <line x1=${vegPercentage} y1="-28" x2=${vegPercentage} y2="14" stroke="black"/>
                </g>
            </svg>
            <div>${dishPercentage(thaliGroup, thaliTotalItems)}</div>
            <p><b>${thaliName}</b> - is served on a <b>${thali.served_on}</b>.</p>
        </div>
        `
    })
}

export function stateThali(thaliData, {width, height, chordOne, chordTwo} = {}) {
    return htl.html`
    <h1>${thaliData[0].state}</h1>
    <p>${thaliData[0].description}</p>
    <a href=${thaliData[0].source} target="_blank"><b>Source: Youtube</b> - Utsav: Thalis of India - Episode ${thaliData[0].thalis[0].episode_num}, ${thaliData[0].state}</a>
    <hr>
    <div class="grid grid-${thaliData[0].state === "Maharashtra" ? 'cols-2': thaliData[0].state === "West Bengal" ? 'cols-2' : 'rows-2'}">${veggieOrMeaty(thaliData[0].thalis, width, height, chordOne, chordTwo)}</div>
   `
}



