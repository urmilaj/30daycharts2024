import * as htl from "../../../_npm/htl@0.3.1/_esm.js";
import * as d3 from "../../../_npm/d3@7.9.0/_esm.js";

export function createSmallMultiple(oecdData, chartWidth) {
    const height = chartWidth;
    const widthPadding = 30;
    const heightPadding = 35;
    const formatYear = d3.timeParse("%Y");
    const tickFormat = d3.timeFormat("%y")
    const xScale = d3.scaleTime().domain([formatYear(2000), formatYear(2020)]).range([widthPadding, chartWidth-widthPadding]).nice()
    const yScale = d3.scaleLinear().domain([0, 25]).range([height-heightPadding, heightPadding]);
    const line = d3.line().x(d=>xScale(formatYear(d.year))).y(d=>yScale(d.value)).defined(d=>d.value!==null);
    return htl.html`<div>
        <p><span style="border-radius:3px; padding:5px; background-color:#7a07b4; color:white; font-weight:bold;">India</span> vs <span style="border-radius:3px; padding:5px; background-color:#b19a95; color:white; font-weight:bold;">${oecdData[0][0]["country"]}</span></p>
        <svg width="${chartWidth-1}" height="${height}">
            <g transform="translate(0,0)">
                <g transform="translate(0, 0)">
                    ${xScale.ticks().map(d=>
                        htl.svg`
                            <text x="${xScale(d)}" y="${height}" dy="-10" text-anchor="middle" style="font-size:10px;">'${tickFormat(d)}</text>
                            <line x1="${xScale(d)}" y1="${heightPadding}" x2="${xScale(d)}" y2="${height-heightPadding}" stroke="gray" stroke-opacity="0.3" stroke-dasharray="2 2"/>
                        `
                    )}
                    <text x="${-height/2}" dx="-105" y="2" transform="rotate(-90)" letter-spacing="1" style="font-size:12px; font-weight:bold;">Deaths per 1000,000 inhabitants</text>
                </g>
                <g transform="translate(10,0)">
                    ${yScale.ticks(5).map(d=>
                        htl.svg`
                            <text x="7" y="${yScale(d)}" text-anchor="middle" alignment-baseline="middle" style="font-size:10px;">${d}</text>
                        `
                    )}
                    <text x="${chartWidth/2}" y="${height}" dy="8" text-anchor="middle" style="font-size:12px; font-weight:bold;">Year</text>
                </g>
                <g>
                    <path d="${line(oecdData[0])}" fill="none" stroke="#b19a95" stroke-width="1.8"/>
                    <path d="${line(oecdData[1])}" fill="none" stroke="#7a07b4" stroke-width="1.8"/>
                </g>
            </g>
        </svg>
    </div>`
}


export function createLineChart(oecdData, chartWidth, highlightCountry) {
    const height = 450;
    const widthPadding = 30;
    const heightPadding = 25;
    const formatYear = d3.timeParse("%Y");
    const tickFormat = d3.timeFormat("%y")
    const xScale = d3.scaleTime().domain([formatYear(2000), formatYear(2020)]).range([widthPadding, chartWidth-15]).nice()
    const yScale = d3.scaleLinear().domain([0, 30]).range([height-heightPadding, heightPadding]);
    const line = d3.line().x(d=>xScale(formatYear(d.year))).y(d=>yScale(d.value)).defined(d=>d.value!==null);
    return htl.html`<div>
        <p><span style="border-radius:3px; padding:5px; background-color:#7a07b4; color:white; font-weight:bold;">India</span> vs <span style="border-radius:3px; padding:5px; background-color:#b19a95; color:white; font-weight:bold;">${highlightCountry === null ? 'Rest of the world' : highlightCountry}</span></p>
        <br>
        <svg width="${chartWidth-1}" height="${height}">
            <g transform="translate(0,0)">
                <g transform="translate(0, 0)">
                    ${xScale.ticks().map(d=>
                        htl.svg`
                            <text x="${xScale(d)}" y="${height}" dy="-10" text-anchor="middle" style="font-size:10px;">'${tickFormat(d)}</text>
                            <line x1="${xScale(d)}" y1="${heightPadding}" x2="${xScale(d)}" y2="${height-heightPadding}" stroke="gray" stroke-opacity="0.3" stroke-dasharray="2 2"/>
                        `
                    )}
                    <text x="${-height/2}" dx="-105" y="2" transform="rotate(-90)" letter-spacing="1" style="font-size:12px; font-weight:bold;">Deaths per 1000,000 inhabitants</text>
                </g>
                <g transform="translate(10,0)">
                    ${yScale.ticks(5).map(d=>
                        htl.svg`
                            <text x="7" y="${yScale(d)}" text-anchor="middle" alignment-baseline="middle" style="font-size:10px;">${d}</text>
                        `
                    )}
                    <text x="${chartWidth/2}" y="${height}" dy="8" text-anchor="middle" style="font-size:12px; font-weight:bold;">Year</text>
                </g>
                <g>
                    ${[...oecdData].map(d=>htl.svg`
                        <path d="${line(d[1])}" fill="none" stroke="${d[0] === 'India' ? '#7a07b4':'#b19a95'}" stroke-width="${d[0] === 'India' ? 2.5 : highlightCountry === null ? 0.2 : highlightCountry !== null && highlightCountry=== d[0] ? 2.5 : 0.2}"/> 
                    `)}
                </g>
            </g>
        </svg>
    </div>`
}