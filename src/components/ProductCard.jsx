// Tarjeta individual de un producto del catálogo.
// Recibe el producto, si ya está en el carrito, y una función para agregar/quitar.
function ProductCard({ producto, enCarrito, onToggleCarrito }) {
  return (
    <div className="card-producto">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://picsum.photos/seed/producto${producto.id}/300/220`;
        }}
      />
      <div className="info">
        <strong>{producto.nombre}</strong>
        <span className="badge-categoria">{producto.categoria}</span>
        <span className="precio">
          ${producto.precio.toLocaleString("es-CL")}
        </span>

        {/* Renderizado condicional: el texto y el color del botón cambian
            según si el producto ya está en el carrito o no */}
        <button
          className={`btn-agregar ${enCarrito ? "en-carrito" : ""}`}
          onClick={() => onToggleCarrito(producto)}
        >
          {enCarrito ? "En el carrito ✓" : "Agregar al carrito"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
