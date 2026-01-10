import { defineType, defineField, defineArrayMember } from 'sanity'
import { ThLargeIcon } from '@sanity/icons'

export const productGrid = defineType({
  name: 'productGrid',
  title: 'Product Grid',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'sectionTitle',
      title: 'Section Title',
      type: 'string',
      description: 'e.g., "Our latest chimneypieces"',
    }),
    defineField({
      name: 'columns',
      title: 'Number of Columns',
      type: 'number',
      options: {
        list: [
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
          { title: '5 Columns', value: 5 },
          { title: '6 Columns', value: 6 },
        ],
      },
      initialValue: 5,
    }),
    defineField({
      name: 'variant',
      title: 'Grid Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Default (Uniform)', value: 'default' },
          { title: 'Mixed Aspect Ratios', value: 'mixed-aspect' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'products',
      title: 'Products',
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
              title: 'Product Image',
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
            defineField({
              name: 'aspectRatio',
              title: 'Aspect Ratio',
              type: 'string',
              options: {
                list: [
                  { title: 'Square (1:1)', value: 'square' },
                  { title: 'Portrait (3:4)', value: 'portrait' },
                  { title: 'Landscape (4:3)', value: 'landscape' },
                  { title: 'Tall (2:3)', value: 'tall' },
                ],
              },
              initialValue: 'square',
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
      products: 'products',
    },
    prepare({ title, products }) {
      const count = products?.length || 0
      return {
        title: title || 'Product Grid',
        subtitle: `${count} ${count === 1 ? 'product' : 'products'}`,
        media: ThLargeIcon,
      }
    },
  },
})
