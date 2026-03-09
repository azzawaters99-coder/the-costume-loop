/**
 * THE COSTUME LOOP — Hero Dual CTA Button Injection
 *
 * Sharetribe's Hero section only supports ONE CTA (search, internal link,
 * or external link). This script injects a second "Sell a Costume" button
 * alongside the existing "Browse Costumes" button.
 *
 * PREREQUISITES:
 *   - Hero section anchor ID must be set to "hero" in Sharetribe Console
 *   - Hero CTA must be set to "Internal link" with label "Browse Costumes"
 *     and link "/s" (the search/browse page)
 *   - costume-loop-custom.css must be loaded (contains .tcl-hero-cta-wrapper
 *     and .tcl-hero-secondary-cta styles)
 *
 * INSTALLATION:
 *   Option A (Web Template):
 *     1. Save this file to src/scripts/costumeLoopHeroCta.js
 *     2. Import in src/app.js:
 *        import './scripts/costumeLoopHeroCta.js';
 *
 *   Option B (Script injection via Console):
 *     1. In Sharetribe Console → Advanced → Applications
 *     2. Add a <script> tag pointing to a hosted copy of this file,
 *        or wrap the code in <script>...</script>
 */

(function () {
  'use strict';

    // Guard: only run in browser (not during server-side rendering)
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

  function injectSecondCTA() {
    // Find the hero section by anchor ID
    var hero = document.getElementById('hero');
    if (!hero) return false;

    // Already injected? Skip.
    if (hero.querySelector('.tcl-hero-cta-wrapper')) return true;

    // Find the existing CTA link inside the hero
    var existingCTA = hero.querySelector('a[class*="ctaButton"]');
    if (!existingCTA) return false;

    // Get the parent element (the <header> or details container)
    var ctaParent = existingCTA.parentElement;
    if (!ctaParent) return false;

    // Create wrapper div for both buttons
    var wrapper = document.createElement('div');
    wrapper.className = 'tcl-hero-cta-wrapper';

    // Move the existing CTA into the wrapper
    wrapper.appendChild(existingCTA);

    // Create the second CTA button
    var secondCTA = document.createElement('a');
    secondCTA.href = '/l/new';
    secondCTA.className = 'tcl-hero-secondary-cta';
    secondCTA.textContent = 'Sell a Costume';
    wrapper.appendChild(secondCTA);

    // Insert the wrapper where the original CTA was
    ctaParent.appendChild(wrapper);

    return true;
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      injectSecondCTA();
    });
  } else {
    // DOM already loaded — try immediately, retry if hero hasn't rendered yet
    if (!injectSecondCTA()) {
      // Sharetribe may render sections asynchronously; retry a few times
      var attempts = 0;
      var maxAttempts = 20;
      var interval = setInterval(function () {
        attempts++;
        if (injectSecondCTA() || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 250);
    }
  }
})();
