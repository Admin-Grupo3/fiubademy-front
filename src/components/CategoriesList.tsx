import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { categories_images } from '../utils/images';
import Category from "./Category.tsx";

import { getCategories } from "../login/backend-api";
const CategoriesList = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    getCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);
  return (
    <CategoriesListWrapper>
      <div className='container'>
        <div className='categories-list-top'>
          <h2>Top Categories</h2>
        </div>
        <div className='categories-list grid'>
          {
            categories.map((category, idx: number) => {
              return (
                <Category image = {categories_images[idx]} category = {category.name} key = {idx} />
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