// vite.config.ts
import checker from "vite-plugin-checker";

export default {
  base: "/the-webshop-team-5/",
  plugins: [
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
  ],
  build: {
    target: "esnext", // Add the target configuration here
    rollupOptions: {
      input: ["index.html", "checkout.html"],
    },
  },
};
