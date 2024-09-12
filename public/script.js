let menuVisible = false

//Funcion que oculta o muestra el menu
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible=false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible=true;
    }
}

function seleccionar(){
    //Ocultar el menu una vez selecciono una sección
    document.getElementById("nav").classList ="";
        menuVisible=false;
}

//Función que aplica las animaciones de las skills
function efectoSkills(){
    var skills = document.getElementById("skills");
    var distanciaSkills = window.innerHeight - skills.getBoundingClientRect().top;
    if(distanciaSkills >= 300){
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("java");
        habilidades[1].classList.add("spring");
        habilidades[2].classList.add("hibernate");
        habilidades[3].classList.add("maven");
        habilidades[4].classList.add("angular");
        habilidades[5].classList.add("typescript");
        habilidades[6].classList.add("htmlcss");
        habilidades[7].classList.add("sql");
        habilidades[8].classList.add("mongodb");
        habilidades[9].classList.add("github");
        habilidades[10].classList.add("trabajoequipo");
        habilidades[11].classList.add("comunicacion");
        habilidades[12].classList.add("organizacionpuntualidad");
        habilidades[13].classList.add("responsabilidad");
        habilidades[14].classList.add("autoaprendizaje");
        habilidades[15].classList.add("creatividad");
        habilidades[16].classList.add("dedicacion");
        habilidades[17].classList.add("liderazgo");
    }
}

//Detecto el scrolling para aplicar la animación de las barras de skills
window.onscroll = function(){
    efectoSkills();
}

//Enviar mensaje
document.addEventListener('DOMContentLoaded', () => {
    const sendMessageButton = document.getElementById('sendMessageButton');

    sendMessageButton.addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    phone,
                    email,
                    subject,
                    message
                })
            });

            if (response.ok) {
                alert('Correo enviado correctamente');
                window.location.reload();
            } else {
                const result = await response.json();
                alert(`Error: ${result.error || 'Error al enviar el correo'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al enviar el correo');
        }
    });
});

const modal = document.getElementById('videoModal');
const openModalButton = document.getElementById('openModalButton');
const closeButton = document.querySelector('.close-button');

// Abrir el modal
openModalButton.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Cerrar el modal
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar el modal si el usuario hace clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});