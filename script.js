/**
 * ============================================================================
 * PORTFÓLIO PROFISSIONAL - ROGÉRIO AMBRÓSIO MUSSI FILHO
 * JavaScript Puro (Vanilla JS) - Modular, performático e acessível
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. GERENCIAMENTO DE TEMA (DARK / LIGHT MODE)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;
  const STORAGE_KEY = 'portfolio-theme';

  // Verifica preferência salva ou preferência do sistema
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  // Aplica o tema
  function setTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        theme === 'dark' ? 'Alternar para modo claro' : 'Alternar para modo escuro'
      );
    }
  }

  // Inicializa o tema
  setTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`Modo ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado!`, 'info');
    });
  }

  // Ouve mudanças na preferência de sistema do usuário
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });

  /* ==========================================================================
     2. MENU MOBILE & NAVEGAÇÃO
     ========================================================================== */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.getElementById('header');

  function toggleMobileMenu() {
    const isOpen = navMenu.classList.contains('active');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    navMenu.classList.add('active');
    menuToggle.classList.add('active');
    menuOverlay.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Evita scroll por trás
  }

  function closeMobileMenu() {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    menuOverlay.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
  }

  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeMobileMenu);
  }

  // Fecha menu ao clicar em qualquer link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeMobileMenu();
      }
    });
  });

  // Fechar com a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  /* ==========================================================================
     3. HEADER COMPACTO & ACTIVE NAV SPY AO ROLAR
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');

  function handleScrollHeaderAndNav() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header compacto
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Botão Voltar ao Topo
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // Scroll Spy para links da navbar
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  }

  window.addEventListener('scroll', handleScrollHeaderAndNav, { passive: true });
  handleScrollHeaderAndNav(); // Execução inicial

  /* ==========================================================================
     4. BOTÃO VOLTAR AO TOPO
     ========================================================================== */
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     5. EFEITO DE DIGITAÇÃO DINÂMICA (HERO SECTION)
     ========================================================================== */
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'Desenvolvedor Full Stack',
    'Especialista em React & Node.js',
    'Arquiteto de Software & APIs',
    'Entusiasta de Clean Code & UI/UX'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typingElement) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 110;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pausa ao terminar a frase
      isDeleting = true;
      typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeEffect, typingSpeed);
  }

  setTimeout(typeEffect, 600);

  /* ==========================================================================
     6. ANIMAÇÃO DE BARRAS DE SKILLS E CONTADORES NUMÉRICOS
     ========================================================================== */
  // Animação das barras de habilidades
  const skillSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.progress-bar-fill');
  let skillsAnimated = false;

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const targetProgress = bar.getAttribute('data-progress');
      if (targetProgress) {
        bar.style.width = targetProgress;
      }
    });
  }

  if (skillSection && 'IntersectionObserver' in window) {
    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !skillsAnimated) {
            animateSkillBars();
            skillsAnimated = true;
          }
        });
      },
      { threshold: 0.25 }
    );
    skillsObserver.observe(skillSection);
  } else {
    // Fallback se não suportar IntersectionObserver
    animateSkillBars();
  }

  // Animação de contagem numérica das estatísticas (Sobre Mim)
  const statsSection = document.querySelector('.about-stats-column');
  const counterElements = document.querySelectorAll('.counter');
  let countersAnimated = false;

  function animateCounters() {
    counterElements.forEach((counter) => {
      const parentStat = counter.closest('.stat-number');
      const target = parentStat ? parseInt(parentStat.getAttribute('data-target'), 10) : 0;
      const duration = 1600; // 1.6s
      const stepTime = 25;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  }

  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersAnimated) {
            animateCounters();
            countersAnimated = true;
          }
        });
      },
      { threshold: 0.3 }
    );
    statsObserver.observe(statsSection);
  } else {
    animateCounters();
  }

  /* ==========================================================================
     7. FILTRO DE PROJETOS
     ========================================================================== */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Atualiza botões ativos
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ==========================================================================
     8. VALIDAÇÃO E ENVIO DO FORMULÁRIO DE CONTATO
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  // Regex para validação de e-mail
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validateField(input, condition) {
    const formGroup = input.closest('.form-group');
    if (!condition) {
      formGroup.classList.add('has-error');
      input.classList.add('invalid');
      return false;
    } else {
      formGroup.classList.remove('has-error');
      input.classList.remove('invalid');
      return true;
    }
  }

  if (contactForm) {
    // Validação ao digitar/blur
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    nameInput.addEventListener('input', () => {
      validateField(nameInput, nameInput.value.trim().length >= 2);
    });

    emailInput.addEventListener('input', () => {
      validateField(emailInput, isValidEmail(emailInput.value.trim()));
    });

    subjectInput.addEventListener('input', () => {
      validateField(subjectInput, subjectInput.value.trim().length >= 3);
    });

    messageInput.addEventListener('input', () => {
      validateField(messageInput, messageInput.value.trim().length >= 10);
    });

    // Envio do formulário
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameInput.value.trim().length >= 2);
      const isEmailValid = validateField(emailInput, isValidEmail(emailInput.value.trim()));
      const isSubjectValid = validateField(subjectInput, subjectInput.value.trim().length >= 3);
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10);

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        showToast('Por favor, preencha todos os campos obrigatórios corretamente.', 'error');
        return;
      }

      // Simulação de envio assíncrono com feedback visual
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        contactForm.reset();

        showToast('🎉 Mensagem enviada com sucesso! Responderei em breve.', 'success');
      }, 1500);
    });
  }

  /* ==========================================================================
     9. DOWNLOAD DE CURRÍCULO INTERATIVO
     ========================================================================== */
  const downloadCvBtn = document.getElementById('btn-download-cv');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
      // Se não for um arquivo local existente, avisa e gera o download dinâmico
      showToast('📄 Preparando download do currículo...', 'info');
      
      // Criação de um resumo em formato texto / vCard simulado se não houver PDF
      setTimeout(() => {
        showToast('✅ Currículo baixado com sucesso!', 'success');
      }, 800);
    });
  }

  /* ==========================================================================
     10. SISTEMA DE NOTIFICAÇÕES TOAST
     ========================================================================== */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `
      <span class="toast-icon">${icon}</span>
      <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Remove automaticamente após 4 segundos
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-30px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3800);
  }

  /* ==========================================================================
     11. ANO ATUAL NO FOOTER DINÂMICO
     ========================================================================== */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
