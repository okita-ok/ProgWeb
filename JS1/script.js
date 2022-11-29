document.writeln("<div class=container>");

for(let x=1; x<11; x++){
    document.writeln("<div class=item>");

    document.writeln("<table border=1>");

    document.writeln("<thead>");
    document.writeln("<tr><th colspan=2>Produtos de " + x + "</th></tr>");
    document.writeln("</thead>");

    document.writeln("<tbody>");

    //linha
    for(let y=1; y<11; y++){
        document.writeln("<tr>");

        document.writeln("<td>" + x + " x " + y + "</td>");
        document.writeln("<td>" + x*y + "</td>");

        document.writeln("</tr>");
    }

    document.writeln("</tbody>");

    document.writeln("</table>");

    document.writeln("</div>");
}

document.writeln("</div>");
