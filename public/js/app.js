const form = document.querySelector(".form")
const input = document.querySelector(".input")
const submit = document.querySelector('.submit')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
form.addEventListener('submit', (e) =>{
    e.preventDefault()
    let localizacao = input.value
    if (localizacao===''){
        messageOne.textContent = 'Insira um endereço'
        return messageTwo.textContent = ''
    }
    messageOne.textContent = 'Carregando previsão do tempo'
    messageTwo.textContent = ''
    fetch('/weather?address=' + encodeURIComponent(localizacao)).then( (response) =>{
    response.json().then( (data ) =>{
        if (data.error){
            return messageOne.textContent = data.error
        }
        messageOne.textContent = data.forecast 
        messageTwo.textContent = data.location
    })
})
})


