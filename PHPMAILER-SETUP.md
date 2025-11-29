# PHPMailer Configuration Guide

## Gmail SMTP Setup

To send emails through Gmail, you need to use an **App Password** (not your regular Gmail password).

### Steps to Generate Gmail App Password:

1. **Enable 2-Step Verification**
   - Go to https://myaccount.google.com/security
   - Click "2-Step Verification"
   - Follow the setup process

2. **Generate App Password**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it "MyCiti Website"
   - Click "Generate"
   - **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

3. **Update contact-phpmailer.php**
   - Open `contact-phpmailer.php`
   - Find line: `define("SMTP_PASSWORD", "");`
   - Replace with: `define("SMTP_PASSWORD", "your-app-password-here");`
   - Remove spaces from the app password

### Example Configuration:

```php
define("SMTP_HOST", "smtp.gmail.com");
define("SMTP_PORT", 587);
define("SMTP_USERNAME", "mycitiownersassociation@gmail.com");
define("SMTP_PASSWORD", "abcdefghijklmnop");  // 16-char app password
define("SMTP_SECURE", "tls");
```

## Alternative Email Providers

### Microsoft Outlook/Office 365:
```php
define("SMTP_HOST", "smtp-mail.outlook.com");
define("SMTP_PORT", 587);
define("SMTP_USERNAME", "your-email@outlook.com");
define("SMTP_PASSWORD", "your-password");
define("SMTP_SECURE", "tls");
```

### Yahoo Mail:
```php
define("SMTP_HOST", "smtp.mail.yahoo.com");
define("SMTP_PORT", 587);
define("SMTP_USERNAME", "your-email@yahoo.com");
define("SMTP_PASSWORD", "your-app-password");
define("SMTP_SECURE", "tls");
```

### Custom SMTP Server:
```php
define("SMTP_HOST", "mail.yourdomain.com");
define("SMTP_PORT", 587);  // or 465 for SSL
define("SMTP_USERNAME", "contact@yourdomain.com");
define("SMTP_PASSWORD", "your-password");
define("SMTP_SECURE", "tls");  // or "ssl"
```

## Update Your Website Form

Change the form action in `index.html` from:
```html
<form action="contact.php" method="POST">
```

To:
```html
<form action="contact-phpmailer.php" method="POST">
```

## Testing

1. **Update the SMTP password** in `contact-phpmailer.php`
2. **Update the form action** in `index.html`
3. **Upload to your web server** (won't work on localhost without mail config)
4. **Test using** `test-form-manually.html`
5. **Check email** at mycitiownersassociation@gmail.com

## Troubleshooting

### "SMTP connect() failed"
- Check your app password is correct
- Verify 2-step verification is enabled
- Ensure your hosting allows outbound SMTP connections

### "Could not authenticate"
- Double-check username and password
- Make sure you're using an app password (not regular password)
- Verify the email address is correct

### Email not received
- Check spam/junk folder
- Verify recipient email is correct
- Check server error logs for details

## Security Notes

⚠️ **IMPORTANT**: 
- Never commit passwords to Git
- Use environment variables for production
- Keep `contact-phpmailer.php` secure
- Add to `.gitignore` if storing passwords in file

## Need Help?

If you encounter issues:
1. Check PHP error logs on your server
2. Test with a simple PHP script first
3. Contact your hosting provider about SMTP support
4. Consider using a transactional email service (SendGrid, Mailgun, etc.)
