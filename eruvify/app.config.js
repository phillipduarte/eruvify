module.exports = {
  expo: {
    name: "eruvify",
    slug: "eruvify",
    // ...other existing configuration
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },
};