document.addEventListener("DOMContentLoaded",()=>{
    form()
})

function form(){
    const url = new URL(window.location.href)
    const token =url.searchParams.get("token")
    if(!token){
        showError('Error', 'token no valido');
    }
    const pass = document.querySelector("#form")
    pass.addEventListener("submit",(e)=>{
        e.preventDefault()

        if(!e.target.password.value){

            showError('Error', 'ponga la pass');
        }else{
            const data = new FormData(document.querySelector("#form"))
            enviar(data)
        }
    })
}

async function enviar(data){
    try{
        
        const url="/api/register/forget/reset"

        const r = await fetch(url,{
            method:"POST",
            body: data,
        })
        
        const info = await r.json()
        
        if(info==true){
            notify('cambio exitoso', 'se cambio la contraseña', 'success', 2000);
            window.location.href = "/";
        }else{
        notify('varifique', info.error.join(" ,"), 'error', 2000);}
    }catch(error){
        showError("error","error con el servidor")
    }
}