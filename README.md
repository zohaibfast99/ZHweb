# ZH2 Technologies — Website

Marketing site for ZH2 Technologies. It is a static HTML/CSS/JS site served by a small
Express server, which also handles contact-form submissions and relays them by email.

## Requirements

- Node.js 22 or newer (the start script uses the built-in `--env-file-if-exists` flag)
- A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833)
  for sending contact-form mail

## Getting started

```bash
npm install
cp .env.example .env    # then fill in your credentials
npm start
```

The site is served at http://localhost:3000.

## Configuration

All configuration is read from the environment; see `.env.example` for the full list.

| Variable     | Required | Description                                                    |
| ------------ | -------- | -------------------------------------------------------------- |
| `EMAIL_USER` | yes      | Gmail address used to send contact-form mail                     |
| `EMAIL_PASS` | yes      | Google **App Password** for that account (not the login password) |
| `CONTACT_TO` | no       | Inbox that receives submissions (defaults to `EMAIL_USER`)       |
| `PORT`       | no       | Port to listen on (defaults to `3000`)                           |

The server exits at startup if `EMAIL_USER` or `EMAIL_PASS` is missing. Never commit a
real `.env` — it is git-ignored.

## Project structure

```
index.html              Home page: hero, about, tech stack, services,
                        portfolio, stats, testimonials, contact
service-details.html    Detail pages for each service (anchored per service)
portfolio-details.html  Case-study detail page
server.js               Express server: serves the site, handles the contact form
assets/
  css/main.css          Site styles
  js/main.js            Site behaviour (nav, AOS, Swiper, Isotope, lightbox)
  img/                  Images
  vendor/               Third-party libraries (Bootstrap, AOS, Swiper, GLightbox,
                        Isotope, imagesLoaded, PureCounter)
  BackgroundVid.mp4     Hero background video
```

## Contact form

The form posts `multipart/form-data` to `POST /forms/contact.php`, which `server.js`
implements in Node. The path is a leftover from the original template and is kept
because the bundled `assets/vendor/php-email-form/validate.js` expects a plain `OK`
response from that URL; if you change the route, update the form `action` in
`index.html` to match.

## Deployment

Any host that can run Node works. Set the environment variables in the host's config
rather than shipping a `.env` file, then run `npm ci && npm start`.

Note that asset paths are case-sensitive on Linux hosts — keep image filenames exactly
as referenced in the HTML.

## Credits

Built on the [Gp](https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/)
template by BootstrapMade, used under its
[license](https://bootstrapmade.com/license/).
