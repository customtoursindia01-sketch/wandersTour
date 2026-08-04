// ==========================================================================
// Wander India Tours — footer.js
// Injects the shared site footer (+ floating WhatsApp button) into the
// #footerPlaceholder element present on every page. Runs immediately since
// this script tag sits at the end of <body>, after the placeholder exists.
// ==========================================================================

(function renderFooter() {
  const placeholder = document.getElementById("footerPlaceholder");
  if (!placeholder) return;

  placeholder.innerHTML = `
    <footer class="site-footer" id="contact">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-about">
            <a href="index.html" class="footer-logo js-logo">Wander India Tours</a>
            <p class="js-tagline">Loading…</p>
            <div class="footer-social">
              <a class="js-facebook" href="#" aria-label="Facebook">FB</a>
              <a class="js-instagram" href="#" aria-label="Instagram">IG</a>
              <a class="js-tripadvisor" href="#" aria-label="Tripadvisor">TA</a>
            </div>
          </div>
          <div class="footer-col">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="destinations.html">Destinations</a></li>
              <li><a href="group-tours.html">Group Tours</a></li>
              <li><a href="corporate-travel.html">Corporate Travel</a></li>
              <li><a href="car-rental.html">Car Rental</a></li>
              <li><a href="blog.html">Travel Blog</a></li>
              <li><a href="faqs.html">Travel FAQs</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Tour Packages</h5>
            <ul>
              <li><a href="tours.html?category=Golden+Triangle+Tours">Golden Triangle Tours</a></li>
              <li><a href="tours.html?category=Rajasthan+Tours">Rajasthan Tours</a></li>
              <li><a href="tours.html?category=Same+Day+Tours">Same Day Tours</a></li>
              <li><a href="tours.html?category=South+India+Tours">South India Tours</a></li>
              <li><a href="tours.html">All Tour Packages</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h5>Contact Us</h5>
            <ul class="footer-contact">
              <li class="js-footer-phone">Loading…</li>
              <li class="js-footer-email">Loading…</li>
              <li class="js-footer-address">Loading…</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>Copyright © 2026 Wander India Tours. All Rights Reserved. (Demo project — dummy data)</span>
          <span><a href="terms.html">Terms &amp; Conditions</a> · <a href="privacy.html">Privacy Policy</a> · <a href="cancellation.html">Cancellation Policy</a></span>
        </div>
      </div>
    </footer>
    <a class="whatsapp-float" id="whatsappFloat" href="https://wa.me/919876543210" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">💬</a>
  `;
})();
