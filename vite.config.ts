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
    rollupOptions: {
      input: {
        main: "index.html",
        projects: "checkout.html",
      },
    },
  },
};
