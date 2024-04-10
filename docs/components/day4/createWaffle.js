import * as htl from "npm:htl";
import * as d3 from "npm:d3";

export function createWaffle(waffleData, img) {
    const width = 400;
    const height = 600;
    const heightPadding = 120;
    const totalWaffleSize = 380;
    const waffleSize = 55;
    const xScale = d3.scaleLinear().domain([0, 5]).range([0, totalWaffleSize]);
    const yScale = d3.scaleLinear().domain([0, 5]).range([0, height-heightPadding]);
    return htl.html`
    <div class="grid grid-cols-1">
        <svg width="${width}" height="${height}">
            <g transform="translate(20,30)">
                ${waffleData.map((d,i)=>htl.svg`
                    <rect x="${xScale(i%5)}" y="${yScale(Math.floor(i/5))}" width="${waffleSize}" height="${waffleSize}" fill="${img.get(d.artist) ? 'white' : '#333333'}"/>
                    <text x="${xScale(i%5)}" y="${yScale(Math.floor(i/5))}" dx="28" dy="-5" text-anchor="middle">
                        ${d.artist === "Weird Al Yankovic" ? htl.svg`<tspan>Weird Al</tspan>` :
                        d.artist === "Bloodhound Gang" ? null :
                        d.artist} 
                    </text>
                    ${d.artist === 'Bloodhound Gang' ? htl.svg`
                        <text x="${xScale(i%5)}" y="${yScale(Math.floor(i/5))}">
                            <tspan dy="-16">Bloodhound</tspan>
                            <tspan dx="-50" dy="12">Gang</tspan>
                        </text>` : null}
                    ${img.get(d.artist) ? htl.svg`<image x="${xScale(i%5)}" y="${yScale(Math.floor(i/5))+10}" width="55" height="50" xlink:href="${img.get(d.artist)[0].link}"/>` : null} 
                    ${img.get(d.artist) ? htl.svg`<text x="${xScale(i%5)+43}" y="${yScale(Math.floor(i/5))+15}" text-anchor="middle" fill="#333333" style="font-weight:bold;font-size:15px;">${d.count}</text>` : 
                    htl.svg`<text x="${xScale(i%5)+28}" y="${yScale(Math.floor(i/5))+38}" text-anchor="middle" style="font-size:30px; font-weight:bold; fill:white">${d.count}</text>`}
                `)}
            </g>
        </svg>
    </div>
    `
}