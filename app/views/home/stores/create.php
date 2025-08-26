

<div class="contenedor">
    <h2 class="titulo">crear tienda</h2>
    <div class="form-c">
        <form id="form" class="form" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <label for="nombre">nombre</label>
            <input type="text" name="nombre" placeholder="Nombre">
            </div>
            <div class="form-group">
                <label for="descripcion">descripcion</label>
            <input type="text" name="descripcion" placeholder="Descripcion">
            </div>
            <div class="form-group">
                <label for="categoria_id">categoria</label>
            <select name="categoria_id" id="categoria_id">
       
       </select>
            </div>
            <div class="form-group">
                <label for="">img</label>
                <button>
  <svg
    aria-hidden="true"
    stroke="currentColor"
    stroke-width="2"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-width="2"
      stroke="#fffffff"
      d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
      stroke-linejoin="round"
      stroke-linecap="round"
    ></path>
    <path
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2"
      stroke="#fffffff"
      d="M17 15V18M17 21V18M17 18H14M17 18H20"
    ></path>
  </svg>
  <input type="file" id="img" name="img">
  
</button>
            </div>

            <div class="form-group">
                <label for="banner">banner</label>
                <button>
  <svg
    aria-hidden="true"
    stroke="currentColor"
    stroke-width="2"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-width="2"
      stroke="#fffffff"
      d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
      stroke-linejoin="round"
      stroke-linecap="round"
    ></path>
    <path
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke-width="2"
      stroke="#fffffff"
      d="M17 15V18M17 21V18M17 18H14M17 18H20"
    ></path>
  </svg>
  <input type="file" id="banner" name="banner">
  
</button>
            </div>

            
           
            <input type="submit" value="crear" class="boton">

        </form>
       
    </div>
</div>