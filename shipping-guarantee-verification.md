# Shipping and Guarantee Verification

The reference page uses a compact green-dot shipment promise near the purchase controls with a bold weekday-and-date value. BrewNectar retains its existing green stock callout and now renders **“Order now and ships by: Thu, Aug 27”** using the visitor’s current date and the next business day.

Interactive inspection of `/stick-pack` confirmed that both the top and duplicated lower offer render the same session-stable date. The old **“Available for Next-Day Dispatch”** text is absent. The rendered page contains the updated **60-Day Guarantee** messaging and no customer-facing 30-day guarantee heading.

Desktop and mobile full-page captures show the new line fitting within the existing offer layout without overlap or truncation.

Additional mobile captures verified the 60-day wording on the home page, syrup product page, and refund policy. The policy consistently states a 60-day money-back and subscription-refund window. All 19 automated tests pass, including date rollover, weekend skipping, duplicate offer rendering, and stale-copy detection; the production build succeeds.

The actual `/about` and `/learn` routes were subsequently captured at both desktop and mobile widths. The About CTA and the Advertorial guarantee section display 60-day language without layout regressions. `/compare` and `/quiz` were also captured at mobile width; their responsive layouts remain intact, while source-level regression coverage confirms that the conditional comparison and quiz guarantee copy uses 60 days.
