import axios from "axios";
import SlimSelect from 'slim-select'

axios.defaults.headers.common["x-api-key"] = "live_cm4VvcL13mJC0Z6PXYsVqPJ4kugv341iWtwgFhjXECmiBHMq4nTNEzrGgpELYQ3V";
const select1 = document.querySelector('.breed-select')
const container = document.querySelector('.cat-info')
export let names = {}

new SlimSelect({
  select: '.breed-select'
})


function fetchBreeds() { 
    
axios.get('https://api.thecatapi.com/v1/breeds')
  .then(function (response) {
      // manejar respuesta exitosa
      console.log(response.data)
      names = response.data.map(item => ({ name: item.name, id: item.id, description: item.description, temperament: item.temperament }))
      //console.log(names);
      names.forEach(element => {
      select1.innerHTML +=`<option value=${element.id}>${element.name}</option>`
    
      }); 
     
  })
  .catch(function (error) {
    // manejar error
      console.log(error);
    console.log('error');
      
  })
  .finally(function () {
    // siempre sera executado
  });

}

fetchBreeds()

function fetchCatByBreed(breedId) { 

    axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
  .then(function (response) {
      // manejar respuesta exitosa
      console.log(response)
      console.log(response.data[0].url)
      names.forEach( cat => {
     if (cat.id == breedId) {
         container.innerHTML = ` <img src=${response.data[0].url} alt="${cat.name} cat photo" width="300px" heigth="300px">
                                 <div class="text-container">
                                 <h1 class:"cat__title">${cat.name}</h1>
                                 <p style="text-align: justify">${cat.description}
                                 <h3 class:"cat__temperament">Temperament: </h3>${cat.temperament}</div>`
                                
     }


});
  })
  .catch(function (error) {
    // manejar error
      console.log(error);
    console.log('error');
      
  })
  .finally(function () {
    // siempre sera executado
  });

} 


select1.addEventListener('change', (e) => { 
    //e.target.value aca tengo el id
    fetchCatByBreed(e.target.value)
        
})
