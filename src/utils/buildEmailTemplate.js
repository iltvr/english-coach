/**
 * buildEmailTemplate(data)
 * Returns a full HTML email body for application data.
 */
export function buildEmailTemplate(data) {
  const esc = str => String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br/>');

  return /* html */`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f4f7; color: #51545e; margin: 0; padding: 0; }
      .email-wrapper { width: 100%; background-color: #f4f4f7; padding: 20px; }
      .email-content { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 4px; overflow: hidden; }
      .email-header { background-color: #3869d4; padding: 20px; text-align: center; }
      .email-header h1 { margin: 0; font-size: 24px; color: #ffffff; }
      .email-body { padding: 20px; }
      .email-body h2 { font-size: 18px; margin-top: 0; color: #333333; }
      .details { width: 100%; border-collapse: collapse; }
      .details td { padding: 8px 0; vertical-align: top; }
      .details .label { width: 150px; font-weight: bold; color: #333333; }
      .footer { padding: 20px; text-align: center; font-size: 12px; color: #888888; }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-content">
        <div class="email-header">
          <h1>📝 New Application Received</h1>
        </div>
        <div class="email-body">
          <h2>Applicant Details</h2>
          <table class="details">
            <tr>
              <td class="label">Name:</td><td>${esc(data.name)}</td>
            </tr>
            <tr>
              <td class="label">Email:</td><td>${esc(data.email)}</td>
            </tr>
            <tr>
              <td class="label">Contact:</td><td>${esc(data.contact)}</td>
            </tr>
            <tr>
              <td class="label">Time Slot:</td><td>${esc(data.timeSlot)}</td>
            </tr>
            <tr>
              <td class="label">Purpose:</td><td>${esc(data.purpose)}</td>
            </tr>
            <tr>
              <td class="label">Timeframe:</td><td>${esc(data.timeframe)}</td>
            </tr>
            <tr>
              <td class="label">Weekly Time:</td><td>${esc(data.weeklyTime)}</td>
            </tr>
            <tr>
              <td class="label">Experience:</td><td>${esc(data.experience)}</td>
            </tr>
            <tr>
              <td class="label">Terms Agreed:</td><td>${data.termsAgreed ? 'Yes' : 'No'}</td>
            </tr>
          </table>

          <hr>
          <table class="details">
            <tr>
              <td class="label">IP Address:</td><td>${esc(data.ipAddress)}</td>
            </tr>
            <tr>
              <td class="label">Browser:</td><td>${esc(data.browserInfo)}</td>
            </tr>
            <tr>
              <td class="label">Time Zone:</td><td>${esc(data.timeZone)}</td>
            </tr>
            <tr>
              <td class="label">Submitted:</td><td>${esc(data.submissionTime)}</td>
            </tr>
          </table>
        </div>
        <div class="footer">
          <p>You’re receiving this email because a new application was submitted.</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}
