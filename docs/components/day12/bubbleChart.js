import * as htl from "npm:htl";
import * as d3 from "npm:d3";

export function createBubbleChart(chartData, width, selection) {
    const rocketWidth = 97*2;
    const rocketHeight = 97*2;
    const height = 800;
    const widthPadding = 10;
    const heightPadding = 60;
    const radiusPadding = 0.1;
    const formatYear = d3.timeParse("%Y");
    const tickFormat = d3.timeFormat("%Y");
    const radiusScale = d3.scaleSqrt().domain([1, 9632]).range([2,25]);
    const x = d3.scaleLinear().domain([1, 9700]).range([widthPadding, width-widthPadding]);
    const y = d3.scaleTime().domain([formatYear(1957), formatYear(2023)]).range([height-heightPadding, heightPadding]).nice();
    const getSimulaionData = (chartData) => {
        const simulation = d3.forceSimulation(chartData)
        .force("x",d3.forceX(width/2).strength(1))
        .force("y",d3.forceY(d=>y(formatYear(d.Year))).strength(1.8))
        .force("collide",d3.forceCollide().radius(d=>radiusScale(d.Value)+radiusPadding).strength(0.5));

        for (let i = 0; i < chartData.length; ++i) {
            simulation.tick();
          }
                      
        return simulation
    }
    const spaceCircles = getSimulaionData(chartData);
    const annotationData = selection !== null ? chartData.filter(d=>d.Entity === selection) : null;
    return htl.html`<div>
        <svg width="${rocketWidth}" height="${rocketHeight}" viewBox="0 0 ${rocketWidth} ${rocketHeight}" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block; margin:auto;">
            <g transform="scale(2)">
                <path d="M24.8798 59.2725C24.7057 59.4394 24.5294 59.6055 24.3522 59.7706C24.2643 59.8285 22.2237 61.2319 22.2568 65.8102L22.2041 68.2931C22.1988 68.5289 22.3594 68.7361 22.5886 68.7904L39.3046 72.7564L39.2336 76.0793C39.2308 76.2119 39.2806 76.34 39.3725 76.4359C39.4643 76.5318 39.5903 76.587 39.7228 76.5898L40.0517 76.5969L39.6217 78.4139C39.6133 78.4489 39.6088 78.4837 39.6084 78.5186L39.5971 79.0629C39.5925 79.2799 39.7285 79.4629 39.9201 79.5362C39.3001 80.4919 38.3696 82.2152 38.3742 83.9494C38.3753 84.2201 38.5919 84.442 38.8636 84.4475L39.9199 84.47C40.1513 85.5994 40.887 88.812 42.1239 90.7775C42.2224 90.9326 42.3973 91.022 42.5806 91.01C42.6999 91.0018 42.8101 90.9517 42.8934 90.872C42.9385 90.8287 42.9755 90.777 43.0023 90.7189C43.0639 90.5842 44.4463 87.5425 44.8264 84.7506L45.6929 84.7684C45.969 84.7743 46.1975 84.5554 46.2034 84.2792C46.2093 84.0031 45.9904 83.7746 45.7142 83.7687L44.3932 83.7409C44.1305 83.7363 43.9091 83.9329 43.8852 84.1931C43.7086 86.0414 42.9609 88.1632 42.4888 89.3573C41.4124 87.0947 40.8322 83.9259 40.8257 83.8895C40.783 83.6558 40.5816 83.4837 40.3441 83.4786L39.4024 83.4585C39.591 81.7893 40.6954 80.1423 41.0934 79.595L41.5961 79.6057C41.3898 80.5179 41.0916 82.2654 41.4157 83.784C41.4739 84.0536 41.7392 84.226 42.0095 84.1679C42.1038 84.1478 42.186 84.1023 42.2508 84.0401C42.3714 83.9246 42.4318 83.7504 42.3941 83.5742C42.0865 82.1357 42.438 80.371 42.6176 79.6275L43.8972 79.6548C44.0352 79.6578 44.1614 79.6045 44.2538 79.516C44.3461 79.4275 44.4047 79.3038 44.4077 79.1657C44.4136 78.8895 44.1947 78.6611 43.9185 78.6552L40.6088 78.5845L41.0742 76.6186L43.231 76.6644C43.369 76.6674 43.4952 76.6141 43.5876 76.5256C43.6799 76.4371 43.7385 76.3133 43.7415 76.1753C43.7474 75.8991 43.5285 75.6707 43.2523 75.6648L40.244 75.6009L40.3603 70.0422C40.8453 65.9484 42.4578 63.9757 43.1301 63.3148C43.4229 63.6271 43.8934 64.2118 44.3468 65.1323C44.469 65.3798 44.7686 65.4822 45.0164 65.3597C45.0635 65.3368 45.1053 65.307 45.1412 65.2725C45.2942 65.1259 45.3424 64.8911 45.2438 64.6908C44.4024 62.9813 43.4849 62.2693 43.4461 62.2401C43.44 62.2355 43.4326 62.2347 43.4263 62.2304C43.3978 62.2106 43.3667 62.199 43.3352 62.1857C43.3056 62.173 43.2777 62.1583 43.2468 62.1515C43.2212 62.1461 43.1956 62.1477 43.1694 62.1463C43.1452 62.1449 43.1211 62.1393 43.097 62.1414L43.9405 22.6306C43.9531 21.8423 43.9783 21.0997 44.0124 20.4023C44.0672 20.0986 45.0245 15.2335 49.4188 14.865C49.4333 14.8633 50.867 14.7406 51.9781 15.6926C52.7601 16.3634 53.1997 17.4164 53.2833 18.8234C53.2998 19.099 53.5364 19.3092 53.8116 19.2929C53.9354 19.2852 54.0456 19.2337 54.1281 19.1547C54.2304 19.0567 54.2904 18.916 54.2812 18.7639C54.1812 17.0758 53.6244 15.7875 52.6287 14.9332C51.1992 13.7082 49.4005 13.8621 49.3299 13.8689C46.7479 14.0845 45.189 15.6067 44.2642 17.1124C44.5496 14.4151 44.9159 12.9646 44.9235 12.9359C47.1916 3.40522 49.4714 2.88564 49.7339 2.86185C49.7985 2.87635 49.8665 2.87828 49.9368 2.86334C49.9419 2.86258 49.9472 2.86399 49.9522 2.86306C49.9939 2.86205 52.397 2.99509 54.3587 13.1478C54.3603 13.1553 54.3971 13.3357 54.4503 13.6628C54.1693 13.3006 53.8513 12.9792 53.4899 12.7069C51.2286 11.0047 48.2725 11.7476 48.1478 11.7799C47.879 11.8508 47.7202 12.1226 47.7898 12.3887C47.8591 12.6557 48.1312 12.8169 48.3989 12.7477C48.425 12.741 51.024 12.0968 52.8939 13.5106C54.1411 14.4526 54.8108 16.1136 54.8943 18.4399C54.9481 19.7071 54.9696 21.1826 54.9246 22.8682L54.0812 62.3778C54.0635 62.3754 54.0455 62.3792 54.0277 62.3787C53.9953 62.3778 53.9639 62.3747 53.9321 62.3801C53.899 62.3856 53.8686 62.3999 53.8367 62.4122C53.8087 62.4231 53.781 62.4316 53.7549 62.4477C53.746 62.4531 53.7358 62.4537 53.7272 62.4597C53.6883 62.4868 52.7401 63.16 51.8269 64.831C51.6939 65.0734 51.7835 65.3771 52.0255 65.5097C52.2214 65.6168 52.4581 65.5787 52.6111 65.4321C52.6471 65.3976 52.6787 65.3572 52.7035 65.3111C53.1972 64.41 53.6926 63.8455 53.9976 63.5466C54.6411 64.2339 56.1679 66.265 56.4761 70.3381L56.356 75.9449L53.3484 75.8804C53.0722 75.8745 52.8438 76.0934 52.8379 76.3695C52.832 76.6457 53.0509 76.8741 53.327 76.88L55.4832 76.9263L55.8644 78.9099L52.5551 78.8396C52.279 78.8337 52.0505 79.0526 52.0446 79.3288C52.0387 79.6049 52.2576 79.8334 52.5338 79.8393L55.4989 79.9026C55.8736 80.4661 56.9068 82.1588 57.0239 83.8352L56.0822 83.8151C55.8444 83.8096 55.6351 83.9737 55.5839 84.2054C55.5759 84.2408 54.8605 87.383 53.6878 89.5975C53.2668 88.3846 52.6106 86.2333 52.5135 84.3774C52.4998 84.116 52.2866 83.9091 52.0246 83.9038L50.7046 83.8756C50.4285 83.8697 50.2 84.0887 50.1941 84.3648C50.1882 84.641 50.4071 84.8694 50.6833 84.8753L51.549 84.8938C51.8103 87.6988 53.0609 90.798 53.117 90.9356C53.1862 91.1053 53.3432 91.224 53.5259 91.2438C53.6743 91.2604 53.8201 91.2093 53.9259 91.1079C53.9499 91.085 53.9722 91.0589 53.9914 91.031C55.3118 89.12 56.1839 85.9425 56.4641 84.8233L57.5193 84.8462C57.791 84.8517 58.0162 84.6406 58.0295 84.3695C58.1111 82.5945 57.212 80.7909 56.6338 79.8253C56.6559 79.81 56.6819 79.8004 56.7012 79.7819C56.7936 79.6934 56.8522 79.5696 56.8552 79.4315L56.8668 78.8875C56.8679 78.8519 56.8645 78.8173 56.858 78.7823L56.5056 76.9482L56.8345 76.9553C56.967 76.9581 57.0952 76.9084 57.1911 76.8165C57.287 76.7246 57.3422 76.5987 57.345 76.4661L57.4148 73.1428L74.2867 69.8944C74.3838 69.8758 74.4705 69.8293 74.5382 69.7644C74.6312 69.6752 74.6892 69.5508 74.6921 69.4141L74.7445 66.9449C74.9733 62.3564 72.9945 60.8685 72.9722 60.8608C57.7497 45.4665 55.954 22.4547 55.9382 22.2237L55.9369 22.2192C56.0402 16.2976 55.3664 13.0765 55.3382 12.9477C53.8934 5.4705 52.1465 2.97122 50.9354 2.19147C50.4529 1.88119 50.0733 1.85301 49.8792 1.86647C49.6863 1.84431 49.3054 1.85569 48.8091 2.14606C47.5578 2.8784 45.7113 5.30025 43.9534 12.6942C43.9171 12.8319 43.1066 16.024 42.9568 21.9452L42.9563 21.9465C42.9304 22.1735 40.2232 44.5708 24.8798 59.2725ZM57.4744 70.3114C57.3674 68.8895 57.124 67.6946 56.8174 66.7002L61.3161 66.7964L61.2183 71.3922L57.4363 72.1203L57.4744 70.3114ZM73.7451 66.9098L73.7007 68.9892L68.7269 69.9467L68.7555 68.6104C68.7614 68.3343 68.5425 68.1058 68.2663 68.0999C67.9902 68.094 67.7617 68.3129 67.7558 68.5891L67.7227 70.14L62.2225 71.1988L62.3158 66.8178L71.5841 67.0159C71.7221 67.0189 71.8483 66.9656 71.9407 66.8771C72.033 66.7886 72.0916 66.6649 72.0946 66.5268C72.1005 66.2506 71.8816 66.0222 71.6054 66.0163L56.4555 65.6924C55.9973 64.5582 55.4777 63.7604 55.0628 63.2455L55.8117 28.166C57.368 36.1619 61.5449 50.7244 72.3183 61.6138C72.3343 61.6263 73.9453 62.9025 73.7451 66.9098ZM23.2564 65.8174C23.2285 61.8218 24.8902 60.613 24.9678 60.5543C36.1488 50.182 40.9337 35.8185 42.828 27.8943L42.0792 62.9697C41.6443 63.4663 41.0932 64.2406 40.588 65.3542L25.4327 65.0298C25.1566 65.0239 24.9281 65.2429 24.9222 65.519C24.9163 65.7952 25.1352 66.0236 25.4114 66.0295L34.6797 66.2279L34.5861 70.6089L29.1362 69.3158L29.1693 67.765C29.1752 67.4889 28.9563 67.2604 28.6801 67.2545C28.404 67.2486 28.1755 67.4675 28.1696 67.7437L28.1411 69.0796L23.2128 67.9103L23.2564 65.8174ZM39.3641 69.9723L39.3265 71.7337L35.5812 70.8451L35.6793 66.2492L40.184 66.3456C39.8314 67.3366 39.5336 68.5348 39.3641 69.9723Z" fill="white"/>
                <path d="M48.7568 70.9402C48.8492 70.8517 48.9078 70.728 48.9107 70.5899L48.9567 68.4514C48.9626 68.1753 48.7437 67.9468 48.4676 67.9409C48.1914 67.935 47.963 68.1539 47.9571 68.4301L47.911 70.5685C47.9051 70.8447 48.1241 71.0731 48.4002 71.079C48.5383 71.082 48.6644 71.0287 48.7568 70.9402Z" fill="black"/>
                <path d="M48.0907 85.5466C48.1064 85.547 48.1209 85.5541 48.1367 85.5531C48.2304 85.5465 48.3508 85.538 48.5193 85.3765C48.8712 85.0394 49.433 84.0378 50.4061 81.0022C52.9428 73.09 50.8438 65.0994 50.7586 64.7861C50.0288 61.4752 49.0414 60.9303 48.7566 60.842C48.7486 60.8395 48.7401 60.8424 48.7319 60.8403C48.6951 60.8308 48.6583 60.8335 48.6201 60.8327C48.5811 60.8318 48.5437 60.8275 48.5057 60.8356C48.4978 60.8372 48.4898 60.834 48.4819 60.8361C48.1915 60.9128 47.1827 61.4169 46.3196 64.6689C46.2145 65.0009 43.7766 72.8949 45.9735 80.9072C47.2201 85.4589 47.7575 85.5187 48.0466 85.5508C48.0616 85.5525 48.0757 85.5462 48.0907 85.5466ZM46.9379 80.6433C44.8214 72.9224 47.2485 65.0482 47.2796 64.948C47.5568 63.9034 47.8381 63.1977 48.0786 62.7245L48.0381 64.6332L48.0177 65.5899C48.0118 65.8661 48.2307 66.0945 48.5069 66.1004C48.783 66.1063 49.0115 65.8874 49.0174 65.6113L49.0785 62.7517C49.3011 63.2396 49.553 63.9612 49.7876 65.0233C49.8087 65.1032 51.9011 73.0629 49.4539 80.6973C49.1343 81.6934 48.8665 82.4416 48.646 83.0018L48.701 80.424L48.8182 74.9396C48.8241 74.6635 48.6052 74.435 48.329 74.4291C48.0529 74.4232 47.8244 74.6421 47.8185 74.9183L47.7014 80.4026L47.6463 82.9805C47.4499 82.4113 47.2147 81.6521 46.9379 80.6433Z" fill="black"/>
            </g>
        </svg>
        <svg width="${width}" height="${height}" style="background-color:#101010;">
            <g transform="translate(0,35)">
                ${annotationData ? 
                    htl.svg`<text x="0" y="0" dy="-5" fill="white">${selection} has launched <tspan fill="#bd89ff" style="font-weight:bold; font-size:18px;">${d3.sum(annotationData, d=>d.Value)}</tspan> ${d3.sum(annotationData, d=>d.Value) === 1 ? 'object' : 'objects'}, ${d3.sum(annotationData, d=>d.Value) === 1 ? annotationData[0].Year : annotationData[annotationData.length-1].Year +' - '+ annotationData[0].Year}.</text>` : 
                    htl.svg`<text text x="0" y="0" dy="-5" fill="white">The world has launched <tspan fill="#bd89ff" style="font-weight:bold; font-size:18px;">${d3.sum(chartData, d=>d.Value)}</tspan> objects into space.</text>`
                }
                <g transform="translate(0,0)">
                    ${[1957, 1962, 1967, 1972, 1977, 1982, 1987, 1992, 1997, 2002, 2007, 2012, 2017, 2022].map(d=>htl.svg`
                        <text x="0" y="${y(formatYear(d))}" fill="white" alignment-baseline="middle" style="font-size:11px;">${d}</text>
                        <line x1="35" y1="${y((formatYear(d)))}" x2="${width-widthPadding}" y2="${y(formatYear(d))}" stroke="lightgray" stroke-dasharray="3 3" stroke-opacity="0.3"/>
                    `)}
                </g>
                <g transform="translate(0,0)">
                    ${spaceCircles.nodes().map(d=>htl.svg`
                        <circle class="space" cx="${d.x}" cy="${d.y}" r="${radiusScale(d.Value)}" fill="${selection === d.Entity ? 'transparent' : 'transparent'}" stroke="${selection === null ? 'white' : selection === d.Entity ? 'white' : 'transparent'}"/>
                    `)}
                </g>
                ${annotationData ? annotationData.map((d, i)=>htl.svg`<text x="${d.x}" y="${d.y}" text-anchor="middle" fill="white" alignment-baseline="middle" style="font-size:10px; font-weight:bold;">${d.Value}</text>`) : null}
            </g>
        </svg>
    </div>`
}

