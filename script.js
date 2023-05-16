var name = prompt("Enter your name: ");
alert("Hello " + name + ", welcome to my profile!");
function changeColor() {
    var color = document.getElementsByClassName("colored");

    if (color[0].style.backgroundColor == "orange") {
        for (var i = 0; i < color.length; i++) {
            color[i].style.backgroundColor = "";
        }
    } else {
        for (var i = 0; i < color.length; i++) {
            color[i].style.backgroundColor = "orange";
        }
    }
}