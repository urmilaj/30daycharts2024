import * as htl from "../../../_npm/htl@0.3.1/_esm.js";
import * as d3 from "../../../_npm/d3@7.9.0/_esm.js";

const formatNumber = function(number) {
    var absNumber = Math.abs(number);
    if (absNumber >= 1e9) {
        return "$"+ (number / 1e9).toFixed(1) + " B+";
    } else if (absNumber >= 1e6) {
        return "$" + Math.floor((number / 1e6).toFixed(1)) + " M";
    } else {
        return "$" + Math.floor((number/1e6).toFixed(1)) + " M";
    }
}

const annotationFormat = function(number) {
    var absNumber = Math.abs(number);
    if (absNumber >= 1e9) {
        return "$"+ Math.floor((number / 1e9).toFixed(1)) + " B+";
    } else if (absNumber >= 1e6) {
        return "$" + Math.floor((number / 1e6).toFixed(1)) + " M";
    } else {
        return "$" + (number/1e6).toFixed(1) + " M";
    }
}


export function createSlopeChart(chartData, svgWidth, type) {
    const widthPadding = 100;
    const height = 300;
    const heightPadding = 50;
    const scale = d3.scaleLinear().domain([0, 1000000000]).range([height-heightPadding, heightPadding]);
    const getOriginalBudget = chartData[0].original_budget_usd;
    const getOriginalBoxoffice = chartData[0].original_boxoffice_usd;
    const movieColorCategory = d3.scaleOrdinal().domain(['budget', 'boxoffice']).range(['#FF5403','#15F5BA']);
    return htl.html`
    <span style="background-color:${movieColorCategory(type)}; padding: 3px 5px 3px 5px; border-radius:3px;">
        <b>${type === 'budget' ? 'Budget' : 'Boxoffice'}</b>
        ${type === 'budget' ? 'for' : 'earnings of'}
        <b><i>${chartData[0].original}</i></b>.
    </span>
    <br>
    <br>
    <svg width="${svgWidth-5}" height="${height}">
        <g>
            <g transform="translate(${svgWidth-widthPadding},0)">
                <text x="0" y="${heightPadding-25}" text-anchor="start" style="font-weight:bold; font-size:13px;">Makeover</text>
                ${d3.ticks(0, 1000000000, 5).map(d=> htl.svg`
                    <text x="0" dx="15" y="${scale(d)}" text-anchor="start" style="font-size: 10px;">${formatNumber(d)}</text>
                `)}
                <line x1="0" y1="${heightPadding-5}" x2="0" y2="${height-heightPadding+3}" stroke="white" stroke-width="1.3"/>
                <g>
                    ${type==='budget' ? 
                    chartData.map((d,i)=> htl.svg`
                        <line x1="0" y1="${scale(d.remake_budget_usd > 1000000000 ? 1000000000 : d.remake_budget_usd)}" x2="${-(svgWidth-(widthPadding*2))}" y2="${scale(d.original_budget_usd > 1000000000 ? 1000000000 : d.original_budget_usd)}" stroke="${movieColorCategory(type)}" stroke-width="2"/>
                        <circle cx="0" cy="${scale(d.remake_budget_usd > 1000000000 ? 1000000000 : d.remake_budget_usd)}" r="5"/>
                        <text x="0" dx="${d.bx}" dy="${d.by}" y="${scale(d.remake_budget_usd > 1000000000 ? 1000000000 : d.remake_budget_usd)}" text-anchor="end" style="font-weight:bold; fill:${movieColorCategory(type)};">${annotationFormat(d.remake_budget_usd > 1000000000 ? 1000000000 : d.remake_budget_usd)}</text>`) : 
                    chartData.map(d=>htl.svg`
                        <line x1="0" y1="${scale(d.remake_boxoffice_usd > 1000000000 ? 1000000000 : d.remake_boxoffice_usd)}" x2="${-(svgWidth-(widthPadding*2))}" y2="${scale(d.original_boxoffice_usd > 1000000000 ? 1000000000 : d.original_boxoffice_usd)}" stroke="${movieColorCategory(type)}" stroke-width="2"/>
                        <circle cx="0" cy="${scale(d.remake_boxoffice_usd > 1000000000 ? 1000000000 : d.remake_boxoffice_usd)}" r="5"/>
                        <text x="0" dx="${d.ox}" dy="${d.oy}" y="${scale(d.remake_boxoffice_usd > 1000000000 ? 1000000000 : d.remake_boxoffice_usd)}" text-anchor="end" style="font-weight:bold; fill:${movieColorCategory(type)};">${annotationFormat(d.remake_boxoffice_usd > 1000000000 ? 1000000000 : d.remake_boxoffice_usd)}</text>`)}
                </g>
            </g>
            <g transform="translate(${widthPadding},0)">
                <text x="0" y="${heightPadding-25}" text-anchor="end" style="font-weight:bold; font-size:13px;">Original</text>
                ${d3.ticks(0, 1000000000, 5).map(d=> htl.svg`
                    <text x="0" dx="-15" y="${scale(d)}" text-anchor="end" style="font-size: 10px;">${formatNumber(d)}</text>
                `)}
                <line x1="0" y1="${heightPadding-5}" x2="0" y2="${height-heightPadding+3}" stroke="white" stroke-width="1.3"/>
                <g>
                    ${type === 'budget' ? htl.svg`<text x="0" dx="5" dy="20" y="${scale(getOriginalBudget)}" text-anchor="start" style="font-weight:bold; fill:${movieColorCategory(type)};">${annotationFormat(getOriginalBudget)}</text>`: 
                    htl.svg`<text x="0" dx="3" dy="18" y="${scale(getOriginalBoxoffice)}" text-anchor="start" style="font-weight:bold; fill:${movieColorCategory(type)};">${annotationFormat(getOriginalBoxoffice)}</text>`}
                    ${type==='budget' ? htl.svg`<circle cx="0" cy="${scale(getOriginalBudget > 1000000000 ? 1000000000 : getOriginalBudget)}" r="5"/>` : htl.svg`<circle cx="0" cy="${scale(getOriginalBoxoffice > 1000000000 ? 1000000000 : getOriginalBoxoffice)}" r="5"/>`}
                </g>
            </g>
            <text x="${svgWidth-widthPadding-55}" y="${height-10}" style="fill:${movieColorCategory(type)}">(values USD in million)</text>
        </g>
    </svg>
    <hr>
    <div>
        <div>
            ${chartData.map(d=>htl.html`<p>${d.remake} <b>(${d.remake_year})</b> <span>${type === 'budget' ? 'had a budget of ' : 'made '}</span> <span style="display:inline-block; background-color:${movieColorCategory(type)}; padding: 3px 5px 3px 5px; border-radius:3px;"><b>${annotationFormat(type === 'budget' ? d.remake_budget_usd : d.remake_boxoffice_usd)}</b></span>.</p>`)}
        </div>
    </div>
    `
}


export function getMovie(movieData) {
    return htl.html`
    <h2>${movieData[0].original}</h2>
    <p>${movieData[0].original} was first released in <b>${movieData[0].original_year}</b>. The movie was subsequently remade in ${movieData.length > 1 ? movieData.map((d, i)=>htl.html`<b>${d.remake_year}</b><span> (${d.remake})</span><span>${(i+1) === movieData.length ? '.':', '}</span>`) : htl.html`<b>${movieData[0].remake_year}</b>.`}</p>
    <hr>
    `
}

