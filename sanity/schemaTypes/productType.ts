import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "comparePrice",
      title: "Compare Price",
      description: "Original price before discount",
      type: "number",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Additional Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          // Images will automatically get _key from Sanity
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "collections",
      title: "Collections",
      type: "array",
      of: [{ type: "reference", to: { type: "collection" } }],
    }),
    defineField({
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "variants",
      title: "Variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "_key",
              title: "Variant ID",
              type: "string",
              description: "Unique identifier for this variant",
              // We'll add a random ID when this is empty
              initialValue: () => Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
            }),
            defineField({
              name: "name",
              title: "Variant Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "options",
              title: "Options",
              type: "array",
              of: [{ 
                type: "string",
                // Each option will get an auto-generated _key
              }],
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "shopURL",
      title: "External Shop URL",
      description: "Link to where this product can be purchased",
      type: "url",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "mainImage",
      price: "price",
    },
    prepare({ title, media, price }) {
      return {
        title,
        subtitle: price ? `$${price}` : "Price not set",
        media,
      };
    },
  },
})