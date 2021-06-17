const mix = require('laravel-mix');

const PrerenderSPAPlugin = require("prerender-spa-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
// const CopyPlugin = require("copy-webpack-plugin");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    // make main bundle in public folder
    .js('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .version();

if(process.env.NODE_ENV.trim() !== 'production'){
    mix
        .sourceMaps(true, 'source-map')
        .options({
            hmrOptions: {
                host: '127.0.0.1',
                port: 8080
            }
        });
}

// in production
if (mix.inProduction()) {
    //
}

// make bundle for prerender
// .sass('resources/sass/app.scss', '/prerender/')
// .js('resources/js/app.js', '/prerender/')
// .webpackConfig({
//     plugins: [
//         // copy index.html to public/prerender for PrerenderSPAPlugin
//         new CopyPlugin({
//             patterns: [
//                 {
//                     from: path.join(__dirname, '/resources/views/index.html'),
//                     to: path.join(__dirname, '/public/prerender/index.html')
//                 },
//             ],
//         }),
//         // // == PRERENDER SPA PLUGIN == //
//         new PrerenderSPAPlugin({
//             staticDir: path.join(__dirname, '/public/prerender'), //
//             routes: [
//                 '/', '/birds'
//             ],
//         })
//     ]
// });
