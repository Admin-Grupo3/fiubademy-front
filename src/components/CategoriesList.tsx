import { useEffect, useState } from 'react';
import styled from "styled-components";
import Category from "./Category.tsx";
import { getCategories } from "../login/backend-api";


const categories_images = {
  python: "https://raw.githubusercontent.com/Admin-Grupo3/fiubademy-front/2f52439352fea932a23aaea7ed533bb399f8d708/src/assets/images/cat_python.png",
  ciencia: "https://raw.githubusercontent.com/Admin-Grupo3/fiubademy-front/main/src/assets/images/cat_ciencia.png",
  web_development: "https://raw.githubusercontent.com/Admin-Grupo3/fiubademy-front/2f52439352fea932a23aaea7ed533bb399f8d708/src/assets/images/cat_web_development.png",
  programacion: "https://raw.githubusercontent.com/Admin-Grupo3/fiubademy-front/2f52439352fea932a23aaea7ed533bb399f8d708/src/assets/images/cat_web_development.png",
  data_science: "https://raw.githubusercontent.com/Admin-Grupo3/fiubademy-front/2f52439352fea932a23aaea7ed533bb399f8d708/src/assets/images/cat_data_science.png",
  aws_certification: "https://raw.githubusercontent.com/Admin-Grupo3/fiubademy-front/2f52439352fea932a23aaea7ed533bb399f8d708/src/assets/images/cat_aws.png",
  design: "https://raw.githubusercontent.com/Admin-Grupo3/fiubademy-front/2f52439352fea932a23aaea7ed533bb399f8d708/src/assets/images/cat_design.png",
  marketing: "https://raw.githubusercontent.com/Admin-Grupo3/fiubademy-front/2f52439352fea932a23aaea7ed533bb399f8d708/src/assets/images/cat_marketing.png"
};


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
              const name = category.name;
              console.log(name);
              const imageKeyName = name.toLowerCase().replace(" ", "_") as keyof typeof categories_images;
              console.log(categories_images[imageKeyName]);
              return (
                <Category image = {categories_images[imageKeyName]} category={name} key={idx} />
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