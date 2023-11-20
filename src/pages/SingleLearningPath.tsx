import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { MdInfo } from "react-icons/md";
import {LearningPathContextType } from "../@types/sideBarType";
import { Alert, Button, Snackbar } from "@mui/material";
import { purchaseLearningPath } from "../login/backend-api";
import { RoleContext } from "../context/roles_context";
import { LearningPathsContext } from "../context/learningPaths_context";
import { PYTHON } from "../utils/constants";

const SingleLearningPath = () => {
  const { role } = React.useContext(RoleContext);

  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [openSnackBar, setOpenSnackBar] = React.useState(false);

  const handleConfirm = () => {
    setOpenSnackBar(true);
    setShowModal(false);
    console.log("Learning path adquirido!");
    purchaseLearningPath(id);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePurchaseButton = () => {
    setShowModal(true);
    };

  const { getLearningPath, purchasedLearningPaths } = React.useContext(LearningPathsContext) as LearningPathContextType;

  const isPurchased = purchasedLearningPaths.find(learningPath => String(learningPath.id) === id);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const learningPath = getLearningPath(id);

  useEffect(() => {
    if (id) {
      getLearningPath(id);
      console;
    }
  }, [id]);
  if (!learningPath) {
    return <h2 className="section-title">no course to display</h2>;
  }

  // TODO: creator.name no existe en la db actualmente, asi que está hardcodeado acá por el momento
  // TODO: integrar el lenguaje del curso con la info del back
  return (
    <SingleCourseWrapper>
            <div className="course-intro mx-auto grid">
        <div className="course-img">
          <img src={`/src/assets/images/${PYTHON}.jpg`} alt={learningPath.title} />
        </div>
        <div className="course-details">
          
          <div className="course-head">
            <h5>{learningPath.title}</h5>
          </div>
          <div className="course-body">
            <p className="course-para fs-18">{learningPath.description}</p>
            <ul className="course-info">
              <li>
                <span className="fs-14">
                  Created by{" "}
                  <span className="fw-6 opacity-08">
                    {learningPath.creator?.name || "Lionel Messi"}
                  </span>
                </span>
              </li>
              <li className="flex">
                <span>
                  <MdInfo />
                </span>
                <span className="fs-14 course-info-txt fw-5">
                  Last updated {learningPath.updatedAt}
                </span>
              </li>
            </ul>
          </div>
          <div>
                {role === "Student" && isLoggedIn && !isPurchased &&(
                  <Button
                    onClick={handlePurchaseButton}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Obtener camino de aprendizaje
                  </Button>
                )}
                </div>
                {showModal && (
            <ModalWrapper>
              <div className="modal-content">
                <p>
                  Usted va a adquirir el camino de aprendizaje <strong>{learningPath.title}</strong> al
                  precio de <strong>${learningPath.courses.reduce((sum, course) => sum + (course.price - course.discount), 0)}</strong>
                </p>
                <button onClick={handleCloseModal}>Cancelar</button>
                <button onClick={handleConfirm}>Confirmar</button>
              </div>
            </ModalWrapper>
          )}
          <Snackbar
            onClose={() => setOpenSnackBar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={openSnackBar}
            autoHideDuration={2000}
          >
            <Alert severity="success" sx={{ width: "100%", fontSize: "15px" }}>
              Usted adquirió el camino de aprendizaje <strong>{learningPath.title}</strong>
            </Alert>
          </Snackbar>
        </div>
      </div>
      <div className="course-full bg-white text-dark">
        <div className="course-content mx-auto">
          <div className="course-sc-title">Learninng Path courses</div>
          <ul className="course-content-list">
            {learningPath &&
              learningPath.courses.map((learningPathItem, idx) => {
                return (
                  <li key={idx}>
                    <span>{learningPathItem.title}</span>
                  </li>
                );
              })}
          </ul>
        </div>
        </div>
    </SingleCourseWrapper>
  );
};
const ModalWrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .modal-content {
    color: black;
    background-color: white;
    padding: 50px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
    max-height: 500vh;
  }

  Button {
    margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
    color: white;
  }
`;

const SingleCourseWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);

  .course-intro{
    padding: 40px 16px;
    max-width: 992px;

    .course-details{
      padding-top: 20px;
    }

    .course-category{
      padding: 0px 8px;
      border-radius: 6px;
    }

    .course-head{
      font-size: 38px;
      line-height: 1.2;
      padding: 12px 0 0 0;
    }
    .course-para{
      padding: 12px 0;
    }
    .rating-star-val{
      margin-right: 7px;
      padding-bottom: 5px;
      color: var(--clr-orange);
    }
    .students-count{
      margin-left: 8px;
    }
    .rating-count{
      margin-left: 6px;
      color: #d097f6;
    }
    .course-info{
      li{
        margin-bottom: 2px;
        &:nth-child(2){
          margin-top: 10px;
        }
      }
      .course-info-txt{
        text-transform: capitalize;
        margin-left: 8px;
        margin-bottom: 4px;
      }
    }
    .course-price{
      margin-top: 12px;
      .old-price{
        color: #eceb98;
        text-decoration: line-through;
        margin-left: 10px;
      }
    }
    .course-btn{
      margin-top: 16px;
      .add-to-cart-btn{
        padding: 12px 28px;
        span{
          margin-left: 12px;
        }
      }
    }

    @media screen and (min-width: 880px){
      grid-template-columns: repeat(2, 1fr);
      column-gap: 40px;
      .course-details{
        padding-top: 0;
      }
      .course-img{
        order: 2;
      }
    }

    @media screen and (min-width: 1400px){
      grid-template-columns: 60% 40%;
    }
  }

  .course-full{
    padding: 40px 16px;
    .course-sc-title{
      font-size: 22px;
      font-weight: 700;
      margin: 12px 0;
    }
    .course-learn{
      max-width: 992px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-learn-list{
        li{
          margin: 5px 0;
          display: flex;
          span{
            &:nth-child(1){
              opacity: 0.95;
              margin-right: 12px;
            }
          }
        }

        @media screen and (min-width: 992px){
          grid-template-columns: repeat(2, 1fr);
        }
      }
    }

    .course-content{
      max-width: 992px;
      margin-top: 30px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 12px 28px 22px 28px;

      .course-content-list{
        li{
          background-color: #f7f9fa;
          padding: 12px 18px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 10px;
          font-weight: 800;
          font-size: 15px;
        }
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


export default SingleLearningPath;