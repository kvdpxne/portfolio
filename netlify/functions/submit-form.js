exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    try {
        const payload = JSON.parse(event.body);

        // Honeypot – jeśli pole website jest wypełnione, to bot
        if (payload.website && payload.website.length > 0) {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ success: true, message: 'Spam detected' })
            };
        }

        // Dodaj klucz dostępowy ze zmiennej środowiskowej
        payload.access_key = process.env.WEB3FORMS_ACCESS_KEY;
        payload.subject = 'Nowa wiadomość z portfolio';
        payload.from_name = 'lukaszpietrzak.dev';

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        return {
            statusCode: response.ok ? 200 : 400,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Server error' })
        };
    }
};