import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "AstraM Lab IITH - Autonomous Systems Technology Research at IIT Hyderabad",
  description = "AstraM Lab at IIT Hyderabad (IITH) - Leading research in autonomous systems, UAVs, AUVs, ROVs, USVs, GNSS navigation, control systems, and robotics technology. Astram Lab IITH pioneers unmanned vehicle innovations.",
  keywords = "iith, astram lab, astram, astram iith, astram lab iith, IIT Hyderabad, autonomous systems, UAV, AUV, ROV, USV, robotics research, unmanned vehicles, GNSS navigation, control systems, drone technology, underwater robotics, autonomous navigation, robotics lab, research lab iith, autonomous underwater vehicles, unmanned aerial vehicles, mars rovers, robotics iit hyderabad",
  canonical,
  ogImage = "/lovable-uploads/987fcbde-e190-4da7-b505-f08d24cdb828.png",
  noindex = false
}) => {
  const baseUrl = "https://astramlab.lovable.app";
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={fullCanonical} />
      
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};