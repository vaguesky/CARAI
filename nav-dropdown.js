/* CARAI "About/소개" nav dropdown — makes the trigger tap-safe on mobile.
   The trigger is a real <a href="...#about"> so desktop keeps its original
   behavior unchanged: hovering (or :focus-within) reveals the dropdown via
   CSS only, and clicking still navigates to the About section — no JS runs
   on desktop at all.

   On narrow viewports there is no true hover, so a tap both flashes
   :focus-within open AND fires the anchor's real navigation, sending the
   user to Home instead of just opening the menu. Below the shared 900px
   breakpoint, this script prevents that default navigation and drives the
   menu with an explicit tap-to-toggle (.is-open, paired with the
   visibility override in responsive.css) instead of relying on
   :focus-within, which would otherwise stay "open" for as long as the
   trigger has focus and swallow the second tap meant to close it.

   Only the trigger itself is touched — links inside .nav-dd__menu keep
   navigating normally. */
(function () {
  'use strict';
  var MOBILE_MAX = 900;

  function isMobile() {
    return window.matchMedia('(max-width: ' + MOBILE_MAX + 'px)').matches;
  }

  function setExpanded(dd, trigger, open) {
    dd.classList.toggle('is-open', open);
    if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function closeAll(except) {
    document.querySelectorAll('.nav-dd.is-open').forEach(function (dd) {
      if (dd === except) return;
      setExpanded(dd, dd.querySelector(':scope > a'), false);
    });
  }

  function bind(dd) {
    if (dd.__navDdBound) return;
    var trigger = dd.querySelector(':scope > a');
    var menu = dd.querySelector(':scope > .nav-dd__menu');
    if (!trigger || !menu) return;
    dd.__navDdBound = true;

    if (!menu.id) menu.id = 'nav-dd-menu-' + Math.random().toString(36).slice(2, 9);
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', menu.id);

    trigger.addEventListener('click', function (e) {
      if (!isMobile()) return; // desktop: unchanged, link navigates normally
      e.preventDefault();
      e.stopPropagation();
      var open = !dd.classList.contains('is-open');
      closeAll(dd);
      setExpanded(dd, trigger, open);
    });
  }

  function init() {
    document.querySelectorAll('.nav-dd').forEach(bind);
  }

  if (!window.__navDdOutsideBound) {
    window.__navDdOutsideBound = true;
    document.addEventListener('click', function (e) {
      if (!isMobile()) return;
      document.querySelectorAll('.nav-dd.is-open').forEach(function (dd) {
        if (dd.contains(e.target)) return;
        setExpanded(dd, dd.querySelector(':scope > a'), false);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // DC pages render async (React loads, then mounts); re-bind shortly after
  // to catch nodes that didn't exist yet at DOMContentLoaded. bind() itself
  // is idempotent per-element via __navDdBound, so this never double-attaches.
  setTimeout(init, 400);
  setTimeout(init, 1200);
})();
