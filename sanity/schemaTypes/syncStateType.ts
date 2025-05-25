import { defineField, defineType } from "sanity";

export default defineType({
  name: "syncState",
  title: "Sync State",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "Key",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastSyncTime",
      title: "Last Sync Time",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "syncStatus",
      title: "Sync Status",
      type: "string",
      options: {
        list: [
          { title: "Success", value: "success" },
          { title: "Failed", value: "failed" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "syncStats",
      title: "Sync Statistics",
      type: "object",
      fields: [
        defineField({ name: "created", type: "number", title: "Created" }),
        defineField({ name: "updated", type: "number", title: "Updated" }),
        defineField({ name: "deleted", type: "number", title: "Deleted" }),
        defineField({ name: "errors", type: "number", title: "Errors" }),
        defineField({
          name: "total",
          type: "number",
          title: "Total Processed",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "key",
      subtitle: "lastSyncTime",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Sync State",
        subtitle: subtitle
          ? `Last sync: ${new Date(subtitle).toLocaleString()}`
          : "Never synced",
      };
    },
  },
});
