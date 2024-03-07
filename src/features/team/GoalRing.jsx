import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function FitnessRings({ data }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data || data.length !== 1) return;

    const svg = d3.select(svgRef.current);
    const width = svg.attr('width');
    const height = svg.attr('height');
    const radius = Math.min(width, height) / 2;

    // Define the arc for the single ring
    const arc = d3.arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.7)
      .startAngle(0)
      .cornerRadius(10);

    // Create a single group for the ring
    const ring = svg.selectAll('.ring')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'ring')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Add text label for the ring
    ring.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', 5)
      .text(data[0].label);

    // Append path element for the ring
    ring.append('path')
      .attr('d', (d) => arc({
        startAngle: 0,
        endAngle: Math.PI * 2,
      }))
      .attr('fill', '#ccc'); // Grey color for the entire ring

    // Append another path element for the filled portion of the ring
    ring.append('path')
      .attr('d', (d) => arc({
        startAngle: 0,
        endAngle: (data[0].value / data[0].maxValue) * Math.PI * 2,
      }))
      .attr('fill', data[0].color); // Color for the filled portion
  }, [data]);

  return (
    <svg ref={svgRef} width="300" height="300" />
  );
}

export default FitnessRings;
