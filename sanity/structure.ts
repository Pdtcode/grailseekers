import type { StructureResolver } from "sanity/structure";

import React from "react";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Blog items
      S.listItem()
        .title("Blog")
        .child(
          S.list()
            .title("Blog")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("author").title("Authors"),
            ]),
        ),

      // Store items
      S.listItem()
        .title("Store")
        .child(
          S.list()
            .title("Store")
            .items([
              S.documentTypeListItem("product").title("Products"),
              S.documentTypeListItem("category").title("Categories"),
              S.documentTypeListItem("collection").title("Collections"),
            ]),
        ),

      // Orders with status filtering
      S.listItem()
        .title("Orders")
        .child(
          S.list()
            .title("Orders")
            .menuItems([
              S.menuItem()
                .title("Sync All Orders")
                .icon(() => {
                  // Use React.createElement instead of JSX
                  return React.createElement(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "1em",
                      height: "1em",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: 2,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    },
                    React.createElement("path", {
                      d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
                    }),
                    React.createElement("path", { d: "M3 3v5h5" }),
                    React.createElement("path", {
                      d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",
                    }),
                    React.createElement("path", { d: "M16 21h5v-5" }),
                  );
                })
                .action(() => {
                  // Open the sync orders tool
                  window.location.href = "/studio/order-sync";

                  return null;
                }),
            ])
            .items([
              // All orders
              S.listItem()
                .title("All Orders")
                .child(
                  S.documentTypeList("order")
                    .title("All Orders")
                    .defaultOrdering([
                      { field: "createdAt", direction: "desc" },
                    ]),
                ),

              // Orders by status
              S.listItem()
                .title("By Status")
                .child(
                  S.list()
                    .title("Orders by Status")
                    .items([
                      S.listItem()
                        .title("Pending")
                        .child(
                          S.documentList()
                            .title("Pending Orders")
                            .filter('_type == "order" && status == "PENDING"')
                            .defaultOrdering([
                              { field: "createdAt", direction: "desc" },
                            ]),
                        ),
                      S.listItem()
                        .title("Processing")
                        .child(
                          S.documentList()
                            .title("Processing Orders")
                            .filter(
                              '_type == "order" && status == "PROCESSING"',
                            )
                            .defaultOrdering([
                              { field: "createdAt", direction: "desc" },
                            ]),
                        ),
                      S.listItem()
                        .title("Shipped")
                        .child(
                          S.documentList()
                            .title("Shipped Orders")
                            .filter('_type == "order" && status == "SHIPPED"')
                            .defaultOrdering([
                              { field: "createdAt", direction: "desc" },
                            ]),
                        ),
                      S.listItem()
                        .title("Delivered")
                        .child(
                          S.documentList()
                            .title("Delivered Orders")
                            .filter('_type == "order" && status == "DELIVERED"')
                            .defaultOrdering([
                              { field: "createdAt", direction: "desc" },
                            ]),
                        ),
                      S.listItem()
                        .title("Cancelled")
                        .child(
                          S.documentList()
                            .title("Cancelled Orders")
                            .filter('_type == "order" && status == "CANCELLED"')
                            .defaultOrdering([
                              { field: "createdAt", direction: "desc" },
                            ]),
                        ),
                    ]),
                ),
            ]),
        ),

      // Other document types
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "post",
            "category",
            "author",
            "product",
            "collection",
            "order",
          ].includes(item.getId()!),
      ),
    ]);
