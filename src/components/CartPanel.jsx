// Panel lateral del carrito. Muestra los productos agregados y el total,
// o un mensaje si todavía no hay nada.
function CartPanel({ carrito, onQuitar }) {
  const total = carrito.reduce((suma, item) => suma + item.precio, 0);

  return (
    <aside className="panel-carrito">
      <h3>Carrito de compras</h3>
      <p>Productos: {carrito.length}</p>

      {/* Renderizado condicional: si no hay productos, se muestra un aviso
          en vez de una lista vacía */}
      {carrito.length === 0 ? (
        <p className="carrito-vacio">Tu carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((item) => (
            <div className="item-carrito" key={item.id}>
              <span>{item.nombre}</span>
              <span>
                ${item.precio.toLocaleString("es-CL")}
                <button className="btn-quitar" onClick={() => onQuitar(item.id)}>
                  ✕
                </button>
              </span>
            </div>
          ))}
          <p style={{ marginTop: "12px", fontWeight: "bold" }}>
            Total: ${total.toLocaleString("es-CL")}
          </p>
        </>
      )}
    </aside>
  );
}

export default CartPanel;
