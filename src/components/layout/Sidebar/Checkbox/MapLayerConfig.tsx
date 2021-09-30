import React from 'react';
import { Curiosity } from '../../../../data/universe/types';
import { MapLayer } from '../../../../util/map-layer';
import themeFrom from '../../../../util/theme-from';

type Props = {
  mapLayer: MapLayer;
  checked: boolean;
};

const MapLayerCheckbox: React.FC<Props> = ({ checked, mapLayer }) => {
  const curiosity = (() => {
    switch (mapLayer) {
      case MapLayer.INVISIBLE_PLANET:
        return Curiosity.INVISIBLE_PLANET;
      case MapLayer.QUANTUM_MOON:
        return Curiosity.QUANTUM_MOON;
      case MapLayer.SUNKEN_MODULE:
        return Curiosity.SUNKEN_MODULE;
      case MapLayer.TIME_LOOP:
        return Curiosity.TIME_LOOP;
      case MapLayer.VESSEL:
        return Curiosity.VESSEL;
    }

    return undefined;
  })();

  const theme = themeFrom(curiosity);

  return (
    <div
      className={`inline-block align-middle w-4 h-4 ${
        checked ? theme.bg : 'bg-transparent'
      } ${theme.bgborder} border-2`}
    />
  );
};

export default MapLayerCheckbox;
