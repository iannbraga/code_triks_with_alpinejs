function converterTemperatura(tipo) {
    let celsius = document.getElementById('celsius').value;
    let fahrenheit = document.getElementById('fahrenheit').value;
    let resultado = '';

    if (tipo === 'celsius' && celsius !== '') {
        // Converter Celsius para Fahrenheit
        fahrenheit = (parseFloat(celsius) * 9/5) + 32;
        document.getElementById('fahrenheit').value = fahrenheit.toFixed(2);
        resultado = `${celsius}°C é igual a ${fahrenheit.toFixed(2)}°F`;
    } else if (tipo === 'fahrenheit' && fahrenheit !== '') {
        // Converter Fahrenheit para Celsius
        celsius = (parseFloat(fahrenheit) - 32) * 5/9;
        document.getElementById('celsius').value = celsius.toFixed(2);
        resultado = `${fahrenheit}°F é igual a ${celsius.toFixed(2)}°C`;
    }

    document.getElementById('resultado').textContent = resultado;
}
