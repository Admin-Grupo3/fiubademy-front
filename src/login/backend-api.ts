import axios from 'axios';
import dayjs from 'dayjs';

export { signup, signin, getCategories, getCourses, createCourse, createCompanyCourse, logOut, editCourse, createExam, purchaseCourse, getPurchaseCourses, getExams, sendExam , createLearningPath, getLearningPaths, getUserProfile, createCategory, rejectCourse, updateUser, getPurchases, getPurchasedLearningPaths, purchaseLearningPath}

//const url = 'http://localhost:3300';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

function convertToISO6391(language: string): string | null {
  const languageMap: { [key: string]: string } = {
    'english': 'en',
    'spanish': 'es'
    // Agregar más mapeos según sea necesario
  };

  return languageMap[language] || null;
}

// Replace with your desired payload

function signup(email: any, password: any, name: any, last_name: any, setSigninFailed: any){
    let payload = {
        email: email,
        password: password,
        firstName: name,
        lastName: last_name
      };
    instance.post(`/users/signup`, payload)
  .then(response => {
    if(response.status == 201){
        //Redireccionar a inicio de sesion
        window.location.href = "/signin";
    }
    else{
      setSigninFailed(true);
    }
  })
  .catch(error => {
    console.error(error);
    setSigninFailed(true);
  });
}

function signin(email: any, password: any, setSigninFailed: any){
  let payload = {
      email: email,
      password: password,
    };
  instance.post(`/users/signin`, payload)
.then(response => {
  if(response.status == 201){
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userData', JSON.stringify(payload));
    window.location.href = "/";
}
else{
  setSigninFailed(true);
}
})
.catch(error => {
  console.error(error);
  setSigninFailed(true);
});
}

function logOut(){
  localStorage.setItem('isLoggedIn', 'false');
  localStorage.removeItem('userData');
  instance.post(`/users/logout`)
  .then(response => {
    if(response.status == 201){
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('userData');
      window.location.href = "/";
    }
  })
  .catch(error => {
    console.error('Error al hacer logout:', error);
  });
}


function getCategories(): Promise<{ id: number; name: string }[]> {
  return instance.get('/categories', ).then(response => {
    if (response.status == 200) {
      return response.data;
    }
    else {
      return [];
    }
  }).catch(error => {
    console.error('Error al obtener categorías:', error);
    return [];
  });
  
}

function getCourses(): Promise<any> {
  return instance.get('/courses', ).then(response => {
    if (response.status == 200) {
      return response.data;
    }
    else {
      return [];
    }
  }).catch(error => {
    console.error('Error al obtener cursos:', error);
    return [];
  });
  
}

function createCourse(title: any, language: any, categoryIds: any, description: any, price: any, what_will_you_learn: string[], content: string[], video: string) {
  let payload = {
    title: title,
    language: convertToISO6391(language),
    categoryIds: categoryIds, 
    description: description,
    price: price,
    what_will_you_learn: what_will_you_learn,
    content: content,
    video: video
  };
  instance.post(`/courses`, payload)
  .then(response => {
  if(response.status == 201){
    window.location.href = "/";
  }
  else{
    console.error('Error al crear el curso:');
  }
  })
  .catch(error => {
    console.error('Error al crear el curso:', error);
  });
}
function createCompanyCourse(title: any, language: any, categoryIds: any, description: any, price: any, company:String) {
  let payload = {
    title: title,
    language: convertToISO6391(language),
    categoryIds: categoryIds, 
    description: description,
    price: price,
    companyName: company
  };
  instance.post(`/courses`, payload)
  .then(response => {
  if(response.status == 201){
    window.location.href = "/";
  }
  else{
    console.error('Error al crear el curso:');
  }
  })
  .catch(error => {
    console.error('Error al crear el curso:', error);
  });
}
function createExam(title: any, courseId: string | undefined, questions: []) {
  const payload = {
    name: title,
    description: "description",
    questions: questions,
  }
  instance.post(`/courses/${courseId}/exams/`, payload)
  .then(response => {
    if(response.status == 201){
      window.location.href = "/";
    }
    else{
      console.error('Error al crear el examen:');
    }
    })
    .catch(error => {
      console.error('Error al crear el examen:', error);
    });

}
function editCourse(courseId: string | undefined, title: any, language: any, categoryIds: any, description: any, price: any, what_will_you_learn: string[], content: string[], video: string) {
  let payload = {
    title: title,
    language: convertToISO6391(language),
    categoryIds: categoryIds,
    description: description,
    price: price,
    what_will_you_learn: what_will_you_learn,
    content: content,
    video: video
  };
  instance.post(`/courses/${courseId}`, payload)
  .then(response => {
  if(response.status == 201){
    window.location.href = `/courses/${courseId}`;
  }
  else{
    console.error('Error al editar el curso:');
  }
  })
  .catch(error => {
    console.error('Error al editar el curso:', error);
  });
}

function purchaseCourse(courseId: string) {
  
  instance.post(`/courses/${courseId}/purchase`)
  .then(response => {
  if(response.status == 201){
    setTimeout(() => {
      window.location.href = "/mycourses"; // Redirigir a MyCourses después de 2 segundos para ver los cursos comprados
    }, 1000);
  }
  else{
    console.error('Error al comprar el curso:');
  }
  })
  .catch(error => {
    console.error('Error al comprar el curso:', error);
  });
}

function getPurchaseCourses(): Promise<any> {
  return instance.get('/courses/purchase', ).then(response => {
    if (response.status == 200) {
      return response.data;
    }
    else {
      return [];
    }
  }).catch(error => {
    console.error('Error al obtener cursos:', error);
    return [];
  });

}

function getPurchasePaths(): Promise<any> {
  return instance.get('/learning-paths/purchases', ).then(response => {
    if (response.status == 200) {
      return response.data;
    }
    else {
      return [];
    }
  }).catch(error => {
    console.error('Error al obtener cursos:', error);
    return [];
  });

}
function getUserProfile(): Promise<any> {
  return instance.get('/users/profile').then(response => {
    if (response.status == 200) {
      return response.data;
    }
    else {
      return [];
    }
  }).catch(error => {
    console.error('Error al obtener el usurio:', error);
    return [];
  });
}
function getExams(courseId):Promise<any>{
  
  return instance.get(`/courses/${courseId}/exams`, ).then(response => {
    if (response.status == 200) {
      return response.data;
    }
    else {
      return [];
    }
  }).catch(error => {

    console.error('Error al obtener los examenes:', error);
    return [];
  });
}
function sendExam(examId, courseId, answers){
  const payload = {
    answers: answers,
  }
  return instance.post(`users/course/${courseId}/exams/${examId}`, payload)
  .then(response => {
    if(response.status == 201){
      return response.data;
    }
    else{
      console.error('Error al enviar el examen:');
      return null;
    }
    })
    .catch(error => {
      console.error('Error al enviar el examen:', error);
  
    });
  }
function createLearningPath(title:string, description:string, courses:string[]){
  const payload = {
    title: title,
    description: description,
    courses: courses,
  }
  instance.post(`/learning-paths`, payload)
  .then(response => {
    if(response.status == 201){
      window.location.href = "/";
    }
    else{
      console.error('Error al crear el camino de aprendizaje:');
    }
    })
    .catch(error => {
      console.error('Error al crear el camino de aprendizaje:', error);

    });
}
function createCategory(categoryData: any){
  const payload = { name : categoryData.title }
  console.log("creting category ", payload)
  instance.post(`/categories`, payload)
  .then(response => {
    if(response.status == 201){
      window.location.href = "/";
    }
    else{
      console.error('Error al crear la categoria:');
    }
    })
    .catch(error => {
      console.error('Error al crear la categoria:', error);

    });
}
function rejectCourse(courseId:any){
  console.log("Deleting course: ", courseId)
  instance.delete(`/courses/${courseId}`)
  .then(response => {
    if(response.status == 201 || response.status == 200){
      window.location.href = "/";
      console.log("Course deleted")
    }
    else{
      console.error('Error al eliminar el curso status:', response.status);
    }
    })
    .catch(error => {
      console.error('Error al eliminar el curso: ', error);

    });
}

function getLearningPaths(): Promise<any> {
  return instance.get('/learning-paths', ).then(response => {
    if (response.status == 200) {
      return response.data;
    }
    else {
      return [];
    }
  }).catch(error => {
    console.error('Error al obtener los caminos de aprendizaje:', error);
    return [];
  });
}

function getPurchasedLearningPaths(): Promise<any> {
  return instance.get('/learning-paths/purchases', ).then(response => {
    if (response.status == 200) {
      return response.data;
    }
    else {
      return [];
    }
  }).catch(error => {
    console.error('Error al obtener learning paths comprados:', error);
    return [];
  });

}

function purchaseLearningPath(learningPathId: string) {
  
  instance.post(`/learning-paths/${learningPathId}/purchase`)
  .then(response => {
  if(response.status == 201){
    setTimeout(() => {
      // window.location.href = "/mycourses"; // Redirigir a MyCourses después de 2 segundos para ver los cursos comprados
      // TODO: definir la ruta a la que se redirige
      window.location.reload();
    }, 2000);
  }
  else{
    console.error('Error al comprar el curso:');
  }
  })
  .catch(error => {
    console.error('Error al comprar el curso:', error);
  });
}

function updateUser(firstName: string, lastName: string, birthDate: dayjs.Dayjs | null, interests: any ) {
  let payload = {
    firstName: firstName,
    lastName: lastName,
    birthDate: birthDate?.toISOString(),
    interests: interests
  };
  instance.post(`/users/update/profile`, payload)
  .then(response => {
  if(response.status == 201){
    window.location.href = `/`;
  }
  else{
    console.error('Error al editar el usuario:');
  }
  })
  .catch(error => {
    console.error('Error al editar el usuario:', error);
  });
}

function getPurchases() {
  return instance.get(`/purchases`, ).then(response => {
    if (response.status == 200) {
      return response.data;
    }
    else {
      return [];
    }
  }).catch(error => {

    console.error('Error al obtener los examenes:', error);
    return [];
  });
}


