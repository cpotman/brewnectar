import PolicyLayout from "@/components/PolicyLayout";

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="June 1, 2026">
      <h2>1. Information We Collect</h2>
      <p>
        When you visit our site or make a purchase, we collect certain information about you, including your name, email address, shipping address, payment information, and browsing behavior on our site.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Process and fulfill your orders</li>
        <li>Communicate with you about your orders, account, and customer service inquiries</li>
        <li>Send you marketing communications (with your consent)</li>
        <li>Improve our website, products, and services</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>3. Information Sharing</h2>
      <p>
        We do not sell your personal information. We may share your information with trusted third-party service providers who assist us in operating our website, processing payments, and delivering orders. These providers are contractually obligated to keep your information confidential.
      </p>

      <h2>4. Cookies</h2>
      <p>
        We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings.
      </p>

      <h2>5. Data Security</h2>
      <p>
        We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Payment information is processed through PCI-compliant payment processors.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us at <strong>support@brewnectar.com</strong>.
      </p>
    </PolicyLayout>
  );
}
