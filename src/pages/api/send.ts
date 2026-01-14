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

  try {
    const send = await resend.emails.send({
      from: 'Otterock Web <onboarding@resend.dev>', // Luego podrás usar tu propio dominio
      to: 'otterock11@gmail.com',
      subject: `🚀 Nuevo proyecto: ${nombre}`,
      html: `
        <h1>Nuevo mensaje de contacto</h1>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
      `,
    });

    return new Response(JSON.stringify({ message: "¡Correo enviado con éxito!" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error al enviar" }), { status: 500 });
  }
};