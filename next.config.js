const nextTranslate = require('next-translate');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  nextTranslate({
    images: {
      domains: [
        'platform-lookaside.fbsbx.com',
        'images.unsplash.com',
        'ik.imagekit.io',
        'image.flaticon.com',
        '',
      ],
    },
    async headers() {
      return [
        {
          source: '/:all*(svg|jpg|png)',
          locale: false,
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=9999999999, must-revalidate',
            },
          ],
        },
      ];
    },
    env: {
      BASE_URL:
        process.env.NODE_ENV === 'production' ? process.env.BASE_URL : 'http://localhost:3000',
      API_BASE_URL:
        process.env.NODE_ENV === 'production'
          ? 'https://toi-moi-server-76cwahsyvq-de.a.run.app'
          : 'http://localhost:3001',
      VIMEO_ACCESS_TOKEN: process.env.VIMEO_ACCESS_TOKEN,
      VIMEO_CLIENT_SECRET: process.env.VIMEO_CLIENT_SECRET,
      VIMEO_CLIENT_ID: process.env.VIMEO_CLIENT_ID,
      NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
    },
  }),
);
