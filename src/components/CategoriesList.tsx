import React from 'react';
import styled from "styled-components";
import { categories_images } from '../utils/images';
import Category from "./Category.tsx";
import { CoursesContext } from '../context/courses_context';
import { CourseContextType } from '../@types/sideBarType.tsx';

const CategoriesList = () => {
  const {getCategorys} = React.useContext(CoursesContext) as CourseContextType;
  const categories = getCategorys();
  return (
    <CategoriesListWrapper>
      <div className='container'>
        <div className='categories-list-top'>
          <h2>Top Categories</h2>
        </div>
        <div className='categories-list grid'>
          {
            categories.map((category: string, idx: number) => {
              return (
                <Category image = {categories_images[idx]} category = {category} key = {idx} />
              )
            })
          }
        </div>
      </div>
    </CategoriesListWrapper>
  )
}

const CategoriesListWrapper = styled.div`
  .categories-list-top{
    margin-bottom: 32px;
  }
  .categories-list{
    gap: 32px;
  }
  @media screen and (min-width: 600px){
    .categories-list{
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (min-width: 800px){
    .categories-list{
      grid-template-columns: repeat(3, 1fr);
    }
  }
  @media screen and (min-width: 992px){
    .categories-list{
      grid-template-columns: repeat(4, 1fr);
    }
  }
  background-color: var(--clr-white);
`;

export default CategoriesList