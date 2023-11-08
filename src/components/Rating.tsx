import React from 'react';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

interface RatingProps {
  ratings: number[];
  reviews: string[];
}

const RatingComponent: React.FC<RatingProps> = ({ ratings, reviews }) => {
  return (
    <RatingComponentWrapper>
    <div>
      <h2>Calificaciones y Opiniones</h2>
      <ul className="opinions-list">
        {ratings.map((rating, index) => (
          <li key={index} className="opinion-item">
            <div>
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  color={i < rating ? '#ffc107' : '#e4e5e9'}
                />
              ))}
            </div>
            <p>{reviews[index]}</p>
          </li>
        ))}
      </ul>
    </div>
    </RatingComponentWrapper>
  );
};

export default RatingComponent;

const RatingComponentWrapper = styled.div`

.opinions-list {
    list-style-type: none;
    padding: 0;
  }
  
  .opinion-item {
    margin-bottom: 20px; /* Espacio entre cada opinión */
  }
`;