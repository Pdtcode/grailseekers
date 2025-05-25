export default {
  name: "dropSettings",
  title: "Drop Settings",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "A name to identify this settings document",
      validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Is there an active drop?",
      initialValue: false,
    },
    {
      name: "backgroundVideo",
      title: "Background Video",
      type: "file",
      description: "Video file to display in the background of the drop page",
      options: {
        accept: "video/*",
      },
    },
    {
      name: "dropDescription",
      title: "Drop Description",
      type: "text",
      description: "Brief description about the current drop",
    },
    {
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      description: "When the drop starts",
    },
    {
      name: "endDate",
      title: "End Date",
      type: "datetime",
      description: "When the drop ends",
    },
    {
      name: "dropProducts",
      title: "Drop Products",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
      description: "Products available in this drop",
    },
  ],
  preview: {
    select: {
      title: "title",
      active: "active",
    },
    prepare({ title, active }: { title: string; active: boolean }) {
      return {
        title,
        subtitle: active ? "🟢 Active" : "⚪ Inactive",
      };
    },
  },
};
