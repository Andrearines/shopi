document.addEventListener("DOMContentLoaded", () => {
    iniciarApp();
});

function iniciarApp() {
   Isauth()
}
async function Isauth(){
const url="/api/Isauth";
const r = await fetch(url, { credentials: "include" });
const  result = await r.json()
 if(!result.ok){
    window.location.href = "/";
 }else{
    categories()
    form()
 }
}

function form(){
    const form = document.querySelector("#form")
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const formData = new FormData(form)
        const url = "/api/stores/create"
        const r = await fetch(url, {
            method: "POST",
            body: formData
        })
        const result = await r.json()
        if(result.ok){
            notify('tienda creada', 'tienda creada', 'success', 2000);
            window.location.href = "/user";
        }else{
            notify('error', result.error.join(", "), 'error', 2000);
        }
    })
}
async function categories(){
    const url="/api/stores/categories";
    const r = await fetch(url, { credentials: "include" });
    const  result = await r.json()
    if(result.ok===false){
        notify('cierra session', 'no es valida tu session', 'error', 2000);
      
    }else{
        const select = document.querySelector("#categoria_id")
        select.innerHTML = ""
        result.forEach(category => {
            const option = document.createElement("option")
            option.value = category.id
            option.textContent = category.nombre
            select.appendChild(option)
        })
    }
    
}
