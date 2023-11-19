import React from "react";
import styled from "styled-components";

const ProgressBar = ({ progress }) => {
  return (
    <ProgressBarWrapper>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          <span className="progress-text">{`${progress}% `}</span>
        </div>
      </div>
    </ProgressBarWrapper>
  );
};

const ProgressBarWrapper = styled.div`
.progress-bar {
    width: 100%;
    height: 20px;
    background-color: #FFA500; /* Cambia el color a uno más acorde con tu tema naranja */
    border: 1px solid #FFA500; /* Color del borde */
    border-radius: 5px;
    position: relative;
  }

  .progress {
    height: 100%;
    background-color: #FF6347; /* Cambia el color del progreso */
    border-radius: 5px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
  }
`;

export default ProgressBar;
