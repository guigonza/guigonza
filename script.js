/* ═══════════════════════════════════════════════════════════════════
   MR. ROBOT STYLE - INTERACTIVE TERMINAL EXPERIENCE
   "Hello, friend." - Portfolio de Guillermo González
   ═══════════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════════
// PROJECTS DATA
// ═══════════════════════════════════════════════════════════════════

const projects = [
  { 
    name: 'minishell', 
    repo: 'https://github.com/guigonza/minishell', 
    desc: 'Réplica de shell en C: parsing avanzado, pipes, redirecciones, manejo de señales y procesos. Proyecto destacado con ⭐', 
    tags: ['c', 'sys'],
    featured: true
  },
  { 
    name: 'cpp02', 
    repo: 'https://github.com/guigonza/cpp02', 
    desc: 'C++ Module 02 — Polimorfismo ad-hoc, sobrecarga de operadores y forma canónica ortodoxa.', 
    tags: ['cpp']
  },
  { 
    name: 'cpp01', 
    repo: 'https://github.com/guigonza/cpp01', 
    desc: 'C++ Module 01 — Alocación de memoria, liberación, punteros a miembros, referencias y switch statements.', 
    tags: ['cpp']
  },
  { 
    name: 'cpp00', 
    repo: 'https://github.com/guigonza/cpp00', 
    desc: 'C++ Module 00 — Primer contacto con C++: namespaces, clases, funciones miembro, flujos I/O.', 
    tags: ['cpp']
  },
  { 
    name: 'gnl', 
    repo: 'https://github.com/guigonza/gnl', 
    desc: 'Get Next Line — Lectura por línea optimizada con gestión de buffers y static variables. ⭐', 
    tags: ['c']
  },
  { 
    name: 'libft', 
    repo: 'https://github.com/guigonza/libft', 
    desc: 'Librería base con funciones reimplementadas de libc: strings, memoria, listas enlazadas.', 
    tags: ['c']
  },
  { 
    name: 'fractol', 
    repo: 'https://github.com/guigonza/fractol', 
    desc: 'Visualización de fractales (Mandelbrot, Julia, Burning Ship) con MiniLibX y manejo de CGI.', 
    tags: ['c']
  },
  { 
    name: 'push_swap', 
    repo: 'https://github.com/guigonza/push_swap', 
    desc: 'Algoritmo de ordenación con movimientos mínimos entre stacks usando listas enlazadas.', 
    tags: ['c']
  },
  { 
    name: 'pipex', 
    repo: 'https://github.com/guigonza/pipex', 
    desc: 'Emulación de pipes UNIX: duplicación de procesos, redirección de descriptores y ejecución encadenada.', 
    tags: ['c', 'sys']
  },
  { 
    name: 'ft_printf', 
    repo: 'https://github.com/guigonza/ft_printf', 
    desc: 'Reimplementación de printf: manejo de variadic functions, formateo y conversiones.', 
    tags: ['c']
  }
];

// ═══════════════════════════════════════════════════════════════════
// BOOT SEQUENCE
// ═══════════════════════════════════════════════════════════════════

const bootMessages = [
  'BIOS Version 4.2.0 - MR.ROBOT EDITION',
  'Initializing system...',
  '',
  '[OK] Loading kernel modules',
  '[OK] Mounting filesystems',
  '[OK] Starting network services',
  '[OK] Establishing secure connection',
  '',
  '> Checking credentials...',
  '> Access granted',
  '',
  '██████╗ ██╗   ██╗██╗ ██████╗  ██████╗ ███╗   ██╗███████╗ █████╗',
  '██╔════╝ ██║   ██║██║██╔════╝ ██╔═══██╗████╗  ██║╚══███╔╝██╔══██╗',
  '██║  ███╗██║   ██║██║██║  ███╗██║   ██║██╔██╗ ██║  ███╔╝ ███████║',
  '██║   ██║██║   ██║██║██║   ██║██║   ██║██║╚██╗██║ ███╔╝  ██╔══██║',
  '╚██████╔╝╚██████╔╝██║╚██████╔╝╚██████╔╝██║ ╚████║███████╗██║  ██║',
  ' ╚═════╝  ╚═════╝ ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝',
  '',
  '> Hello, friend.',
  '> Welcome to the system.',
];

function runBootSequence() {
  const bootScreen = document.getElementById('boot-screen');
  const bootText = document.getElementById('boot-text');
  let lineIndex = 0;
  let charIndex = 0;
  let currentText = '';

  function typeBootLine() {
    if (lineIndex >= bootMessages.length) {
      setTimeout(() => {
        bootScreen.classList.add('hidden');
        initializeMainContent();
      }, 800);
      return;
    }

    const currentLine = bootMessages[lineIndex];
    
    if (charIndex < currentLine.length) {
      currentText += currentLine[charIndex];
      bootText.textContent = currentText;
      charIndex++;
      setTimeout(typeBootLine, currentLine.startsWith('█') ? 5 : 15);
    } else {
      currentText += '\n';
      bootText.textContent = currentText;
      lineIndex++;
      charIndex = 0;
      setTimeout(typeBootLine, currentLine === '' ? 100 : 50);
    }
  }

  typeBootLine();
}

// ═══════════════════════════════════════════════════════════════════
// MATRIX RAIN EFFECT
// ═══════════════════════════════════════════════════════════════════

function initMatrixRain() {
  const canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/*-+=$#@!%^&()';
  const charArray = chars.split('');
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px monospace`;
    
    for (let i = 0; i < drops.length; i++) {
      const char = charArray[Math.floor(Math.random() * charArray.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      
      // Random brightness for depth effect
      const brightness = Math.random();
      if (brightness > 0.98) {
        ctx.fillStyle = '#ffffff';
      } else if (brightness > 0.9) {
        ctx.fillStyle = '#00ff41';
      } else {
        ctx.fillStyle = `rgba(0, 255, 65, ${0.3 + brightness * 0.5})`;
      }
      
      ctx.fillText(char, x, y);
      
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// ═══════════════════════════════════════════════════════════════════
// TYPEWRITER EFFECT
// ═══════════════════════════════════════════════════════════════════

function typewriterEffect(element, text, speed = 30) {
  return new Promise(resolve => {
    let i = 0;
    element.textContent = '';
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        resolve();
      }
    }
    type();
  });
}

// ═══════════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS (AOS-like)
// ═══════════════════════════════════════════════════════════════════

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        
        // Animate skill meters when visible
        if (entry.target.id === 'skills') {
          animateSkillMeters();
        }
        
        // Animate stat counters when visible
        if (entry.target.id === 'about') {
          animateCounters();
        }
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));
}

// ═══════════════════════════════════════════════════════════════════
// SKILL METERS ANIMATION
// ═══════════════════════════════════════════════════════════════════

function animateSkillMeters() {
  document.querySelectorAll('.meter').forEach((meter, index) => {
    const level = meter.dataset.level || '70';
    const span = meter.querySelector('span');
    if (span) {
      setTimeout(() => {
        span.style.width = level + '%';
      }, index * 150);
    }
  });
}

// ═══════════════════════════════════════════════════════════════════
// COUNTER ANIMATION
// ═══════════════════════════════════════════════════════════════════

function animateCounters() {
  document.querySelectorAll('.stat-value[data-count]').forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    function updateCounter() {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }
    updateCounter();
  });
}

// ═══════════════════════════════════════════════════════════════════
// RENDER PROJECT CARDS
// ═══════════════════════════════════════════════════════════════════

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  projects.forEach((p, index) => {
    const el = document.createElement('div');
    el.className = 'project-card';
    el.dataset.tags = (p.tags || []).join(' ');
    el.style.animationDelay = `${index * 0.1}s`;
    
    el.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <div class="project-links">
        <a href="${p.repo}" target="_blank" rel="noopener">
          <span>→</span> Ver repo
        </a>
        <button class="btn cyber-btn view" data-name="${p.name}">Detalles</button>
      </div>
    `;
    
    // Add hover sound effect (visual feedback)
    el.addEventListener('mouseenter', () => {
      el.style.setProperty('--glow-intensity', '1');
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--glow-intensity', '0');
    });
    
    grid.appendChild(el);
  });
}

// ═══════════════════════════════════════════════════════════════════
// PROJECT FILTERS
// ═══════════════════════════════════════════════════════════════════

function initFilters() {
  document.querySelectorAll('.filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.dataset.filter;
      
      document.querySelectorAll('.project-card').forEach(card => {
        const tags = card.dataset.tags || '';
        let show = false;
        
        if (filter === 'all') {
          show = true;
        } else if (filter === 'c' && !tags.includes('cpp')) {
          show = true;
        } else if (filter === 'cpp' && tags.includes('cpp')) {
          show = true;
        } else if (filter === 'sys' && tags.includes('sys')) {
          show = true;
        }
        
        card.style.display = show ? 'block' : 'none';
        
        // Add animation
        if (show) {
          card.style.animation = 'none';
          card.offsetHeight; // Trigger reflow
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        }
      });
    });
  });
}

// ═══════════════════════════════════════════════════════════════════
// MODAL FUNCTIONALITY
// ═══════════════════════════════════════════════════════════════════

function initModal() {
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalActions = document.getElementById('modalActions');
  const modalRun = document.getElementById('modalRun');
  const modalPath = document.getElementById('modalPath');

  // Open modal on project click
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('.btn.view') || e.target.closest('.btn.view')) {
      const btn = e.target.matches('.btn.view') ? e.target : e.target.closest('.btn.view');
      const name = btn.getAttribute('data-name');
      const project = projects.find(x => x.name === name);
      if (project) openModal(project);
    }
  });

  // Close modal
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  // ESC key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function openModal(project) {
    modal.setAttribute('aria-hidden', 'false');
    modalPath.textContent = project.name;
    modalTitle.textContent = project.name;
    modalDesc.textContent = project.desc;
    
    modalActions.innerHTML = `
      <a class="btn cyber-btn primary" href="${project.repo}" target="_blank" rel="noopener">
        <span>→</span> Abrir repositorio
      </a>
    `;
    
    modalRun.innerHTML = `
      <strong>> Ejecutar localmente:</strong>
      <pre><span class="prompt">$</span> git clone ${project.repo}
<span class="prompt">$</span> cd ${project.name}
<span class="prompt">$</span> make
<span class="prompt">$</span> ./${project.name} <span class="comment"># o consulta README</span></pre>
    `;
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

// ═══════════════════════════════════════════════════════════════════
// CYBER MODULE (localStorage)
// ═══════════════════════════════════════════════════════════════════

function initCyberModule() {
  const s1 = document.getElementById('s1');
  const s2 = document.getElementById('s2');
  const s3 = document.getElementById('s3');
  const s1v = document.getElementById('s1v');
  const s2v = document.getElementById('s2v');
  const s3v = document.getElementById('s3v');
  const saveBtn = document.getElementById('saveLab');
  const resetBtn = document.getElementById('resetLab');
  const badgeArea = document.getElementById('labBadge');

  if (!s1 || !s2 || !s3) return;

  function updateLabels() {
    s1v.textContent = s1.value + '%';
    s2v.textContent = s2.value + '%';
    s3v.textContent = s3.value + '%';
    
    // Update slider track color
    [s1, s2, s3].forEach(slider => {
      const percentage = slider.value;
      slider.style.background = `linear-gradient(to right, #ff0040 0%, #ff0040 ${percentage}%, rgba(255,255,255,0.05) ${percentage}%, rgba(255,255,255,0.05) 100%)`;
    });
  }

  [s1, s2, s3].forEach(el => el.addEventListener('input', updateLabels));
  updateLabels();

  function renderBadge() {
    badgeArea.innerHTML = '';
    const total = Math.round((+s1.value + +s2.value + +s3.value) / 3);
    
    let rank = 'SCRIPT KIDDIE';
    let icon = '👶';
    if (total >= 80) { rank = 'ELITE HACKER'; icon = '💀'; }
    else if (total >= 60) { rank = 'PENETRATION TESTER'; icon = '🔓'; }
    else if (total >= 40) { rank = 'SECURITY ANALYST'; icon = '🔍'; }
    else if (total >= 20) { rank = 'APPRENTICE'; icon = '📚'; }
    
    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.innerHTML = `${icon} ${rank}: <strong>${total}%</strong>`;
    badgeArea.appendChild(badge);
  }

  saveBtn?.addEventListener('click', () => {
    const state = { r1: +s1.value, r2: +s2.value, r3: +s3.value, ts: Date.now() };
    localStorage.setItem('cyberState', JSON.stringify(state));
    renderBadge();
    
    // Visual feedback
    saveBtn.innerHTML = '<span class="btn-icon">✓</span> Guardado';
    saveBtn.style.background = '#00ff41';
    saveBtn.style.borderColor = '#00ff41';
    
    setTimeout(() => {
      saveBtn.innerHTML = '<span class="btn-icon">💾</span> Guardar progreso';
      saveBtn.style.background = '';
      saveBtn.style.borderColor = '';
    }, 2000);
  });

  resetBtn?.addEventListener('click', () => {
    localStorage.removeItem('cyberState');
    s1.value = 45;
    s2.value = 20;
    s3.value = 10;
    updateLabels();
    badgeArea.innerHTML = '';
    
    // Glitch effect
    resetBtn.style.animation = 'glitchHover 0.3s ease';
    setTimeout(() => {
      resetBtn.style.animation = '';
    }, 300);
  });

  // Load saved state
  const raw = localStorage.getItem('cyberState');
  if (raw) {
    try {
      const st = JSON.parse(raw);
      s1.value = st.r1;
      s2.value = st.r2;
      s3.value = st.r3;
      updateLabels();
      renderBadge();
    } catch (e) {}
  }
}

// ═══════════════════════════════════════════════════════════════════
// SMOOTH SCROLL FOR NAVIGATION
// ═══════════════════════════════════════════════════════════════════

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80; // Account for fixed nav
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════════
// NAVIGATION ACTIVE STATE
// ═══════════════════════════════════════════════════════════════════

function initNavActiveState() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-cmd');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// ═══════════════════════════════════════════════════════════════════
// FLOATING CODE SNIPPETS
// ═══════════════════════════════════════════════════════════════════

function initFloatingCode() {
  const container = document.getElementById('floatingCode');
  if (!container) return;

  const codeSnippets = [
    'while (1) { hack(); }',
    'if (access == GRANTED)',
    '#include <freedom.h>',
    'chmod 777 world',
    'sudo rm -rf society',
    'echo "Hello, friend."',
    'cat /etc/shadow',
    'nmap -sV target',
    'SELECT * FROM users',
    'buffer[overflow++];'
  ];

  function createFloatingSnippet() {
    const snippet = document.createElement('div');
    snippet.className = 'floating-code';
    snippet.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    snippet.style.left = Math.random() * 100 + '%';
    snippet.style.top = Math.random() * 100 + '%';
    snippet.style.animation = `floatCode ${10 + Math.random() * 20}s linear infinite`;
    container.appendChild(snippet);

    setTimeout(() => snippet.remove(), 30000);
  }

  // Create initial snippets
  for (let i = 0; i < 5; i++) {
    setTimeout(createFloatingSnippet, i * 2000);
  }

  // Continue creating
  setInterval(createFloatingSnippet, 5000);
}

// ═══════════════════════════════════════════════════════════════════
// GLITCH EFFECTS ON HOVER
// ═══════════════════════════════════════════════════════════════════

function initGlitchEffects() {
  document.querySelectorAll('.glitch-hover').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.animation = 'glitchHover 0.3s ease';
    });
    
    el.addEventListener('animationend', () => {
      el.style.animation = '';
    });
  });
}

// ═══════════════════════════════════════════════════════════════════
// RANDOM GLITCH TRIGGER
// ═══════════════════════════════════════════════════════════════════

function initRandomGlitch() {
  setInterval(() => {
    if (Math.random() > 0.95) {
      document.body.style.animation = 'screenGlitch 0.1s ease';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 100);
    }
  }, 5000);
}

// ═══════════════════════════════════════════════════════════════════
// KONAMI CODE EASTER EGG
// ═══════════════════════════════════════════════════════════════════

function initKonamiCode() {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateHackerMode();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
}

function activateHackerMode() {
  document.body.style.filter = 'hue-rotate(180deg)';
  
  const message = document.createElement('div');
  message.innerHTML = `
    <div style="
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.95);
      border: 2px solid #00ff41;
      padding: 40px;
      z-index: 10001;
      text-align: center;
      font-family: 'JetBrains Mono', monospace;
      box-shadow: 0 0 50px rgba(0,255,65,0.5);
    ">
      <h2 style="color: #00ff41; margin-bottom: 20px;">🔓 HACKER MODE ACTIVATED</h2>
      <p style="color: #fff;">"Control is an illusion."</p>
      <p style="color: #8b949e; margin-top: 10px; font-size: 12px;">Press any key to continue...</p>
    </div>
  `;
  document.body.appendChild(message);

  const dismiss = () => {
    message.remove();
    document.body.style.filter = '';
    document.removeEventListener('keydown', dismiss);
    document.removeEventListener('click', dismiss);
  };

  setTimeout(() => {
    document.addEventListener('keydown', dismiss);
    document.addEventListener('click', dismiss);
  }, 100);
}

// ═══════════════════════════════════════════════════════════════════
// INITIALIZE EVERYTHING
// ═══════════════════════════════════════════════════════════════════

function initializeMainContent() {
  // Core functionality
  renderProjects();
  initFilters();
  initModal();
  initCyberModule();
  initSmoothScroll();
  initNavActiveState();
  initScrollAnimations();
  
  // Visual effects
  initGlitchEffects();
  initRandomGlitch();
  initFloatingCode();
  initKonamiCode();
  
  // Animate elements that are already visible
  setTimeout(() => {
    animateSkillMeters();
    animateCounters();
  }, 500);
  
  // Typewriter effect for lead text
  const leadEl = document.getElementById('typewriter-lead');
  if (leadEl) {
    const text = leadEl.textContent;
    leadEl.textContent = '';
    setTimeout(() => {
      typewriterEffect(leadEl, text, 20);
    }, 1000);
  }
}

// ═══════════════════════════════════════════════════════════════════
// DOM READY
// ═══════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Start Matrix rain immediately
  initMatrixRain();
  
  // Run boot sequence
  runBootSequence();
});

// Add CSS keyframe for floating code
const style = document.createElement('style');
style.textContent = `
  @keyframes floatCode {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10% { opacity: 0.1; }
    90% { opacity: 0.1; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes screenGlitch {
    0% { transform: translate(0); filter: hue-rotate(0deg); }
    25% { transform: translate(-2px, 2px); filter: hue-rotate(90deg); }
    50% { transform: translate(2px, -2px); filter: hue-rotate(180deg); }
    75% { transform: translate(-2px, -2px); filter: hue-rotate(270deg); }
    100% { transform: translate(0); filter: hue-rotate(360deg); }
  }
  
  .nav-cmd.active {
    color: #00ff41 !important;
    text-shadow: 0 0 10px #00ff41;
  }
  
  .nav-cmd.active::before {
    opacity: 1 !important;
  }
  
  .run-local .prompt {
    color: #00ff41;
    margin-right: 8px;
  }
  
  .run-local .comment {
    color: #484f58;
  }
`;
document.head.appendChild(style);
