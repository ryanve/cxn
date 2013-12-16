/*!
 * cxn 0.2.0+201312160723
 * https://github.com/ryanve/cxn
 * MIT License 2013 Ryan Van Etten
 */

(function(root, name, make) {
    if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
    else root[name] = make();
}(this, 'cxn', function() {

    var start = +new Date
      , since = start
      , cxn = {}
      , server = typeof window == 'undefined'
      , win = !server && window
      , nav = !server && navigator
      , listen = 'addEventListener'
      , listens = win && listen in win
      , connection = nav['connection'] || nav['mozConnection'] || false
      , bandwidth = 'bandwidth'
      , metered = 'metered'
      , offline = 'offline'
      , online = 'online'
      , stable = 'stable'
      , unstable = 'unstable'
      , line = 'line'
      , both = function(o, fn) {
            return !!fn(o[0], 0) && !!fn(o[1], 1);
        }
      , on = function(type, fn) {
            return listens ? (win[listen](type, fn, false), true) : false;
        }
      , ok = true
      , resolve = function(err) { ok = !err; }
      , times = 0;

    
    cxn[line] = function(fn) {
        return null == fn ? listens : on(offline, fn) && on(online, fn);
    };

    both([offline, online], function(n, i) {
        var event = i ? 'found' : 'lost';
        cxn[event] = win && ('on' + n) in win ? function(fn) {
            return on(n, fn);
        } : function() {
            return false;
        };
        cxn[n] = server ? function() {
            //stackoverflow.com/a/15271685/770127
            //seems to work in node.js but needs tests
            require('dns').resolve('google.com', resolve);
            return i == ok;
        } : function(fn) {
            fn && cxn[event](fn);
            return (false !== nav['onLine']) == i;
        };
        return true;
    });

    /**
     * @return {number}
     */
    cxn[bandwidth] = function() {
        var n = connection;
        return n && (n = n[bandwidth]) === +n ? n : cxn[offline]() ? 0 : Infinity;
    };
    
    /**
     * @return {boolean}
     */
    cxn[metered] = function() {
        return connection ? true === connection[metered] : false;
    };
    
    /**
     * @return {number} times
     */
    cxn[unstable] = function() {
        return times;
    };
    
    /**
     * @return {boolean} true if initial state persists
     */
    cxn[stable] = function() {
        return !times;
    };
    
    cxn['elapsed'] = function() {
        return +new Date-start;
    };
    
    cxn['interim'] = function() {
        return +new Date-since;
    };
    
    function report(e) {
        if (e) times++, since = +new Date;
        server || document.documentElement.setAttribute('data-cxn', [
            cxn[online]() ? online : offline
          , cxn[stable]() ? stable : unstable
        ].join(' '));
    }

    server || report();
    cxn[line](report);
    return cxn;
}));