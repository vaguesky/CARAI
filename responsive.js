/* CARAI — shared mobile nav (hamburger) behavior. Loaded on every page. */
(function () {
  'use strict';

  function init() {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('siteNav');
    if (!toggle || !nav) return;

    function isOpen() { return nav.classList.contains('nav-open'); }

    function open() {
      nav.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    function close(returnFocus) {
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (returnFocus) toggle.focus();
    }

    toggle.setAttribute('aria-expanded', 'false');

    toggle.addEventListener('click', function () {
      if (isOpen()) close(false); else open();
    });

    // Close after selecting any link inside the nav (including the About
    // dropdown items and the active-page link).
    nav.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a') : null;
      if (link) close(false);
    });

    // Keyboard: Escape closes and returns focus to the toggle button.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) close(true);
    });

    // Click outside the nav/toggle closes it.
    document.addEventListener('click', function (e) {
      if (!isOpen()) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      close(false);
    });

    // Collapsing back to desktop width while open shouldn't leave stale state.
    var mq = window.matchMedia('(min-width:1025px)');
    var onChange = function (m) { if (m.matches) close(false); };
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
