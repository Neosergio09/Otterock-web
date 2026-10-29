import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { nombre: 100, email: 254, mensaje: 5000 };

// Rate limit en memoria: 5 envíos por IP cada 10 min.
// En serverless solo aplica por instancia; frena ráfagas, no ataques distribuidos.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const json = (message: string, status: number) =>
  new Response(JSON.stringify({ message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || clientAddress;
  if (isRateLimited(ip)) {
    return json('Demasiados intentos, intenta más tarde', 429);
  }

  let data: FormData;
  try {
    data = await request.formData();
  } catch {
    return json('Solicitud inválida', 400);
  }

  // Honeypot: campo oculto que solo rellenan los bots. Respondemos 200 para no darles pistas.
  if (String(data.get('website') ?? '').trim()) {
    return json('¡Correo enviado con éxito!', 200);
  }

  const nombre = String(data.get('nombre') ?? '').trim();
  const email = String(data.get('email') ?? '').trim();
  const mensaje = String(data.get('mensaje') ?? '').trim();

  if (!nombre || !email || !mensaje) {
    return json('Faltan campos', 400);
  }
  if (nombre.length > MAX.nombre || email.length > MAX.email || mensaje.length > MAX.mensaje) {
    return json('Algún campo es demasiado largo', 400);
  }
  if (!EMAIL_RE.test(email)) {
    return json('Correo inválido', 400);
  }

  const htmlContent = `
    <h1>Nuevo mensaje de contacto</h1>
    <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Mensaje:</strong><br>${escapeHtml(mensaje).replace(/\r?\n/g, '<br>')}</p>
  `;
  // Sin saltos de línea en el asunto
  const subject = `🚀 Nuevo proyecto: ${nombre.replace(/[\r\n]+/g, ' ')}`;

  try {
    let response = await resend.emails.send({
      from: 'Otterock <sergio@otterock.tech>',
      to: 'sergio@otterock.tech',
      replyTo: email,
      subject,
      html: htmlContent,
    });

    // Fallback si el dominio corporativo aún está propagándose en Resend
    if (response.error) {
      console.error('Resend (dominio propio):', response.error);
      response = await resend.emails.send({
        from: 'Otterock Web <onboarding@resend.dev>',
        to: 'sergio@otterock.tech',
        replyTo: email,
        subject,
        html: htmlContent,
      });
    }

    if (response.error) {
      console.error('Resend (fallback):', response.error);
      return json('Error al enviar', 500);
    }

    return json('¡Correo enviado con éxito!', 200);
  } catch (error) {
    console.error('Error enviando correo:', error);
    return json('Error al enviar', 500);
  }
};
