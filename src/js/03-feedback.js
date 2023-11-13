import throttle from 'lodash.throttle'
const form = document.querySelector('.feedback-form')
let stateObject = {}
const key = {
    email : "",
    message: ""
}

form.addEventListener('input', throttle(() => {
    key.email = form.elements.email.value
    key.message = form.elements.message.value
    const keyString = JSON.stringify(key)//convierto en string
    localStorage.setItem('feedback-form-state', keyString)
}),500)

const currenState = localStorage.getItem("feedback-form-state")
if (currenState != null) { 
    stateObject = JSON.parse(currenState)//convierto el string en objeto
    form.elements.message.value = stateObject.message
    form.elements.email.value = stateObject.email
    //console.log(stateObject)
        
}
 

form.addEventListener('submit', (e) => {
    e.preventDefault()
    form.elements.email.value=''
    form.elements.message.value = ''
    localStorage.removeItem('feedback-form-state')
    console.log(stateObject)
    
    
 })