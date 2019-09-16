const config =  (env, argv) => ({
  mode: env.production ? 'production' : 'development',
  devtool: env.production ? 'source-maps' : 'eval',
    plugins: [
      new TerserPlugin({
        terserOptions: {
        compress: argv['optimize-minimize'] // only if -p or --optimize-minimize were passed
        }
      })
    ]
})

export default config