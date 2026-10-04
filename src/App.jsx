import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ProductList from "./components/ProductList.jsx";
import CartPanel from "./components/CartPanel.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  // --- useState: catálogo de productos ---
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // --- useState: carrito de compras ---
  const [carrito, setCarrito] = useState([]);

  // --- useState: elementos interactivos de la UI ---
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [carritoVisible, setCarritoVisible] = useState(false);

  // --- useEffect: simula la carga de productos desde una fuente externa ---
  // Se ejecuta una sola vez, cuando el componente se monta ([] como dependencia).
  useEffect(() => {
    async function cargarProductos() {
      try {
        const respuesta = await fetch("productos.json");

        if (!respuesta.ok) {
          throw new Error("No se pudo obtener el archivo de productos");
        }

        const datos = await respuesta.json();
        setProductos(datos);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError("Ups, no pudimos cargar los productos en este momento.");
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  // Agrega o quita un producto del carrito (toggle)
  function toggleCarrito(producto) {
    const yaEsta = carrito.some((item) => item.id === producto.id);

    if (yaEsta) {
      setCarrito(carrito.filter((item) => item.id !== producto.id));
    } else {
      setCarrito([...carrito, producto]);
    }
  }

  function quitarDelCarrito(id) {
    setCarrito(carrito.filter((item) => item.id !== id));
  }

  // Filtra el catálogo según la categoría elegida en el navbar
  const productosFiltrados =
    categoriaActiva === "todos"
      ? productos
      : productos.filter((producto) => producto.categoria === categoriaActiva);

  const idsEnCarrito = carrito.map((item) => item.id);

  return (
    <>
      <Navbar
        categoriaActiva={categoriaActiva}
        onCambiarCategoria={setCategoriaActiva}
        cantidadCarrito={carrito.length}
        carritoVisible={carritoVisible}
        onToggleCarrito={() => setCarritoVisible(!carritoVisible)}
      />

      <Hero />

      <div className="contenido">
        <ProductList
          cargando={cargando}
          error={error}
          productos={productosFiltrados}
          idsEnCarrito={idsEnCarrito}
          onToggleCarrito={toggleCarrito}
        />

        {/* Renderizado condicional: el panel del carrito solo se muestra
            si el usuario lo abrió con el botón del navbar */}
        {carritoVisible && (
          <CartPanel carrito={carrito} onQuitar={quitarDelCarrito} />
        )}
      </div>

      <Footer />
    </>
  );
}

export default App;
