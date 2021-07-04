const mix = require('laravel-mix');

// const PrerenderSPAPlugin = require("prerender-spa-plugin");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
// const CopyPlugin = require("copy-webpack-plugin");
// const tailwindcss = require('tailwindcss');

mix
    // make main bundle in public folder
    .ts('resources/js/app.ts', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    // .options({
    //     processCssUrls: false,
    //     postCss: [ tailwindcss('./tailwind.config.js') ],
    // })
    // .version()
    .webpackConfig({
        module: {
            // include ts
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    options: { appendTsSuffixTo: [/\.vue$/] }, // can use ts into vue
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"]
        }
    });

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
