import React, { useEffect } from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import StarRating from "../StarRating.js";
import { Button } from '@mui/material';

const CourseInfo = ({ id, image, title, creator, description, addCourse, coursesSelected }) => {

  
  // TODO: creator.name no existe en la db actualmente, asi que está hardcodeado acá por el momento
  return (
    
    <CourseCard>
      <div className='item-img'>
        <img src={`https://raw.githubusercontent.com/${image}`} alt={title} />
      </div>
      <div className='item-body'>
        <h5 className='item-name'>{title}</h5>
        <span className='item-creator'> {description}</span>
      </div>
      <div className='item-btns flex'>
        <Button onClick={()  => addCourse(id, title)}> Add Course</Button>
      </div>
    </CourseCard>
  )
}

const CourseCard = styled.div`
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

export default CourseInfo