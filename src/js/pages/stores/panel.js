document.addEventListener("DOMContentLoaded", () => {
    iniciarApp();
});
function iniciarApp() {
    const url = new URLSearchParams(window.location.search);
    
    IsTienda()

}
async function IsTienda(){
const url="/api/stores/IsTienda";
const r = await fetch(url, { credentials: "include" });
const  result = await r.json()
 if(!result || result.ok === false){
    window.location.href = "/";
 }else{
  notify('tienda', 'hola de nuevo', 'success', 2000);  
  storeActivate(result)
  userActivation()
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

// ============ DASHBOARD DE GANANCIAS ============

function initializeDashboard() {
    loadEarningsData();
    setupEventListeners();
    initializeChart();
}

function setupEventListeners() {
    // Filtro de período
    const periodFilter = document.querySelector('#period-filter');
    if (periodFilter) {
        periodFilter.addEventListener('change', (e) => {
            loadEarningsData(e.target.value);
        });
    }

    // Botón de exportar
    const exportBtn = document.querySelector('#export-data');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportEarningsData);
    }
}

async function loadEarningsData(days = 30) {
    try {
        const url = `/api/stores/earnings?days=${days}`;
        const response = await fetch(url, { credentials: "include" });
        const result = await response.json();
        
        if (result.ok) {
            updateMetrics(result);
            updateChart(result.data);
            updateBreakdownTable(result.data);
        } else {
            notify('error', 'Error al cargar datos de ganancias', 'error', 3000);
        }
        
    } catch (error) {
        console.error('Error cargando datos de ganancias:', error);
        notify('error', 'Error al cargar datos de ganancias', 'error', 3000);
    }
}

function updateMetrics(result) {
    const totalEarnings = result.total || 0;
    const avgDaily = result.data.length > 0 ? totalEarnings / result.data.length : 0;
    
    document.querySelector('#total-earnings').textContent = totalEarnings.toLocaleString();
    document.querySelector('#net-earnings').textContent = Math.floor(totalEarnings * 0.85).toLocaleString();
    document.querySelector('#total-orders').textContent = totalEarnings.toLocaleString();
    document.querySelector('#avg-order-value').textContent = avgDaily.toFixed(1);
}

let earningsChart = null;

function initializeChart() {
    const ctx = document.querySelector('#earnings-chart');
    if (!ctx) return;

    earningsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Ganancias Diarias',
                data: [],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Tendencia de Ganancias por Día',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + ' ganancias';
                        }
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    });
}

function updateChart(data) {
    if (!earningsChart) return;

    // Preparar datos para el gráfico
    const labels = [];
    const earnings = [];
    
    // Crear array completo de fechas para el período
    const today = new Date();
    const periodDays = document.querySelector('#period-filter').value || 30;
    
    for (let i = periodDays - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Buscar si hay datos para esta fecha
        const dayData = data.find(item => item.fecha === dateStr);
        
        labels.push(date.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }));
        earnings.push(dayData ? parseInt(dayData.total_ganancias) : 0);
    }

    earningsChart.data.labels = labels;
    earningsChart.data.datasets[0].data = earnings;
    earningsChart.update('active');
}

function updateBreakdownTable(data) {
    const container = document.querySelector('#breakdown-content');
    if (!container) return;

    if (data.length === 0) {
        container.innerHTML = '<div class="no-data">No hay datos de ganancias para mostrar</div>';
        return;
    }

    // Mostrar últimos 7 días de datos
    const recentData = data.slice(-7).reverse();
    
    container.innerHTML = recentData.map(item => {
        const date = new Date(item.fecha);
        const formattedDate = date.toLocaleDateString('es-ES');
        
        return `
            <div class="breakdown-row">
                <div>${formattedDate}</div>
                <div>${item.total_ganancias}</div>
                <div>${item.cantidad || item.total_ganancias}</div>
                <div>${(item.total_ganancias / (item.cantidad || 1)).toFixed(1)}</div>
            </div>
        `;
    }).join('');
}

function exportEarningsData() {
    notify('info', 'Preparando exportación...', 'info', 2000);
    
    // Simular exportación
    setTimeout(() => {
        notify('success', 'Datos exportados exitosamente', 'success', 3000);
    }, 1500);
}



