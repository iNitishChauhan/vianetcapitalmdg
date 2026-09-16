# Vianet Capital — website

Static site. All page copy lives in `content.json`. The build script turns that file plus the
templates into `dist/`, which is what gets published. The CMS at `/admin` edits `content.json`
through a browser form, so nobody needs to touch code to change wording or swap an image.

## Setup — once, about 20 minutes

1. **GitHub.** Create a repository and push this folder to it. Branch must be called `main`.
2. **Netlify.** Sign up, choose *Add new site → Import an existing project*, pick the repository.
   Netlify reads `netlify.toml` and already knows the build command and publish folder. Deploy.
3. **Identity.** In Netlify: *Site configuration → Identity → Enable Identity*.
   Under *Registration*, set it to **Invite only**.
   Under *Services → Git Gateway*, press **Enable Git Gateway**.
4. **Invite yourself.** Identity → Invite users → your email. Accept the invitation from the email,
   set a password.
5. **Domain.** Netlify → Domain management → add `vianet.capital`, then point the domain's
   nameservers or DNS records as Netlify instructs. HTTPS is issued automatically.

## Editing the site

Go to `https://vianet.capital/admin`, log in, edit any field, press **Publish**.
The site rebuilds and is live in roughly 30 seconds.

Images: any image field lets you upload a new file. It lands in `assets/img` automatically.

## The contact form

The form does nothing until it has an endpoint.

1. Create a form at [formspark.io](https://formspark.io) or [usebasin.com](https://usebasin.com).
   Set the destination to `info@vianet.capital`.
2. Copy the endpoint URL they give you.
3. In `/admin` → *Site settings* → **Form endpoint**, paste it. Publish.

The form then posts to that service, which filters spam and emails you the enquiry.

## Running it locally

    npm run dev

Builds and serves `dist/` at http://localhost:3000.

## Rules the build enforces

- `NETwork` in the tagline is wrapped in a non-breaking span. It cannot break across a line.
- The logo is inline SVG cut from the vector master. It is not an image file and should not be
  replaced with one.
- Colour, type scale and spacing live in `src/site.css` and follow the brand document. Changing
  them there changes them everywhere.

## What is not here yet

- Real hero photography — `assets/img/hero.jpg` and `band.jpg` are generated placeholders
- Privacy notice and terms are drafts and need legal review before launch
- No analytics. If you want it, Plausible or Fathom are privacy-friendly and need no cookie banner;
  Google Analytics would require one and a rewrite of the privacy notice
