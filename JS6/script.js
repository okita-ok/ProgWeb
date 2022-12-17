document.getElementById("enter").onclick = function(){
    let h1 = document.formulario.h1.value;
    let h2 = document.formulario.h2.value;
    let h3 = document.formulario.h3.value;
    let h4 = document.formulario.h4.value;
    let h5 = document.formulario.h5.value;
    let larg = document.formulario.barwidth.value;

    let d1 = document.getElementById("d1");
    d1.style.height = h1 + "px";
    d1.style.width = larg + "px";

    let d2 = document.getElementById("d2");
    d2.style.height = h2 + "px";
    d2.style.width = larg + "px";

    let d3 = document.getElementById("d3");
    d3.style.height = h3 + "px";
    d3.style.width = larg + "px";

    let d4 = document.getElementById("d4");
    d4.style.height = h4 + "px";
    d4.style.width = larg + "px";

    let d5 = document.getElementById("d5");
    d5.style.height = h5 + "px";
    d5.style.width = larg + "px";
}