// "Policy and T&C" page (/new-page). Two columns: Privacy Policy on the left, Terms & Conditions on the right.
// The copy is reproduced from the original page. Note for the site owner: this text is Jobber's
// help-center guidance about *writing* a privacy policy and terms of service, not a policy specific to
// Square One Electric. It should be replaced with the business's own policy before relying on it.

const jobberLinks = {
  twoWay: 'https://help.getjobber.com/hc/en-us/articles/360051087154',
  dpn: 'https://help.getjobber.com/hc/en-us/articles/360047029094',
  tcr: 'https://www.campaignregistry.com/',
  website: 'https://help.getjobber.com/hc/en-us/articles/25620058162455',
  privacyReq: 'https://help.getjobber.com/hc/en-us/articles/34842183031959',
};

const ext = (href, text) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;

module.exports = {
  title: 'Policy and T&C',
  description: 'Privacy policy and terms and conditions for Square One Electric in Bartlett, TN.',
  columns: [
    {
      heading: 'Privacy Policy',
      html: `
<h3>Overview</h3>
<p>To use ${ext(jobberLinks.twoWay, 'two-way text messaging')} in Jobber with a ${ext(jobberLinks.dpn, 'dedicated phone number')} (DPN), you’ll need to have a clear and accessible privacy policy published on your website. This isn’t just a best practice—it’s a requirement set by ${ext(jobberLinks.tcr, 'The Campaign Registry')} (TCR), the body that oversees business text messaging in the United States.</p>
<p>TCR works with mobile carriers to make sure companies using A2P (application-to-person) messaging are transparent about how they handle customer data. If you don’t provide a link to your privacy policy during your DPN application, your request will be rejected. That means you won’t be able to send or receive client texts through Jobber until it’s in place.</p>
<p>This guide will help you get set up successfully by walking you through:</p>
<ul>
  <li><strong>Why a privacy policy is required</strong>: How TCR guidelines protect both your business and your customers.</li>
  <li><strong>What carriers typically look for in a privacy policy</strong>: The key components messaging carriers look for.</li>
  <li><strong>How to share your policy</strong>: How to link your privacy policy so your DPN application is approved without delays.</li>
</ul>
<div class="policy-note">
  <p><strong>Note</strong></p>
  <p><strong>This list is for informational purposes only and isn’t legal advice.</strong></p>
  <p>Your privacy policy should reflect your business practices and comply with applicable privacy laws. We recommend consulting a legal professional to assist in preparing your privacy policy.</p>
</div>

<h3>What's a privacy policy and why do I need one for my DPN application?</h3>
<p>A privacy policy is a statement on your website that explains how your business collects, uses, and protects customer information. For example, if a client texts you their address to confirm an appointment, your privacy policy tells them what you’ll do with that information—like whether you’ll only use it for scheduling or also store it for future jobs.</p>
<p>When you apply for a dedicated phone number in Jobber, your application is reviewed through The Campaign Registry (TCR). TCR is an organization that carriers use to make sure businesses follow the rules for text messaging. One of the TCR's key requirements is that every business has a publicly available privacy policy linked on their website. Without a privacy policy link, your dedicated phone number application won’t be approved.</p>
<p>In short: a privacy policy is your way of saying, “Here’s how we handle your information, and here’s how we keep it safe.” It keeps carriers happy, and ensures your DPN application doesn’t hit a roadblock.</p>

<h3>What do carriers typically look for in a privacy policy?</h3>
<p>Every business is different, so your privacy policy should reflect how your business operates and ensure it complies with laws that apply to your business. Carriers will typically look for the below items in your privacy policy when reviewing your DPN application, however this should not be considered an exhaustive list. As noted above, every business is different so their privacy policy will differ as well.</p>
<ul>
  <li><strong>Your business details</strong>: Include your business name, address, phone number, and email so customers know who’s contacting them.</li>
  <li><strong>What customers can expect from your text messages</strong>: Explain the kinds of messages you send (like appointment reminders, invoices, updates, or promotions) and how often customers might receive them.</li>
  <li><strong>What information you collect</strong>: For example: a customer’s name, phone number, email, or service history.</li>
  <li><strong>How you use that information</strong>: For instance, sending job reminders, providing customer support, or managing their account.</li>
  <li><strong>How you store and protect data</strong>: Include a simple statement about using secure systems, restricted access, or industry-standard safeguards.</li>
  <li><strong>Whether you share information</strong>: If you work with third parties like payment processors or service partners let customers know if their information may be shared and why.</li>
  <li><strong>Customer rights</strong>: Let people know how they can update their information or request that you remove it.</li>
  <li><strong>Opting out and getting help</strong>: Carriers require you to include instructions on how to unsubscribe or get assistance.</li>
</ul>

<h3>Share your privacy policy</h3>
<p>Once your privacy policy has been created, the next step is making it publicly accessible. This is important because carriers (through The Campaign Registry) require a link to your policy when reviewing your DPN application.</p>
<p>Here are some common ways to share it:</p>
<ul>
  <li><strong>On your website</strong>: The easiest option is to add your privacy policy as a separate page on your website (for example, www.yourbusiness.com/privacy-policy). That way you can copy and paste the link directly into your dedicated phone number application.</li>
  <li><strong>If you don’t have a website yet</strong>: You can:
    <ul>
      <li>${ext(jobberLinks.website, 'Set up a Jobber website')}. Your privacy policy can be added as a page on your site.</li>
      <li>Create a free page using a website builder (like Wix, Squarespace, or Google Sites) and paste your policy there.</li>
      <li>Upload your policy as a PDF or text file to a cloud service (such as Google Drive, Dropbox, or OneDrive) and make it viewable with a shareable link.</li>
    </ul>
  </li>
</ul>
<p>The important part is that your policy is publicly accessible so that anyone with the link can view it without logging in. Remember that you should always ensure your chosen method is compliant with applicable laws in your jurisdiction and meet your business' need.</p>

<h3>Submit your DPN application</h3>
<p>If your dedicated phone number application is rejected (for any reason), you will be notified through a banner in your account that states:</p>
<p>IMMEDIATE ACTION REQUIRED. Your Dedicated Phone Number for SMS/Text has been halted because your registration is FAILED. You have submitted incomplete or inaccurate information in your registration and must RESUBMIT with correct information. Jobber forwards your application upon submission, and applications can take up to 3 weeks to process. Submit immediately to minimize disruptions. NOTE: This registration is required by all US Cell Carriers and Jobber cannot modify this requirement.</p>
<p>To avoid delays, re-submit your dedicated phone number application and make sure your privacy policy is published on your website and easy to find. We may also follow up to request a direct link to your policy if it isn’t included in your application.</p>
`,
    },
    {
      heading: 'Terms & Conditions',
      html: `
<h3>Overview</h3>
<p>To use ${ext(jobberLinks.twoWay, 'two-way text messaging')} in Jobber with a ${ext(jobberLinks.dpn, 'dedicated phone number')} (DPN), you’ll need to have clear and accessible terms of service published on your website. This isn’t just a best practice—it’s a requirement set by ${ext(jobberLinks.tcr, 'The Campaign Registry')} (TCR), the body that oversees business text messaging in the United States.</p>
<p>TCR works with mobile carriers to make sure companies using A2P (application-to-person) messaging are transparent about how they handle customer data. If you don’t provide a link to your terms of service during your DPN application, your request will be rejected. That means you won’t be able to send or receive client texts through Jobber until it’s in place.</p>
<div class="policy-note">
  <p><strong>This article is for informational purposes only and isn’t legal advice.</strong> Your terms of service should reflect your business practices and comply with applicable laws. We recommend consulting a legal professional to assist in preparing your terms of service.</p>
</div>

<h3>What are terms of service and why do I need them for my DPN application?</h3>
<p>Terms of service (sometimes called terms &amp; conditions or terms of use) explain the rules and guidelines for using your services, including how customers communicate with your business. When it comes to texting, this can include things like what types of messages you’ll send, how often customers might hear from you, and how they can opt out of messages if they choose.</p>
<p>When you apply for a dedicated phone number in Jobber, your application is reviewed through The Campaign Registry (TCR). TCR is an organization that carriers use to make sure businesses follow the rules for text messaging. One of the TCR's key requirements is that every business has a publicly available terms of service linked on their website that meets industry standards for SMS messaging.</p>
<p>Without a valid terms of service link, or if your terms don’t clearly explain how texting is used, your dedicated phone number application may be rejected.</p>

<h3>What do carriers typically look for in terms of service?</h3>
<p>Every business is different, so your terms of service should reflect how your business operates and ensure it complies with laws that apply to your business. Carriers will typically look for the below items in your terms of service when reviewing your DPN application, however this should not be considered an exhaustive list. As noted above, every business is different so their terms of service will differ as well.</p>
<ul>
  <li><strong>Program or brand name</strong>: The name of your business or messaging program so customers know exactly who is sending them messages.</li>
  <li><strong>Program description</strong>: What the messaging program is used for. For example, let customers know whether texts are for appointment reminders, service updates, invoices, promotions, or customer support.</li>
  <li><strong>Message and data rates disclosure</strong>: A simple statement that message and data rates may apply. Carriers often require customers to be informed that standard carrier fees could be charged.</li>
  <li><strong>Message frequency</strong>: How often customers can expect to receive messages.</li>
  <li><strong>Customer support contact information</strong>: A way for customers to reach you if they have questions or need help, such as a phone number, email address, or instructions to reply HELP.</li>
  <li><strong>Opt-out instructions (STOP)</strong>: How customers can unsubscribe by texting keywords like STOP to opt out. These instructions should be easy to find and displayed in bold to help meet carrier requirements.</li>
  <li><strong>Link to your privacy policy</strong>: A link to your privacy policy so customers can review how their personal information is collected, used, and protected. Learn more about ${ext(jobberLinks.privacyReq, 'Privacy Policy Requirements for your Dedicated Phone Number Application')}.</li>
</ul>

<h3>Share your terms of service</h3>
<p>Once your terms of service have been created, the next step is making it publicly accessible. This is important because carriers (through The Campaign Registry) require a link to your terms when reviewing your DPN application.</p>
<ul>
  <li><strong>On your website</strong>: The easiest option is to add your terms of service as a separate page on your website (for example, www.yourbusiness.com/terms). That way you can copy and paste the link directly into your dedicated phone number application.</li>
  <li><strong>If you don’t have a website yet</strong>: You can:
    <ul>
      <li>${ext(jobberLinks.website, 'Set up a Jobber website')}. Your terms of service can be added as a page on your site.</li>
      <li>Create a free page using a website builder (like Wix, Squarespace, or Google Sites) and paste your terms there.</li>
      <li>Upload your terms as a PDF or text file to a cloud service (such as Google Drive, Dropbox, or OneDrive) and make it viewable with a shareable link.</li>
    </ul>
  </li>
</ul>
<p>The important part is that your terms are publicly accessible so that anyone with the link can view them without logging in. Remember that you should always ensure your chosen method is compliant with applicable laws in your jurisdiction and meet your business' needs.</p>

<h3>Submit your DPN application</h3>
<p>To avoid delays, re-submit your dedicated phone number application and make sure your terms of service are published on your website and easy to find. We may also follow up to request a direct link to your terms if they aren't included in your application.</p>
`,
    },
  ],
};
