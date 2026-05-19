// app.js

// ─────────────────────────────────────────
// 1. BANCO DE DADOS (localStorage)
// ─────────────────────────────────────────
function initDB() {
    if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([]));
    if (!localStorage.getItem('todos'))  localStorage.setItem('todos',  JSON.stringify([]));
}

const db = {
    getUsers:   ()          => JSON.parse(localStorage.getItem('users')) || [],
    getTodos:   ()          => JSON.parse(localStorage.getItem('todos'))  || [],
    saveUsers:  (data)      => localStorage.setItem('users', JSON.stringify(data)),
    saveTodos:  (data)      => localStorage.setItem('todos',  JSON.stringify(data)),
    getSession: ()          => JSON.parse(localStorage.getItem('currentUser')),
    setSession: (user)      => localStorage.setItem('currentUser', JSON.stringify(user)),
    clearSession: ()        => localStorage.removeItem('currentUser'),
};

// ─────────────────────────────────────────
// 2. UTILITÁRIOS DOM
// ─────────────────────────────────────────
const $ = (id) => document.getElementById(id);

// Auth
const authContainer  = $('auth-container');
const loginFormDiv   = $('login-form');
const registerFormDiv = $('register-form');
const formLogin      = $('form-login');
const formRegister   = $('form-register');
const loginEmail     = $('login-email');
const loginPassword  = $('login-password');
const regName        = $('reg-name');
const regEmail       = $('reg-email');
const regPassword    = $('reg-password');

// App
const appContainer   = $('app-container');
const userGreeting   = $('user-greeting');
const btnLogout      = $('btn-logout');
const formAddTask    = $('form-add-task');
const taskTitle      = $('task-title');
const taskType       = $('task-type');
const taskDescription = $('task-description');
const taskList       = $('task-list');
const emptyState     = $('empty-state');
const taskCounter    = $('task-counter');

// ─────────────────────────────────────────
// 3. UTILITÁRIOS DE ERRO
// ─────────────────────────────────────────
function clearErrors() {
    document.querySelectorAll('[id$="-error"],[id$="-msg"]').forEach(el => {
        el.textContent = '';
        el.classList.add('hidden');
    });
}

function showError(id, msg) {
    const el = $(id);
    el.textContent = msg;
    el.classList.remove('hidden');
}

// ─────────────────────────────────────────
// 4. NAVEGAÇÃO ENTRE FORMULÁRIOS
// ─────────────────────────────────────────
$('btn-show-register').addEventListener('click', () => {
    loginFormDiv.classList.add('hidden');
    registerFormDiv.classList.remove('hidden');
    clearErrors();
});

$('btn-show-login').addEventListener('click', () => {
    registerFormDiv.classList.add('hidden');
    loginFormDiv.classList.remove('hidden');
    clearErrors();
});

// ─────────────────────────────────────────
// 5. CADASTRO
// ─────────────────────────────────────────
formRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name     = regName.value.trim();
    const email    = regEmail.value.trim();
    const password = regPassword.value;

    let valid = true;
    if (!name)     { showError('reg-name-error',     'Informe seu nome.');   valid = false; }
    if (!email)    { showError('reg-email-error',    'Informe seu e-mail.'); valid = false; }
    if (!password) { showError('reg-password-error', 'Informe sua senha.');  valid = false; }
    if (!valid) return;

    const users = db.getUsers();
    if (users.find(u => u.email === email)) {
        showError('reg-general-error', 'Este e-mail já está em uso.');
        return;
    }

    users.push({ id: Date.now().toString(), name, email, password });
    db.saveUsers(users);

    $('reg-success-msg').classList.remove('hidden');
    formRegister.reset();
    setTimeout(() => $('btn-show-login').click(), 1500);
});

// ─────────────────────────────────────────
// 6. LOGIN
// ─────────────────────────────────────────
formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const email    = loginEmail.value.trim();
    const password = loginPassword.value;

    let valid = true;
    if (!email)    { showError('login-email-error',    'Informe seu e-mail.'); valid = false; }
    if (!password) { showError('login-password-error', 'Informe sua senha.');  valid = false; }
    if (!valid) return;

    const user = db.getUsers().find(u => u.email === email);
    if (!user || user.password !== password) {
        showError('login-general-error', 'E-mail não cadastrado ou senha incorreta.');
        return;
    }

    db.setSession({ id: user.id, name: user.name, email: user.email });
    formLogin.reset();
    checkAuthStatus();
});

// ─────────────────────────────────────────
// 7. LOGOUT
// ─────────────────────────────────────────
btnLogout.addEventListener('click', () => {
    db.clearSession();
    checkAuthStatus();
});

// ─────────────────────────────────────────
// 8. ADICIONAR TAREFA
// ─────────────────────────────────────────
formAddTask.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const title = taskTitle.value.trim();
    if (!title) {
        showError('task-title-error', 'O título da tarefa é obrigatório.');
        taskTitle.focus();
        return;
    }

    const currentUser = db.getSession();
    const newTodo = {
        id:          Date.now().toString(),
        userId:      currentUser.email,
        title,
        type:        taskType.value,
        description: taskDescription.value.trim(),
        done:        false,
    };

    const todos = db.getTodos();
    todos.push(newTodo);
    db.saveTodos(todos);

    formAddTask.reset();
    renderTasks();
});

// ─────────────────────────────────────────
// 9. CONCLUIR TAREFA
// ─────────────────────────────────────────
function completeTask(taskId) {
    const todos = db.getTodos().map(t =>
        t.id === taskId ? { ...t, done: true } : t
    );
    db.saveTodos(todos);
    renderTasks();
}

// ─────────────────────────────────────────
// 10. BADGE DE TIPO
// ─────────────────────────────────────────
const typeBadgeClass = {
    'Trabalho': 'badge-trabalho',
    'Pessoal':  'badge-pessoal',
    'Estudos':  'badge-estudos',
};
const typeEmoji = {
    'Trabalho': '💼',
    'Pessoal':  '🏠',
    'Estudos':  '📚',
};

// ─────────────────────────────────────────
// 11. RENDERIZAR TAREFAS
// ─────────────────────────────────────────
function renderTasks() {
    const currentUser = db.getSession();
    if (!currentUser) return;

    const all   = db.getTodos().filter(t => t.userId === currentUser.email);
    const active = all.filter(t => !t.done);
    const done   = all.filter(t => t.done);
    const sorted = [...active, ...done];   // pendentes primeiro, concluídas por último

    // Atualiza contador
    const total     = sorted.length;
    const doneCount = done.length;
    taskCounter.textContent = total > 0 ? `${doneCount}/${total} concluída${doneCount !== 1 ? 's' : ''}` : '';

    // Empty state
    if (sorted.length === 0) {
        taskList.innerHTML = '';
        emptyState.classList.remove('hidden');
        return;
    }
    emptyState.classList.add('hidden');

    // Renderiza cards
    taskList.innerHTML = sorted.map(todo => {
        const badgeClass = typeBadgeClass[todo.type] || 'badge-trabalho';
        const emoji      = typeEmoji[todo.type] || '';
        const doneClass  = todo.done ? 'task-done' : '';
        const descHTML   = todo.description
            ? `<p class="text-slate-500 text-xs mt-1.5 leading-relaxed">${escapeHTML(todo.description)}</p>`
            : '';

        return `
        <div id="todo-${todo.id}" class="glass-card rounded-xl px-5 py-4 flex items-start justify-between gap-4 transition-all duration-300 ${doneClass} fade-in">
            <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2 mb-1">
                    <span class="task-title font-medium text-slate-200 text-sm leading-snug">${escapeHTML(todo.title)}</span>
                    <span class="text-[11px] font-medium px-2 py-0.5 rounded-full ${badgeClass}">${emoji} ${todo.type}</span>
                    ${todo.done ? '<span class="text-[11px] text-slate-600 font-medium">✓ Concluída</span>' : ''}
                </div>
                ${descHTML}
            </div>
            <button
                class="btn-concluir flex-shrink-0 mt-0.5"
                onclick="completeTask('${todo.id}')"
                ${todo.done ? 'disabled' : ''}
                aria-label="Marcar como concluída">
                ${todo.done ? '✓ Feito' : 'Concluir'}
            </button>
        </div>`;
    }).join('');
}

// Previne XSS ao inserir conteúdo no HTML
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ─────────────────────────────────────────
// 12. ROTEAMENTO (SPA)
// ─────────────────────────────────────────
function checkAuthStatus() {
    const currentUser = db.getSession();

    if (currentUser) {
        authContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
        userGreeting.textContent = `Olá, ${currentUser.name} 👋`;
        renderTasks();
    } else {
        appContainer.classList.add('hidden');
        authContainer.classList.remove('hidden');
        loginFormDiv.classList.remove('hidden');
        registerFormDiv.classList.add('hidden');
        clearErrors();
    }
}

// ─────────────────────────────────────────
// 13. BOOTSTRAP
// ─────────────────────────────────────────
initDB();
checkAuthStatus();
