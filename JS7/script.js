document.addEventListener("mousemove", function(event) {
    if(document.body.childElementCount <= 8){
        let dot = document.createElement("div");
        dot.className = "dot";
        dot.style.left = (event.pageX - 8) + "px";
        dot.style.top = (event.pageY - 8) + "px";
        document.body.appendChild(dot);
        setTimeout(remover,100);

        function remover(){
            document.body.removeChild(dot);
        }
    }
});