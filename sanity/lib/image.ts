import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

// Aliased function with better error handling
export const urlForImage = (source: SanityImageSource) => {
  // Check if source exists at all
  if (!source) {
    return {
      url: "",
      width: 0,
      height: 0,
      format: "",
    };
  }

  // For safety, always return the builder even if asset structure is unknown
  // The builder will handle the proper construction of the URL
  return builder.image(source);
};
