import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        flowbite.content(),
    ],

    theme: {
        extend: {
            fontFamily: {
                // sans: ["JetBrains Mono", ...defaultTheme.fontFamily.mono],
            },
        },
    },

    plugins: [forms, typography, flowbite.plugin()],
};
