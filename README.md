# ENGINEERS4URSERVICE Static Website

This is a static HTML/CSS/JavaScript version of the ENGINEERS4URSERVICE website, designed to work with traditional web hosting providers that support PHP but not Node.js/Next.js.

## Files Structure

\`\`\`
/
├── index.html              # Homepage
├── contact.html            # Contact page
├── services.html           # Services page
├── about.html              # About page (to be created)
├── banking.html            # Banking page (to be created)
├── send-email.php          # PHP email handler
├── styles/
│   └── main.css           # Main stylesheet
├── js/
│   ├── main.js            # Main JavaScript functionality
│   └── contact.js         # Contact form handling
├── images/                # Image assets
└── README.md              # This file
\`\`\`

## Setup Instructions

1. **Upload Files**: Upload all files to your web hosting provider's public_html or www directory.

2. **Configure Email**: 
   - Edit `send-email.php` and change the email addresses:
     - `$to_email` - Your email address where contact forms will be sent
     - `$from_email` - Your domain email address (e.g., noreply@yourdomain.com)

3. **Test Email Functionality**:
   - Make sure your hosting provider supports PHP mail() function
   - Test the contact form to ensure emails are being sent
   - Check spam folders if emails don't arrive

4. **Update Images**:
   - Replace placeholder images in the `/images/` folder with your actual images
   - Ensure image paths in HTML files match your uploaded images

5. **Customize Content**:
   - Update contact information in all HTML files
   - Modify company details, phone numbers, and addresses
   - Customize service descriptions and pricing

## Features

- **Responsive Design**: Works on all devices (desktop, tablet, mobile)
- **Contact Form**: PHP-powered contact form with validation
- **Image Carousel**: Auto-playing hero carousel with navigation
- **Smooth Animations**: CSS animations and scroll effects
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Cross-browser Compatible**: Works in all modern browsers

## PHP Email Configuration

The `send-email.php` script uses PHP's built-in `mail()` function. For better email delivery, consider:

1. **SMTP Configuration**: Configure your hosting provider's SMTP settings
2. **SPF/DKIM Records**: Set up proper DNS records for better deliverability
3. **Email Logging**: The script logs successful submissions and errors

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+

## Hosting Requirements

- PHP 7.0 or higher
- Apache/Nginx web server
- PHP mail() function enabled
- File write permissions for logging (optional)

## Security Notes

- The contact form includes basic validation and sanitization
- Consider adding CAPTCHA for additional spam protection
- Regularly update PHP version for security patches
- Monitor contact form logs for suspicious activity

## Customization

To customize the website:

1. **Colors**: Edit CSS custom properties in `styles/main.css`
2. **Fonts**: Change Google Fonts imports in HTML files
3. **Content**: Update text content directly in HTML files
4. **Images**: Replace images in `/images/` folder
5. **Functionality**: Modify JavaScript in `/js/` folder

## Support

For technical support or customization requests, contact your web developer or hosting provider.
