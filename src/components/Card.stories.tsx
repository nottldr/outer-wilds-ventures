/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Story, Meta } from '@storybook/react';

import Card, { Props } from './Card';
import { MapNodeSize, PlanetColour } from '../data/universe/types';

export default {
  title: 'Card',
  component: Card,
} as Meta;

const Template: Story<Props> = (args) => <Card {...args} />;

const args: Props = {
  node: {
    id: 'alignment-angle-diagram',
    name: 'Alignment Angle Diagram',
    image: 'BH_WARP_ALIGNMENT_MAP.png',
    logs: [
      'A diagram depicting the alignment angle between a warp tower and its corresponding astral body.',
      'Warp tower alignment angles are not exact. They only need to be within five degress of the astral body’s center.',
      'This results in slightly longer warp windows that last roughly several seconds.',
      'Anyone stepping onto the warp platform during the active window will be immediately warped.',
    ],
    colour: PlanetColour.GREY,
    sizeClass: MapNodeSize.MEDIUM,
    connections: [],
    location: {
      x: 0,
      y: 0,
    },
  },
};

export const Standard = Template.bind({});
Standard.args = { ...args, node: { ...args.node, colour: PlanetColour.RED } };
