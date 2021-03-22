import React from 'react';

import menu_discord from '../../assets/images/menu_discord.svg';

type Props = {
  className?: string;
};

const DiscordLogo: React.FC<Props> = ({ className }) => (
  <img src={menu_discord} alt="Discord logo" className={className} />
);

export default DiscordLogo;
