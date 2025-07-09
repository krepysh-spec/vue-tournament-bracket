import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue tournament tool",
  description: "descrp",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Tournament tool?', link: '/about' },
          { text: 'Installation', link: '/installation' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/krepysh-spec/vue-tournament-bracket' },
      { icon: 'storybook', link: 'https://krepysh-spec.github.io/vue-tournament-bracket/' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/bracket-vue-tool' },
    ]
  }
})
