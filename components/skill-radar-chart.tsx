"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"

const skillData = [
  { skill: "JavaScript", current: 90, required: 80 },
  { skill: "React", current: 85, required: 75 },
  { skill: "Python", current: 40, required: 90 },
  { skill: "Data Analysis", current: 30, required: 95 },
  { skill: "Machine Learning", current: 20, required: 85 },
  { skill: "SQL", current: 60, required: 80 },
  { skill: "Communication", current: 75, required: 70 },
]

export default function SkillRadarChart() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (svgRef.current) {
        const { width, height } = svgRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0) return

    // Clear any existing chart
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3.select(svgRef.current)
    const width = dimensions.width
    const height = dimensions.height

    // Calculate optimal chart dimensions to prevent overlap
    const margin = { top: 50, right: 80, bottom: 50, left: 80 }
    const chartWidth = width - margin.left - margin.right
    const chartHeight = height - margin.top - margin.bottom
    const radius = Math.min(chartWidth, chartHeight) / 2

    // Create a group for the chart with proper margins
    const chartGroup = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`)

    // Create scales
    const angleScale = d3
      .scalePoint()
      .domain(skillData.map((d) => d.skill))
      .range([0, 2 * Math.PI])
      .padding(0.5)

    const radiusScale = d3.scaleLinear().domain([0, 100]).range([0, radius])

    // Draw concentric circles for reference
    const circles = [20, 40, 60, 80, 100]
    const gridGroup = chartGroup.append("g").attr("class", "grid-lines")

    circles.forEach((value) => {
      gridGroup
        .append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", radiusScale(value))
        .attr("fill", "none")
        .attr("stroke", "#ddd")
        .attr("stroke-width", 1)
        .attr("stroke-dasharray", "2,2")

      // Add value labels to the circles - only on the top position
      gridGroup
        .append("text")
        .attr("x", 0)
        .attr("y", -radiusScale(value) - 2) // Position above the circle
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "#999")
        .text(value)
    })

    // Draw axis lines
    const axisGroup = chartGroup.append("g").attr("class", "axis-lines")

    skillData.forEach((d) => {
      const angle = angleScale(d.skill) || 0
      const x = Math.sin(angle) * radius
      const y = -Math.cos(angle) * radius

      // Draw axis line
      axisGroup
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", x)
        .attr("y2", y)
        .attr("stroke", "#ddd")
        .attr("stroke-width", 1)
    })

    // Draw axis labels with better positioning to avoid overlap
    const labelGroup = chartGroup.append("g").attr("class", "axis-labels")

    skillData.forEach((d) => {
      const angle = angleScale(d.skill) || 0
      const labelRadius = radius + 20 // Position labels outside the chart

      // Calculate position with slight adjustments to prevent overlap
      const labelX = Math.sin(angle) * labelRadius
      const labelY = -Math.cos(angle) * labelRadius

      // Determine text anchor based on position
      const textAnchor = angle === 0 ? "middle" : angle < Math.PI ? "start" : angle === Math.PI ? "middle" : "end"

      // Adjust vertical alignment
      const dy = angle === 0 ? "-0.5em" : angle === Math.PI ? "1em" : "0.3em"

      labelGroup
        .append("text")
        .attr("x", labelX)
        .attr("y", labelY)
        .attr("dy", dy)
        .attr("text-anchor", textAnchor)
        .attr("font-size", "11px")
        .attr("font-weight", "500")
        .attr("fill", "#555")
        .text(d.skill)
    })

    // Create line generators
    const lineGenerator = d3
      .lineRadial<(typeof skillData)[0]>()
      .angle((d) => angleScale(d.skill) || 0)
      .radius((d) => radiusScale(d.current))
      .curve(d3.curveLinearClosed)

    const requiredLineGenerator = d3
      .lineRadial<(typeof skillData)[0]>()
      .angle((d) => angleScale(d.skill) || 0)
      .radius((d) => radiusScale(d.required))
      .curve(d3.curveLinearClosed)

    // Draw current skills area
    chartGroup
      .append("path")
      .datum(skillData)
      .attr("d", lineGenerator)
      .attr("fill", "rgba(74, 222, 128, 0.3)")
      .attr("stroke", "#4ade80")
      .attr("stroke-width", 2)

    // Draw required skills area
    chartGroup
      .append("path")
      .datum(skillData)
      .attr("d", requiredLineGenerator)
      .attr("fill", "rgba(59, 130, 246, 0.3)")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)

    // Add data points with tooltips
    const pointsGroup = chartGroup.append("g").attr("class", "data-points")

    skillData.forEach((d) => {
      const angle = angleScale(d.skill) || 0

      // Current skill points
      const currentX = Math.sin(angle) * radiusScale(d.current)
      const currentY = -Math.cos(angle) * radiusScale(d.current)

      pointsGroup
        .append("circle")
        .attr("cx", currentX)
        .attr("cy", currentY)
        .attr("r", 4)
        .attr("fill", "#4ade80")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .append("title")
        .text(`${d.skill}: ${d.current}%`)

      // Required skill points
      const requiredX = Math.sin(angle) * radiusScale(d.required)
      const requiredY = -Math.cos(angle) * radiusScale(d.required)

      pointsGroup
        .append("circle")
        .attr("cx", requiredX)
        .attr("cy", requiredY)
        .attr("r", 4)
        .attr("fill", "#3b82f6")
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .append("title")
        .text(`${d.skill} (Required): ${d.required}%`)
    })

    // Add legend with better positioning
    const legendGroup = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width - 150}, 20)`)

    // Current skills legend
    legendGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "rgba(74, 222, 128, 0.3)")
      .attr("stroke", "#4ade80")

    legendGroup
      .append("text")
      .attr("x", 25)
      .attr("y", 12)
      .attr("font-size", "12px")
      .attr("fill", "#555")
      .text("Current Skills")

    // Required skills legend
    legendGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", 30)
      .attr("width", 15)
      .attr("height", 15)
      .attr("fill", "rgba(59, 130, 246, 0.3)")
      .attr("stroke", "#3b82f6")

    legendGroup
      .append("text")
      .attr("x", 25)
      .attr("y", 42)
      .attr("font-size", "12px")
      .attr("fill", "#555")
      .text("Required Skills")
  }, [dimensions])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg ref={svgRef} width="100%" height="100%" className="overflow-visible" style={{ minHeight: "300px" }} />
    </div>
  )
}
