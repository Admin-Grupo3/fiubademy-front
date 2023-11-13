import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CoursesContext } from "../context/courses_context";
import StarRating from "../components/StarRating";
import { MdInfo } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { RiClosedCaptioningFill } from "react-icons/ri";
import { BiCheck } from "react-icons/bi";
import { CourseContextType, CourseType } from "../@types/sideBarType";
import { Alert, Button, Rating, Snackbar, TextField } from "@mui/material";
import Videos from "../components/Videos";
import { purchaseCourse } from "../login/backend-api";
import RatingComponent from "../components/Rating";
import { RoleContext } from "../context/roles_context";


const handleGetCourse = () => {
  console.log("get course");
  // Add here call to function to call endpoint
};

const ratings = [4, 5, 3, 2];
const reviews = [
  "Excelente curso!",
  "Muy satisfecho con el curso.",
  "Regular, podría mejorar.",
  "No cumplió mis expectativas.",
];

const SingleCoursePage = () => {

  const [showModal, setShowModal] = useState(false);
  const [showModalRating, setShowModalRating] = useState(false);
  const { role } = React.useContext(RoleContext);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRating = () => {
    setShowModalRating(true);
  };

  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const { id } = useParams();

  const handleConfirm = () => {
    setOpenSnackBar(true);
    setShowModal(false);
    console.log("Curso adquirido!");
    purchaseCourse(id);
  };

  const handleGetCourse = () => {
    setShowModal(true);
    console.log("get course");
  };

  const handleCloseModalRating = () => {
    setShowModalRating(false);
  };

  const [userRating, setUserRating] = useState(null);
  const [isRated, setIsRated] = useState(false);
  const [comment, setComment] = useState("");

  const handleConfirmRating = () => {
    setIsRated(true);
    setShowModalRating(false);

    console.log("Calificación seleccionada:", userRating);
    console.log("Comentario:", comment);
    //Send calificacion y comentario to backend
  };

  const { getCourse, purchaseCourses } = React.useContext(CoursesContext) as CourseContextType;
  const purchasedCourse = purchaseCourses.find(course => String(course.id) === id);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const single_course = getCourse(id);
  useEffect(() => {
    if (id) {
      getCourse(id);
      console;
    }
  }, [id]);
  if (!single_course) {
    return <h2 className="section-title">no course to display</h2>;
  }

  const {
    title,
    categories,
    description,
    rating_star,
    rating_count,
    students,
    updatedAt,
    language,
    discount,
    price,
    creator,
    image,
    what_will_you_learn,
    content,
  } = single_course || {};

  // TODO: creator.name no existe en la db actualmente, asi que está hardcodeado acá por el momento
  // TODO: integrar el lenguaje del curso con la info del back
  return (
    <SingleCourseWrapper>
      <div className="course-intro mx-auto grid">
        <div className="course-img">
          <img src={`https://raw.githubusercontent.com/${image}`} alt={title} />
        </div>
        <div className="course-details">
          {categories.map((category: any) => (
            <div className="course-category bg-white text-dark text-capitalize fw-6 fs-12 d-inline-block">
              {category.name}
            </div>
          ))}
          <div className="course-head">
            <h5>{title}</h5>
          </div>
          <div className="course-body">
            <p className="course-para fs-18">{description}</p>
            <div className="course-rating flex">
              <span className="rating-star-val fw-8 fs-16">{rating_star}</span>
              <StarRating rating_star={rating_star} />
              <span className="rating-count fw-5 fs-14">({rating_count})</span>
              <span className="students-count fs-14">{students}</span>
            </div>

            <ul className="course-info">
              <li>
                <span className="fs-14">
                  Created by{" "}
                  <span className="fw-6 opacity-08">
                    {creator?.name || "Lionel Messi"}
                  </span>
                </span>
              </li>
              <li className="flex">
                <span>
                  <MdInfo />
                </span>
                <span className="fs-14 course-info-txt fw-5">
                  Last updated {updatedAt}
                </span>
              </li>
              <li className="flex">
                <span>
                  <TbWorld />
                </span>
                <span className="fs-14 course-info-txt fw-5">{language.name}</span>
              </li>
              <li className="flex">
                <span>
                  <RiClosedCaptioningFill />
                </span>
                <span className="fs-14 course-info-txt fw-5">
                  {language.name} [Auto]
                </span>
              </li>
            </ul>
          </div>

          <div className="course-foot">
            <div className="course-price">
              <span className="new-price fs-26 fw-8">${price - discount}</span>
              <span className="old-price fs-26 fw-6">${price}</span>
            </div>
          </div>
          {(role === "Teacher") && (
            <Button
              href={"/editCourse/" + id}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Editar curso
            </Button>
          )}
          <Button
            href={"/exam/" + id}
            style={{ marginLeft: "20px" }}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Dar examen
          </Button>
          {(role === "Teacher") && <Button
            href={'/examCreation/' + id}
            style={{marginLeft: '20px'}}
            variant="contained"
            sx={{ mt: 3, mb: 2, marginRight: '20px'}}>
            Crear examen
        </Button>}

          <div>
          {isLoggedIn && !purchasedCourse &&(
            <Button
              onClick={handleGetCourse}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Obtener curso
            </Button>
          )}
          </div>
          {showModal && (
            <ModalWrapper>
              <div className="modal-content">
                <p>
                  Usted va a adquirir el curso <strong>{title}</strong> al
                  precio de <strong>${price}</strong>
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
              Usted adquirió el curso <strong>{title}</strong>
            </Alert>
          </Snackbar>
          <div>
          {isLoggedIn && purchasedCourse && (
            <Button
              onClick={handleRating}
              // style={{ marginLeft: "20px" }}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isRated}

            >
              Calificar curso
            </Button>
          )}
          </div>
          {showModalRating && (
            <ModalWrapper>
              <div className="modal-content">
                <h3>¿Cómo calificarías este curso?</h3>
                <p style={{ marginTop: "10px" }}>Eligir calificación</p>
                <Rating
                  style={{ marginTop: "10px" }}
                  size="large"
                  value={userRating}
                  onChange={(_event, newValue) => {
                    setUserRating(newValue);
                  }}
                />
                <TextField
                  id="comment"
                  label="Comentario"
                  name="comment"
                  fullWidth
                  multiline
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  margin="normal"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <button onClick={handleCloseModalRating}>Cancelar</button>
                  <button onClick={handleConfirmRating}>Confirmar</button>
                </div>
              </div>
            </ModalWrapper>
          )}
        </div>
      </div>

      <div className="course-full bg-white text-dark">
        <div className="course-learn mx-auto">
          <div className="course-sc-title">What you'll learn</div>
          <ul className="course-learn-list grid">
            {what_will_you_learn &&
              what_will_you_learn.map((learnItem, idx) => {
                return (
                  <li key={idx}>
                    <span>
                      <BiCheck />
                    </span>
                    <span className="fs-14 fw-5 opacity-09">{learnItem}</span>
                  </li>
                );
              })}
          </ul>
        </div>

        <div className="course-content mx-auto">
          <div className="course-sc-title">Course content</div>
          <ul className="course-content-list">
            {content &&
              content.map((contentItem, idx) => {
                return (
                  <li key={idx}>
                    <span>{contentItem}</span>
                  </li>
                );
              })}
          </ul>
        </div>
        {purchasedCourse && (
        <div className="container" style={{ marginTop: "20px" }}>
          <Videos embedId="tQZy0U8s9LY" />
        </div>)}
        
        <div className="container" style={{ marginTop: "20px" }}>
          <RatingComponent ratings={ratings} reviews={reviews} />
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
    // margin-top: 10px;
    margin-right: 10px;
    margin-left: 10px;
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

export default SingleCoursePage;