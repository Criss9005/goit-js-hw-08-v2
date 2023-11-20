import axios from "axios";
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css'

axios.defaults.headers.common["x-api-key"] = "live_cm4VvcL13mJC0Z6PXYsVqPJ4kugv341iWtwgFhjXECmiBHMq4nTNEzrGgpELYQ3V";
let selectList = document.querySelector('.breed-select')
const container = document.querySelector('.cat-info')
const loader = document.querySelector('.loader')
const fail = document.querySelector('.error')

export let names = {}

fetchBreeds()

function fetchBreeds() { 
axios.get('https://api.thecatapi.com/v1/breeds')
    .then(function (response) {
      
      // manejar respuesta exitosa
      names = response.data.map(item => ({ name: item.name, id: item.id, description: item.description, temperament: item.temperament }))
      names.forEach(element => {
      selectList.innerHTML +=`<option value=${element.id}>${element.name}</option>`
      }); 
          new SlimSelect({
          select: '.breed-select'
          })
        fail.style.display = 'none' 
  })
  .catch(function (error) {
      // manejar error
      Notiflix.Notify.failure('Fallo al procesar la Solicitud, Por favor verificar API');
      loader.style.display = 'flex'
      fail.style.display = 'flex'    
  })
}



function fetchCatByBreed(breedId) { 

    axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
  .then(function (response) {
      // manejar respuesta exitosa
      names.forEach( cat => {
     if (cat.id == breedId) {
         container.innerHTML = ` <img src=${response.data[0].url} alt="${cat.name} cat photo" width="300px" heigth="300px">
                                 <div class="text-container">
                                 <h1 class:"cat__title">${cat.name}</h1>
                                 <p style="text-align: justify">${cat.description}
                                 <h3 class:"cat__temperament">Temperament: </h3>${cat.temperament}</div>`
                                
     }

        loader.style.display = 'none' 
        fail.style.display = 'none' 
});
  })
  .catch(function (error) {
    // manejar error
      Notiflix.Notify.failure('Fallo al procesar la Solicitud, Por favor verificar Raza');
      loader.style.display = 'flex'
      fail.style.display = 'flex' 
  })
} 


selectList.addEventListener('change', (e) => { 
    //e.target.value aca tengo el id
    fetchCatByBreed(e.target.value)
        
})
