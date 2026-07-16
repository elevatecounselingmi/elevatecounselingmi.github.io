# Elevate Counseling & Wellness — website

Static site (HTML/CSS/JS) with an optional PHP contact-form handler. No build step — deploy as-is.

## Deploy to Apache

1. Copy the whole folder into your site root, e.g. `/var/www/html/` or your virtual host's `DocumentRoot`.
2. Make sure `mod_deflate`, `mod_expires`, and `mod_headers` are enabled if you want `.htaccess` to take effect:
   ```
   sudo a2enmod deflate expires headers rewrite
   sudo systemctl restart apache2
   ```
3. If you want the contact form to actually send email, make sure PHP is installed and enabled (`sudo apt install php libapache2-mod-php`) and that your server can send mail (or swap the `mail()` call in `contact.php` for SMTP/PHPMailer, Postmark, SendGrid, etc.). Otherwise the form will show a friendly fallback message with your phone/email.
4. Once you have an SSL certificate, uncomment the HTTPS redirect lines in `.htaccess`.

## Files

```
index.html        Main page (all sections)
css/styles.css     All styling — colors and fonts are set as CSS variables at the top
js/script.js       Mobile nav, scroll reveal, accordion, form submission
contact.php        Optional server-side form handler
assets/logo.png    Your logo (full res)
assets/favicon-*   Generated favicon sizes
.htaccess          Apache caching/compression/security config
```

## Things to update before launch

- Real practice photo → replace the "Practice photo" placeholder in the About section (`.media-placeholder` in `index.html`).
- Address, phone, email → currently placeholders in the Contact section and footer.
- Testimonials → currently sample copy; swap in real, permissioned client quotes.
- `contact.php` → set `$to_email` to your real inbox.
- Insurance names in the FAQ → currently generic; name your actual in-network payers.

## Colors (edit in `css/styles.css` under `:root`)

| Token | Hex | Use |
|---|---|---|
| `--sage` / `--sage-dark` | #7C8C6E / #46543B | Primary brand color, buttons, icons |
| `--oak` / `--oak-pale` | #C9AD82 / #F3E9D8 | Section backgrounds, borders |
| `--gold` / `--gold-soft` | #B08A4E / #C9A667 | Accents only — eyebrows, underlines, small details |
| `--black` | #1C1B17 | Headlines, dark sections, footer |

## Adding your icon

Once you send over the icon, drop it in `assets/` and I'll wire it in — favicon, or as a small recurring accent mark near section headers, wherever fits best.
