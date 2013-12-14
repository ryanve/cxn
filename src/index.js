(function(root, name, make) {
    if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
    else root[name] = make();
}(this, 'cxn', function() {

    var start = +new Date
      , since = start
      , cxn = {}
      , win = window
      , nav = navigator
      , doc = document
      , docElem = doc.documentElement
      , connection = nav['connection'] || nav['mozConnection'] || false
      , bandwidth = 'bandwidth'
      , metered = 'metered'
      , attname = 'data-cxn'
      , listen = 'addEventListener'
      , listens = listen in win
      , online = 'online'
      , offline = 'offline'
      , found = 'found'
      , lost = 'lost'
      , state = 'state'
      , states = [online, offline]
      , both = function(o, fn) {
            return !!fn(o[0], 0) && !!fn(o[1], 1);
        }
      , on = function(type, fn) {
            return listens ? (win[listen](type, fn, false), true) : false;
        }
      , times = 0;

    
    cxn[state] = function(fn) {
        fn && on(offline, fn) && on(online, fn);
        return states[cxn[offline]() ? 1 : 0];
    };
        
    both(states, function(n, i) {
        var event = i ? lost : found, has = ('on' + n) in win;
        cxn[event] = function(fn) {
            return has && on(n, fn);
        };
        //cxn['isO' + n.slice(1)] = function() {
        //    return (false === nav['onLine']) == i;
        //};
        cxn[n] = function(fn) {
            fn && has && on(n, fn);
            return (false === nav['onLine']) == i;
        };
        //cxn[n][aware] = listens && ('on' + n) in win;
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
    cxn['unstable'] = function() {
        return times;
    };
    
    /**
     * @return {boolean} true if never offline
     */
    cxn['stable'] = function() {
        return !times && !cxn[offline]();
    };
    
    /**
     * @return {number} ms
     */
    cxn['duration'] = function(ms) {
        return +new Date - (true === ms ? start : null == ms ? since : +ms);
    };
    
    function report(e) {
        var status = cxn[state]();
        e && (since = +new Date);
        e && times++ && (status += ' again');
        docElem.setAttribute(attname, status);
    }

    report();
    cxn[state](report);
    return cxn;
}));