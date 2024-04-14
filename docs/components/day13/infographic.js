import * as htl from "npm:htl";
import * as d3 from "npm:d3";
import * as hexbin from "npm:d3-hexbin";


export function drawInfographic(data, width){
    const pandavaColorCode = "#e9b9b9";
    const kauravaColorCode = "#401F71";
    const height = 600;
    const widthPadding = 50;
    const heightPadding = 50;
    const getRadian = (angle) => angle*(Math.PI/180);
    const topArc = d3.arc().innerRadius(width/2-10).outerRadius(width/2).startAngle(getRadian(180)).endAngle(getRadian(270));
    const topFilledArc = d3.arc().innerRadius(0).outerRadius(width/2).startAngle(getRadian(180)).endAngle(getRadian(270));
    const bottomArc = d3.arc().innerRadius(width/2-10).outerRadius(width/2).startAngle(getRadian(0)).endAngle(getRadian(90));
    const bottomFilledArc = d3.arc().innerRadius(0).outerRadius(width/2).startAngle(getRadian(0)).endAngle(getRadian(90));
    const pandavaHexRadius = 20;
    const hex = hexbin.hexbin().radius(pandavaHexRadius)
    const pandavaScale = d3.scaleLinear().domain([0,4]).range([0, (width/2)-15])
    const kauravaScale = d3.scaleLinear().domain([0,9]).range([0, 90])
    const godColorScale = d3.scaleOrdinal().domain(["Yama", "Vayu", "Indra", "Ashvini Kumaras"]).range(['#363636','#9895f9','#72caff','#a4295f'])
    const drawKauravaHex = (setRadius) => {
        const kauravaHex = hexbin.hexbin().radius(setRadius)
        return kauravaHex.hexagon();
    }
    return htl.svg`<svg width="${width}" height="${height}" style="background-color:F6F5F2;">
        <defs>
            <linearGradient id="Yudhishthira">
                <stop offset="50%" stop-color="#363636"/>
                <stop offset="50%" stop-color="#d37676"/>
            </linearGradient>
        </defs>
        <defs>
            <linearGradient id="Arjuna">
                <stop offset="50%" stop-color="#9895f9"/>
                <stop offset="50%" stop-color="#d37676"/>
            </linearGradient>
        </defs>
        <defs>
            <linearGradient id="Bhima">
                <stop offset="50%" stop-color="#72caff"/>
                <stop offset="50%" stop-color="#d37676"/>
            </linearGradient>
        </defs>
        <defs>
            <linearGradient id="Sahadeva">
                <stop offset="50%" stop-color="#a4295f"/>
                <stop offset="50%" stop-color="#ee4266"/>
            </linearGradient>
        </defs>
        <defs>
            <linearGradient id="Nakula">
            <stop offset="50%" stop-color="#a4295f"/>
            <stop offset="50%" stop-color="#ee4266"/>
            </linearGradient>
        </defs>
        <g transform="translate(${width}, 0)">
            <path id="pandava" d="${topArc()}" fill="${pandavaColorCode}"/>
            <path d="${topFilledArc()}" fill="${pandavaColorCode}"/>
            <text dy="30">
                <textPath href="#pandava" text-anchor="middle" startOffset="70%">The Pandavas</textPath>
            </text>
        </g>
        <g transform="translate(0, ${height})">
            <path id="kaurava" d="${bottomArc()}" fill="${kauravaColorCode}"/>
            <path d="${bottomFilledArc()}" fill="${kauravaColorCode}"/>
            <text dy="-10">
                <textPath href="#kaurava" text-anchor="middle" startOffset="25%">The Kauravas</textPath>
            </text>
        </g>
        <g transform="translate(50,50)">
            <text x="-8" y="-20">The Gods</text>
            <g transform="translate(0,0)">
                ${godColorScale.domain().map((d,i) => htl.svg`
                    <g transform="translate(0,${i*20})">
                        <path fill="${godColorScale(d)}" stroke="black" stroke-width="0" d="${drawKauravaHex(8.5)}"/>
                    </g>
                    <text x="15" y="${i*20}" dy="1" alignment-baseline="middle" style="font-size:12px">${d}</text>
                `)}
            </g>
        </g>
        <g transform="translate(${width/2}, ${heightPadding})">
            <g transform="translate(75,15)">
                ${[...data.get("pandavas")].map((d,i)=>htl.svg`
                    <g transform="translate(${pandavaScale(i/2)},${pandavaScale(Math.floor(i%2))})">
                        <path class="${d.name}" fill="url(#${d.name})" stroke="white" d="${hex.hexagon()}"/>
                        <text x="${d.x}" y="${d.y}" dx="${d.dx}" dy="${d.dy}"  text-anchor="middle" style="font-size:12px">${d.name}</text>
                    </g>
                `)}
            </g>
        </g>
        <g transform="translate(${widthPadding}, ${height-heightPadding})">
            <g transform="translate(-25, -55)">
            <g transform="translate(12,-50)">
                <text x="-15" y="35" fill="white" style="font-size:14px" text-anchor="start">Duryodhana</text>
                <path fill="${kauravaColorCode}" stroke="white" d="${drawKauravaHex(20)}"/>
            </g>
                ${d3.range(99).map((d,i) => htl.svg`
                    <g transform="translate(${kauravaScale(Math.floor(i/10))},${kauravaScale(i%10)})">
                        <path fill="${kauravaColorCode}" stroke="white" d="${drawKauravaHex(4)}"/>
                    </g>
                `)}
                <text x="95" y="95" fill="white" style="font-size:14px;">99 sons</text>
            </g>
        </g>
        <g transform="translate(${width/2}, ${height/2})">
            <line x1="-32" y1="-3" x2="-48" y2="-3" stroke="black"/>
            <line x1="33" y1="-3" x2="48" y2="-3" stroke="black"/>
            <text x="50" y="0" text-anchor="start" style="font-size:12px;">Ambalika</text>
            <text x="0" y="0" text-anchor="middle" style="font-size:12px;">Vichitravirya</text>
            <text x="-50" y="0" text-anchor="end" style="font-size:12px;">Ambika</text>
            <line x1="-40" y1="-3" x2="-40" y2="40" stroke="black"/>
            <line x1="40" y1="-3" x2="40" y2="-40" stroke="black"/>
            <g transform="translate(40, -45)">
                <text x="-1" y="0" text-anchor="middle" fill="#e9b9b9" style="font-size:13px;font-weight:bold;">Pandu</text>
                <text x="50" y="-30" text-anchor="start" fill="#d37676" style="font-size:13px;font-weight:bold;">Kunti</text>
                <text x="50" y="0" text-anchor="start" fill="#EE4266" style="font-size:13px;font-weight:bold;">Madri</text>
                <line x1="20" y1="-3" x2="48" y2="-30" stroke="black"/>
                <line x1="20" y1="-3" x2="48" y2="-3" stroke="black"/>
            </g>
            <g transform="translate(-40, 48)">
                <text x="0" y="0" text-anchor="middle" style="font-size:13px;font-weight:bold;" fill="${kauravaColorCode}">Dhritarashtra</text>
                <text x="-110" y="0" text-anchor="start" style="font-size:13px;font-weight:bold;" fill="${kauravaColorCode}">Gandhari</text>
                <line x1="-42" y1="-3" x2="-52" y2="-3" stroke="black"/>
            </g>
        </g>
    </svg>`
}