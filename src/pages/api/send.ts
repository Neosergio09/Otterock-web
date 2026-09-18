import type { APIRoute } from 'astro';
import { Resend } from 'resend';

// Aquí pondremos la API Key de forma segura después
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const nombre = data.get('nombre');
  const email = data.get('email');
  const mensaje = data.get('mensaje');

  // Validación básica
  if (!nombre || !email || !mensaje) {
    return new Response(JSON.stringify({ message: "Faltan campos" }), { status: 400 });
  }

  const htmlContent = `
    <h1>Nuevo mensaje de contacto</h1>
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Mensaje:</strong> ${mensaje}</p>
  `;

  try {
    let response = await resend.emails.send({
      from: 'Otterock <sergio@otterock.tech>',
      to: 'sergio@otterock.tech',
      replyTo: email as string,
      subject: `🚀 Nuevo proyecto: ${nombre}`,
      html: htmlContent,
    });

    // Fallback si el dominio corporativo aún está propagándose en Resend
    if (response.error) {
      response = await resend.emails.send({
        from: 'Otterock Web <onboarding@resend.dev>',
        to: 'sergio@otterock.tech',
        replyTo: email as string,
        subject: `🚀 Nuevo proyecto: ${nombre}`,
        html: htmlContent,
      });
    }

    if (response.error) {
      return new Response(JSON.stringify({ message: response.error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "¡Correo enviado con éxito!" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error al enviar" }), { status: 500 });
  }
};