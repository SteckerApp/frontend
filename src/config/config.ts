
import { Icons, paths } from "@/constants";

export const spark = {
    apiBaseUrl: process.env.NODE_ENV !== 'production' ? import.meta.env.VITE_APP_TRYSPARK_DEV_BASE_URL : import.meta.env.VITE_APP_TRYSPARK_BASE_URL,
    before_auth_path: paths.login,
    after_auth_path: paths.dashboardOverview,
    company: {
        name: 'TrySpark',
        url: 'tryspark.com',
        full_url: 'https://app.tryspark.com',
        slogan: 'Your Unlimited Design Team',
        logo: Icons.Logo,
        copyright: "All Rights Reserved",
        instagram: "http://instagram.com/tryspark",
    },

    appName: import.meta.env.VITE_APP_NAME,
    appDescription: import.meta.env.VITE_APP_DESCRIPTION,
    appVersion: import.meta.env.VITE_APP_VERSION,
    appAuthor: import.meta.env.VITE_APP_AUTHOR,
    appLogo: import.meta.env.VITE_APP_LOGO,
}