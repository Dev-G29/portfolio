# Contact Form Email Setup Guide

## Quick Explanation

When someone fills out the contact form on your portfolio website, you need a way for that form submission to reach your email inbox. **You cannot send emails directly from a website to an email address** - this is blocked for security reasons.

There are several ways to handle this:

### Option 1: EmailJS (Recommended - Easiest) ⭐

**EmailJS uses your existing Gmail account** - it doesn't create a new email. It just connects your website to your Gmail so form submissions can be sent as emails to your inbox.

- ✅ Free tier: 200 emails/month
- ✅ Uses your existing Gmail
- ✅ No backend code needed
- ✅ Simple setup

### Option 2: Formspree

Similar to EmailJS, but uses Formspree's service.

### Option 3: Simple mailto Link

Replace the form with a simple mailto link that opens the user's email client. (Less user-friendly)

### Option 4: Your Own Backend

Build a backend server to handle email sending. (More complex)

---

## EmailJS Setup (Option 1 - Recommended)

**Important Understanding**: EmailJS is NOT a replacement for your Gmail account. It's a service that connects to your **existing Gmail account** so your website can send emails through it. Think of it as a bridge between your website and your Gmail.

## Why Do You Need EmailJS?

You cannot directly send emails from a website (client-side JavaScript) to an email address for security reasons. EmailJS solves this by:
- Connecting to your existing Gmail account
- Acting as a secure gateway to send emails from your website
- Using your Gmail to actually deliver the emails

**You will still receive emails in your regular Gmail inbox** - EmailJS just facilitates the sending.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (free tier includes 200 emails/month)
3. This is just an account to manage the service - you're not creating a new email address

## Step 2: Connect Your Existing Gmail Account

1. After logging in, go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose **Gmail** as your email provider
4. Follow the setup instructions to connect your **existing Gmail account** (the one you already use)
5. You'll authorize EmailJS to send emails on behalf of your Gmail account
6. Note down your **Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}
```

4. Click **Save**
5. Note down your **Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** and copy it

## Step 5: Configure the Portfolio

You have two options to configure EmailJS:

### Option A: Environment Variables (Recommended)

1. Create a `.env` file in the `dev_portfolio` folder (same level as `package.json`)
2. Add the following variables:

```
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
```

3. Replace the placeholder values with your actual credentials
4. **Important**: Restart your development server after adding environment variables

### Option B: Edit App.js Directly

1. Open `dev_portfolio/src/App.js`
2. Find the `handleSubmit` function (around line 200)
3. Replace these placeholders:
   - `YOUR_PUBLIC_KEY` → Your EmailJS Public Key
   - `YOUR_SERVICE_ID` → Your Email Service ID
   - `YOUR_TEMPLATE_ID` → Your Email Template ID

## Step 6: Test the Contact Form

1. Start your development server: `npm start`
2. Fill out the contact form on your portfolio
3. Submit the form
4. Check your email inbox for the message

## Troubleshooting

- **Form shows "Email service not configured"**: Make sure you've added your EmailJS credentials
- **Emails not arriving**: Check your spam folder, verify EmailJS service is connected correctly
- **Environment variables not working**: Make sure the `.env` file is in the correct location and you've restarted the dev server

## Security Note

The Public Key in EmailJS is safe to expose in client-side code. However, you can also add rate limiting in your EmailJS dashboard to prevent abuse.

## Free Tier Limits

- 200 emails per month (free tier)
- Upgrade to paid plans for more emails if needed

For more help, visit the [EmailJS Documentation](https://www.emailjs.com/docs/).

