let btn_array = document.querySelectorAll('#btn');

for (let i=0; i < btn_array.length; i++) { 
    btn_array[i].addEventListener('click', toggleInfo);
}

function toggleInfo(){
    console.log(event);
    console.log(event.target);
    let content = event.target.nextElementSibling
    console.log(content)
    if (content.style.display === "block"){
        content.style.display = "none";
    } else{
        content.style.display = "block";
    }
}

// info.addEventListener('click', hideInfo);

// function hideInfo(){
//     // content.style.display ="none";
// }
