import React from 'react';
import { Train } from '../../types/simulation';

interface TrainVehicleProps {
  train: Train;
  onClick: (train: Train) => void;
  isSelected: boolean;
}

export const TrainVehicle: React.FC<TrainVehicleProps> = ({ train, onClick, isSelected }) => {
  let statusColor = '#170C79';
  let label = 'IN SERVICE';

  if (train.status === 'INDUCTING') {
    statusColor = '#56B6C6'; // Teal Cyan
    label = 'INDUCTING';
  } else if (train.status === 'READY_INDUCTION') {
    statusColor = '#56B6C6';
    label = 'READY';
  } else if (train.status === 'STANDBY') {
    statusColor = '#2C2B68';
    label = 'STANDBY';
  } else if (train.status === 'MAINTENANCE') {
    statusColor = '#C53030';
    label = 'FAULT';
  }

  // Calculated SVG coordinates for the expanded 1200x520 canvas
  // Down line is at Y=230, Up line is at Y=350
  let posX = 200;
  let posY = 230;

  if (train.status === 'STANDBY' || train.status === 'READY_INDUCTION') {
    if (train.id === 'T02') {
      posX = 75;
      posY = 95;
    } else if (train.id === 'T06') {
      posX = 125;
      posY = 95;
    } else if (train.id === 'T08') {
      posX = 175;
      posY = 95;
    } else {
      posX = 120;
      posY = 95;
    }
  } else if (train.status === 'MAINTENANCE') {
    posX = 390;
    posY = 150; // Kalamassery emergency siding
  } else if (train.status === 'INDUCTING') {
    // Siding transition from depot (140, 95) to Aluva mainline (200, 230)
    const t = Math.min(1, train.trackProgress / 20);
    posX = 140 + t * 60;
    posY = 95 + t * 135;
  } else {
    // Mainline track progress: 18% (Aluva) to 96% (Tripunithura) -> X: 200 to 1120
    const normalized = (train.trackProgress - 18) / (96 - 18);
    const clamped = Math.max(0, Math.min(1, normalized));
    posX = 200 + clamped * 920;
    posY = train.direction === 'DOWN' ? 230 : 350; // Clear 120px vertical separation
  }

  const loadPercentage = Math.round((train.passengerLoad / train.capacity) * 100);

  return (
    <g
      onClick={() => onClick(train)}
      className="cursor-pointer select-none transition-transform duration-300"
      style={{
        transform: `translate(${posX}px, ${posY}px)`
      }}
    >
      {/* Selection ring in Teal Cyan */}
      {isSelected && (
        <circle
          cx="0"
          cy="0"
          r="26"
          fill="none"
          stroke="#56B6C6"
          strokeWidth="2.5"
          strokeDasharray="4 2"
        />
      )}

      {/* Stylized Metro Train Carriage */}
      <g transform="translate(-28, -13)">
        {/* Main Body */}
        <rect
          x="0"
          y="0"
          width="56"
          height="26"
          rx="5"
          fill="#FFFFFF"
          stroke={isSelected ? '#56B6C6' : statusColor}
          strokeWidth={isSelected ? '2.5' : '1.5'}
        />

        {/* Metro Aerodynamic Nose */}
        {train.direction === 'DOWN' ? (
          <path
            d="M 52 4 Q 56 13 52 22 L 56 13 Z"
            fill={statusColor}
          />
        ) : (
          <path
            d="M 4 4 Q 0 13 4 22 L 0 13 Z"
            fill={statusColor}
          />
        )}

        {/* Windows */}
        <rect x="9" y="6" width="7" height="6" rx="1" fill="#8ACBD0" />
        <rect x="20" y="6" width="7" height="6" rx="1" fill="#8ACBD0" />
        <rect x="31" y="6" width="7" height="6" rx="1" fill="#8ACBD0" />
        <rect x="42" y="6" width="5" height="6" rx="1" fill="#8ACBD0" />

        {/* Load Bar */}
        <rect x="8" y="17" width="40" height="3.5" rx="1" fill="#EFE3CA" />
        <rect
          x="8"
          y="17"
          width={Math.max(2, (loadPercentage / 100) * 40)}
          height="3.5"
          rx="1"
          fill={loadPercentage > 85 ? '#C53030' : '#56B6C6'}
        />
      </g>

      {/* Train ID Badge (Top with clear margin) */}
      <rect
        x="-16"
        y="-26"
        width="32"
        height="11"
        rx="2"
        fill="#FFFFFF"
        stroke={statusColor}
        strokeWidth="1.2"
      />
      <text
        x="0"
        y="-18"
        textAnchor="middle"
        fill="#170C79"
        fontSize="8"
        fontWeight="bold"
        fontFamily="JetBrains Mono"
      >
        {train.id}
      </text>

      {/* Speed / Status Pill (Bottom with clear margin) */}
      <rect
        x="-22"
        y="16"
        width="44"
        height="11"
        rx="2"
        fill="#FFFFFF"
        stroke="#8ACBD0"
        strokeWidth="1"
      />
      <text
        x="0"
        y="24.5"
        textAnchor="middle"
        fill={statusColor}
        fontSize="7"
        fontWeight="bold"
        fontFamily="JetBrains Mono"
      >
        {train.speedKmh > 0 ? `${train.speedKmh} km/h` : label}
      </text>
    </g>
  );
};



