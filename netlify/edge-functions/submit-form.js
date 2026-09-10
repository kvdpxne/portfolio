export default async (request, context) => {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ message: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const payload = await request.json();

        // Honeypot
        if (payload.website && payload.website.length > 0) {
            return new Response(JSON.stringify({ success: true, message: 'Spam detected' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Klucz ze zmiennej środowiskowej Netlify
        payload.access_key = Netlify.env.get('WEB3FORMS_ACCESS_KEY');
        payload.subject = 'Nowa wiadomość z portfolio';
        payload.from_name = 'Portfolio Łukasza Pietrzaka';

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': request.headers.get('origin') || 'https://lukaszpietrzak.dev',
                'Referer': request.headers.get('referer') || 'https://lukaszpietrzak.dev/'
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        return new Response(JSON.stringify(data), {
            status: response.ok ? 200 : 400,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const config = {
    path: "/api/submit-form"
};