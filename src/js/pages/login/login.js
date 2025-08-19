document.addEventListener("DOMContentLoaded", () => {
    iniciarApp();
});

function iniciarApp() {
   form()
}
function form(){
    const form= document.querySelector("#form")
    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        
      
        if( !e.target.email.value || 
            !e.target.password.value 
        ){
            showError("Complete los datos","Todo es obligatorio")
            return
        }else{
            enviar()
        }
    })
    }
    
    async function enviar(){
        try {
            // Crear FormData con el formulario
            const formData = new FormData(document.querySelector("#form"))
            
            // Mostrar loading
            Swal.fire({
                title: 'Registrando...',
                text: 'Por favor espera',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                }
            })
            
            // Enviar datos al servidor
            const response = await fetch('/api/register/login', {
                method: 'POST',
                credentials:"include" ,
                body: formData  
            })
    
            let result 
                result = await response.json()
            if(result.ok) {
              
                Swal.fire({
                    icon: 'success',
                    title: '¡bienvenido!',
                    text: 'hola de nuevo',
                    confirmButtonText: 'Continuar'
                }).then(() => {
                    window.location.href = '/home'
                })
            } else {
                Swal.fire({ 
                    icon: 'error',
                    title: result.error,
                 
                })
            }
            
        } catch (error) {
          console.log(error) 
            Swal.fire({
                icon: 'error',
                title: 'Error de conexión',
                text: 'No se pudo conectar con el servidor'
            })
        }
    }