document.addEventListener("DOMContentLoaded", () => {
    iniciarApp();
});

function iniciarApp() {
    
const params = new URLSearchParams(window.location.search);
const token = params.get('token')

enviar(token)
}

async function enviar(token){
    const url="/api/register/confirm?token="+token
    try{

    
    const response = await fetch(url, {
        method: 'get',
    })
    const r = await response.json()

    if(r==true){

        Swal.fire({
            icon: 'success',
            title: '¡verificado!',
            text: 'ya estas verificado',
            confirmButtonText: 'Continuar'
        }).then(() => {
            window.location.href = '/'
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: r,
          
        })
    }}catch(error){
        Swal.fire({
            icon: 'error',
            title: "error con el servidor",  
        })
    }


}