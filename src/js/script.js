//atualiza a pagina ao selecionar em buscar, prevenir esse comportamento padrao do formulario
//evento de submit

document.querySelector('#search').addEventListener('submit', async(event) => {
    event.preventDefault();

    //pegar o valor do input
    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        document.querySelector("#weather").classList.remove('show');

        showAlert('Você precisa informar uma cidade...');
        return;
    }

    const apiKey = '47bbd044974c18a9272076b681d2210f';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    //chamada da API
    const results = await fetch(apiUrl);
    const json = await results.json();

    //console.log(json)

    if (json.cod === 200) {
        //função que muda cor de fundo
        colorBackground(json.main.temp);

        //recebendo as informçaçoes da api
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    } else {
        document.querySelector("#weather").classList.remove('show');
        showAlert(`
        Não foi possível localizar...

        <img src="src/images/404.svg"/>
        `);
    }
});

function showInfo(json) {
    showAlert('');

    //mostrar as informações
    document.querySelector("#weather").classList.add('show');

    document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`;
    //toFixed(1) -> 1 casa decimal
    //toString().replace('.', ',') -> converte em string e troca . por ,
    document.querySelector("#temp_value").innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;

    document.querySelector("#temp_description").innerHTML = `${json.description}`;

    document.querySelector("#temp_img").setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector("#temp_max").innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector("#temp_min").innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;

    document.querySelector("#humidity").innerHTML = `${json.humidity}`;
    document.querySelector("#wind").innerHTML = `${json.windSpeed.toFixed(1)}km/h`;

}

function showAlert(msg) {
    //vai mandar o alerta na pagina
    document.querySelector('#alert').innerHTML = msg;
}

function colorBackground(temp){
    const tempElement = document.querySelector('#temp');
    tempElement.style.background = temp > 25 
        ? 'linear-gradient(#f0b26b, #f58c62)' 
        : 'linear-gradient(#3b82f6, #4a7dff)';

    //mudando cor de fundo, se for maior que 25°C fundo fica tom laranjado, senao fica azulado
    document.body.style.background = temp > 25 ? 'linear-gradient(#f0b26b, #f58c62)' : 'linear-gradient(#3b82f6, #4a7dff)';
}