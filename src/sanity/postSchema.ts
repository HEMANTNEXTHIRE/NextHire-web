// Paste this file into studio-blog/schemaTypes/post.ts after running the Sanity CLI
// Then import and register it in studio-blog/schemaTypes/index.ts

const post = {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Insights',        value: 'INSIGHTS'        },
          { title: 'Career Strategy', value: 'CAREER STRATEGY' },
          { title: 'Interview Tips',  value: 'INTERVIEW TIPS'  },
          { title: 'Salary',          value: 'SALARY'          },
          { title: 'Resume',          value: 'RESUME'          },
          { title: 'Job Search',      value: 'JOB SEARCH'      },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'NextHire Team',
    },
    {
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      placeholder: '5 min read',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        },
      ],
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(300),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
        },
        { type: 'table' },
      ],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'heroImage' },
  },
}

export default post
