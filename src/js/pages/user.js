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

       
    }else{
        tienda(tienda_id)
    }
}

async function tienda(tienda_id){

    const data = await fetch("/api/stores/find?id="+tienda_id, { credentials: "include" });
    const result = await data.json();
    const {id, nombre, descripcion, categoria_id, estado, fecha_creacion,img,banner}= result

    const store = document.querySelector("#setting-store")
    store.classList.add("store-user")
    const estadoContainer = document.createElement("div")
    estadoContainer.classList.add("estado-container")
    const imgT = document.createElement("img") 
    const texto = document.createElement("p")
    const estadoT = document.createElement("p")
    const fechaT = document.createElement("p")

    const btn = document.createElement("a")
   estadoT.textContent = "Estado: " + estado
   estadoT.style.margin= "auto"
   estadoT.style.fontSize="1.5rem"
   estadoT.style.fontWeight="bold"
   
   fechaT.textContent = "Fecha de creacion: " + fecha_creacion
   fechaT.style.margin= "auto"
   fechaT.style.fontSize="1.5rem"
   
    imgT.src = "/imagenes/stores/"+img
    imgT.alt = nombre
    imgT.style.margin= "auto"
    imgT.style.width= "20rem"
    imgT.style.height= "20rem"
    imgT.style.borderRadius = "50%"
    imgT.style.objectFit = "cover"
    btn.href = "/tienda/view?id="+id
    btn.classList.add("boton")
    btn.textContent = "Ver tienda"
    btn.style.display="block"
    
    store.appendChild(imgT)
    store.appendChild(texto)
    estadoContainer.appendChild(estadoT)
    estadoContainer.appendChild(fechaT)
    store.appendChild(estadoContainer)
    store.appendChild(btn)

}