!function(root) {
  var server = typeof window == 'undefined';
  var aok = require('aok');
  var cxn = server ? require('./') : root.cxn;

  aok({ id:'.online', test: cxn.online() === !cxn.offline() });
  aok({ id:'.offline', test: cxn.offline() === !cxn.online() });
  aok({ id:'.stable', test: typeof cxn.stable() == 'boolean' });
  aok({ id:'.unstable', test: cxn.stable() ? !cxn.unstable() : cxn.unstable() });

  !function() {
    var type = 'online';
    function wired() {
      wired.ran++;
      aok({ id:'.wire', test: this === cxn });
    }
    function unwired() {
      unwired.ran++;
      aok({ id:'.unwire', test: false});
    }
    wired.ran = 0;
    unwired.ran = 0;
    cxn.wire(type, wired).wire(type).unwire(type, wired)
      .wire(type, unwired).unwire(type, unwired).wire(type);
    wired.ran || aok({ id:'.wire', test: false});
    unwired.ran || aok({ id:'.unwire', test: true});
  }();

  aok({ id:'.late', test: typeof cxn.late() == 'number' });
  aok({ id:'.elapsed', test: typeof cxn.elapsed() === 'number' });
  aok({ id:'.interim', test: cxn.interim() <= cxn.elapsed() });
  aok({ id:'.gap', test: cxn.gap() ? cxn.offline() && !cxn.life() : 0 === cxn.gap() });
  aok({ id:'.life', test: cxn.life() ? cxn.online() && !cxn.gap() : 0 === cxn.life() });

  server ? aok.pass(['online', 'offline', 'stable', 'unstable'], function(method) {
    aok.log(method + ': ' + cxn[method]());
  }) : aok({
      id:'[data-cxn]'
    , test: typeof document.documentElement.getAttribute('data-cxn') == 'string'
  });

  server || aok.pass(['online', 'offline'], function(type) {
    aok.info('window has ' + type + ' event:', ('on' + type) in window);
    aok.info('<body> has ' + type + ' event:', ('on' + type) in document.body);
  });
}(this);
