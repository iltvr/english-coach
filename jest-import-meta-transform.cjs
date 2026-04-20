const { TsJestTransformer } = require('ts-jest')

const transformer = new TsJestTransformer({ tsconfig: { esModuleInterop: true } })

module.exports = {
  process(src, filename, options) {
    return transformer.process(
      src.replace(/import\.meta\.env/g, 'process.env'),
      filename,
      options
    )
  },
  getCacheKey(src, filename, options) {
    return transformer.getCacheKey(
      src.replace(/import\.meta\.env/g, 'process.env'),
      filename,
      options
    )
  }
}
