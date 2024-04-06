import * as htl from "../../../_npm/htl@0.3.1/_esm.js";
import * as d3 from "../../../_npm/d3@7.9.0/_esm.js";
import {FileAttachment} from "../../../_observablehq/stdlib.js";

const colorCategory = d3.scaleOrdinal().domain(['Lower Risk','Threatened']).range(['#FFAE6D','#C63D2F']);

function drawPhyloLinks(phyloLinkData, direction) {
    const verticalLinks = d3.linkVertical(d3.curveStep).source(d=>[d.source.x, d.source.y]).target(d=>[d.target.x, d.target.y]);
    const horizontalLinks = d3.linkHorizontal(d3.curveStep).source(d=>[d.source.y, d.source.x]).target(d=>[d.target.y, d.target.x]);
    const link = direction === 'vertical' ? verticalLinks : horizontalLinks;
    return phyloLinkData.map(d=>htl.svg`<path class="${d.source.depth}_${d.target.depth}" d="${link(d)}" fill="none" stroke="${d.target.depth === 2 ? colorCategory(d.target.data[1][0].category) : 'transparent'}" stroke-width="2"/>`)
}

function annotatePhyloLinks(phyloAnnotationData, direction) {
    if (direction === 'vertical') {
        return phyloAnnotationData.map(d=> 
            htl.svg`<text transform="${d.depth === 2 ? `translate(${d.x},${d.y}) rotate(90)` : 'rotate(0)'}" x="${d.depth === 2 ? 0 : d.x}" y="${d.depth === 2 ? 0 : d.y}" text-anchor="${d.depth === 2 ? 'start' : 'middle'}" dy="${d.depth === 1 ? -5 : 5}" fill="${d.depth === 2 ? colorCategory(d.data[1][0].category) : 'black'}" stroke="${d.depth === 2 ? colorCategory(d.data[1][0].category) : 'black'}" stroke-width="${d.depth === 1 ? 1 : 0.5}" font-size="${d.depth === 1 ? 18 : 16}">${d.data[0]}</text>`
        )
    } else {
        return phyloAnnotationData.map(d=>
            htl.svg`<text x="${d.y}" y="${d.x}" fill="${d.depth === 2 ? colorCategory(d.data[1][0].category) : 'black'}" stroke="${d.depth === 2 ? colorCategory(d.data[1][0].category) : 'black'}" stroke-width="${d.depth === 1 ? 1 : 0.5}" font-size="${d.depth === 1 ? 15 : 12}" text-anchor="${d.depth === 1 ? 'end' : 'start'}" dx="${d.depth === 1 ? -5 : 5}" dy="5">${d.data[0]}</text>`
        )
    }
}

export function createPhyloTree(phyloData, chartWidth, chartHeight, direction) {
    const phyloTreeData = d3.hierarchy(phyloData);
    
    const tree = (direction, nodeData) => {
        return direction === 'vertical' ? d3.tree().size([chartWidth-100, chartHeight-80])(nodeData) : d3.tree().size([chartHeight-100, chartWidth-80])(nodeData);
    };

    const treeData = tree(direction, phyloTreeData).links().slice(1);
    return htl.svg`<svg width=${chartWidth} height=${chartHeight} style="background-color:white">
        <g transform="${direction === 'vertical' ? 'translate(50,-100)' : 'translate(15,50)'}">
            ${drawPhyloLinks(treeData, direction)}
            ${annotatePhyloLinks(tree(direction, phyloTreeData).descendants().slice(1), direction)}
        </g>
    </svg>`
}

export function getNeoSpecies(species) {
    return species.map(d => {
        return htl.html`
            <span>${d.common_name}</span>
            <img width="100" height="100" src="./_file/data/day2/images/Ludwig'sBustard.jpg"/>
        `
    })
}

