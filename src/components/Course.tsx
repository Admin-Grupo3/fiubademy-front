import styled from 'styled-components';
import {Link} from "react-router-dom";
import StarRating from "./StarRating.tsx";
import { RoleContext } from '../context/roles_context.tsx';
import React from 'react';
import { Button } from '@mui/material';
import createPdf from '../utils/generatePDF.tsx';

const Course = (props: { id: any; image: any; title: any; creator: any; price: any; discount: any; rating_count: any; rating_star: any; categories: any; exams: any; user: any; }) => {
  const {id, image, title, creator, price, discount, rating_count, rating_star, categories, exams, user} = props;
  const isCourseApproved = user?.coursesAproved.some((course: { courseId: any; }) => course.courseId === id);
  const result = user?.coursesAproved.find((course: { courseId: any; }) => course.courseId === id)
  let score = 0;  
  if(isCourseApproved){
    score = result.avgScore;
  }
  
  const { role } = React.useContext(RoleContext);

  // TODO: creator.name no existe en la db actualmente, asi que está hardcodeado acá por el momento
  return (
    <CourseCard>
      <div className='item-img'>
        <img src={`/src/assets/images/${image}.jpg`} alt={title} />
      </div>
      <div className='item-body'>
        <h5 className='item-name'>{title}</h5>
        <span className='item-creator'>{(creator?.name) || 'Lionel Messi'}</span> 
        <div className='item-rating flex'>
          <span className='rating-star-val'>{rating_star}</span>
          <StarRating rating_star = {rating_star} />
          <span className='rating-count'>({rating_count})</span>
        </div>
        <div className='item-price'>
          <span className='item-price-new'>${price - discount}</span>
          <span className='item-price-old'>${price}</span>
        </div>
      </div>
      <div className='item-btns flex-column'> 
      
        {(isCourseApproved || role === "Student") && (
          <div className='item-btn see-details-btn'>
            <Link to={`/courses/${id}`} className='link'>
              See details
            </Link>
          </div>
        )}
        {(isCourseApproved && role === "Student") && (
          <div className='item-btn approved-btn' style={{ pointerEvents: 'none' }}>
            Aprobado
          </div>
        )}
        {(isCourseApproved && role === "Student") && (
          <div
          style={{marginTop: '10px', cursor: 'pointer'}}
            className='item-btn approved-btn'
            onClick={() =>
              createPdf(
                "Certificado de aprobacion",
                user.firstName + user.lastName,
                title,
                score
              )
            }
          >
            Descargar Certificado
          </div>
        )}
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

      &.approved-btn{
        background-color: transparent;
        border: 1px solid var(--clr-black);
        margin-right: 5px;
        color: green;

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

export default Course