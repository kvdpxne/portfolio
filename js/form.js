function initContactForm() {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    const nameInp = document.getElementById('name');
    const emailInp = document.getElementById('email');
    const msgInp = document.getElementById('message');
    const hp = document.getElementById('website');
    const submitBtn = form.querySelector('.btn-submit');

    const showErr = (inp, id) => { inp.classList.add('input-error'); document.getElementById(id).style.display = 'block'; };
    const clearErr = (inp, id) => { inp.classList.remove('input-error'); document.getElementById(id).style.display = 'none'; };

    const setDirty = (inp) => { inp.setAttribute('data-dirty', 'true'); };
    const isDirty = (inp) => inp.getAttribute('data-dirty') === 'true';

    nameInp.addEventListener('input', () => setDirty(nameInp));
    emailInp.addEventListener('input', () => setDirty(emailInp));
    msgInp.addEventListener('input', () => setDirty(msgInp));

    const valName = (force = false) => {
        const value = nameInp.value.trim();
        if (value.length === 0) {
            if (force || isDirty(nameInp)) { showErr(nameInp, 'nameError'); return false; }
            clearErr(nameInp, 'nameError'); return true;
        }initContactForm
        if (value.length < 2) { showErr(nameInp, 'nameError'); return false; }
        clearErr(nameInp, 'nameError'); return true;
    };

    const valEmail = (force = false) => {
        const value = emailInp.value.trim();
        if (value.length === 0) {
            if (force || isDirty(emailInp)) { showErr(emailInp, 'emailError'); return false; }
            clearErr(emailInp, 'emailError'); return true;
        }
        if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(value)) { showErr(emailInp, 'emailError'); return false; }
        clearErr(emailInp, 'emailError'); return true;
    };

    const valMsg = (force = false) => {
        const value = msgInp.value.trim();
        if (value.length === 0) {
            if (force || isDirty(msgInp)) { showErr(msgInp, 'messageError'); return false; }
            clearErr(msgInp, 'messageError'); return true;
        }
        if (value.length < 10) { showErr(msgInp, 'messageError'); return false; }
        clearErr(msgInp, 'messageError'); return true;
    };

    nameInp.addEventListener('blur', () => valName(false));
    emailInp.addEventListener('blur', () => valEmail(false));
    msgInp.addEventListener('blur', () => valMsg(false));

    // Auto‑rozszerzanie textarea
    const MAX_LINES = 32;
    const LINE_HEIGHT = 22; // px
    msgInp.addEventListener('input', () => {
        if (msgInp.value.length > 1500) {
            msgInp.value = msgInp.value.slice(0, 1500);
        }
        msgInp.style.height = 'auto';
        const maxHeight = MAX_LINES * LINE_HEIGHT;
        if (msgInp.scrollHeight <= maxHeight) {
            msgInp.style.height = msgInp.scrollHeight + 'px';
            msgInp.style.overflowY = 'hidden';
        } else {
            msgInp.style.height = maxHeight + 'px';
            msgInp.style.overflowY = 'auto';
        }
    });

    // Wysyłka przez Netlify Function
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Sprawdzenie honeypot
        if (hp.value) return;

        // Walidacja pól (z wymuszeniem przy próbie wysłania)
        const nameOk = valName(true);
        const emailOk = valEmail(true);
        const msgOk = valMsg(true);
        if (!nameOk || !emailOk || !msgOk) return;

        // Przygotowanie danych w formacie JSON
        const payload = {
            name: nameInp.value.trim(),
            email: emailInp.value.trim(),
            message: msgInp.value.trim(),
            website: hp.value // honeypot – pusty w normalnym użyciu
        };

        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Wysyłanie…';
        submitBtn.disabled = true;

        try {
            const response = await fetch('/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                success.style.display = 'block';
                form.reset();
                [nameInp, emailInp, msgInp].forEach(inp => inp.removeAttribute('data-dirty'));
                msgInp.style.height = '120px';
                msgInp.style.overflowY = 'hidden';
                setTimeout(() => { success.style.display = 'none'; }, 5000);
            } else {
                console.error('Form error:', data.message);
                alert('Błąd wysyłania: ' + (data.message || 'nieznany błąd'));
            }

        } catch (error) {
            console.error('Fetch error:', error);
            alert('Wystąpił problem z wysyłką. Spróbuj ponownie później.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}