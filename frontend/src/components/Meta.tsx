import { Helmet } from "react-helmet-async";

const Meta = ({
  title,
  description,
  keywords,
}: {
  title: string;
  description: string;
  keywords: string;
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "E-shop",
  description: "We sell the best products for cheap",
  keywords: "electronics, buy electronics, cheap electronics",
};

export default Meta;
