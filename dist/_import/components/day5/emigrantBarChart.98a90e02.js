import * as htl from "../../../_npm/htl@0.3.1/_esm.js";
import * as d3 from "../../../_npm/d3@7.9.0/_esm.js";

const formatTicks = (value) => {
    return value/100000 + "L"
}

const formatAnnotation = (value) => {
    return (value/100000).toFixed(2) + " L"
}

export function createBarChart(chartData, svgWidth) {
    const height = 800;
    const padding = 1;
    const widthPadding = 20;
    const heightPadding = 45;
    const colorCategory = d3.scaleOrdinal().domain([1990, 2020]).range(['#e25d05','#bd2803']);
    const scale = d3.scaleLinear().domain([0, 4000000]).range([0, (svgWidth/2)-widthPadding]);
    const countryScale = d3.scaleBand().domain([...chartData.keys()]).range([heightPadding, height-heightPadding]).paddingInner(0.5);
    console.log(chartData.keys())
    return htl.html`<div>
        <svg width="${svgWidth-padding}" height="${height}">
            <g transform="translate(0, -10)">
                <text x="${svgWidth/2}" y="${heightPadding}" dx="-15" dy="-25" text-anchor="end" fill="${colorCategory(1990)}" style="font-weight: bold; font-size:18px;">&#x2190; 1990</text>
                <text x="${svgWidth/2}" y="${heightPadding}" dx="15" dy="-25" text-anchor="start" fill="${colorCategory(2020)}" style="font-weight: bold; font-size:18px;">2020 &#x2192;</text>
                <text x="${svgWidth/2}" y="${heightPadding}" text-anchor="middle" style="font-size: 12px;">0</text>
                <g transform="translate(${svgWidth/2},${heightPadding})">
                    ${d3.ticks(scale.domain()[0], scale.domain()[1], 5).map(d=> htl.svg`
                        <text x="${scale(-d)}" y="0" text-anchor="middle" style="font-size: 12px;">${d=== 0? null : formatTicks(d)}</text>
                        <line x1="${scale(-d)}" y1="10" x2="${scale(-d)}" y2="${height-heightPadding}" stroke="gray" stroke-dasharray="${d === 0 ? null : '3, 3'}" stroke-opacity="0.5"/>
                    `)}
                </g>
                <g transform="translate(${svgWidth/2},${heightPadding})">
                    ${d3.ticks(scale.domain()[0], scale.domain()[1], 5).map(d=> htl.svg`
                        <text x="${scale(d)}" y="0" text-anchor="middle" style="font-size: 12px;">${d=== 0? null : formatTicks(d)}</text>
                        <line x1="${scale(d)}" y1="10" x2="${scale(d)}" y2="${height-heightPadding}" stroke="gray" stroke-dasharray="${d === 0 ? null : '3, 3'}" stroke-opacity="0.5"/>
                    `)}
                </g>
                <g transform="translate(${svgWidth/2},20)">
                    ${[...chartData].map((d,i)=>htl.svg`
                        <text x="${scale(0)}" y="${countryScale(d[0])}" dx="${i >= 7 ? 5 : -5}" dy="-3" text-anchor="${i >=7 ? 'start' : 'end'}" style="font-weight: bold; font-size:12px;" fill="#333333">${i >=7 ? d[0]+' - ' + formatAnnotation(d[1][0][1990]) : formatAnnotation(d[1][0][1990])+' - '+d[0]}</text>
                        <rect x="${scale(-d[1][0][1990])}" y="${countryScale(d[0])}" width="${scale(d[1][0][1990])}" height="${countryScale.bandwidth()}" fill="${colorCategory(1990)}" stroke="white"/>
                        <rect x="0" y="${countryScale(d[0])}" width="${scale(d[1][0][2020])}" height="${countryScale.bandwidth()}" fill="${colorCategory(2020)}" stroke="white"/>
                    `)}
                </g>
                <line x1="${svgWidth/2}" y1="45" x2="${svgWidth/2}" y2="${height}" stroke="black" stroke-width="1.5"/>
                <text x="${svgWidth-widthPadding}" y="${height}" dy="18" text-anchor="end" style="font-weight: bold;">(value in lakhs)</text>
            </g>
        </svg>
    </div>`
}