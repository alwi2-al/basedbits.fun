"use client";

import { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { BaseRace } from "@/app/lib/types/types";
import { useIsBoosted } from "@/app/lib/hooks/baserace/useIsBoosted";

interface Props {
  tokenId: number;
  race: BaseRace;
  eliminated: boolean;
  onClick: (idx: number) => void;
}

export const Racer = ({ tokenId, race, eliminated, onClick }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const hasAnimatedBoost = useRef(false);

  const { data: isBoosted } = useIsBoosted({
    raceId: race.id,
    lapId: race.lapCount,
    tokenId,
    enabled: true,
  });

  // Memoize the star symbol to prevent recreation on every render
  const starSymbol = useMemo(
    () => d3.symbol().type(d3.symbolStar).size(60),
    [],
  );

  // Memoize the arc generator
  const arc = useMemo(
    () =>
      d3
        .arc<d3.DefaultArcObject>()
        .innerRadius(16)
        .outerRadius(20)
        .startAngle(0),
    [],
  );

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    // Draw the main circle
    svg
      .append("circle")
      .attr("cx", 20)
      .attr("cy", 20)
      .attr("r", 20)
      .attr("fill", eliminated ? "gray" : "black");

    svg
      .append("text")
      .attr("x", 10)
      .attr("y", 25)
      .attr("fill", "white")
      .attr("font-size", "15px")
      .text(tokenId);

    if (isBoosted) {
      if (!hasAnimatedBoost.current) {
        const boostCircle = svg
          .append("path")
          .datum({
            innerRadius: 16,
            outerRadius: 20,
            startAngle: 0,
            endAngle: 0,
          })
          .attr("d", arc)
          .attr("fill", "none")
          .attr("stroke", "yellow")
          .attr("stroke-width", "3")
          .attr("transform", "translate(20, 20)");

        boostCircle
          .transition()
          .duration(1200)
          .attrTween("d", (d) => {
            const interpolate = d3.interpolate(d.endAngle, 2 * Math.PI);
            return (t) => {
              d.endAngle = interpolate(t);
              return arc(d) || "";
            };
          });

        hasAnimatedBoost.current = true;
      } else {
        // Just draw the circle without animation
        svg
          .append("path")
          .datum({
            innerRadius: 16,
            outerRadius: 20,
            startAngle: 0,
            endAngle: 2 * Math.PI,
          })
          .attr("d", arc)
          .attr("fill", "none")
          .attr("stroke", "yellow")
          .attr("stroke-width", "3")
          .attr("transform", "translate(20, 20)");
      }
    }

    if (!eliminated) {
      // Draw the smaller circle
      svg
        .append("circle")
        .attr("cx", 30)
        .attr("cy", 35)
        .attr("r", 10)
        .attr("stroke", "black")
        .attr("stroke-width", "2")
        .attr("fill", "red");

      // Draw the cross last to ensure it's on top
      svg
        .append("path")
        .attr("transform", "translate(30, 35)")
        .attr("d", "M-5,-5 L5,5 M-5,5 L5,-5")
        .attr("stroke", "white")
        .attr("stroke-width", "2");
    }
  }, [eliminated, tokenId, isBoosted, starSymbol]);

  const handleClick = () => {
    if (isBoosted) return;

    const svg = d3.select(svgRef.current);
    const progress = svg
      .append("path")
      .datum({ innerRadius: 16, outerRadius: 20, startAngle: 0, endAngle: 0 })
      .attr("d", arc)
      .attr("fill", "black")
      .attr("transform", "translate(20, 20)");

    progress
      .transition()
      .duration(1200)
      .attrTween("d", (d) => {
        const interpolate = d3.interpolate(d.endAngle, 2 * Math.PI);
        return (t) => {
          d.endAngle = interpolate(t);
          return arc(d) || "";
        };
      });

    setTimeout(() => {
      onClick(tokenId);
    }, 1200);
  };

  return (
    <svg
      ref={svgRef}
      width={50}
      height={50}
      onClick={handleClick}
      style={{ cursor: isBoosted ? "not-allowed" : "pointer" }}
    />
  );
};
