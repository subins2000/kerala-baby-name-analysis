export default {
  build: {
    lib: {
      entry: "index.js",
      formats: ["iife"],
      name: "InteractiveChart"
    },
    rollupOptions: {
      output: {
        extend: true
      }
    }
  }
};