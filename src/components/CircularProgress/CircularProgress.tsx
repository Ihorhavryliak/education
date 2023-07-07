import React, { useEffect, useState } from "react";

interface CircularProgressType {
  percentage: number;
  strokeWidth: number;
  size: number;
  color: string;
}
export default function CircularProgress({
  size,
  strokeWidth,
  percentage,
  color,
}: CircularProgressType) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);

  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;

  return (
    <svg width={size} height={size} viewBox={viewBox}>
      <circle
        fill="none"
        stroke="#ccc"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        fill="none"
        stroke={color}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeDasharray={`${dash} ${circumference - dash}`}
        style={{ transition: "all 0.1s" }}
      />
      <text
        fill={color}
        fontSize="16px"
        x="50%"
        y="50%"
        dy="5px"
        textAnchor="middle"
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
}
