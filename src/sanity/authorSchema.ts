const author = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      placeholder: 'e.g. Founder & CEO, Career Coach',
    },
    {
      name: 'bio',
      title: 'Short bio',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.max(500),
    },
    {
      name: 'avatar',
      title: 'Avatar / headshot',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    },
    {
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    },
    {
      name: 'twitterUrl',
      title: 'X / Twitter URL',
      type: 'url',
    },
    {
      name: 'credentials',
      title: 'Credentials',
      description: 'Short list of credentials, certifications, or notable past roles. Used for E-E-A-T author byline.',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'avatar' },
  },
}

export default author
