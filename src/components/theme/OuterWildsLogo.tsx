import React from 'react';

import menu_outerwilds from '../../assets/images/menu_outerwilds.png';

type Props = {
  className?: string;
};

const DiscordLogo: React.FC<Props> = ({ className }) => (
  <img src={menu_outerwilds} alt="Outer Wilds logo" className={className} />
);

export default DiscordLogo;
