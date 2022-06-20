import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const nodeEnv = process.env.NODE_ENV || 'development';
const devMode = nodeEnv === 'development';

console.log('nodeEnv ==> ', nodeEnv);
console.log('devMode ==> ', devMode);

const src = path.resolve(__dirname, './src');
const dist = path.resolve(__dirname, './public');

const config = {
  mode: nodeEnv,
  entry: {
    app: `${src}/js/app.js`
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: `${dist}/`,
  },
  module: {
    rules: [
      // {
      //   test: /\.(jsx?|vue)$/,
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: { failOnError: false }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [
                require('autoprefixer')({
                  grid: true,
                  browsers: [
                    'IE >= 11',
                    'last 2 versions'
                  ]
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    })
  ],
  resolve: {
    extensions: ['.js', '.json']
  },
  devServer: {
    open: 'Google Chrome',
    inline: true,
    hot: true,
    port: 8080,
    contentBase: dist
  },
}

export default config;
