import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import StarRating from "./StarRating.tsx";

const LearningPath = (props) => {
  const {id, title, description, courses, creator} = props;

  // TODO: creator.name no existe en la db actualmente, asi que está hardcodeado acá por el momento
  return (
    <LearningPathCard>
      {
        courses.length > 0 && (
          <div className='item-img'>
            <img src = {`/src/assets/images/${courses[0].image}.jpg`} alt = {courses[0].title} />
          </div>
        )
      }
      <div className='item-body'>
        <h5 className='item-name'>{title}</h5>
        <span className='item-creator'>{(creator?.name) || 'Lionel Messi'}</span> 
        <div className='item-price'>
          <span className='item-price-new'>${courses.reduce((sum, course) => sum + (course.price - course.discount), 0)}</span>
          <span className='item-price-old'>${courses.reduce((sum, course) => sum + course.price, 0)}</span>
        </div>
      </div>
      <div className='item-btns flex'>
        <Link to = {`/learning-paths/${id}`} className = "item-btn see-details-btn">See details</Link>
      </div>
    </LearningPathCard>
  )
}

const LearningPathCard = styled.div`
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 24px;
  display: flex;
  flex-direction: column;
  .item-body{
    margin: 14px 0;
    padding: 4px 18px;

    .item-name{
      font-size: 15px;
      line-height: 1.4;
      font-weight: 800;
    }
    .item-creator{
      font-size: 12.5px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
    }
    .rating-star-val{
      margin-bottom: 5px;
      font-size: 14px;
      font-weight: 800;
      color: #b4690e;
      margin-right: 6px;
    }
    .rating-count{
      font-size: 12.5px;
      margin-left: 3px;
      font-weight: 500;
      opacity: 0.8;
    }
    .item-price-new{
      font-weight: 700;
      font-size: 15px;
    }
    .item-price-old{
      opacity: 0.8;
      font-weight: 500;
      text-decoration: line-through;
      font-size: 15px;
      margin-left: 8px;
    }
  }

  .item-btns{
    justify-self: flex-start;
    padding: 4px 8px 30px 18px;
    margin-top: auto;
    .item-btn{
      font-size: 15px;
      display: inline-block;
      padding: 6px 16px;
      font-weight: 700;
      transition: var(--transition);
      white-space: nowrap;

      &.see-details-btn{
        background-color: transparent;
        border: 1px solid var(--clr-black);
        margin-right: 5px;

        &:hover{
          background-color: rgba(0, 0, 0, 0.9);
          color: var(--clr-white);
        }
      }

      &.add-to-cart-btn{
        background: rgba(0, 0, 0, 0.9);
        color: var(--clr-white);
        border: 1px solid rgba(0, 0, 0, 0.9);

        &:hover{
          background-color: transparent;
          color: rgba(0, 0, 0, 0.9);
        }
      }
    }
  }
`;

export default LearningPath