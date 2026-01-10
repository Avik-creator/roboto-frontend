import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const newsletterSection = defineType({
  name: 'newsletterSection',
  title: 'Newsletter Section',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Subscribe to the Jamb Journal',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Newsletter Section',
        subtitle: 'Newsletter Signup',
        media: EnvelopeIcon,
      }
    },
  },
})
