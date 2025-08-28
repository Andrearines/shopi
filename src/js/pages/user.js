document.addEventListener("DOMContentLoaded", () => {
    iniciarApp();
});

function iniciarApp() {
   Isauth()
   const cerrar_seccion = document.querySelector("#cerrar-seccion") 
   cerrar_seccion.addEventListener("click",()=>{
    
   })
}
async function Isauth(){
const url="/api/Isauth";
const r = await fetch(url, { credentials: "include" });
const  result = await r.json()
 if(!result.ok){
    window.location.href = "/";
 }else{
    UserActivation(result.ok)
    
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
    const foto = document.createElement("img")
    const menu = document.createElement("img")
    const foto_avatar = document.querySelector("#avatar")
    const nombreP =document.createElement("p");
    
    nombreP.textContent= nombre
    menu.src = "/build/imagenes/icons/menu.png"
    menu.alt = "menu"
    menu.classList.add("menu")
    menu.id="menu"
    menu.style.width = "58px"
    menu.style.height = "58px"
  
    menu.style.objectFit = "cover"
    menu.style.cursor= "pointer"
    menu.onclick = () => {
        window.location.href = "/home";
    }

    avatar.src = "/imagenes/users/"+img
    avatar.alt = nombre
    avatar.classList.add("avatar")
    avatar.id="avatar"
    
    avatar.style.width = "8rem"
    avatar.style.height = "8rem"
    avatar.style.borderRadius = "50%"
    avatar.style.objectFit = "cover"
 
    foto.src = "/imagenes/users/"+img
    foto.alt = nombre
    foto.classList.add("avatar")
    foto.id="avatar-foto"

    foto.style.width = "35rem"
    foto.style.height = "35rem"
    foto.style.borderRadius = "50%"
    foto.style.objectFit = "cover"
 
    
    foto_avatar.appendChild(foto)
    foto_avatar.appendChild(nombreP)
    barUser.appendChild(avatar)
    barUser.appendChild(menu)

      if(tienda_id==="" || tienda_id===null){

        const store = document.querySelector("#setting-store")
        const imgT = document.querySelector("img") 
        const texto = document.createElement("p")
        texto.textContent = "Aún no tienes una tienda. ¿Listo para empezar a vender?"
        imgT.src = "/build/imagenes/tienda.png"
        imgT.style.margin= "auto"
        imgT.style.width= "40%"
        texto.style.textAlign="center"
        const btn = document.createElement("a")
        btn.href = "/tineda/crear"
        btn.classList.add("boton")
        btn.textContent = "Crear tienda"
        btn.style.display="block"
        
        store.appendChild(imgT)
        store.appendChild(texto)
        store.appendChild(btn)

       
    }

}