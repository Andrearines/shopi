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
    buscador()
 }
}

function buscador(){
const input = document.getElementById('search-store');
let tiendas_container = document.getElementById('store-container');

input.addEventListener('input',async () => {
    const valor = input.value.trim();
    if (valor.length === 0 || valor===null) {
        tiendas()
    }else{
        const url="/api/stores/search?search="+valor;
        const r = await fetch(url, { credentials: "include" });
        const  result = await r.json()    
            if(result.ok === false){
                notify('Sesión expirada', 'Inicia sesión nuevamente', 'error', 2000);
                window.location.href = "/";
            }else if(result.stores && result.stores.length === 0){
                tiendas_container.innerHTML = '';
                tiendas_container.innerHTML = '<p>No existe esa tienda</p>';
                notify('Búsqueda sin resultados', 'No existe esa tienda', 'error', 2000);
            }else if(result.stores){
              tiendas_container.innerHTML = '';
                result.stores.forEach(store => {
                    const storeElement = document.createElement('div');
                    storeElement.classList.add('store-card');
                    storeElement.innerHTML = `
                        <img src="/imagenes/stores/${store.img}" alt="${store.nombre}">
                        <h2>${store.nombre}</h2>
                        <p>${store.descripcion}</p>
                        <a href="/store/${store.id}" class="boton-azul">Ver tienda</a>
                    `;
                    tiendas_container.appendChild(storeElement);
                });
            }
        

    }})
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
     menu.style.cursor= "pointer"
    menu.onclick = () => {
        window.location.href = "/user";
    }

    avatar.src = "/imagenes/users/"+img
    avatar.alt = nombre
    avatar.classList.add("avatar")
    avatar.id="avatar"
    
    avatar.style.width = "8rem"
    avatar.style.height = "8rem"
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
      
    }else if(!result || result==[]){
        tiendas_container.innerHTML = '';
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
        const tiendas_container = document.querySelector("#store-container");
        tiendas_container.innerHTML = '';
                result.forEach(store => {
                    const storeElement = document.createElement('div');
                    storeElement.classList.add('store-card');
                    storeElement.innerHTML = `
                        <img src="/imagenes/stores/${store.img}" alt="${store.nombre}">
                        <h2>${store.nombre}</h2>
                        <p>${store.descripcion}</p>
                        <a href="/store?id=${store.id}" class="boton-azul">Ver tienda</a>
                    `;
                    tiendas_container.appendChild(storeElement);
        });
    }
    
}
