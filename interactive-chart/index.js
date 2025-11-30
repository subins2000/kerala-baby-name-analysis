import boys from './boys.json';
import girls from './girls.json';

/// ///////////////////////////////////////////////////////////
/// //////////////////////// Boys /////////////////////////////
/// ///////////////////////////////////////////////////////////

/// /////////// Boy stuff ////////////////
const allBoyNames = [];
const boyNamesByID = {};
boys.forEach((d, i) => {
  allBoyNames[i] = d.name;
  boyNamesByID[d.name] = i;
});
const colorBoys = d3.scale
  .ordinal()
  .range([
    '#B5C660',
    '#B3C762',
    '#B0C765',
    '#ADC767',
    '#AAC769',
    '#A7C76A',
    '#A3C66B',
    '#9FC46B',
    '#9AC26A',
    '#94BF68',
    '#8EBB66',
    '#87B662',
    '#7FB05E',
    '#75AA5A',
    '#6BA354',
    '#609B4F',
    '#549249',
    '#478943',
    '#39803D',
    '#2C7739',
    '#206F36',
    '#166A35',
    '#0F6638',
    '#0B663E',
    '#0C6A48',
    '#127257',
    '#1B7D6A',
    '#27897F',
    '#359795',
    '#42A4AB',
    '#4EB0C0',
    '#58BAD3',
    '#5DBFE2',
    '#5DC0EC',
    '#5ABCF2',
    '#52B5F4',
    '#49ABF3',
    '#3E9FEE',
    '#3292E7',
    '#2785DE',
    '#1E77D3',
    '#176AC7',
    '#125EBA',
    '#0F53AB',
    '#0E489C',
    '#0D3E8D',
    '#0E347D',
    '#0F2B6C',
    '#11215C',
  ])
  .domain(allBoyNames);

/// ///////////////////////////////////////////////////////////
/// //////////////////////// Girls /////////////////////////////
/// ///////////////////////////////////////////////////////////
const allGirlNames = [];
const girlNamesByID = {};
girls.forEach((d, i) => {
  allGirlNames[i] = d.name;
  girlNamesByID[d.name] = i;
});
const colorGirls = d3.scale
  .ordinal()
  .range([
    '#FFC600',
    '#FEC606',
    '#FEC60B',
    '#FDC710',
    '#FDC716',
    '#FCC61B',
    '#FCC61F',
    '#FCC523',
    '#FBC427',
    '#FBC22B',
    '#FBC02D',
    '#FBBD2F',
    '#FBBA31',
    '#FBB632',
    '#FBB132',
    '#FCAC31',
    '#FCA730',
    '#FDA12F',
    '#FD9B2D',
    '#FE952C',
    '#FE8F2A',
    '#FF8929',
    '#FF8428',
    '#FF7E27',
    '#FF7927',
    '#FF7527',
    '#FF7128',
    '#FE6E29',
    '#FE6A2B',
    '#FD682D',
    '#FC652F',
    '#FB6330',
    '#FA6032',
    '#F95E33',
    '#F85C34',
    '#F65A34',
    '#F55733',
    '#F35432',
    '#F15230',
    '#F04F2D',
    '#EE4B2A',
    '#EC4827',
    '#EA4524',
    '#E84221',
    '#E63E1F',
    '#E43B1D',
    '#E2381C',
    '#E0351C',
    '#DD321E',
    '#DB3020',
    '#D92E25',
    '#D62C2B',
    '#D42A31',
    '#D22939',
    '#CF2841',
    '#CD274A',
    '#CB2754',
    '#C8275D',
    '#C62866',
    '#C4296F',
    '#C22A77',
    '#BF2C7F',
    '#BD2E86',
    '#BB308C',
    '#B93391',
    '#B73596',
    '#B5389A',
    '#B33B9D',
    '#B13EA0',
    '#AE41A2',
    '#AC43A3',
    '#A946A4',
    '#A648A4',
    '#A349A4',
    '#9F4AA3',
    '#9B4BA2',
    '#974BA1',
    '#934B9F',
    '#8E4A9D',
    '#8A499A',
    '#854897',
    '#804795',
    '#7B4692',
    '#76448E',
    '#71438B',
    '#6C4188',
  ])
  .domain(allGirlNames);

/// ///////////////////////////////////////////////////////////
/// ////////////////// Insight Buttons ////////////////////////
/// ///////////////////////////////////////////////////////////

d3.select('#years_1947_girls').on('click', () => {
  changeYears(1880, 1947, 'girls');
});
d3.select('#years_1965_boys').on('click', () => {
  changeYears(1880, 1965, 'boys');
});
d3.select('#Christopher').on('click', () => {
  changeName('Christopher', 'boys');
});
d3.select('#Jason').on('click', () => {
  changeName('Jason', 'boys');
});
d3.select('#years_2005_boys').on('click', () => {
  changeYears(2005, 2014, 'boys');
});

d3.select('#Mary').on('click', () => {
  changeName('Mary', 'girls');
});
d3.select('#Linda').on('click', () => {
  changeName('Linda', 'girls');
});
d3.select('#years_1947_1952_girls').on('click', () => {
  changeYears(1945, 1954, 'girls');
});

d3.select('#John').on('click', () => {
  changeName('John', 'boys');
});
d3.select('#Michael').on('click', () => {
  changeName('Michael', 'boys');
});
d3.select('#James').on('click', () => {
  changeName('James', 'boys');
});
d3.select('#Robert').on('click', () => {
  changeName('Robert', 'boys');
});

d3.select('#Ethel').on('click', () => {
  changeName('Ethel', 'girls');
});
d3.select('#Daniel').on('click', () => {
  changeName('Daniel', 'boys');
});

d3.select('#Elizabeth').on('click', () => {
  changeName('Elizabeth', 'girls');
});
d3.select('#Emma').on('click', () => {
  changeName('Emma', 'girls');
});
d3.select('#William').on('click', () => {
  changeName('William', 'boys');
});
d3.select('#Joseph').on('click', () => {
  changeName('Joseph', 'boys');
});

d3.select('#Mary2').on('click', () => {
  changeName('Mary', 'girls');
});
d3.select('#Linda2').on('click', () => {
  changeName('Linda', 'girls');
});
d3.select('#John2').on('click', () => {
  changeName('John', 'boys');
});

// Brush is the higher focus chart, All is the smaller context chart
const margin = {
  top: 20, right: 30, bottom: 30, left: 50,
};
const marginAll = {
  top: 20, right: 30, bottom: 30, left: 50,
};
const width = $('.chart.focus').width() - 10 - margin.left - margin.right;
const heightBrush = 500 - margin.top - margin.bottom;
const heightAll = 100 - marginAll.top - marginAll.bottom;

const startYear = 1920;
const endYear = 2005;
const yearRange = endYear - startYear;

// Stroke width per max position
const strokeWidth = [12, 8, 8, 6, 6, 4, 4, 2, 2, 2];

/// ///////////////////////////////////////////////////////////
/// ////////////////// Girls and Boys /////////////////////////
/// ///////////////////////////////////////////////////////////

let gender = 'girls';

// Variables needed for the looping
const allNames = allGirlNames.concat(allBoyNames);
const allGenders = Array.apply(null, new Array(allGirlNames.length))
  .map(String.prototype.valueOf, 'girls')
  .concat(Array.apply(null, new Array(allBoyNames.length)).map(String.prototype.valueOf, 'boys'));

let color = gender === 'boys' ? colorBoys : colorGirls;
let namesByID = gender === 'boys' ? boyNamesByID : girlNamesByID;

/// ///////////////////////////////////////////////////////////
/// /////////////////// Color Legend //////////////////////////
/// ///////////////////////////////////////////////////////////
const marginLegend = {
  top: 15, right: 30, bottom: 10, left: 30,
};
const widthLegend = Math.min($('.colorLegend').width(), 350) - marginLegend.left - marginLegend.right;
const heightLegend = 30;

// Create color legend SVG
const colorLegend = d3
  .select('.colorLegend')
  .append('svg')
  .attr('width', widthLegend + marginLegend.left + marginLegend.right)
  .attr('height', heightLegend + marginLegend.top + marginLegend.bottom)
  .append('g')
  .attr('class', 'colorLegendWrapper')
  .attr('transform', `translate(${marginLegend.left},${marginLegend.top})`);

// Create the gradient to fill the legend rect when boys are selected
const legendGradientBoy = colorLegend
  .append('defs')
  .append('linearGradient')
  .attr('id', 'legendGradientBoy')
  .attr('gradientUnits', 'userSpaceOnUse')
  .attr('x1', '0%')
  .attr('y1', '0%')
  .attr('x2', '100%')
  .attr('y2', '0%')
  .attr('spreadMethod', 'pad')
  .selectAll('stop')
  .data(colorBoys.range())
  .enter()
  .append('stop')
  .attr('offset', (d, i) => `${Math.floor((i / (colorBoys.range().length + 20)) * 100)}%`)
  .attr('stop-color', (d) => d);
// Create the gradient to fill the legend rect when girls are selected
const legendGradientGirl = colorLegend
  .append('defs')
  .append('linearGradient')
  .attr('id', 'legendGradientGirl')
  .attr('gradientUnits', 'userSpaceOnUse')
  .attr('x1', '0%')
  .attr('y1', '0%')
  .attr('x2', '100%')
  .attr('y2', '0%')
  .attr('spreadMethod', 'pad')
  .selectAll('stop')
  .data(colorGirls.range())
  .enter()
  .append('stop')
  .attr('offset', (d, i) => `${Math.floor((i / (colorGirls.range().length + 20)) * 100)}%`)
  .attr('stop-color', (d) => d);

// Create the rectangle to be filled with color
colorLegend
  .append('rect')
  .attr('class', 'colorkey')
  .attr('x', 0)
  .attr('y', -8)
  .attr('width', widthLegend)
  .attr('height', 16)
  .style('opacity', 0.7)
  .attr('fill', (d) => {
    if (gender === 'boys') return 'url(#legendGradientBoy)';
    return 'url(#legendGradientGirl)';
  });

// Append the A, Z and explanation around the rectangle
colorLegend.append('text').attr('x', 0).attr('y', 20).style('font-size', 11)
  .style('text-anchor', 'middle')
  .text('A');
colorLegend.append('text').attr('x', widthLegend).attr('y', 20).style('font-size', 11)
  .style('text-anchor', 'middle')
  .text('Z');

/// ///////////////////////////////////////////////////////////
/// //////////////// Stroke width Legend //////////////////////
/// ///////////////////////////////////////////////////////////

// Create stroke width legend SVG
const strokeLegend = d3
  .select('.widthLegend')
  .append('svg')
  .attr('width', widthLegend + marginLegend.left + marginLegend.right)
  .attr('height', heightLegend + marginLegend.top + marginLegend.bottom)
  .append('g')
  .attr('class', 'strokeLegendWrapper')
  .attr('transform', `translate(${marginLegend.left},${marginLegend.top})`);

// Width of one rectangle
const rectWidth = (widthLegend / strokeWidth.length) * 0.8;
// Create the rectangles per stroke thickness
strokeLegend
  .selectAll('.strokeKey')
  .data(strokeWidth)
  .enter()
  .append('rect')
  .attr('class', 'strokeKey')
  .attr('x', (d, i) => (widthLegend / strokeWidth.length) * i)
  .attr('y', (d, i) => -d / 2)
  .attr('width', rectWidth)
  .attr('height', (d, i) => d)
  .style('opacity', 0.7)
  .style('shape-rendering', 'crispEdges')
  .attr('fill', '#9C9C9C');
// Number below each rectangle
strokeLegend
  .selectAll('.strokeKeyText')
  .data(strokeWidth)
  .enter()
  .append('text')
  .attr('class', 'strokeKeyText')
  .attr('x', (d, i) => (widthLegend / strokeWidth.length) * i + rectWidth / 2)
  .attr('y', 20)
  .style('text-anchor', 'middle')
  .text((d, i) => i + 1);

/// ///////////////////////////////////////////////////////////
/// ////////////////// Scales & Axes //////////////////////////
/// ///////////////////////////////////////////////////////////

const xAll = d3.scale.linear().domain([startYear, endYear]).range([0, width]);
const xBrush = d3.scale.linear().domain([startYear, endYear]).range([0, width]);
const yAll = d3.scale.linear().domain([0.5, 10.5]).range([0, heightAll]);
const yBrush = d3.scale.linear().domain([0.5, 10.5]).range([0, heightBrush]);

const xAxisAll = d3.svg.axis().scale(xAll).orient('bottom').tickFormat(d3.format('d'));
const xAxisBrush = d3.svg.axis().scale(xBrush).orient('bottom').tickFormat(d3.format('d'))
  .tickSize(0);
const yAxisBrush = d3.svg.axis().scale(yBrush).orient('left').tickSize(0);

/// ///////////////////////////////////////////////////////////
/// //////////// Other initializations ////////////////////////
/// ///////////////////////////////////////////////////////////

const lineAll = d3.svg
  .line()
  .x((d) => xAll(d.year))
  .y((d) => yAll(d.position));

const lineBrush = d3.svg
  .line()
  .interpolate('monotone') // Slight rounding without too much deviation
  .x((d) => xBrush(d.year))
  .y((d) => yBrush(d.position));

/// ///////////////////////////////////////////////////////////
/// ///////////////////// Context /////////////////////////////
/// ///////////////////////////////////////////////////////////

// Create context SVG
const context = d3
  .select('.chart.context')
  .append('svg')
  .attr('width', width + marginAll.left + marginAll.right)
  .attr('height', heightAll + marginAll.top + marginAll.bottom)
  .append('g')
  .attr('class', 'contextWrapper')
  .attr('transform', `translate(${marginAll.left},${marginAll.top})`);
// Append clippath to context chart
context.append('defs').append('clipPath').attr('id', 'clipContext').append('rect')
  .attr('width', width)
  .attr('height', heightAll);

// Append x axis to context chart
context
  .append('g')
  .attr('class', 'x axis')
  .attr('transform', `translate(0,${heightAll + 5})`)
  .call(xAxisAll);

// Boys - For the context the line needs to start put grey
// then be coloured to the name and after the brush handle be grey again
const linearGradientBoys = context
  .selectAll('.linearGradientBoys')
  .data(boys)
  .enter()
  .append('linearGradient')
  .attr('class', 'linearGradientBoys')
  .attr('gradientUnits', 'userSpaceOnUse')
  .attr('x1', xAll(startYear))
  .attr('y1', '0')
  .attr('x2', xAll(endYear))
  .attr('y2', '0')
  .attr('id', (d) => `line-gradient-boys-${d.name}`);
linearGradientBoys.append('stop').attr('class', 'start').attr('offset', '0%').attr('stop-color', '#9E9E9E')
  .attr('stop-opacity', 0.5);
linearGradientBoys.append('stop').attr('class', 'left').attr('offset', '40%').attr('stop-color', '#9E9E9E')
  .attr('stop-opacity', 0.5);
linearGradientBoys
  .append('stop')
  .attr('class', 'left')
  .attr('offset', '40%')
  .attr('stop-color', (d) => colorBoys(d.name))
  .attr('stop-opacity', 1);
linearGradientBoys
  .append('stop')
  .attr('class', 'right')
  .attr('offset', '60%')
  .attr('stop-color', (d) => colorBoys(d.name))
  .attr('stop-opacity', 1);
linearGradientBoys.append('stop').attr('class', 'right').attr('offset', '60%').attr('stop-color', '#9E9E9E')
  .attr('stop-opacity', 0.5);
linearGradientBoys.append('stop').attr('class', 'end').attr('offset', '100%').attr('stop-color', '#9E9E9E')
  .attr('stop-opacity', 0.5);

// Girls - For the context the line needs to start put grey
// then be coloured to the name and after the brush handle be grey again
const linearGradientGirls = context
  .selectAll('.linearGradientGirls')
  .data(girls)
  .enter()
  .append('linearGradient')
  .attr('class', 'linearGradientGirls')
  .attr('gradientUnits', 'userSpaceOnUse')
  .attr('x1', xAll(startYear))
  .attr('y1', '0')
  .attr('x2', xAll(endYear))
  .attr('y2', '0')
  .attr('id', (d) => `line-gradient-girls-${d.name}`);
linearGradientGirls.append('stop').attr('class', 'start').attr('offset', '0%').attr('stop-color', '#9E9E9E')
  .attr('stop-opacity', 0.5);
linearGradientGirls.append('stop').attr('class', 'left').attr('offset', '40%').attr('stop-color', '#9E9E9E')
  .attr('stop-opacity', 0.5);
linearGradientGirls
  .append('stop')
  .attr('class', 'left')
  .attr('offset', '40%')
  .attr('stop-color', (d) => colorGirls(d.name))
  .attr('stop-opacity', 1);
linearGradientGirls
  .append('stop')
  .attr('class', 'right')
  .attr('offset', '60%')
  .attr('stop-color', (d) => colorGirls(d.name))
  .attr('stop-opacity', 1);
linearGradientGirls.append('stop').attr('class', 'right').attr('offset', '60%').attr('stop-color', '#9E9E9E')
  .attr('stop-opacity', 0.5);
linearGradientGirls.append('stop').attr('class', 'end').attr('offset', '100%').attr('stop-color', '#9E9E9E')
  .attr('stop-opacity', 0.5);

/// ///////////////////////////////////////////////////////////
/// /////////////////////// Focus /////////////////////////////
/// ///////////////////////////////////////////////////////////

// Create focus SVG
const focus = d3
  .select('.chart.focus')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', heightBrush + margin.top + margin.bottom)
  .append('g')
  .attr('class', 'focusWrapper')
  .attr('transform', `translate(${margin.left},${margin.top})`);
// Append clippath to focus chart
focus.append('defs').append('clipPath').attr('id', 'clip').append('rect')
  .attr('width', width)
  .attr('height', heightBrush);

// Append x axis to focus chart
focus
  .append('g')
  .attr('class', 'x axis')
  .style('font-size', 13)
  .attr('transform', `translate(0,${heightBrush + 9})`)
  .call(xAxisBrush);

// Append y axis to focus chart
focus
  .append('g')
  .attr('class', 'y axis')
  .attr('transform', 'translate(-10,0)')
  .call(yAxisBrush)
  .append('text')
  .attr('class', 'titles')
  .attr('transform', 'rotate(-90)')
  .attr('x', -(heightBrush / 2))
  .attr('y', -35)
  .attr('dy', '.71em')
  .style('font-size', 14)
  .style('text-anchor', 'middle')
  .text('Position in Top 10');

/// ///////////////////////////////////////////////////////////
/// ///////////////////// Tooltip /////////////////////////////
/// ///////////////////////////////////////////////////////////

const popUpName = focus.append('g').attr('transform', 'translate(-100,-100)').attr('class', 'popUpName').style('pointer-events', 'none');

popUpName.append('circle').attr('class', 'tooltipCircle').attr('r', 3.5);

popUpName.append('text').style('font-size', 12).attr('class', 'titles').attr('y', -15);

/// ///////////////////////////////////////////////////////////
/// ///////////////////// Voronoi /////////////////////////////
/// ///////////////////////////////////////////////////////////

// Create a flat data version for the Voronoi per gender
/** ********************************************************** */
const flatDataBoys = [];
let k;
for (k in boys) {
  var k_data = boys[k];
  k_data.values.forEach((d) => {
    if (d.position <= 10) flatDataBoys.push({ name: k_data.name, year: d.year, position: d.position });
  });
} // for k
const maxPositionBoys = d3
  .nest()
  .key((d) => d.name)
  .rollup((d) => d3.min(d, (g) => g.position))
  .entries(flatDataBoys);

const flatDataGirls = [];
for (k in girls) {
  var k_data = girls[k];
  k_data.values.forEach((d) => {
    if (d.position <= 10) flatDataGirls.push({ name: k_data.name, year: d.year, position: d.position });
  });
} // for k
const maxPositionGirls = d3
  .nest()
  .key((d) => d.name)
  .rollup((d) => d3.min(d, (g) => g.position))
  .entries(flatDataGirls);

// What data should be used
let flatData = gender === 'boys' ? flatDataBoys : flatDataGirls;
let maxPosition = gender === 'boys' ? maxPositionBoys : maxPositionGirls;

let nestedFlatData = d3
  .nest()
  .key((d) => d.name)
  .entries(flatData);
/** ********************************************************** */

// Initiate the voronoi function
const voronoi = d3.geom
  .voronoi()
  .x((d) => xBrush(d.year))
  .y((d) => yBrush(d.position))
  .clipExtent([
    [-margin.left, -margin.top],
    [width + margin.right, heightBrush + margin.bottom],
  ]);

// Initiate the voronoi group element
const voronoiGroup = focus.append('g').attr('class', 'voronoi');

// Voronoi mouseover and mouseout functions
function mouseover(d) {
  focus.selectAll('.focus').style('opacity', 0.1);
  d3.selectAll(`.focus.${d.name}`).style('opacity', 0.8);

  context.selectAll('.context').selectAll('.line').style('opacity', 0.1);
  context
    .selectAll(`.context.${d.name}`)
    .selectAll('.line')
    .style('opacity', 1)
    .style('stroke', color(d.name));

  // Move the tooltip to the front
  d3.select('.popUpName').moveToFront();
  // Change position, size of circle and text of tooltip
  popUpName.attr('transform', `translate(${xBrush(d.year)},${yBrush(d.position)})`);
  const circleSize = parseInt(
    d3
      .selectAll(`.focus.${d.name}`)
      .selectAll('.line')
      .style('stroke-width'),
  );
  popUpName.select('.tooltipCircle').style('fill', color(d.name)).attr('r', circleSize);
  popUpName.select('text').text(d.name);
} // mouseover

function mouseout(d) {
  focus.selectAll('.focus').style('opacity', 0.7);

  context
    .selectAll('.context')
    .selectAll('.line')
    .style('opacity', null)
    .style('stroke', (c) => `url(#line-gradient-${gender}-${c.name})`);

  popUpName.attr('transform', 'translate(-100,-100)');
} // mouseout

/// ///////////////////////////////////////////////////////////
/// //////////////////// Brushing /////////////////////////////
/// ///////////////////////////////////////////////////////////

// Taken and adjusted from: http://bl.ocks.org/mbostock/6498580
let centering = false;
const alpha = 1;
let center;
let moveType;

const arc = d3.svg
  .arc()
  .outerRadius(heightAll / 4)
  .startAngle(0)
  .endAngle((d, i) => (i ? -Math.PI : Math.PI));

const brush = d3.svg
  .brush()
  .x(xAll)
  .extent([endYear - 15, endYear])
  .on('brush', brushmove)
  .on('brushend', brushend);

// Set up the brush
const gBrush = context.append('g').attr('class', 'brush').call(brush);

gBrush.selectAll('.resize').append('line').attr('y2', heightAll);

gBrush
  .selectAll('.resize')
  .append('path')
  .attr('d', d3.svg.symbol().type('triangle-up').size(100))
  .attr('transform', (d, i) => (i ? `translate(${-7},${heightAll / 2}) rotate(-90)` : `translate(${7},${heightAll / 2}) rotate(90)`));

gBrush.selectAll('rect').attr('height', heightAll);

gBrush.select('.background').on('mousedown.brush', brushcenter).on('touchstart.brush', brushcenter);

gBrush.call(brush.event);

function brushmove() {
  const extent = brush.extent();

  // Reset the x-axis brush domain and redraw the lines, circles and axis
  xBrush.domain(brush.empty() ? xAll.domain() : brush.extent());

  // Adjust the paths
  focus.selectAll('.line').attr('d', (d) => lineBrush(d.values));
  // Update the x axis and grid
  focus.select('.x.axis').call(xAxisBrush);
  // focus.select(".grid").call(xAxisGrid);

  // Reset the grey regions of the context chart
  d3.selectAll('.left').attr('offset', `${((xBrush.domain()[0] - startYear) / yearRange) * 100}%`);
  d3.selectAll('.right').attr('offset', `${((xBrush.domain()[1] - startYear) / yearRange) * 100}%`);

  // Remove the previous voronoi map
  voronoiGroup.selectAll('path').remove();
  // Create a new voronoi map including only the visible points
  voronoiGroup
    .selectAll('path')
    .data(
      voronoi(
        flatData.filter((d) => (d.year >= xBrush.domain()[0]) & (d.year <= xBrush.domain()[1])),
      ),
    )
    .enter()
    .append('path')
    .attr('d', (d) => `M${d.join('L')}Z`)
    .datum((d) => d.point)
    .attr('class', 'voronoiCells')
    // .style("stroke", "red")
    .on('click', (d) => {
      searchEvent(d.name);
    });

  // If the brush move is called because the viewer clicked or searched a name
  // the mouse events should be delayed, otherwise you never see the full line
  // that was clicked
  if (moveType === 'still') {
    setTimeout(() => {
      voronoiGroup.selectAll('.voronoiCells').on('mouseover', mouseover).on('mouseout', mouseout);
    }, 2000);
  } else {
    voronoiGroup.selectAll('.voronoiCells').on('mouseover', mouseover).on('mouseout', mouseout);
  }
} // brushmove

function brushend() {
  if (!d3.event.sourceEvent) return; // only transition after input
  d3.select(this)
    .transition()
    .call(
      brush.extent(
        brush.extent().map((d) => d3.round(d, 0)),
      ),
    )
    .call(brush.event);
} // brushend

function brushcenter() {
  const self = d3.select(window);
  const { target } = d3.event;
  const extent = brush.extent();
  const size = extent[1] - extent[0];
  const domain = xAll.domain();
  const x0 = domain[0] + size / 2;
  const x1 = domain[1] - size / 2;
  const odd = Math.round(size * 10) & 1;

  recenter(true);
  brushmove();

  if (d3.event.changedTouches) {
    self.on('touchmove.brush', brushmove).on('touchend.brush', brushend);
  } else {
    self.on('mousemove.brush', brushmove).on('mouseup.brush', brushend);
  }

  function brushmove() {
    d3.event.stopPropagation();
    center = d3.round(Math.max(x0, Math.min(x1, xAll.invert(d3.mouse(target)[0]) + odd * 0.05)), 1) - odd * 0.05;
    recenter(false);
  }

  function brushend() {
    brushmove();
    self.on('.brush', null);
  }
} // brushcenter

function recenter() {
  if (centering) return; // timer is active and already interpolating
  centering = true;
  d3.timer(() => {
    const extent = brush.extent();
    const size = extent[1] - extent[0];
    let center1 = center * alpha + ((extent[0] + extent[1]) / 2) * (1 - alpha);

    if (!(centering = Math.abs(center1 - center) > 1e-3)) center1 = center;

    gBrush.call(brush.extent([center1 - size / 2, center1 + size / 2])).call(brush.event);

    return !centering;
  });
} // recenter

/// ///////////////////////////////////////////////////////////
/// /////////////////////// Buttons ///////////////////////////
/// ///////////////////////////////////////////////////////////

d3.select('#boyButton').on('click', (e) => {
  redraw('boys');
  $("#girlButton").removeClass("active");
  $("#boyButton").addClass("active");
});
d3.select('#girlButton').on('click', (e) => {
  redraw('girls');
  $("#boyButton").removeClass("active");
  $("#girlButton").addClass("active");
});
d3.select('#loopStartButton').on('click', (e) => {
  startTimer();
  $("#loopStartButton").addClass("active");
  $("#loopStopButton").removeClass("active");
});
d3.select('#loopStopButton').on('click', (e) => {
  stopTimer();
  $("#loopStartButton").removeClass("active");
  $("#loopStopButton").addClass("active");
});

/// ///////////////////////////////////////////////////////////
/// //////////////////////// Search ///////////////////////////
/// ///////////////////////////////////////////////////////////
// Function to fire when somebody searches for a name
let nameTimer;

function searchEvent(name) {
  // If the name is not equal to the default, find that name and highlight it - mouseover function
  if (name != '') {
    // Change the GIRLS / BOYS label to the chosen name for several seconds
    d3.select('.genderTitle').text(name);
    d3.select('.genderTitle').style('color', color(name));
    clearTimeout(nameTimer);
    nameTimer = setTimeout((e) => {
      d3.select('.genderTitle').text(gender);
      d3.select('.genderTitle').style('color', null);
    }, 3000);

    // Take all the years in the top 10 of the name and reset the brush
    // to the time between the first and last occurrence
    const subset = nestedFlatData[namesByID[name]].values;
    const minYear = Math.max(
      startYear,
      d3.min(subset, (d) => d.year) - 1,
    );
    const maxYear = Math.min(
      endYear,
      d3.max(subset, (d) => d.year) + 1,
    );
    // Call the resetting of the brush
    moveType = 'still';
    gBrush.call(brush.extent([minYear, maxYear])).call(brush.event);

    // Wait a bit with making the lines transparent, otherwise the brush functions
    // will reset it again
    setTimeout(() => {
      popUpName.attr('transform', 'translate(-100,-100)');

      // First set all opacities low and the chosen one back to 1
      focus.selectAll('.focus').style('opacity', 0.1);
      d3.selectAll(`.focus.${name}`).style('opacity', 1);

      context.selectAll('.context').selectAll('.line').style('opacity', 0.1);
      context
        .selectAll(`.context.${name}`)
        .selectAll('.line')
        .style('opacity', 1)
        .style('stroke', color(name));
    }, 100);

    // Reset the moving type to an arbitrary word
    setTimeout(() => {
      moveType = 'nothing';
    }, 500);
  } else {
    d3.select('.genderTitle').text(gender);
    // Reset all opacities and strokes
    focus.selectAll('.focus').style('opacity', 0.7);
    context
      .selectAll('.context')
      .selectAll('.line')
      .style('opacity', null)
      .style('stroke', (c) => `url(#line-gradient-${gender}-${c.name})`);
  } // else
} // searchEvent

/// ///////////////////////////////////////////////////////////
/// ////////////////// Helper functions ///////////////////////
/// ///////////////////////////////////////////////////////////
// Move selected element to the front
d3.selection.prototype.moveToFront = function () {
  return this.each(function () {
    this.parentNode.appendChild(this);
  });
};

let loopTimer;
function stopTimer() {
  clearTimeout(loopTimer);
} // removeTimers

function startTimer() {
  loopTimer = setInterval(() => {
    const num = Math.round(Math.random() * allNames.length);
    changeName(allNames[num], allGenders[num]);
  }, 4000);
} // startTimer

// Focus the chart on a name
function changeName(name, sex) {
  if (gender === sex) searchEvent(name);
  else {
    redraw(sex);
    searchEvent(name);
    if (gender === 'boys') {
      d3.select('#boyButton').classed('active', true);
      d3.select('#girlButton').classed('active', false);
    } else {
      d3.select('#boyButton').classed('active', false);
      d3.select('#girlButton').classed('active', true);
    } // else
  } // else
} // changeName

// Reset the focus range years
function changeYears(start, end, sex) {
  if (gender === sex) {
    searchEvent('');
    gBrush.call(brush.extent([start, end])).call(brush.event);
  } else {
    redraw(sex);
    if (gender === 'boys') {
      d3.select('#boyButton').classed('active', true);
      d3.select('#girlButton').classed('active', false);
    } else {
      d3.select('#boyButton').classed('active', false);
      d3.select('#girlButton').classed('active', true);
    } // else
    gBrush.call(brush.extent([start, end])).call(brush.event);
  } // else
} // changeYears

/// ///////////////////////////////////////////////////////////
/// /////////////////////// Draw //////////////////////////////
/// ///////////////////////////////////////////////////////////

function redraw(choice) {
  gender = choice;

  /// ///////////////////////////////////////////////////////////
  /// ///////// Switch variables between genders ////////////////
  /// ///////////////////////////////////////////////////////////

  flatData = gender === 'boys' ? flatDataBoys : flatDataGirls;
  maxPosition = gender === 'boys' ? maxPositionBoys : maxPositionGirls;
  nestedFlatData = d3
    .nest()
    .key((d) => d.name)
    .entries(flatData);

  // Change the dataset
  const data = gender === 'boys' ? boys : girls;

  // Change id mapping
  namesByID = gender === 'boys' ? boyNamesByID : girlNamesByID;
  // Reset the color domain
  color = gender === 'boys' ? colorBoys : colorGirls;

  // Change the color legend gradient rectangle
  colorLegend.selectAll('.colorkey').attr('fill', (d) => {
    if (gender === 'boys') return 'url(#legendGradientBoy)';
    return 'url(#legendGradientGirl)';
  });

  d3.select('.genderTitle').text(gender);
  /// ///////////////////////////////////////////////////////////
  /// //////////////////// Search box ///////////////////////////
  /// ///////////////////////////////////////////////////////////

  // Remove previous box
  $('.combobox-container').remove();
  // $('.typeahead').remove();

  // Remove all the previous options
  const select = document.getElementById('searchBox');
  select.options.length = 0;
  select.options[0] = new Option('Search name...', '', true, false);
  // Create new options
  const options = gender === 'boys' ? allBoyNames : allGirlNames;
  // Put new options into select box
  for (let i = 0; i < options.length; i++) {
    const opt = options[i];
    const el = document.createElement('option');
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
  }
  // Create combo box
  $('.combobox').combobox();

  /// ///////////////////////////////////////////////////////////
  /// ////////////////////// Context ////////////////////////////
  /// ///////////////////////////////////////////////////////////

  // Clear first
  context.selectAll('.context').remove();

  // Add the lines to context chart
  const contextWrapper = context.selectAll('.context').data(data, (d) => d.name);

  // UPDATE
  contextWrapper.attr('class', (d) => `focus ${d.name}`);
  contextWrapper
    .selectAll('.line')
    .attr('d', (d) => lineAll(d.values))
    .style('stroke', (d) => `url(#line-gradient-${gender}-${d.name})`);

  // ENTER
  contextWrapper
    .enter()
    .append('g')
    .attr('class', (d) => `context ${d.name}`)
    .append('path')
    .attr('class', 'line')
    .attr('d', (d) => lineAll(d.values))
    .style('stroke', (d) => `url(#line-gradient-${gender}-${d.name})`)
    .style('stroke-width', 1.25)
    .attr('clip-path', 'url(#clipContext)')
    .style('opacity', 0)
    .transition()
    .duration(750)
    .delay(500)
    .style('opacity', 1);

  // EXIT
  contextWrapper.exit().transition().duration(750).style('opacity', 0)
    .remove();

  /// ///////////////////////////////////////////////////////////
  /// /////////////////////// Focus /////////////////////////////
  /// ///////////////////////////////////////////////////////////
  // Add a g element per name
  const focusWrapper = focus.selectAll('.focus').data(data, (d) => d.name);

  // UPDATE
  focusWrapper.attr('class', (d) => `focus ${d.name}`);
  focusWrapper
    .selectAll('.line')
    .attr('d', (d) => lineBrush(d.values))
    .style('stroke-width', (d) => strokeWidth[maxPosition[namesByID[d.name]]?.values - 1 ?? 0])
    .style('stroke', (d) => color(d.name));

  // ENTER
  // Add the lines of the boys to focus chart
  focusWrapper
    .enter()
    .append('g')
    .attr('class', (d) => `focus ${d.name}`)
    .append('path')
    .attr('class', 'line')
    .attr('clip-path', 'url(#clip)')
    .style('pointer-events', 'none')
    .style('stroke-linejoin', 'round')
    .style('opacity', 0)
    .attr('d', (d) => lineBrush(d.values))
    .style('stroke-width', (d) => strokeWidth[maxPosition[namesByID[d.name]]?.values - 1 ?? 0])
    .style('stroke', (d) => color(d.name));
  // Small delay so the brush can run first
  focusWrapper.selectAll('.line').transition().duration(750).delay(500)
    .style('opacity', 0.7);

  // EXIT
  focusWrapper.exit().transition().duration(750).style('opacity', 0)
    .remove();

  /// ///////////////////////////////////////////////////////////
  /// ////////////////////// Voronoi ////////////////////////////
  /// ///////////////////////////////////////////////////////////

  // Remove the previous voronoi map
  voronoiGroup.selectAll('path').remove();

  // Create a new voronoi map including only the visible points
  voronoiGroup
    .selectAll('path')
    .data(
      voronoi(
        flatData.filter((d) => (d.year >= xBrush.domain()[0]) & (d.year <= xBrush.domain()[1])),
      ),
    )
    .enter()
    .append('path')
    .attr('d', (d) => `M${d.join('L')}Z`)
    .datum((d) => d.point)
    // .style("stroke", "red")
    .attr('class', 'voronoiCells')
    .on('mouseover', mouseover)
    .on('mouseout', mouseout)
    .on('click', (d) => {
      searchEvent(d.name);
    });

  // Move the brush handles to the front
  d3.select('.brush').moveToFront();
} // redraw

/// ///////////////////////////////////////////////////////////
/// //////////////////////// Start ////////////////////////////
/// ///////////////////////////////////////////////////////////
$(document).ready(() => {
  // Create the lines
  redraw(gender);
});

// Expose functions to window scope for inline event handlers
window.searchEvent = searchEvent;
window.changeName = changeName;
window.changeYears = changeYears;
