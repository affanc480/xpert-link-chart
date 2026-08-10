import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.SMTP_HOST) {
    console.warn("[EMAIL] SMTP not configured — emails will be logged, not sent.");
    return null;
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

function baseTemplate({ title, body }) {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; border: 1px solid #eee; border-radius: 12px;">
    <h2 style="color:#111; margin-bottom: 4px;">Xpert Link</h2>
    <h3 style="color:#2563eb; margin-top: 0;">${title}</h3>
    <div style="color:#333; font-size: 15px; line-height: 1.6;">${body}</div>
    <p style="color:#999; font-size: 12px; margin-top: 32px;">If you didn't request this, you can safely ignore this email.</p>
  </div>`;
}

async function sendMail({ to, subject, html }) {
  const t = getTransporter();

  if (!t) {
    console.log(`[EMAIL:MOCK] To: ${to} | Subject: ${subject}\n${html}`);
    return { mocked: true };
  }

  return t.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  });
}

export async function sendOtpEmail(to, otp, purpose = "verification") {
  const subject =
    purpose === "reset" ? "Your password reset code" : "Verify your email";
  const html = baseTemplate({
    title: subject,
    body: `<p>Your one-time code is:</p>
      <p style="font-size: 28px; font-weight: 700; letter-spacing: 6px; color:#2563eb;">${otp}</p>
      <p>This code expires in 10 minutes.</p>`,
  });
  return sendMail({ to, subject, html });
}

export async function sendWelcomeEmail(to, name) {
  const html = baseTemplate({
    title: "Welcome to Xpert Link",
    body: `<p>Hi ${name || ""},</p><p>Your account has been created successfully. Please verify your email using the code we sent to continue.</p>`,
  });
  return sendMail({ to, subject: "Welcome to Xpert Link", html });
}

export async function sendPasswordChangedEmail(to) {
  const html = baseTemplate({
    title: "Your password was changed",
    body: `<p>This is a confirmation that your Xpert Link account password was just changed. If this wasn't you, contact support immediately.</p>`,
  });
  return sendMail({ to, subject: "Password changed", html });
}

export async function sendContactNotification({ name, email, phone, subject, message }) {
  const to = process.env.CONTACT_TO_EMAIL || process.env.EMAIL_FROM;
  const html = baseTemplate({
    title: "New contact form submission",
    body: `<p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      ${phone ? `<p><b>Phone:</b> ${phone}</p>` : ""}
      ${subject ? `<p><b>Subject:</b> ${subject}</p>` : ""}
      <p><b>Message:</b><br/>${message}</p>`,
  });
  return sendMail({ to, subject: `New inquiry: ${subject || "Contact form"}`, html });
}
