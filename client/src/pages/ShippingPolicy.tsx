import PolicyLayout from "@/components/PolicyLayout";

export default function ShippingPolicy() {
  return (
    <PolicyLayout title="Shipping Policy" lastUpdated="June 1, 2026">
      <h2>Free Shipping</h2>
      <p>
        All orders ship free within the United States. No minimum purchase required — every order gets free standard shipping.
      </p>

      <h2>Processing Time</h2>
      <p>
        Orders are processed within 24 hours of being placed (excluding weekends and holidays). You'll receive a confirmation email with tracking information once your order ships.
      </p>

      <h2>Delivery Times</h2>
      <ul>
        <li><strong>Standard Shipping (Free):</strong> 3–5 business days via USPS Priority Mail</li>
        <li><strong>Expedited Shipping:</strong> 1–2 business days (available at checkout for an additional fee)</li>
      </ul>

      <h2>Subscription Shipments</h2>
      <p>
        Subscription orders ship automatically based on your selected frequency (every 4, 8, or 12 weeks). You'll receive a shipping notification email each time a new order is dispatched.
      </p>

      <h2>Order Tracking</h2>
      <p>
        Once your order ships, you'll receive an email with a tracking number. You can use this to track your package on the USPS website or through the link provided in your confirmation email.
      </p>

      <h2>International Shipping</h2>
      <p>
        We currently ship to the United States only. International shipping is coming soon. Sign up for our newsletter to be notified when we expand to your region.
      </p>

      <h2>Lost or Delayed Packages</h2>
      <p>
        If your package hasn't arrived within 7 business days of the estimated delivery date, please contact us at <strong>support@brewnectar.com</strong>. We'll work with the carrier to locate your package or send a replacement at no cost.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about shipping? Email us at <strong>support@brewnectar.com</strong>.
      </p>
    </PolicyLayout>
  );
}
