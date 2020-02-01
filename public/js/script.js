const weatherForm = document.querySelector("form")
const locationInput = document.querySelector("input")
const error = document.querySelector("#location")
const forecast = document.querySelector("#forecast")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    error.textContent = ""
    forecast.textContent = ""

    const locationVal = locationInput.value
    error.textContent = "Loading................"

    fetch('http://localhost:3000/weather?location=' + locationVal).then( (response) => {
    response.json().then( (data) => {
            if(data.error){
                error.textContent = data.error
            } else {
                error.textContent = locationVal
                forecast.textContent = "The weather is " + data.forecast.summary
            }
        })
    })
})
