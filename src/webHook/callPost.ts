import crypto from 'crypto';

function logger(status: string, res: any): void {
    console.log(`[Web Hook]`, {
        time: new Date().toLocaleTimeString('en-US'),
        status,
        response: res
    });
}

export default async function callWebhook(): Promise<{ status: number }> {
    try {
        const secret = process.env.WEBHOOK_SECRET

        if (!secret) throw new Error('WEBHOOK_SECRET not set');

        const payload = JSON.stringify({ event: 'create_post', path: 'post' });

        const signature = `sha256=` + crypto
            .createHmac('sha256', secret)
            .update(payload)
            .digest('hex');

        const response = await fetch("http://localhost:3000/api/webhooks/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-signature-key": signature
            },
            body: payload
        });

        const data = await response.json();

        if (!response.ok) {
            logger('error', data);
            throw new Error('Failed to revalidate path');
        }

        logger('success', data);
        return { status: 200 };

    } catch (err) {
        logger('error', err instanceof Error ? err.message : err);
        return { status: 500 };
    }
}
