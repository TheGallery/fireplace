define('helpers_local', ['feed', 'nunjucks', 'utils_local', 'z'],
       function(feed, nunjucks, utils_local, z) {
    var filters = nunjucks.require('filters');
    var globals = nunjucks.require('globals');

    /* Register filters. */
    filters.items = utils_local.items;

    filters.rewriteCdnUrls = function(text){
        // When we get a page back from legal docs stored on the CDN, we
        // need to rewrite them to work locally within a packaged version
        // of Marketplace.
        var rewriteCdnUrlMappings = [
            {
                name: 'Privacy Policy',
                pattern: /\/media\/docs\/privacy\/.+\.html/g,
                replacement: '/privacy-policy'
            },
            {
                name: 'Terms of Use',
                pattern: /\/media\/docs\/terms\/.+\.html/g,
                replacement: '/terms-of-use'
            }
        ];
        rewriteCdnUrlMappings.forEach(function(mapping){
            text = text.replace(mapping.pattern, mapping.replacement);
        });
        return text;
    };

    /* Global variables, provided in default context. */
    globals.feed = feed;

    /* Helpers functions, provided in the default context. */
    function indexOf(arr, val) {
        return arr.indexOf(val);
    }

    var helpers = {
        indexOf: indexOf
    };

    for (var i in helpers) {
        // Put the helpers into the nunjucks global.
        if (helpers.hasOwnProperty(i)) {
            globals[i] = helpers[i];
        }
    }

    return helpers;
});
