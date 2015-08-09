(function(plugin) {
    'use strict';

    var Module = (function() {
        var _version   = '0.1.3';
        var _namespace = 'CTW2.Plugin.Interface.VillageInfo';

        var _world     = null;

        function addInfoLink(e) {
            setTimeout(function() {
                var header = document.querySelector('.tbl-border-light.village-details > thead > tr > th');

                if (!header || header.querySelector('.ctw2-village-link')) {
                    return;
                }

                header.textContent = header.textContent + ' | ';

                var infoLink = document.createElement('a');

                infoLink.setAttribute('href', 'http://www.tw2-tools.com/' + _world + '/village/' + e.detail.village_id + '/');
                infoLink.setAttribute('target', '_blank');
                infoLink.setAttribute('class', 'ctw2-village-link');
                infoLink.appendChild(document.createTextNode('Show village information'));

                header.appendChild(infoLink);
            }, 100);
        }

        // Thanks https://css-tricks.com/snippets/javascript/get-url-variables/
        function getQueryVariable(variable) {
               var query = window.location.search.substring(1);
               var vars  = query.split('&');

               for (var i=0;i<vars.length;i++) {
                   var pair = vars[i].split('=');

                   if(pair[0] == variable) return pair[1];
               }

               return false;
        }

        function VillageInfo() {
            _world = getQueryVariable('world');
        }

        VillageInfo.prototype.getVersion = function() {
            return _version;
        };

        VillageInfo.prototype.getNamespace = function() {
            return _namespace;
        };

        VillageInfo.prototype.run = function() {
            document.addEventListener('ShowVillageInfo', addInfoLink);
        };

        VillageInfo.prototype.stop = function() {
            document.removeEventListener('ShowVillageInfo', addInfoLink);
        };

        return VillageInfo;
    }());

    var module = new Module();

    newPluginName = module.getNamespace();

    plugin.registerAndRun(module);
}(_mainPlugin));
