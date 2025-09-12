const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  try {
    const { name, email, message } = JSON.parse(event.body);

    // Validate required fields
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'All fields are required' 
        })
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ 
          success: false, 
          message: 'Invalid email address' 
        })
      };
    }

    // Create transporter (you'll need to configure this with your email service)
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@engineers4urservice.co.za',
      to: process.env.TO_EMAIL || 'info@engineers4urservice.co.za',
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center;">
            <h2>New Contact Form Submission</h2>
            <p>ENGINEERS4URSERVICE Website</p>
          </div>
          <div style="background-color: #f9f9f9; padding: 20px;">
            <div style="margin-bottom: 15px;">
              <strong>Name:</strong><br>
              <div style="background-color: white; padding: 10px; border-left: 4px solid #dc2626; margin-top: 5px;">
                ${name}
              </div>
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Email:</strong><br>
              <div style="background-color: white; padding: 10px; border-left: 4px solid #dc2626; margin-top: 5px;">
                <a href="mailto:${email}">${email}</a>
              </div>
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Message:</strong><br>
              <div style="background-color: white; padding: 10px; border-left: 4px solid #dc2626; margin-top: 5px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div style="margin-bottom: 15px;">
              <strong>Submitted:</strong><br>
              <div style="background-color: white; padding: 10px; border-left: 4px solid #dc2626; margin-top: 5px;">
                ${new Date().toLocaleString()}
              </div>
            </div>
          </div>
          <div style="background-color: #1f2937; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p>This email was sent from the ENGINEERS4URSERVICE contact form.</p>
            <p>Reply directly to this email to respond to the inquiry.</p>
            <p>Phone: 064 617 1074 | Email: info@engineers4urservice.co.za</p>
          </div>
        </div>
      `,
      text: `
        New Contact Form Submission - ENGINEERS4URSERVICE

        Name: ${name}
        Email: ${email}
        Message: ${message}
        Submitted: ${new Date().toLocaleString()}
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message! We will get back to you within 24 hours.' 
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        message: 'Failed to send email. Please try again later.' 
      })
    };
  }
};
