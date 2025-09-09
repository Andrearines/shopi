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
    storeActivate()
    userActivation(r)
 }
}




async function storeActivate(){

    const idT = new URLSearchParams(window.location.search).get("id");
if(!idT){
    window.location.href = "/home";
    return
}
     const data= await fetch("/api/stores/find?id="+idT, { credentials: "include" });
     const result = await data.json()

     if(result.ok==false){
        window.location.href = "/home";
     }
    
    const{id, nombre, descripcion, categoria_id, estado, fecha_creacion,img,banner}=result

    const barStore = document.querySelector("#logo-stores");
    const logo = document.createElement("img")
    const textologo = document.createElement("h1")
    logo.src = "/imagenes/stores/"+img
    logo.alt = "logo"
    logo.classList.add("logo")
    logo.id="logo"
  
     logo.style.cursor= "pointer"
    logo.onclick = () => {
        window.location.href = "/user";
    }
 
    textologo.textContent = nombre
    textologo.classList.add("textologo")
    textologo.id="textologo"
 
    textologo.style.objectFit = "cover"
     textologo.style.cursor= "pointer"
    textologo.onclick = () => {
        window.location.href = "/store";
    }
 
    barStore.appendChild(logo)
    barStore.appendChild(textologo)

    const bannerC = document.querySelector("#banner")
    bannerC.src = "/imagenes/stores/"+banner
    bannerC.alt = "banner"
    bannerC.classList.add("banner")
    bannerC.id="banner"
 
    productos()

}

async function productos(){
    const urlId = new URLSearchParams(window.location.search);
    const id = urlId.get("id");
    const url="/api/stores/productos?id="+id;
    
    const r = await fetch(url, { credentials: "include" });
    const  result = await r.json()
    
    if(result.ok===false){
        notify('cierra session', 'no es valida tu session', 'error', 2000);
      
    }else{
        if(result.length===0){
            notify('no hay productos', 'no hay nada', 'info', 5000);
        }
           
        }

       
        const container_C   = document.querySelector("#store-products")
        container_C.innerHTML = ""
        result.forEach(producto => {
            const container = document.createElement("div")
            container.classList.add("Product-card")
            const img = document.createElement("img")
            const nombre = document.createElement("p")
            const precio = document.createElement("p")
            const btn = document.createElement("button")
           

            img.src = "/imagenes/productos/"+producto.imagen_url
            img.alt = producto.nombre
            img.classList.add("img")
            img.id="img"

            nombre.textContent = producto.nombre
            nombre.classList.add("nombre")
            nombre.id="nombre"

            precio.textContent = "$" + producto.precio
            precio.classList.add("precio")
            precio.id="precio"

       

            container_C.appendChild(container)
            container.appendChild(img)
            container.appendChild(nombre)
            container.appendChild(precio)
            container.appendChild(btn)

            btn.textContent = "ver"
            btn.classList.add("boton")
            btn.id="btn"

            btn.addEventListener("click", () => {
                ver(producto.id ,result)
            })
         
        })
    }

    function ver (id, result){
        const isExist = result.find(product => product.id === id);
        if (!isExist) {
            notify('ver producto', 'no existe ese producto', 'error', 2000);
            return;
        }else{
           modalC(isExist)
        }
       
    }

    async function modalC(producto){
        const urlTallas="/api/stores/tallasP?id="+producto.id;
        const rTallas = await fetch(urlTallas, { credentials: "include" });
        const  resultTallas = await rTallas.json()
        const url = "/api/stores/productos/categories";
        const r = await fetch(url, { credentials: "include" });
        const categorias = await r.json();

        const {id, nombre, precio, descripcion_larga, categoria_producto_id, imagen_url, created_at, updated_at}= producto;
        const categoria=buscar(categorias,categoria_producto_id)
     
        const modal = document.createElement("div")
        modal.classList.add("modal")
        modal.id="modalC"
        modal.innerHTML = `

        <div class="modal-content">
        <div class="modal-img">
        <img src="/imagenes/productos/${imagen_url}" alt="${nombre}">
        </div>

        <div class="modal-info">
        <h3>${nombre}</h3>
        <p>descripcion: ${descripcion_larga}</p>
        
        <p>categoria: ${categoria}</p>
        <table>
            <thead>
                <tr>
                    <th>disponible</th>
                    <th>precio</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            ${resultTallas.map(talla => `
                <tr>
                    <td>${talla.cantidad}</td>
                    <td>$${parseFloat(talla.precio_unitario).toFixed(2)}</td>
                    <td>
                    ${talla.cantidad>0 ? `<button class="boton" id="añadir">Agregar al carrito</button>` : `<button class="boton-rojo">No disponible</button>`}
                        
                    </td>
                </tr>
            `).join('')}
            </tbody>
        </table>
    
        <button class="boton-rojo close">cerrar</button>
        </div>

        </div>

        `
    
        document.body.appendChild(modal)

        const cancel = document.querySelector(".close")
        cancel.addEventListener("click", () => {
            modal.remove()
        })
        

    }


function buscar(categorias,id){
        
        const buscado = categorias.find(item => item.id === id);
        if (buscado) {
           
            return buscado.nombre;
        } else {
            console.warn(`No se encontró categoría con id=${id}`);
            return "Desconocido";
        }
    }
    
   
    
    

async function userActivation(){ 
    const data= await fetch("/api/user", { credentials: "include" });
    const result = await data.json()
    userSttings(result)
 
}

function userSttings(result){

    const {id, nombre, email, password, confirmado, 
    tienda_id, token, moderador, saldo, created_at, updated_at, img}= result

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
}
