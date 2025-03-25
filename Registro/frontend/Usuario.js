const API_URL = "https://cl2blb9z-4000.use.devtunnels.ms"; // Cambia según tu URL del backend

// Función para mostrar el formulario de registro
function showRegister() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'block';
}

// Función para mostrar el formulario de login
function showLogin() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

// Registro de usuario
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerPasswordConfirm').value;

    if (password !== confirmPassword) {
        document.getElementById('registerMessage').textContent = "Las contraseñas no coinciden.";
        return;
    }

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('registerMessage').textContent = data.message;
            showLogin();
        } else {
            document.getElementById('registerMessage').textContent = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('registerMessage').textContent = "Error al registrar usuario";
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('username', username);
            // Redirige con el usuario en la URL
            window.location.href = `https://cl2blb9z-5000.use.devtunnels.ms/?user=${encodeURIComponent(username)}`;
        }else {
            document.getElementById('loginMessage').textContent = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loginMessage').textContent = "Error al iniciar sesión";
    }
});