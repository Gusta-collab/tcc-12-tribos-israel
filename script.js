const CHAPTERS = [
  ["Início", "hero"],
  ["Conceito", "conceito"],
  ["Identidade", "identidade"],
  ["Linguagem", "linguagem"],
  ["Pedras", "stones"],
  ["Joias", "joias"],
  ["Contato", "contato"]
];

const sections = [...document.querySelectorAll('.sec')];
const headerNav = document.querySelector('.nav');
const nav = document.getElementById('nv');
const bar = document.getElementById('bar');
const cnt = document.getElementById('cnt');
const lb = document.getElementById('lb');
const hint = document.getElementById('hint');

let currentIndex = 0;

// Botão de menu para telas mobile/tablet
const menuBtn = document.createElement('button');
menuBtn.className = 'menu-btn';
menuBtn.type = 'button';
menuBtn.textContent = 'Menu';
menuBtn.addEventListener('click', () => {
  const isOpen = headerNav.classList.toggle('open');
  menuBtn.textContent = isOpen ? 'Fechar' : 'Menu';
});
headerNav.appendChild(menuBtn);

// Mapeia os capítulos principais no menu superior
const navItems = CHAPTERS.map(([label, id]) => {
  const index = sections.findIndex(sec => sec.id === id);
  const link = document.createElement('a');
  link.textContent = label;
  link.href = `#${id}`;
  link.addEventListener('click', (e) => {
    e.preventDefault();
    headerNav.classList.remove('open');
    menuBtn.textContent = 'Menu';
    if (index !== -1) {
      sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
  nav.appendChild(link);
  return { label, id, index, link };
});

// Clique no logo volta ao início
const logo = headerNav.querySelector('.logo');
if (logo) {
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    headerNav.classList.remove('open');
    menuBtn.textContent = 'Menu';
    sections[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// Aplica cores de fundo e texto de cada painel
sections.forEach(sec => {
  if (sec.dataset.bg) sec.style.backgroundColor = sec.dataset.bg;
  if (sec.dataset.fg) sec.style.color = sec.dataset.fg;
});

function updateActiveState(index) {
  currentIndex = index;
  const total = String(sections.length).padStart(2, '0');
  const current = String(index + 1).padStart(2, '0');
  cnt.textContent = `${current} / ${total}`;

  const activeBg = sections[index]?.dataset.bg;
  if (activeBg) {
    document.documentElement.style.backgroundColor = activeBg;
  }

  let activeChapterIdx = 0;
  navItems.forEach((item, idx) => {
    if (item.index !== -1 && item.index <= index) {
      activeChapterIdx = idx;
    }
  });

  navItems.forEach((item, idx) => {
    item.link.classList.toggle('on', idx === activeChapterIdx);
  });

  if (hint) {
    hint.style.display = index === 0 ? '' : 'none';
  }
}

// Observador para ativar animações de entrada e estado do menu
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      const idx = sections.indexOf(entry.target);
      if (idx !== -1) updateActiveState(idx);
    }
  });
}, { threshold: 0.55 });

sections.forEach(sec => observer.observe(sec));

// Ao sair totalmente da tela, o slide reinicia para animar de novo na volta
const resetObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) entry.target.classList.remove('in');
  });
}, { threshold: 0 });

sections.forEach(sec => resetObserver.observe(sec));

// Barra de progresso e efeito parallax suave apenas no desktop
let ticking = false;
const isDesktopQuery = window.matchMedia('(min-width: 1025px) and (orientation: landscape)');

function onScroll() {
  ticking = false;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  bar.style.width = `${progress}%`;

  if (!isDesktopQuery.matches) return;

  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
    sec.querySelectorAll('.pg .w:not(.bgf)').forEach((w, i) => {
      const shift = (offset * ((i % 3) - 1) * 1.2).toFixed(2);
      w.style.translate = `0 ${shift}cqw`;
    });
  });
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = requestAnimationFrame(onScroll);
  }
}, { passive: true });

// Lightbox para ampliar fotografias ao clicar
document.addEventListener('click', (e) => {
  const wrapper = e.target.closest('.w:not(.bgf)');
  if (wrapper) {
    const imgDiv = wrapper.querySelector('.im');
    if (!imgDiv) return;
    const bgImage = getComputedStyle(imgDiv).backgroundImage;
    if (bgImage && bgImage !== 'none') {
      const url = bgImage.slice(5, -2);
      lb.innerHTML = `<img src="${url}" alt="Fotografia ampliada">`;
      lb.classList.add('on');
      lb.setAttribute('aria-hidden', 'false');
    }
  } else if (lb.classList.contains('on')) {
    lb.classList.remove('on');
    lb.setAttribute('aria-hidden', 'true');
  }
});

// Navegação por teclado (Setas, Espaço, PageUp/PageDown e ESC)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lb.classList.remove('on');
    lb.setAttribute('aria-hidden', 'true');
    headerNav.classList.remove('open');
    menuBtn.textContent = 'Menu';
    return;
  }
  if (lb.classList.contains('on')) return;

  if (['ArrowDown', 'PageDown', ' ', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();
    const next = Math.min(currentIndex + 1, sections.length - 1);
    sections[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(e.key)) {
    e.preventDefault();
    const prev = Math.max(currentIndex - 1, 0);
    sections[prev].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// Joias: lista com imagem que acompanha o cursor
(() => {
  const root = document.getElementById('jr');
  if (!root) return;

  const rows = [...root.querySelectorAll('.jr-row')];
  const layers = [...root.querySelectorAll('.jr-img')];
  const float = root.querySelector('.jr-float');
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let tx = 0, ty = 0, x = 0, y = 0, active = -1, raf = 0;

  const loop = () => {
    const k = calm ? 1 : 0.14;
    x += (tx - x) * k;
    y += (ty - y) * k;
    float.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    const settled = Math.abs(tx - x) + Math.abs(ty - y) < 0.5;
    raf = active !== -1 || !settled ? requestAnimationFrame(loop) : 0;
  };

  const show = (i) => {
    if (active === -1 && i !== -1) { x = tx; y = ty; }
    active = i;
    root.classList.toggle('has-active', i !== -1);
    rows.forEach((row, n) => row.classList.toggle('on', n === i));
    layers.forEach((layer, n) => {
      const pos = i === -1 || n > i ? 100 : n < i ? -100 : 0;
      layer.style.transform = `translateY(${pos}%)`;
    });
    if (i !== -1 && !raf) raf = requestAnimationFrame(loop);
  };

  root.addEventListener('mousemove', (e) => {
    const halfW = float.offsetWidth / 2;
    const halfH = float.offsetHeight / 2 + 12;
    const textRight = Math.max(...rows.map(r => r.lastElementChild.getBoundingClientRect().right));
    const minX = textRight + halfW + 32;
    tx = Math.min(window.innerWidth - halfW - 16, Math.max(e.clientX + 220, minX));
    ty = Math.max(halfH, Math.min(window.innerHeight - halfH, e.clientY));
  });

  rows.forEach((row, i) => {
    row.addEventListener('mouseenter', () => show(i));
    row.addEventListener('click', () => show(i));
    row.addEventListener('focus', () => {
      if (!tx) { tx = window.innerWidth * 0.7; ty = window.innerHeight / 2; }
      show(i);
    });
    row.addEventListener('blur', () => show(-1));
  });

  const touchOnly = window.matchMedia('(hover: none)');
  const leave = () => { if (!touchOnly.matches) show(-1); };
  root.querySelector('.jr-list').addEventListener('mouseleave', leave);
  root.addEventListener('mouseleave', leave);
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.jr-row')) show(-1);
  });

  new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) show(-1);
  }).observe(root);
})();

updateActiveState(0);