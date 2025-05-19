import { ArchiveIcon as CollectionIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const collectionType = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  icon: CollectionIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
      description: "When this collection becomes available",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
      description: "When this collection is no longer available (optional)",
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Feature this collection on the homepage",
      initialValue: false,
    }),
    defineField({
      name: "highlight",
      title: "Highlight",
      type: "boolean",
      description: "Special visual treatment for featured collections",
      initialValue: false,
    }),
    defineField({
      name: "collectionType",
      title: "Collection Type",
      type: "string",
      options: {
        list: [
          { title: "Seasonal", value: "seasonal" },
          { title: "Limited Edition", value: "limited" },
          { title: "Permanent", value: "permanent" },
          { title: "Collaboration", value: "collaboration" },
        ],
      },
    }),
    defineField({
      name: "products",
      title: "Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "collectionType",
      media: "mainImage",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle
          ? `${subtitle} collection`
          : "Collection type not set",
        media,
      };
    },
  },
});
