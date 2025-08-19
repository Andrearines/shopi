
document.addEventListener("DOMContentLoaded", () => {
    iniciarApp();
});

function iniciarApp() {
form()
}
function form(){
    const form = document.querySelector("#form")
    form.addEventListener("submit" ,(e)=>{
        e.preventDefault()
        if(!e.target.email.value){

            showError('Error', 'ponga el email');

        }else{
            const data = new FormData(document.querySelector("#form"))
            enviar(data)
        }
    })
}

async function enviar(data){
   try{

        Swal.fire({
            title: 'revisando',
            text: 'Por favor espera',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        })

        const url="/api/register/forget"
        const r= await fetch(url,{
            method:"POST",
            body:data
        })
      
        const info = await r.json();

if(info.ok){
    notify('enviado', 'revise su correo', 'success', 2000);
} else if(info.error){  // ✅ si hay errores
    notify('error', info.error.join(", "), 'error', 2000);
} else {
    notify('contactar a soporte', "Ocurrió un error desconocido", 'error', 2000);
}

    }catch(error){ 
        showError("error","error con el servidor")
    }
    
    

}