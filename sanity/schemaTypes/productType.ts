export const productType = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule: {
        required: () => {
          (): any;
          new (): any;
          positive: { (): any; new (): any };
        };
      }) => Rule.required().positive(),
    },
    {
      name: "comparePrice",
      title: "Compare Price",
      description: "Original price before discount",
      type: "number",
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "images",
      title: "Additional Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "collections",
      title: "Collections",
      type: "array",
      of: [{ type: "reference", to: { type: "collection" } }],
    },
    {
      name: "inStock",
      title: "In Stock",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "featured",
      title: "Featured Product",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "variants",
      title: "Variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              title: "Variant Name",
              type: "string",
              validation: (Rule: { required: () => any }) => Rule.required(),
            },
            {
              name: "options",
              title: "Options",
              type: "array",
              of: [{ type: "string" }],
              validation: (Rule: { required: () => any }) => Rule.required(),
            },
          ],
        },
      ],
    },
    {
      name: "shopURL",
      title: "External Shop URL",
      description: "Link to where this product can be purchased",
      type: "url",
    },
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
};
