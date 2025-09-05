document.addEventListener("DOMContentLoaded", () => {
    iniciarApp();
});
function iniciarApp() {
    
    IsTienda()
    crearbtn()
    productos()

}

function crearbtn(){
    const btn = document.querySelector("#crear_P")
    btn.addEventListener("click", () => {
        modalC()
    })
}

function modalC(){

    if(document.getElementById("modalC")){
        document.getElementById("modalC").remove()
        return
    }

    const modal = document.createElement("div")
    modal.classList.add("modal")
    modal.id="modalC"
    modal.innerHTML = `
    

        <div class="form-c" id="crearF">
            <span class="close">&times;</span>
            <h2>Crear Producto</h2>
            <form class="form" id="form" method="post">
            <div class="form-group">
            <label for="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" placeholder="Nombre">
                <label for="precio">Precio: $</label>
                <input type="text" id="precio" name="precio" placeholder="Precio">
                </div>
                <div class="form-group">
                <label for="descripcion_larga">descripcion</label>
                <input type="text" id="descripcion_larga" name="descripcion_larga" placeholder="descripcion">
                <label for="categoria_id">Categoria</label>
                <select id="categoria_id" name="categoria_id">
                    
                </select>
                <label for="img">Imagen</label>
                <input type="file" id="img" name="img">
                </div>
                <input type="submit" value="Crear" class="boton">
                </form>
                
            
        </div>
    `


    document.body.appendChild(modal)
    const cancel = document.querySelector(".close")
    cancel.addEventListener("click", () => {
        modal.remove()
    })
    const form = document.querySelector("#form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        const data = new FormData(document.querySelector("#form"))
       
        fetch("/api/stores/productos/create", {
            method: "POST",
            body: data,
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            if(data.ok){
                
                modal.remove()
                productos()
                notify('producto', 'creado correctamente(debe añadir tallas)', 'success', 5000);
            }else{
                notify('error',data.error.join(" ,"), 'error', 4000);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            notify('Error', 'intente una imagen mas pequeña o contacte el soporte', 'error', 2000);
        });
    })
    categorias()
}

async function categorias(id){
    const url="/api/stores/productos/categories";
    const r = await fetch(url, { credentials: "include" });
    const  result = await r.json()
    if(result.ok===false){
        notify('cierra session', 'no es valida tu session', 'error', 2000);
        window.location.href = "/home";
      
    }else{
        const select = document.querySelector("#categoria_id")
        select.innerHTML = ""   
       
       
        result.forEach(categoria => {
            if(id){
                if(categoria.id == id){
                    const option = document.createElement("option")
                    option.value = categoria.id
                    option.textContent = categoria.nombre
                    option.selected = true
                    select.appendChild(option)
                }
            }else{
            const option = document.createElement("option")
            option.value = categoria.id
            option.textContent = categoria.nombre
            select.appendChild(option)}
        })
    
    }
}


async function IsTienda(){
const url="/api/stores/IsTienda";
const r = await fetch(url, { credentials: "include" });
const  result = await r.json()
 if(!result || result.ok === false){
    window.location.href = "/";
 }else{
    storeActivate(result)
  userActivation()
  notify('tienda', 'nuestros productos', 'success', 2000);  

 }
}

function storeActivate(result){
    
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
 
}

async function userActivation(){
    const url="/api/user";
    const r = await fetch(url, { credentials: "include" });
    const  result = await r.json()
    
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
            notify('añade un producto', 'no tienes nada', 'info', 5000);
        }
           
        }

       
        const container_C   = document.querySelector("#container_C")
        container_C.innerHTML = ""
        result.forEach(producto => {
            const container = document.createElement("div")
            container.classList.add("store-card")
            const img = document.createElement("img")
            const nombre = document.createElement("p")
            const precio = document.createElement("p")
            const stock = document.createElement("p")
            const btnD = document.createElement("button")
            const btnT = document.createElement("button")
            const btnE = document.createElement("button")

            img.src = "/imagenes/productos/"+producto.imagen_url
            img.alt = producto.nombre
            img.classList.add("img")
            img.id="img"

            nombre.textContent = producto.nombre
            nombre.classList.add("nombre")
            nombre.id="nombre"

            precio.textContent = "precio:$ " + producto.precio
            precio.classList.add("precio")
            precio.id="precio"
            btnD.textContent = "Eliminar"
            btnD.classList.add("boton-eliminar")
            btnD.id="btnD"

            btnE.textContent = "Editar"
            btnE.classList.add("boton")
            btnE.id="btnE"

            btnT.textContent = "Tallas"
            btnT.classList.add("boton")
            btnT.id="btnT"

            container_C.appendChild(container)
            container.appendChild(img)
            container.appendChild(nombre)
            container.appendChild(precio)
            container.appendChild(stock)
            container.appendChild(btnD)
            container.appendChild(btnT)
            container.appendChild(btnE)

            btnD.addEventListener("click", () => {
                eliminar(producto.id)
            })
            btnT.addEventListener("click", () => {
                tallas(producto.id)
            })
            btnE.addEventListener("click", () => {
                editar(producto.id)
            })

        })
    }

    async function eliminar(id){
        const producto = await fetch("/api/stores/productos/delete?id="+id, { credentials: "include" })
        const productoData = await producto.json()
        if(productoData.ok){
            notify('producto', 'eliminado correctamente', 'success', 5000);
           productos()
        }else{
            notify('error',productoData.error.join(" ,"), 'error', 5000);
        }
    }

    async function editar(id){
        
        const producto = await fetch("/api/stores/productos/find?id="+id, { credentials: "include" })
        const productoData = await producto.json()

        if(document.getElementById("modalC")){
            document.getElementById("modalC").remove()
            return
        }
    
        const modal = document.createElement("div")
        modal.classList.add("modal")
        modal.id="modalC"
        modal.innerHTML = `
        
    
            <div class="form-c" id="crearF">
                <span class="close">&times;</span>
                <h2>Editar Producto</h2>
                <form class="form" id="form" method="post">
                <div class="form-group">
                <label for="nombre">Nombre</label>
                    <input type="text" id="nombre" name="nombre" placeholder="Nombre" value="${productoData.nombre}">
                    <label for="precio">Precio: $</label>
                    <input type="text" id="precio" name="precio" placeholder="Precio" value="${productoData.precio}">
                    </div>
                    <div class="form-group">
                    <label for="descripcion_larga">descripcion</label>
                    <input type="text" id="descripcion_larga" name="descripcion_larga" placeholder="descripcion" value="${productoData.descripcion_larga}">
                    <label for="categoria_id">Categoria</label>
                    <select id="categoria_id" name="categoria_id">
                        
                    </select>
                    <label for="img">Imagen imagen nueva</label>
                    <input type="file" id="img" name="img">
                    </div>
                    <input type="hidden" id="id" name="id" value="${productoData.id}">
                    <input type="submit" value="Editar" class="boton">
                    </form>
                    
                
            </div>
        `
    
    
        document.body.appendChild(modal)
        const cancel = document.querySelector(".close")
        cancel.addEventListener("click", () => {
            modal.remove()
        })
        const form = document.querySelector("#form")
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            const data = new FormData(document.querySelector("#form"))
           
            fetch("/api/stores/productos/edit", {
                method: "POST",
                body: data,
                credentials: "include"
            })
            .then(res => res.json())
            .then(data => {
                if(data.ok){
                    notify('producto', 'editado correctamente', 'success', 2000);
    
                    modal.remove()
                    productos()
                    
                }else{
                    notify('error',data.error.join(" ,"), 'error', 5000);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                notify('Error', 'intente una imagen mas pequeña o contacte el soporte', 'error', 5000);
            });
        })
        categorias(productoData.categoria_id)

        

    }

    async function tallas(productoId) {
        if(document.getElementById("modalT")){
            document.getElementById("modalT").remove()
            return
        }
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.id = "modalT";
    modal.innerHTML = `
        <div class="form-c" id="crearF">
            <span class="close">&times;</span>
            <h2>Asignar tallas</h2>
            <form class="form" id="form">
                <div class="form-group">
                    <label for="nombre">Tallas disponibles</label>
                    <table>
                        <thead>
                            <tr>
                                <th>Talla</th>
                                <th>Stock</th>
                                <th>Precio unitario</th>
                            </tr>
                        </thead>
                        <tbody id="tallas"></tbody>
                    </table>
                </div>
                <input type="submit" value="Guardar" class="boton">
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Cargar tallas existentes del producto
    const response = await fetch(`/api/stores/tallasP?id=${productoId}`, { credentials: "include" });
    const result = await response.json();

    const tallasContainer = document.getElementById("tallas");
  

    if (result.length === 0) {
        // Si no hay tallas asignadas, traer todas las tallas
        const data = await fetch("/api/stores/tallas", { credentials: "include" });
        const allTallas = await data.json();
       
       
        allTallas.forEach(talla => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${talla.nombre}</td>
                <td><input type="number" min="0" value="0" id="stock_${talla.id}" data-talla-id="${talla.id}" class="form-control"></td>
                <td><input type="number" min="0" step="0.01" value="0.00" id="precio_${talla.id}" data-talla-id="${talla.id}" class="form-control"></td>
            `;
            tallasContainer.appendChild(row);
        });
    } else {
        // Mostrar tallas ya asignadas con stock y precio
        result.forEach(talla => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${talla.talla_nombre}</td>
                <td><input type="number" min="0" value="${talla.cantidad}" id="stock_${talla.talla_id}" data-talla-id="${talla.talla_id}" class="form-control"></td>
                <td><input type="number" min="0" step="0.01" value="${talla.precio_unitario}" id="precio_${talla.talla_id}" data-talla-id="${talla.talla_id}" class="form-control"></td>
            `;
            tallasContainer.appendChild(row);
        });
        
    }

    // Cerrar modal
    const cancel = modal.querySelector(".close");
    cancel.addEventListener("click", () => modal.remove());

    // Manejar envío del formulario
    const form = modal.querySelector("#form");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const tallasData = [];
        const stockInputs = modal.querySelectorAll("[id^=stock_]");

        stockInputs.forEach(input => {
            const tallaId = input.dataset.tallaId;
            const stock = input.value;
            const precio = modal.querySelector(`#precio_${tallaId}`).value;

          
                tallasData.push({
                    producto_id: productoId,
                    talla_id: tallaId,
                    cantidad: stock,
                    precio_unitario: precio
                });
            
        });

         const r = await fetch("/api/stores/guardarTallas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ producto_id: productoId, tallas: tallasData })
        });

        const result = await r.json();
        modal.remove();

        if(result.ok === true){

            notify("tallas guardadas","completado","success",2000)
        }else{
            notify("error al guardar tallas","error","error",2000)
        }
    });
}

    