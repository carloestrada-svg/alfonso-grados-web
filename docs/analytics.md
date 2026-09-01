# Analítica y Google Tag Manager

## Contenedor

- Google Tag Manager: `GTM-TTCNSX96`
- Instalación global: `src/app/layout.tsx`
- El panel de Sanity (`/admin`) carga el contenedor por compartir el layout raíz, pero no emite los eventos personalizados definidos para el sitio público. Todas las etiquetas de medición deben excluir rutas que comiencen con `/admin`.

## Eventos disponibles en `dataLayer`

| Evento | Cuándo se emite | Parámetros |
| --- | --- | --- |
| `virtual_page_view` | Navegación interna sin recarga completa | `page_path`, `page_title` |
| `contact_click` | Clic en WhatsApp, teléfono o correo | `contact_method`, `page_path` |
| `social_click` | Clic hacia una red social compatible | `social_platform`, `page_path` |
| `file_download` | Apertura o descarga de un PDF/archivo | `file_extension`, `page_path` |
| `registration_click` | Clic en la inscripción de un evento | `event_label`, `link_domain`, `page_path` |
| `cta_click` | Clic interno hacia Contacto, Pregúntale o Súmate | `destination_path`, `page_path` |
| `outbound_click` | Clic hacia un dominio externo no clasificado | `link_domain`, `page_path` |
| `form_submit_attempt` | Intento de envío de un formulario presente o futuro | `form_name`, `page_path` |

## Reglas de privacidad

- La capa de datos no envía nombres, correos, teléfonos, mensajes, campos de formulario ni parámetros de consulta.
- Los enlaces de WhatsApp se clasifican por canal, sin exponer el número o el mensaje prellenado.
- Los identificadores de evento son slugs públicos y sanitizados.
- No se deben crear variables de GTM que lean valores escritos por las personas en formularios.

## Configuración de cada píxel

1. Crear la etiqueta base del proveedor en GTM.
2. Excluir las rutas que comiencen con `/admin`.
3. Crear activadores de tipo **Evento personalizado** usando los nombres de la tabla.
4. Mapear únicamente los parámetros documentados.
5. Validar con el modo **Preview** de GTM antes de publicar el contenedor.
6. Revisar consentimiento y Política de privacidad antes de activar etiquetas publicitarias o de remarketing.
