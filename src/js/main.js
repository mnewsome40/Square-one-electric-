/* Square One Electric — site behaviour.
   Only what the site itself needs: the mobile drawer, the Services dropdown,
   and the FAQ accordion. No pop-ups, no chat widgets. */
(function () {
  'use strict';

  var doc = document;
  var body = doc.body;

  /* ---------- Mobile drawer ---------- */
  var toggle = doc.querySelector('.nav-toggle');
  var drawer = doc.getElementById('mobile-drawer');
  var overlay = doc.querySelector('.drawer-overlay');
  var closeBtn = doc.querySelector('.drawer-close');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('is-open');
    overlay.hidden = false;
    body.classList.add('drawer-open');
    toggle.setAttribute('aria-expanded', 'true');
    drawer.removeAttribute('inert');
    var firstLink = drawer.querySelector('a, button');
    if (firstLink) firstLink.focus();
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    overlay.hidden = true;
    body.classList.remove('drawer-open');
    toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('inert', '');
    toggle.focus();
  }

  if (toggle && drawer && overlay) {
    toggle.addEventListener('click', function () {
      drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
    });
    overlay.addEventListener('click', closeDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
    });
    // Close the drawer if the viewport grows past the mobile breakpoint.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1024 && drawer.classList.contains('is-open')) closeDrawer();
    });
  }

  /* ---------- Services dropdown (desktop + drawer) ---------- */
  var subToggles = doc.querySelectorAll('.has-sub > .nav-link');
  Array.prototype.forEach.call(subToggles, function (link) {
    var item = link.parentNode;
    var submenu = item.querySelector('.sub-menu');
    if (!submenu) return;

    function setOpen(open) {
      item.classList.toggle('is-open', open);
      link.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    // The top-level "Services" item has no page of its own, so a click/tap toggles the submenu.
    link.addEventListener('click', function (e) {
      if (link.getAttribute('href') === '#') {
        e.preventDefault();
        setOpen(!item.classList.contains('is-open'));
      }
    });

    // Close when focus or the pointer leaves the item on desktop.
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) setOpen(false);
    });
    item.addEventListener('mouseleave', function () {
      if (window.innerWidth > 1024) setOpen(false);
    });
    link.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  });

  /* ---------- FAQ accordion: one open at a time, matching the original ---------- */
  var faqs = doc.querySelectorAll('.faq-item');
  if (faqs.length) {
    Array.prototype.forEach.call(faqs, function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        Array.prototype.forEach.call(faqs, function (other) {
          if (other !== item && other.open) other.open = false;
        });
      });
    });
  }
})();
