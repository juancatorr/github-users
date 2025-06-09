import { NextSeo, type NextSeoProps } from 'next-seo';

interface Props extends Omit<NextSeoProps, 'title'> {
  title?: string | null;
  image?: {
    url: string;
    alt: string;
  };
  twitterHandle?: string;
}

export function Seo({
  title,
  description,
  image,
  twitterHandle,
  ...props
}: Props) {
  return (
    <NextSeo
      title={title || undefined}
      description={description}
      openGraph={{
        title: title || undefined,
        description,
        ...(image && {
          images: [image],
        }),
        ...props.openGraph,
      }}
      twitter={{
        cardType: 'summary_large_image',
        handle: twitterHandle,
        ...props.twitter,
      }}
      {...props}
    />
  );
}
