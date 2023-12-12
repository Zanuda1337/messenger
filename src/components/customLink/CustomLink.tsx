import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface CustomLinkProps extends LinkProps {}

const CustomLink: React.FC<CustomLinkProps> = ({ children, to, ...props }) => {
  return (
    <Link {...props} to={to} draggable={false}>
      {children}
    </Link>
  );
};

export default CustomLink;
