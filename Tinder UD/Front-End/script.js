document.addEventListener('DOMContentLoaded', () => {

    // Common Elements that might confuse the script if missing
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // ==========================================
    // LOGIN / REGISTER REDIRECTS (Found on index.html)
    // ==========================================

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // SKIP onboarding for login demo
            window.location.href = "recs.html";
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // START onboarding for register demo
            window.location.href = "onboarding.html";
        });
    }

    // Modal Handling on Index
    const authModal = document.getElementById('authModal');
    if (authModal) {
        initAuthModalForIndex();
    }
    // ==========================================
    // PAGE SPECIFIC LOGIC INTIALIZATION
    // ==========================================

    // --- ONBOARDING PAGE ---
    if (document.getElementById('profileWizardForm')) {
        initOnboardingLogic();
    }

    // --- RECS PAGE ---
    if (document.getElementById('cardStack')) {
        initRecsLogic();
    }

    // --- SIDEBAR COMMON LOGIC ---
    initSidebar();
});

function initSidebar() {
    const sidebarMatches = document.getElementById('sidebarMatches');
    if (!sidebarMatches) return;

    const mockMatches = [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=60',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=60',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=60',
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=60',
        'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=100&q=60',
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=60'
    ];

    sidebarMatches.innerHTML = mockMatches.map(img => `
        <div class="sidebar-match-head" style="background-image: url('${img}')"></div>
    `).join('');
}

function initAuthModalForIndex() {
    const authModal = document.getElementById('authModal');
    const closeModalBtn = document.getElementById('closeModal');
    const loginBtnHTML = document.querySelector('.login-btn');
    const createAccountBtn = document.getElementById('createAccountBtn');

    if (!loginBtnHTML || !createAccountBtn) return;

    const modalTitle = document.getElementById('modalTitle');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const toggleText = document.getElementById('toggleText');
    let isLoginMode = true;

    function openModal(mode = 'login') {
        authModal.style.display = 'flex';
        mode === 'login' ? setLoginMode() : setRegisterMode();
    }

    function closeModal() {
        authModal.style.display = 'none';
    }

    function setLoginMode() {
        isLoginMode = true;
        modalTitle.innerText = "EMPEZAR";
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        toggleText.innerHTML = '¿No tienes cuenta? <a href="#" id="toggleAuthMode">Regístrate</a>';
        reattachToggleListener();
    }

    function setRegisterMode() {
        isLoginMode = false;
        modalTitle.innerText = "CREAR CUENTA";
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="toggleAuthMode">Inicia Sesión</a>';
        reattachToggleListener();
    }

    function reattachToggleListener() {
        const toggleLink = document.getElementById('toggleAuthMode');
        if (toggleLink) {
            toggleLink.addEventListener('click', (e) => {
                e.preventDefault();
                isLoginMode ? setRegisterMode() : setLoginMode();
            });
        }
    }

    loginBtnHTML.addEventListener('click', (e) => { e.preventDefault(); openModal('login'); });
    createAccountBtn.addEventListener('click', (e) => { e.preventDefault(); openModal('register'); });
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (e) => { if (e.target === authModal) closeModal(); });

    reattachToggleListener();
}

function initOnboardingLogic() {
    let currentStep = 1;
    const totalSteps = 4;
    const nextBtn = document.getElementById('nextStepBtn');
    const progressBar = document.getElementById('wizardProgress');

    if (!nextBtn) return;

    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            document.querySelector(`.wizard-step[data-step="${currentStep}"]`).classList.remove('active-step');
            currentStep++;
            document.querySelector(`.wizard-step[data-step="${currentStep}"]`).classList.add('active-step');
            progressBar.style.width = `${(currentStep / totalSteps) * 100}%`;
        } else {
            window.location.href = "recs.html";
        }
    });
}

function initRecsLogic() {
    const users = [
        { name: 'Andrea', age: 23, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=60' },
        { name: 'Jessica', age: 25, img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=60' },
        { name: 'Sofia', age: 21, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=60' }
    ];
    let currentUserIndex = 0;

    function loadCards() {
        const stack = document.getElementById('cardStack');
        if (!stack) return;

        stack.innerHTML = '';

        if (currentUserIndex >= users.length) {
            stack.innerHTML = '<div style="text-align:center; padding-top:50%; color:#555;">¡No hay más perfiles!</div>';
            return;
        }

        const user = users[currentUserIndex];
        const card = document.createElement('div');
        card.className = 'tinder-card';
        card.style.backgroundImage = `url('${user.img}')`;
        card.innerHTML = `
            <div class="card-info">
                <h3>${user.name}, ${user.age}</h3>
                <p>Digital Creative</p>
            </div>
        `;
        stack.appendChild(card);
    }

    loadCards();

    function swipe(direction) {
        const card = document.querySelector('.tinder-card');
        if (!card) return;

        card.style.transition = 'transform 0.5s ease, opacity 0.5s';
        if (direction === 'right') {
            card.style.transform = 'translate(200px, 50px) rotate(20deg)';
        } else {
            card.style.transform = 'translate(-200px, 50px) rotate(-20deg)';
        }
        card.style.opacity = '0';

        setTimeout(() => {
            currentUserIndex++;
            loadCards();
            if (direction === 'right' && Math.random() > 0.5) {
                showMatch(users[currentUserIndex - 1]);
            }
        }, 300);
    }
}
