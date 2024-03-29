import path from 'path';
import { fileURLToPath } from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const nodeEnv = process.env.NODE_ENV || 'development';
const devMode = nodeEnv === 'development';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const src = path.resolve(dirname, './src');
const dist = path.resolve(dirname, './public');

export default {
  mode: nodeEnv,
  entry: {
    app: `${src}/js/app.js`,
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: `${dist}/`,
  },
  module: {
    rules: [
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
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  ['autoprefixer'],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.json'],
  },
  devServer: {
    open: true,
    static: {
      directory: dist,
    },
    hot: true,
  },
};
