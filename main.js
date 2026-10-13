// --- Menu de movil -------------------------------------------------------
const nav = document.querySelector('.nav');
const boton = document.querySelector('.nav__toggle');

if (nav && boton) {
  const cerrar = () => {
    nav.classList.remove('abierto');
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir menú');
  };

  boton.addEventListener('click', () => {
    const abierto = nav.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', String(abierto));
    boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  });

  nav.querySelectorAll('.nav__links a').forEach((a) => a.addEventListener('click', cerrar));
  document.addEventListener('keydown', (e) => e.key === 'Escape' && cerrar());
}

// --- La barra marca su borde solo cuando la pagina ya ha bajado ----------
const alDesplazar = () => {
  if (nav) nav.classList.toggle('desplazada', window.scrollY > 8);
};
alDesplazar();
window.addEventListener('scroll', alDesplazar, { passive: true });

// --- Resaltar en el menu la seccion que se esta viendo -------------------
const secciones = [...document.querySelectorAll('main section[id]')];
const enlaces = new Map(
  [...document.querySelectorAll('.nav__links a')].map((a) => [a.getAttribute('href').slice(1), a])
);

if (secciones.length && 'IntersectionObserver' in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        const enlace = enlaces.get(e.target.id);
        if (!enlace) return;
        if (e.isIntersecting) {
          enlaces.forEach((otro) => otro.classList.remove('activa'));
          enlace.classList.add('activa');
        }
      });
    },
    // La seccion cuenta como "actual" cuando cruza el tercio superior.
    { rootMargin: '-20% 0px -70% 0px' }
  );
  secciones.forEach((s) => observador.observe(s));
}

// --- Aparicion suave al desplazar ---------------------------------------
const animables = document.querySelectorAll('.proyecto, .stack-grupo, .linea li, .contacto, .sobre__tarjeta');

if ('IntersectionObserver' in window) {
  animables.forEach((el) => el.classList.add('revelar'));
  const alAparecer = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );
  animables.forEach((el) => alAparecer.observe(el));
}

// --- El año del pie se calcula solo -------------------------------------
const ano = document.getElementById('ano');
if (ano) ano.textContent = new Date().getFullYear();
