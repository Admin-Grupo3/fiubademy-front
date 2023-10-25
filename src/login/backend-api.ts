import axios from 'axios';
export { signup, signin, getCategories, createCourse, logOut, editCourse };
//const url = 'http://localhost:3300';

const instance = axios.create({
  baseURL: 'http://localhost:3300',
  withCredentials: true,
});

function convertToISO6391(language: string): string | null {
  const languageMap: { [key: string]: string } = {
    'English': 'en',
    'Spanish': 'es'
    // Agregar más mapeos según sea necesario
  };

  return languageMap[language] || null;
}

// Replace with your desired payload

function signup(email: any, password: any, setSigninFailed: any){
    let payload = {
        email: email,
        password: password,
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

function createCourse(title: any, language: any, categoryIds: any) {
  let payload = {
    title: title,
    language: convertToISO6391(language),
    categoryIds: categoryIds
  };
  //instance.post(`/courses`, payload)
  //.then(response => {
  // if(response.status == 201){
  //   window.location.href = "/";
  // }
  // else{
  //   console.error('Error al crear el curso:');
  // }
  // })
  // .catch(error => {
  //   console.error('Error al crear el curso:', error);
  // });
}

function editCourse(title: any, language: any, categoryIds: any) {
  let payload = {
    title: title,
    language: convertToISO6391(language),
    categoryIds: categoryIds
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

