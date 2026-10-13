// Menu de movil: el boton abre y cierra la lista de enlaces.
const nav = document.querySelector('.nav');
const boton = document.querySelector('.nav__toggle');

if (nav && boton) {
  boton.addEventListener('click', () => {
    const abierto = nav.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });

  // Al elegir una seccion, el menu se cierra solo.
  nav.querySelectorAll('.nav__links a').forEach((enlace) => {
    enlace.addEventListener('click', () => {
      nav.classList.remove('abierto');
      boton.setAttribute('aria-expanded', 'false');
      boton.setAttribute('aria-label', 'Abrir menú');
    });
  });
}

// El año del pie se calcula solo, para que no envejezca.
const ano = document.getElementById('ano');
if (ano) ano.textContent = new Date().getFullYear();
