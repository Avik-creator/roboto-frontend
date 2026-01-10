import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentsIcon } from '@sanity/icons'

export const storiesGrid = defineType({
  name: 'storiesGrid',
  title: 'Stories Grid',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "See more of our latest stories"',
    }),
    defineField({
      name: 'stories',
      title: 'Stories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
            }),
            defineField({
              name: 'image',
              title: 'Story Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative Text',
                  type: 'string',
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'sectionTitle',
      stories: 'stories',
    },
    prepare({ title, stories }) {
      const count = stories?.length || 0
      return {
        title: title || 'Stories Grid',
        subtitle: `${count} ${count === 1 ? 'story' : 'stories'}`,
        media: DocumentsIcon,
      }
    },
  },
})
