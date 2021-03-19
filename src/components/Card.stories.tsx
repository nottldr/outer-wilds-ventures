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
  name: 'Hello, world!',
  id: 'hello-world',
  logs: ['foo bar baz'],
  colour: PlanetColour.RED,
  connections: [],
  image: '',
  location: { x: 0, y: 0 },
  size: MapNodeSize.MEDIUM,
};

export const Standard = Template.bind({});
Standard.args = { ...args };
