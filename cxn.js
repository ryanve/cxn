/*!
 * cxn 0.4.0+201312300800
 * https://github.com/ryanve/cxn
 * MIT License 2013 Ryan Van Etten
 */

(function(root, name, make) {
    if (typeof module != 'undefined' && module['exports']) module['exports'] = make();
    else root[name] = make();
}(this, 'cxn', function() {

    var cxn = {}
      , start = +new Date
      , since = start
      , times = 0
      , record = function() {
            times++;
            since = +new Date;
        }
      , onLine = 'onLine'
      , server = typeof window == 'undefined'
      , nav = !server && navigator
      , late = false === nav[onLine] ? 1/0 : 0
      , win = !server && window
      , doc = !server && document
      , listen = 'addEventListener'
      , connection = nav['connection'] || nav['mozConnection'] || false
      , bandwidth = 'bandwidth'
      , metered = 'metered'
      , offline = 'offline'
      , online = 'online'
      , stable = 'stable'
      , unstable = 'un' + stable
      , states = [offline, online]
      , handlers = {}
      , listeners = 'listeners'
      , emit = 'emit'
      , wire = 'wire'
      , unwire = 'un' + wire
      , owns = 'hasOwnProperty'
      , clear = function(a) {
            a.splice(0, a.length);
        }
      , hears = function(event, node) {
            return !!node && ('on' + event) in node;
        }
      , on = win ? listen in win ? function(node, type, fn) {
            node[listen](type, fn, false);
        } : function(node, type, fn) {
            node['attachEvent']('on' + type, fn);
        } : function() {}
      , ok = true
      , resolve = function(err) { ok = !err; }
      , report = function() {
            server || document.documentElement.setAttribute('data-cxn', [
                cxn[online]() ? online : offline
              , cxn[stable]() ? stable : unstable
            ].join(' '));
        };
    
    /**
     * @param {{length:number}} fns
     * @param {*=} scope
     * @param {number} fired
     */
    function calls(fns, scope) {
        for (var i = 0, l = fns && fns.length; i < l;) fns[i++].call(scope);
        return i;
    }
    
    /**
     * @param {Array} a
     * @param {*=} v value to remove
     * @param {number=} occurrences to remove, works downward, defaults to all
     */
    function pull(a, v, occurrences) {
        occurrences >>= 0;
        for (var i = a.length; i--;) if (v === a[i] && a.splice(i, 1) && !--occurrences) break;
    }
    
    /**
     * @param {string} type
     * @return {Array} active handlers
     */
    cxn[listeners] = function(type) {
        if (null == type) throw new TypeError('@0');
        return handlers[owns](type) && handlers[type] || (handlers[type] = []);
    };
    
    /**
     * @param {string} type
     * @return {number} fired
     */
    cxn[emit] = function(type) {
        return calls(cxn[listeners](type), cxn);
    };
    
    /**
     * @param {string|Function} state
     * @param {(Function|string|number)=} fn or iteration key
     */
    cxn[wire] = cxn['line'] = function(state, fn) {
        // (state, fn) or (fn, state) listens, (fn) listens to both, (state) triggers
        var either, type = state, i = 2;
        if (typeof state == 'function') typeof fn == 'string' ? type = fn : either = 1, fn = state;
        if (typeof state == 'string' && typeof fn != 'function') cxn[emit](state);
        else while (i--) if (either || states[i] === type) cxn[listeners](states[i]).push(fn);
        return this;
    };
    
    /**
     * @param {string|Function} state
     * @param {(Function|string|number)=} fn or iteration key
     */
    cxn[unwire] = cxn['unline'] = function(state, fn) {
        // (state, fn) or (fn, state) unlistens, (fn) unlistens to both, (state) removes all
        var either, type = state, i = 2;
        if (typeof state == 'function') typeof fn == 'string' ? type = fn : either = 1, fn = state;
        if (typeof state == 'string' && typeof fn != 'function') clear(cxn[listeners](state));
        else while (i--) if (either || states[i] === type) pull(cxn[listeners](states[i]), fn);
        return this;
    };

    /**
     * @return {number}
     */
    cxn[bandwidth] = function() {
        var n = connection;
        return n && (n = n[bandwidth]) === +n ? n : cxn[offline]() ? 0 : 1/0;
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
    
    /**
     * @return {number} ms to first go online, Infinity if not yet, 0 if started online
     */
    cxn['late'] = function() {
        return late;
    };
    
    (function(stack, fn) {
        for (var i = 2; i--;) fn(stack[i], i);
    })(states, function(type, i) {
        function master() {
            record();
            i && late == late/0 && (late = (since-start) || 1);
            cxn[emit](type);
        }
        if (!server) {
            if (hears(type, win)) on(win, type, master);
            else if (hears(type, doc.body)) on(doc.body, type, master);
        }
        cxn[type] = server ? function() {
            //stackoverflow.com/a/15271685/770127
            //seems to work in node.js but needs tests
            require('dns').resolve('google.com', resolve);
            return i == ok;
        } : function(fn) {
            typeof fn == 'function' && cxn[wire](type, fn);
            return (false !== nav[onLine]) == i;
        };
        cxn[i ? 'life' : 'gap'] = function() {
            return cxn[type]() ? (+new Date-since) || 1 : 0;
        };
    });

    report();
    cxn[wire](report);
    return cxn;
}));