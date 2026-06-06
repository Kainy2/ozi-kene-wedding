import { generateWeddingICS, icsToBase64 } from '../utils/icsGenerator';

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const SENDER_NAME = import.meta.env.VITE_SENDER_NAME;
const SENDER_EMAIL = import.meta.env.VITE_SENDER_EMAIL;

interface SendEmailParams {
  to: string;
  guestName: string;
  weddingHashtag: string;
  weddingTitle: string;
  weddingDate: string;
  churchName: string;
  churchAddress: string;
  churchTime: string;
  churchMapLink: string;
  receptionName: string;
  receptionAddress: string;
  receptionTime: string;
  receptionMapLink: string;
  inviteImageUrl?: string;
  inviteToken?: string;
  inviteBaseUrl?: string;
}

async function fetchImageAsBase64(url: string): Promise<{ base64: string; contentType: string } | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const buffer = await response.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    return { base64, contentType };
  } catch {
    return null;
  }
}

export async function sendRsvpConfirmation(params: SendEmailParams) {
  // Validate required env vars
  if (!BREVO_API_KEY) {
    console.error('Brevo: Missing VITE_BREVO_API_KEY');
    throw new Error('Email service not configured');
  }
  if (!SENDER_EMAIL) {
    console.error('Brevo: Missing VITE_SENDER_EMAIL');
    throw new Error('Sender email not configured');
  }

  // Fetch invite image and embed as base64 inline attachment
  let inviteImageCid: string | undefined;
  const attachments: Array<{ content: string; name: string; contentId?: string }> = [];

  if (params.inviteImageUrl) {
    const imageData = await fetchImageAsBase64(params.inviteImageUrl);
    if (imageData) {
      inviteImageCid = 'invite-card';
      attachments.push({
        content: imageData.base64,
        name: 'invite-card.jpg',
        contentId: inviteImageCid,
      });
    }
  }

  const emailHtml = generateRsvpConfirmationEmail({ ...params, inviteImageCid });

  // Generate ICS calendar file
  const icsContent = generateWeddingICS({
    title: params.weddingTitle,
    date: params.weddingDate,
    address: params.churchAddress,
  });
  const icsBase64 = icsToBase64(icsContent);
  attachments.push({
    content: icsBase64,
    name: `${params.weddingHashtag.toLowerCase().replace(/\s+/g, '-') || 'wedding'}-invite.ics`,
  });

  console.log('Brevo: Sending email to', params.to, 'with calendar attachment');
  console.log('Brevo sent data:',{
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: SENDER_NAME || 'Wedding Invitation',
        email: SENDER_EMAIL,
      },
      to: [{ email: params.to, name: params.guestName }],
      subject: `You're invited — ${params.weddingTitle} Wedding`,
      htmlContent: emailHtml,
      attachment: attachments,
    }),
  });

  const response = await fetch(BREVO_API_URL, {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'api-key': BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: {
        name: SENDER_NAME || 'Wedding Invitation',
        email: SENDER_EMAIL,
      },
      to: [{ email: params.to, name: params.guestName }],
      subject: `You're invited — ${params.weddingTitle} Wedding`,
      htmlContent: emailHtml,
      attachment: attachments,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    console.error('Brevo API Error:', response.status, errorData);
    throw new Error(`Failed to send email: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  console.log('Brevo: Email sent successfully', result);
  return result;
}

function generateRsvpConfirmationEmail(params: SendEmailParams & { inviteImageCid?: string }): string {
  const qrUrl = params.inviteToken && params.inviteBaseUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(params.inviteBaseUrl + '/rsvp/' + params.inviteToken)}`
    : null;

  return `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; font-family: Georgia, serif; background-color: #faf8f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="color: #636B2F; font-size: 28px; margin: 0 0 8px;">
        ${params.weddingTitle}
      </h1>
      <p style="color: #3A3A3A; font-size: 16px; margin: 0;">${params.weddingDate}</p>
    </div>

    <!-- Greeting -->
    <p style="color: #3A3A3A; font-size: 16px; line-height: 1.7; margin-bottom: 8px;">
      Dear <strong>${params.guestName}</strong>,
    </p>
    <p style="color: #3A3A3A; font-size: 16px; line-height: 1.7; margin-bottom: 32px;">
      Thank you for confirming your attendance! We are absolutely thrilled to have you join us on our special day. Below are all the details you'll need.
    </p>

    <!-- Wedding Details -->
    <div style="background: white; border: 1px solid #e8e0d8; border-radius: 10px; padding: 28px; margin-bottom: 28px;">
      <h2 style="color: #636B2F; font-size: 18px; margin: 0 0 20px; text-transform: uppercase; letter-spacing: 1px;">
        Wedding Details
      </h2>

      <!-- Church -->
      <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f0ebe4;">
        <p style="font-size: 12px; color: #BE5EA5; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 6px;">
          Ceremony
        </p>
        <p style="color: #3A3A3A; font-size: 15px; font-weight: bold; margin: 0 0 4px;">${params.churchName}</p>
        <p style="color: #5a5a5a; font-size: 14px; margin: 0 0 4px;">${params.churchAddress}</p>
        <p style="color: #636B2F; font-size: 14px; font-weight: 600; margin: 0 0 10px;">⏰ ${params.churchTime}</p>
        <a href="${params.churchMapLink}"
           style="display: inline-block; background-color: #636B2F; color: white;
                  padding: 8px 20px; text-decoration: none; border-radius: 6px;
                  font-size: 13px; font-weight: 600;">
          Get Directions →
        </a>
      </div>

      <!-- Reception -->
      <div>
        <p style="font-size: 12px; color: #BE5EA5; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 6px;">
          Reception
        </p>
        <p style="color: #3A3A3A; font-size: 15px; font-weight: bold; margin: 0 0 4px;">${params.receptionName}</p>
        <p style="color: #5a5a5a; font-size: 14px; margin: 0 0 4px;">${params.receptionAddress}</p>
        <p style="color: #636B2F; font-size: 14px; font-weight: 600; margin: 0 0 10px;">⏰ ${params.receptionTime}</p>
        <a href="${params.receptionMapLink}"
           style="display: inline-block; background-color: #636B2F; color: white;
                  padding: 8px 20px; text-decoration: none; border-radius: 6px;
                  font-size: 13px; font-weight: 600;">
          Get Directions →
        </a>
      </div>
    </div>

    <!-- Invite card -->
    ${params.inviteImageCid || params.inviteImageUrl ? `
    <div style="margin-bottom: 28px; text-align: center;">
      <img src="${params.inviteImageCid ? `cid:${params.inviteImageCid}` : params.inviteImageUrl}" alt="Wedding Invitation"
           style="max-width: 100%; height: auto; border-radius: 8px;" />
    </div>
    ` : ''}

    <!-- QR Code -->
    ${qrUrl ? `
    <div style="background: white; border: 1px solid #e8e0d8; border-radius: 10px; padding: 28px; margin-bottom: 28px; text-align: center;">
      <h2 style="color: #636B2F; font-size: 18px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 1px;">
        Your Entry QR Code
      </h2>
      <p style="color: #3A3A3A; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
        Scan below to access your personal invite details.
      </p>
      <img src="${qrUrl}" alt="Entry QR Code"
           style="width: 220px; height: 220px; display: block; margin: 0 auto 20px;" />
      <div style="background: #fff3f0; border: 1.5px solid #e05c3a; border-radius: 8px; padding: 16px 20px;">
        <p style="color: #c0392b; font-size: 14px; font-weight: bold; margin: 0 0 6px;">
          ⚠️ IMPORTANT — Entry Requirement
        </p>
        <p style="color: #3A3A3A; font-size: 13px; line-height: 1.6; margin: 0;">
          This QR code will be scanned at the venue entrance. <strong>Please have it ready on your phone or printed.</strong> Guests without a valid QR code will be denied entry.
        </p>
      </div>
    </div>
    ` : ''}

    <!-- Calendar reminder -->
    <p style="color: #5a5a5a; text-align: center; font-size: 13px; margin-bottom: 32px;">
      📅 A calendar file (.ics) is attached — tap it to save the date to your calendar.
    </p>

    <!-- Footer -->
    <p style="color: #636B2F; text-align: center; font-size: 16px; font-style: italic; margin: 0;">
      We can't wait to celebrate with you!
    </p>
    <p style="color: #3A3A3A; text-align: center; font-size: 15px; margin: 8px 0 0;">
      — ${params.weddingTitle}
    </p>

  </div>
</body>
</html>
  `;
}
