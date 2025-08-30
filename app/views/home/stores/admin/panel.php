<!-- Incluir Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

<div class="dashboard-container">
    <!-- Header de la tienda -->
    <div class="store-header">
        <div id="logo-stores" class="store-info">
            <!-- Logo y nombre se cargan dinámicamente -->
        </div>
        <div id="bar-user" class="user-section">
            <!-- Avatar y menú se cargan dinámicamente -->
        </div>
    </div>

    <!-- Panel de ganancias -->
    <div class="earnings-panel">
        <h1 class="panel-title">Ganancias Globales</h1>
        <p class="panel-subtitle">Análisis de ganancias de tu tienda</p>
        
        <!-- Métricas principales -->
        <div class="metrics-grid">
            <div class="metric-card">
                <h3>Ganancias Totales</h3>
                <div class="metric-value" id="total-earnings">0</div>
                <div class="metric-period">Últimos 30 días</div>
            </div>
            <div class="metric-card">
                <h3>Ganancias Netas</h3>
                <div class="metric-value" id="net-earnings">0</div>
            </div>
            <div class="metric-card">
                <h3>Total Órdenes</h3>
                <div class="metric-value" id="total-orders">0</div>
            </div>
            <div class="metric-card">
                <h3>Promedio Diario</h3>
                <div class="metric-value" id="avg-order-value">0</div>
            </div>
        </div>

        <!-- Gráfico de ganancias -->
        <div class="chart-container">
            <canvas id="earnings-chart"></canvas>
        </div>

        <!-- Desglose de ganancias -->
        <div class="earnings-breakdown">
            <h2>Desglose de Ganancias</h2>
            <div class="breakdown-table">
                <div class="table-header">
                    <div>Fecha</div>
                    <div>Ganancias</div>
                    <div>Órdenes</div>
                    <div>Promedio</div>
                </div>
                <div id="breakdown-content">
                    <!-- Contenido se carga dinámicamente -->
                </div>
            </div>
        </div>

        <!-- Filtros -->
        <div class="filters-section">
            <h3>Filtros</h3>
            <div class="filter-controls">
                <select id="period-filter">
                    <option value="7">Últimos 7 días</option>
                    <option value="30" selected>Últimos 30 días</option>
                    <option value="90">Últimos 90 días</option>
                </select>
                <button id="export-data" class="export-btn">Exportar Datos</button>
            </div>
        </div>
    </div>
</div>