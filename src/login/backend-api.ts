import axios from 'axios';

export { signup, signin, getCategories, getCourses, createCourse, logOut, editCourse, createExam, purchaseCourse, getPurchaseCourses, getExams, sendExam , createLearningPath, getLearningPaths, getUserProfile};

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
        // firstName: name,
        // lastName: last_name
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

function createCourse(title: any, language: any, categoryIds: any, description: any, price: any) {
  let payload = {
    title: title,
    language: convertToISO6391(language),
    categoryIds: categoryIds, 
    description: description,
    price: price
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
  console.log("createExam");
  console.log(title);
  console.log(questions);
  const payload = {
    name: title,
    description: "description",
    questions: questions,
  }
  console.log(payload)
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
function editCourse(courseId: string | undefined, title: any, language: any, categoryIds: any, description: any, price: any) {
  let payload = {
    title: title,
    language: convertToISO6391(language),
    categoryIds: categoryIds,
    description: description,
    price: price
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

function getUserProfile(): Promise<any> {
  return instance.get('/users/profile').then(response => {
    console.log(response.data)
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
      console.log(response.data);

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
  console.log("sendExam");
  console.log(answers);
  const payload = {
    answers: answers,
  }
  return instance.post(`users/course/${courseId}/exams/${examId}`, payload)
  .then(response => {
    if(response.status == 201){
      console.log(response.data);
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

function getLearningPaths(): Promise<any> {
  return instance.get('/learning-paths', ).then(response => {
    if (response.status == 200) {
      console.log("DATA");
      console.log(response.data);
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