# Forever Familiar — Production v7

A browser-first digital pet memorial business with a paid-access gate verified against Stripe Checkout.

## Customer flow

1. Public site → $29 Stripe Payment Link
2. Stripe redirects to `/success?session_id={CHECKOUT_SESSION_ID}`
3. `/api/verify` retrieves the Checkout Session from Stripe
4. Only a completed, paid USD $29 session can open `/api/studio`
5. The tribute studio generates six downloadable keepsake pieces in the customer's browser

## Required Vercel environment variable

`STRIPE_SECRET_KEY=sk_live_...`

Optional but strongly recommended after you copy the Payment Link ID from Stripe:

`STRIPE_PAYMENT_LINK_ID=plink_...`

The secret key must be stored only as a Vercel environment variable. Never put it in HTML, GitHub, screenshots, or chat.

## Stripe Payment Link setting

Edit the Forever Familiar Payment Link → After payment → Redirect customers to:

`https://foreverfamiliar.com/success?session_id={CHECKOUT_SESSION_ID}`

Stripe officially supports the `{CHECKOUT_SESSION_ID}` placeholder for Payment Link redirect URLs.

## Launch gate

Before sending public traffic:

- Stripe account review is complete
- `foreverfamiliar.com` points to this production project
- `STRIPE_SECRET_KEY` is added in Vercel production environment
- Stripe redirect contains `{CHECKOUT_SESSION_ID}` exactly as shown above
- `hello@foreverfamiliar.com` works, or support links are changed to an active mailbox
- Run one real $29 owner purchase end-to-end, then refund it in Stripe
- Confirm the paid success page opens the studio and an unpaid/direct studio attempt is rejected
- Download and inspect all six outputs on mobile and desktop

## Product outputs

- Memorial letter PNG + complete writing TXT
- 8×10 keepsake PNG
- Phone wallpaper PNG
- Social tribute PNG + caption
- Remembrance reading card PNG
- Little Things card PNG

## Privacy model

The studio is delivered after Stripe verifies payment. The pet photo and typed memories are then processed locally in the customer's browser. The current implementation does not upload those inputs to Forever Familiar.

## Public asset inventory
- `assets/cover.webp` — hero product presentation
- `assets/input.webp` — input-to-output example
- `assets/pack.webp` — six-piece pack overview
- `assets/charlie.webp`, `luna.webp`, `daisy.webp`, `jasper.webp`, `mochi.webp` — fictional example tribute sets
- `assets/lifestyle.webp` — lifestyle usage montage
- `assets/story.webp` — video/poster creative
- `media/video/forever-familiar-15s-reel.mp4` — launch/demo reel
- `media/pinterest/*.jpg` — six discovery creatives
- `media/partners/forever-familiar-partner-one-pager.png` — partner handout
- `media.html` — public gallery that exposes all customer-facing media and examples
