import React from 'react';
import { Helmet } from 'react-helmet-async';

const DEFAULT_TITLE_SUFFIX = ' | Rajan Castle Properties - Premium Real Estate Hyderabad';
const DEFAULT_SITE_TITLE = 'Rajan Castle Properties - Premium Real Estate Hyderabad';
const DEFAULT_DESCRIPTION = 'Rajan - Castle Properties offers premium land investments and real estate ventures in Hyderabad, Telangana. Explore Fourth City Mirkhanpet, Maheshwaram, Kadthal projects. Contact: +91 9090104949';
const DEFAULT_IMAGE = 'https://www.rajan-castle-properties.net/lovable-uploads/19fd2692-690a-4751-ab6b-2edd4890fbae.png';
const DEFAULT_URL = 'https://www.rajan-castle-properties.net';

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = 'website'
}) => {
  const formattedTitle = title
    ? (title.includes('Rajan Castle Properties') ? title : `${title}${DEFAULT_TITLE_SUFFIX}`)
    : DEFAULT_SITE_TITLE;

  const metaDescription = description || DEFAULT_DESCRIPTION;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : DEFAULT_URL);
  const metaImage = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{formattedTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {currentUrl && <link rel="canonical" href={currentUrl} />}

      <meta property="og:type" content={type} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={metaDescription} />
      {metaImage && <meta property="og:image" content={metaImage} />}
      {currentUrl && <meta property="og:url" content={currentUrl} />}
      <meta property="og:site_name" content="Rajan Castle Properties" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {metaImage && <meta name="twitter:image" content={metaImage} />}

      <meta name="robots" content="index, follow" />
      <meta name="author" content="Rajan Castle Properties" />
    </Helmet>
  );
};
