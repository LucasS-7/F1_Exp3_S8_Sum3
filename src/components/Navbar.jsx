// Navbar simple: nombre de la tienda, filtro de categorías y el botón
// que muestra/oculta el panel del carrito (es el "elemento interactivo"
// que la pauta pide: cambia de texto al hacer clic).
function Navbar({ categoriaActiva, onCambiarCategoria, cantidadCarrito, carritoVisible, onToggleCarrito }) {
  const categorias = ["todos", "consolas", "accesorios"];

  return (
    <nav className="navbar">
      <span className="marca">GamerZone</span>

      <div className="categorias">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={categoriaActiva === categoria ? "activa" : ""}
            onClick={() => onCambiarCategoria(categoria)}
          >
            {categoria === "todos" ? "Todos" : categoria}
          </button>
        ))}
      </div>

      <button className="btn-carrito-toggle" onClick={onToggleCarrito}>
        {carritoVisible ? "Cerrar carrito ✕" : `Ver carrito (${cantidadCarrito})`}
      </button>
    </nav>
  );
}

export default Navbar;
