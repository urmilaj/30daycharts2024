// See https://observablehq.com/framework/config for documentation.
export default {
  // The project’s title; used in the sidebar and webpage titles.
  title: "#30DayChartChallenge - 2024",

  // The pages and sections in the sidebar. If you don’t specify this option,
  // all pages will be listed in alphabetical order. Listing pages explicitly
  // lets you organize them into sections and have unlisted pages.
  pages: [
    {
      name: "Week 1 - Comparisons",
      pages: [
        {name: "Day 1 - Part to Whole", path: "/part-to-whole"},
        {name: "Day 2 - Neo", path: "/neo"},
        {name: "Day 3 - Makeover", path: "/makeover"},
        {name: "Day 4 - Waffle", path: "/waffle"},
        {name: "Day 5 - Diverging", path: "/diverging"},
        {name: "DAY 6 - OECD (data day)", path: "/oecd"},
      ]
    },
    {
      name: "Week 2 - Distributions",
      pages: [
    //     {name: "Day 7 - Hazards", path: ""},
    //     {name: "Day 8 - Circular", path: ""},
    //     {name: "Day 9 - Major/Minor", path: ""},
    //     {name: "Day 10 - Physical", path: ""},
    //     {name: "Day 11 - Mobile-friendly", path: ""},
        {name: "Day 12 - Reuters Graphics (theme day)", path: "/reuters-graphics"},
      ]
    },
    {
      name: "Week 3 - Relationships",
      pages: [
        {name: "Day 13 - Family", path: "/family"},
        // {name: "Day 14 - Heatmap", path: ""},
        // {name: "Day 15 - Historical", path: ""},
        // {name: "Day 16 - Weather", path: ""},
        // {name: "Day 17 - Networks", path: ""},
        // {name: "Day 18 - Asian Development Bank (data day)", path: ""},
      ]
    },
    // {
    //   name: "Week 4 - Timeseries",
    //   pages: [
    //     {name: "Day 19 - Dinosaurs", path: ""},
    //     {name: "Day 20 - Correlation", path: ""},
    //     {name: "Day 21 - Green Energy", path: ""},
    //     {name: "Day 22 - Mobility", path: ""},
    //     {name: "Day 23 - Tiles", path: ""},
    //     {name: "Day 24 - ILO Region for Africa (data day)", path: ""},
    //   ]
    // },
    // {
    //   name: "Week 5 - Uncertainties",
    //   pages: [
    //     {name: "Day 25 - Global Change", path: ""},
    //     {name: "Day 26 - AI", path: ""},
    //     {name: "Day 27 - Good/Bad", path: ""},
    //     {name: "Day 28 - Trend", path: ""},
    //     {name: "Day 29 - Black'n'White", path: ""},
    //     {name: "Day 30 - FiveThirtyEight (theme day)", path: ""},
    //   ]
    // }
  ],

  // Some additional configuration options and their defaults:
  theme: "light", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  footer: `<a href="https://github.com/urmilaj">Urmila J</a> | Built with <a href="https://observablehq.com/framework/">Observable Framework</a> | 2024`, // what to show in the footer (HTML)
  // toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  // root: "docs", // path to the source root for preview
  // output: "dist", // path to the output root for build
  search: true, // activate search
};
