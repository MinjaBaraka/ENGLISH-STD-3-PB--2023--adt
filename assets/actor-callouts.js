(function () {
  function fitActorConnectors(root) {
    (root || document).querySelectorAll('.actor-stage').forEach(function (stage) {
      var connector = stage.querySelector('.actor-connectors');
      if (!connector) return;
      connector.style.width = Math.max(0, stage.clientWidth) + 'px';
      connector.style.height = Math.max(0, stage.clientHeight) + 'px';
    });
  }

  function initialiseActorCallouts() {
    fitActorConnectors(document);
    if ('ResizeObserver' in window) {
      var observer = new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
          fitActorConnectors(entry.target.parentNode || document);
        });
      });
      document.querySelectorAll('.actor-stage').forEach(function (stage) {
        observer.observe(stage);
      });
    } else {
      window.addEventListener('resize', function () {
        fitActorConnectors(document);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialiseActorCallouts, { once: true });
  } else {
    initialiseActorCallouts();
  }
}());
