// Función para obtener todos los productos
function obtenerProductos() {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => {
        console.log(data);  // Mostramos los productos en la consola
        mostrarProductos(data);  // Función para mostrar los productos en la UI
      })
      .catch(error => {
        console.error('Hubo un problema con la solicitud:', error);
        mostrarError(`Error al obtener productos: ${error.message}`);  // Mostrar el error en la UI
      });
  }
// Función para traer el valor del dólar
function dolar() {
    fetch('https://dolarapi.com/v1/dolares')
        .then(response => response.json())  // Convertimos la respuesta a JSON
        .then(data => {
            // Accedemos al primer objeto del array
            const dolarData = data[1];

            // Mostramos el valor de la compra y venta en el div
            const valorDolarDiv = document.getElementById('valorDolar');
            valorDolarDiv.innerHTML = `
              
                <p>Nombre: ${dolarData.nombre}</p>
                <p>Moneda: ${dolarData.moneda}</p>
                <p>Compra: $${dolarData.compra}</p>
                <p>Venta: $${dolarData.venta}</p>
                
            `;
        })
        .catch(error => {
            // En caso de error, mostramos un mensaje de error en el div
            const valorDolarDiv = document.getElementById('valorDolar');
            valorDolarDiv.textContent = 'Hubo un error al obtener el valor del dólar.';
            console.error(error);
        });
}

// Llamamos a la función cuando cargue la página
window.onload = dolar;

  
  
  // Función para obtener productos limitados
  function obtenerProductosLimitados(limit) {
    fetch(`https://fakestoreapi.com/products?limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        mostrarProductos(data);
      })
      .catch(error => {
        console.error('Error al obtener productos limitados:', error);
        mostrarError(`Error al obtener productos limitados: ${error.message}`);
      });
  }
  
  // Función para obtener productos ordenados
  function obtenerProductosOrdenados(order = 'asc') {
    fetch(`https://fakestoreapi.com/products?sort=${order}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        mostrarProductos(data);
      })
      .catch(error => {
        console.error('Error al obtener productos ordenados:', error);
        mostrarError(`Error al obtener productos ordenados: ${error.message}`);
      });
  }
  
  // Función para obtener productos filtrados por categoría
  function obtenerProductosPorCategoria(categoria) {
    fetch(`https://fakestoreapi.com/products/category/${categoria}`)
      .then(res => res.json())
      .then(data => {
        console.log(`Productos en la categoría ${categoria}:`, data);
        mostrarProductos(data);  // Mostrar solo los productos de esa categoría
      })
      .catch(error => {
        console.error('Error al obtener productos por categoría:', error);
        mostrarError(`Error al obtener productos por categoría: ${error.message}`);
      });
  }
  
  // Función para obtener las categorías de productos
  function obtenerCategorias() {
    fetch('https://fakestoreapi.com/products/categories')
      .then(res => res.json())
      .then(data => {
        console.log(data);  // Mostramos las categorías en la consola
        mostrarCategorias(data);  // Función para mostrar las categorías en la UI
      })
      .catch(error => {
        console.error('Error al obtener categorías:', error);
        mostrarError(`Error al obtener categorías: ${error.message}`);
      });
  }
  
  // Función para mostrar los productos en la UI
  function mostrarProductos(productos) {
    const listaProductos = document.getElementById('lista-productos');
    listaProductos.innerHTML = '';  // Limpiar la lista antes de llenarla con los nuevos productos
  
    productos.forEach(producto => {
      const item = document.createElement('div');
      item.classList.add('producto');
      item.innerHTML = `
        <h3>${producto.title}</h3>
        <img src="${producto.image}" alt="${producto.title}" />
        <p>${producto.description}</p>
        <span>$${producto.price}</span>
      `;
      listaProductos.appendChild(item);
    });
  }
  
  // Función para mostrar las categorías en la UI
  function mostrarCategorias(categorias) {
    const listaCategorias = document.getElementById('lista-categorias');
    listaCategorias.innerHTML = '';  // Limpiar la lista de categorías
  
    categorias.forEach(categoria => {
      const item = document.createElement('button');
      item.classList.add('categoria');
      item.innerHTML = categoria;
      item.addEventListener('click', () => obtenerProductosPorCategoria(categoria));  // Cargar productos al hacer clic
      listaCategorias.appendChild(item);
    });
  }
  
  // Función para mostrar un mensaje de error
  function mostrarError(mensaje) {
    const errorDiv = document.getElementById('error');
    errorDiv.innerHTML = `<p>Error: ${mensaje}</p>`;
  }
  
  // Eventos de interacción con los botones
  document.getElementById('obtener-productos').addEventListener('click', obtenerProductos);
  document.getElementById('obtener-productos-limitados').addEventListener('click', () => obtenerProductosLimitados(5));
  document.getElementById('obtener-productos-ordenados').addEventListener('click', () => obtenerProductosOrdenados('desc'));
  document.getElementById('obtener-categorias').addEventListener('click', obtenerCategorias);
  
  // Llamada inicial a la API para cargar todos los productos
  obtenerProductos();
  // Llamamos a la función cuando cargue la página
  window.onload = dolar;
