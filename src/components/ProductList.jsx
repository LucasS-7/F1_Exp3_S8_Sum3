import ProductCard from "./ProductCard.jsx";

// Se encarga solo de mostrar el catálogo: carga, error, vacío, o la grilla normal.
// Toda la lógica de datos vive en App.jsx, acá solo se recibe por props.
function ProductList({ cargando, error, productos, idsEnCarrito, onToggleCarrito }) {
  if (cargando) {
    return <p className="mensaje-cargando">Cargando productos...</p>;
  }

  if (error) {
    return <div className="mensaje-error">{error}</div>;
  }

  if (productos.length === 0) {
    return <p className="mensaje-cargando">No hay productos en esta categoría.</p>;
  }

  return (
    <div className="catalogo">
      {productos.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          enCarrito={idsEnCarrito.includes(producto.id)}
          onToggleCarrito={onToggleCarrito}
        />
      ))}
    </div>
  );
}

export default ProductList;
