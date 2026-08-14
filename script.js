// Accessibility helpers and simple map init.
// Replace/merge this with any existing map logic you have.
// This file:
// - initializes a fallback Leaflet map if Leaflet is present
// - manages the index panel open/close with ARIA updates
// - traps focus inside the index panel while open and returns focus on close

(function () {
  // Elements
  const enterBtn = document.getElementById('enter-map');
  const indexBtn = document.getElementById('index-button');
  const closeBtn = document.getElementById('close-index');
  const indexPanel = document.getElementById('index-panel');
  const indexList = document.getElementById('index-list');
  const mapContainer = document.getElementById('map-container');

  // Keep reference to the element that opened the panel to restore focus
  let lastFocusedElement = null;

  // Utility: get focusable elements inside a container
  function getFocusable(container) {
    const selectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex="-1"])'
    ];
    return Array.from(container.querySelectorAll(selectors.join(',')))
      .filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
  }

  // Open index panel
  function openIndex(opener) {
    lastFocusedElement = opener || document.activeElement;
    indexPanel.classList.remove('hidden');
    indexPanel.setAttribute('aria-hidden', 'false');
    indexBtn.setAttribute('aria-expanded', 'true');

    // Move focus to first focusable element in panel or close button
    const focusables = getFocusable(indexPanel);
    (focusables[0] || closeBtn).focus();

    // Add keydown listener for focus trap and ESC
    document.addEventListener('keydown', handleKeyDown);
  }

  // Close index panel
  function closeIndex() {
    indexPanel.classList.add('hidden');
    indexPanel.setAttribute('aria-hidden', 'true');
    indexBtn.setAttribute('aria-expanded', 'false');

    // Remove keydown listener
    document.removeEventListener('keydown', handleKeyDown);

    // Restore focus
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  // Key handling: ESC to close, TAB to trap focus
  function handleKeyDown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      closeIndex();
      return;
    }

    if (e.key === 'Tab' && indexPanel.getAttribute('aria-hidden') === 'false') {
      const focusables = getFocusable(indexPanel);
      if (focusables.length === 0) {
        // No focusable inside, keep focus on close button
        closeBtn.focus();
        e.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || document.activeElement === indexPanel) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    }
  }

  // Populate index-list example (replace with real data)
  function populateIndexExample() {
    // If indexList is empty, add a placeholder item to demonstrate semantics.
    if (!indexList.hasChildNodes()) {
      const items = [
        { title: 'Main Square', href: '#' },
        { title: 'Old Pier', href: '#' },
        { title: 'Hidden Café', href: '#' }
      ];
      items.forEach(it => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = it.title;
        a.href = it.href;
        li.appendChild(a);
        indexList.appendChild(li);
      });
    }
  }

  // Event listeners
  indexBtn.addEventListener('click', (e) => {
    if (indexPanel.getAttribute('aria-hidden') === 'true') {
      openIndex(e.currentTarget);
    } else {
      closeIndex();
    }
  });

  closeBtn.addEventListener('click', () => closeIndex());

  // Optional: keyboard shortcut to open index (I)
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'i' || e.key === 'I') && (document.activeElement === document.body || document.activeElement === mapContainer)) {
      e.preventDefault();
      openIndex(indexBtn);
    }
  });

  // Enter map button behavior: scroll to map and focus container
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      mapContainer.scrollIntoView({ behavior: 'smooth' });
      mapContainer.focus();
    });
  }

  // Initial population
  populateIndexExample();

  // Simple Leaflet init fallback (so page shows a working map if Leaflet is available).
  // If you have app-specific map initialization elsewhere, merge with that code.
  function initLeafletFallback() {
    if (typeof L === 'undefined') return;
    try {
      // Create map if not already created
      if (!mapContainer._leaflet_map) {
        const map = L.map('map-container', { scrollWheelZoom: false }).setView([0, 0], 2);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        mapContainer._leaflet_map = map;
      }
    } catch (err) {
      // Fail silently; map is optional
      console.error('Leaflet init failed:', err);
    }
  }

  // Init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLeafletFallback);
  } else {
    initLeafletFallback();
  }

})();
