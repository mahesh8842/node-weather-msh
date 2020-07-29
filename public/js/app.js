

const weatherForm = document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#one')
const messagetwo=document.querySelector('#two')

// messageOne.textContent=''

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const location =search.value
    messageOne.textContent='Getting Weather Info..'
    messagetwo.textContent=''

    fetch('/weather?address=' +location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=data.error
            // console.log(data.error)
        }else{
            messageOne.textContent=data.location
            messagetwo.textContent=data.forecast
            // console.log(data.location)
            // console.log(data.forecast)
            const url=data.icon[0]
            document.getElementById("weather").src = url;
            // console.log(data.icon[0])
        }
    })
})
})