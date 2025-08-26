<div class="contenedor">
    <h2 class="titulo">login</h2>
    <div class="form-c">
        <form id="form"class="form" method="post">
            <div class="form-group">
                <label for="">password</label>
                <input type="password" name="password" id="password">
                <input type="hidden" name="token" id="token" value="<?= htmlspecialchars($_GET['token']) ?>">
                
            </div>
            <input type="submit" value="login" class="boton">

        </form>
        <a href="/register">register</a>
        <a href="/">login</a>
    </div>
</div>