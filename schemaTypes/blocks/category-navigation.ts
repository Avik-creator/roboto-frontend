import { defineType, defineField, defineArrayMember } from 'sanity'
import { MenuIcon } from '@sanity/icons'

export const categoryNavigation = defineType({
  name: 'categoryNavigation',
  title: 'Category Navigation',
  type: 'object',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'label' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      categories: 'categories',
    },
    prepare({ categories }) {
      const count = categories?.length || 0
      return {
        title: 'Category Navigation',
        subtitle: `${count} ${count === 1 ? 'category' : 'categories'}`,
        media: MenuIcon,
      }
    },
  },
})
