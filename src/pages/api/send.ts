import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  // Aseguramos la lectura de la API Key
  const apiKey = process.env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;
  
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'No se encontró la API Key en Vercel' }), { status: 500 });
  }

  const resend = new Resend(apiKey);

  try {
    const formData = await request.formData();
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const mensaje = formData.get('mensaje');

    // Intentamos enviar y capturamos la respuesta completa
    const result = await resend.emails.send({
      from: 'Otterock <onboarding@resend.dev>', // NO CAMBIES ESTO
      to: 'otterock11@gmail.com',
      subject: `Consulta Web: ${nombre}`,
      html: `<strong>Nombre:</strong> ${nombre}<br><strong>Email:</strong> ${email}<br><p>${mensaje}</p>`,
    });

    // REVISIÓN CRÍTICA
    if (result.error) {
      console.error("DETALLE DEL ERROR EN RESEND:", result.error);
      // Esto hará que el log de Vercel ya no sea 200, sino 400
      return new Response(JSON.stringify({ 
        message: 'Resend rechazó el correo', 
        detalles: result.error 
      }), { status: 400 });
    }

    console.log("¡ÉXITO TOTAL! ID del correo:", result.data?.id);
    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (e: any) {
    console.error("ERROR DE CÓDIGO:", e.message);
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};