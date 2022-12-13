document.getElementById("ok").onclick = function(){
    let raio = document.formulario.raio.value;

    let area = document.getElementById("area");
    let calcArea = Math.PI * (raio**2);
    area.setAttribute('value', calcArea.toFixed(2));

    let circunf = document.getElementById("circunf");
    let calcCirc = Math.PI * 2 * raio;
    circunf.setAttribute('value', calcCirc.toFixed(2));
}