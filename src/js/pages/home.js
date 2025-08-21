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
    UserActivation(result.ok)
    tiendas()
 }
}
async function UserActivation(id){
    const url="/api/user";
    const r = await fetch(url, { credentials: "include" });
    const  result = await r.json()
    
    userSttings(result)
 
}
function userSttings(result){
    const {id, nombre, email, password, confirmado, 
    tienda_id, token, moderador, saldo, created_at, updated_at, img}= result

    const welcome = document.querySelector("#name")
    const barUser = document.querySelector("#bar-user");
    const avatar = document.createElement("img")
    const menu = document.createElement("img")
    menu.src = "/build/imagenes/icons/menu.png"
    menu.alt = "menu"
    menu.classList.add("menu")
    menu.id="menu"
    menu.style.width = "58px"
    menu.style.height = "58px"
  
    menu.style.objectFit = "cover"
    menu.onclick = () => {
        window.location.href = "/user";
    }

    avatar.src = "/imagenes/users/"+img
    avatar.alt = nombre
    avatar.classList.add("avatar")
    avatar.id="avatar"
    
    avatar.style.width = "58px"
    avatar.style.height = "58px"
    avatar.style.borderRadius = "50%"
    avatar.style.objectFit = "cover"
 
    
    barUser.appendChild(avatar)
    barUser.appendChild(menu)

    welcome.textContent = "bienvenido: " +nombre
    if(tienda_id==="" || tienda_id===null){

        const store = document.querySelector("#mystore")
        const texto = document.createElement("p")
        texto.textContent = "Aún no tienes una tienda. ¿Listo para empezar a vender?"
        store.appendChild(texto)
        const btn = document.createElement("a")
        btn.href = "/user"
        btn.classList.add("boton")
        btn.textContent = "Crear tienda"
        store.appendChild(btn)
    }
}


async function tiendas(){
    const url="/api/stores";
    const r = await fetch(url, { credentials: "include" });
    const  result = await r.json()
    if(result.ok===false){

        notify('cierra session', 'no es valida tu session', 'error', 2000);
      
    }else if(result.stores.length === 0){
        const store = document.querySelector("#store-container")
        const texto = document.createElement("p")
        texto.textContent = "Aún no hay tiendas todavia. ¿Listo para empezar a vender?"
        store.appendChild(texto)
        const btn = document.createElement("a")
        btn.href = "/user"
        btn.classList.add("boton")
        btn.textContent = "Crear tienda"
        store.appendChild(btn)
    }else {
        
    }
    
}
