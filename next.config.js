module.exports = {
  // Not working with antd modal
  // reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/projects',
        permanent: true,
      },
    ]
  },
}
