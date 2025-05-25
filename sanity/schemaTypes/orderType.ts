import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
    }),
    defineField({
      name: "total",
      title: "Total",
      type: "number",
      validation: (Rule) => Rule.required().precision(2),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "PENDING" },
          { title: "Processing", value: "PROCESSING" },
          { title: "Shipped", value: "SHIPPED" },
          { title: "Delivered", value: "DELIVERED" },
          { title: "Cancelled", value: "CANCELLED" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            // Note: _key is a system field automatically added by Sanity, not defined here
            defineField({
              name: "itemId",
              type: "string",
              title: "Item ID",
              initialValue: () =>
                Date.now().toString(36) +
                Math.random().toString(36).substring(2, 5),
            }),
            defineField({
              name: "productId",
              type: "string",
              title: "Product ID",
            }),
            defineField({
              name: "variantId",
              type: "string",
              title: "Variant ID",
            }),
            defineField({
              name: "name",
              type: "string",
              title: "Product Name",
            }),
            defineField({
              name: "quantity",
              type: "number",
              title: "Quantity",
            }),
            defineField({ name: "price", type: "number", title: "Price" }),
          ],
        },
      ],
    }),
    defineField({
      name: "shippingAddress",
      title: "Shipping Address",
      type: "object",
      fields: [
        defineField({ name: "name", type: "string", title: "Name" }),
        defineField({ name: "street", type: "string", title: "Street" }),
        defineField({ name: "city", type: "string", title: "City" }),
        defineField({ name: "state", type: "string", title: "State" }),
        defineField({
          name: "postalCode",
          type: "string",
          title: "Postal Code",
        }),
        defineField({ name: "country", type: "string", title: "Country" }),
      ],
    }),
    defineField({
      name: "stripePaymentIntentId",
      title: "Stripe Payment Intent ID",
      type: "string",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "notes",
      title: "Admin Notes",
      type: "text",
    }),
  ],
  preview: {
    select: {
      title: "orderNumber",
      subtitle: "status",
    },
  },
});
