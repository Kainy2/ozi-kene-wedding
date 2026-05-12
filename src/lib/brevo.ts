import { generateWeddingICS, icsToBase64 } from '../utils/icsGenerator';

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const SENDER_NAME = import.meta.env.VITE_SENDER_NAME;
const SENDER_EMAIL = import.meta.env.VITE_SENDER_EMAIL;

interface SendEmailParams {
  to: string;
  guestName: string;
  weddingTitle: string;
  weddingDate: string;
  venueAddress: string;
  venueMapLink: string;
  inviteImageUrl?: string;
  inviteToken?: string;
  inviteBaseUrl?: string;
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

  const emailHtml = generateRsvpConfirmationEmail(params);

  // Generate ICS calendar file
  const icsContent = generateWeddingICS({
    title: params.weddingTitle,
    date: params.weddingDate,
    address: params.venueAddress,
  });
  const icsBase64 = icsToBase64(icsContent);

  console.log('Brevo: Sending email to', params.to, 'with calendar attachment');

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
      subject: 'Wedding Invitation Confirmation',
      htmlContent: emailHtml,
      attachment: [
        {
          content: icsBase64,
          name: 'the-forever-affair-invite.ics',
        }
      ],
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

function generateRsvpConfirmationEmail(params: SendEmailParams): string {
  return `
<!DOCTYPE html>
<html>
<body style="margin: 0; padding: 0; font-family: Georgia, serif; background-color: #faf8f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    ${params.inviteImageUrl ? `
    <div style="margin-bottom: 32px; text-align: center;">
      <img src="${params.inviteImageUrl}" alt="Wedding Invitation"
           style="max-width: 100%; height: auto; border-radius: 8px;" />
    </div>
    ` : ''}

    <h1 style="color: #5a4a3a; text-align: center; margin-bottom: 16px;">
      Dear ${params.guestName},
    </h1>

    <p style="color: #6b5d4f; text-align: center; font-size: 16px; line-height: 1.6;">
      Thank you for confirming your attendance! We're thrilled to celebrate with you.
    </p>

    ${params.inviteToken && params.inviteBaseUrl ? `
    <div style="text-align: center; margin: 24px 0; padding: 24px; background: #f5f1ed; border-radius: 8px;">
      <div style="font-size: 12px; color: #8b7d6f; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px;">
        Quick Access
      </div>
      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(params.inviteBaseUrl + '/rsvp/' + params.inviteToken)}"
        alt="QR Code for RSVP Details"
        style="width: 200px; height: 200px; display: block; margin: 0 auto 12px;"
      />
      <div style="font-size: 14px; color: #6b5d4f; line-height: 1.6;">
        Scan to view invite details
      </div>
    </div>
    ` : ''}

    <div style="background: white; padding: 24px; border-radius: 8px; margin: 24px 0;">
      <h2 style="color: #5a4a3a; margin-top: 0;">${params.weddingTitle}</h2>
      <p style="color: #6b5d4f; margin: 8px 0;">${params.weddingDate}</p>
      <p style="color: #8b7d6f; margin: 8px 0;">${params.venueAddress}</p>
    </div>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${params.venueMapLink}"
         style="display: inline-block; background-color: #8ba888; color: white;
                padding: 12px 32px; text-decoration: none; border-radius: 6px;
                font-weight: 600;">
        Open in Maps
      </a>
    </div>

    <p style="color: #8b7d6f; text-align: center; font-size: 14px; margin: 16px 0;">
      📅 A calendar file (.ics) is attached to this email. Click it to add the event to your calendar.
    </p>

    <p style="color: #8b7d6f; text-align: center; font-size: 14px; margin-top: 32px;">
      We can't wait to see you there!
    </p>

  </div>
</body>
</html>
  `;
}
