# Owner actions before launch

Do not spend on ads yet.

## Required once Stripe review is approved

1. In Stripe, edit the Forever Familiar Payment Link.
2. Set **After payment → Redirect customers to your website** to:
   `https://foreverfamiliar.com/success?session_id={CHECKOUT_SESSION_ID}`
3. In Vercel production environment variables, add the Stripe **live secret key** as:
   `STRIPE_SECRET_KEY`
4. If available, also add the Payment Link ID (`plink_...`) as:
   `STRIPE_PAYMENT_LINK_ID`
5. Connect `foreverfamiliar.com` to the production project.
6. Confirm `hello@foreverfamiliar.com` can receive mail.
7. Run one real $29 purchase, verify studio access, download every deliverable, then refund the test payment.

## Never share

- Stripe secret key (`sk_live_...`)
- Webhook secret (`whsec_...`)
- Bank or card details

Those belong only in the appropriate secure dashboard fields.
