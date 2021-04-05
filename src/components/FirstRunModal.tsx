import React from 'react';

import consent from '../assets/images/consent.svg';

export type Props = {
  onComplete: (result: 'full' | 'hide-spoilers') => void;
};

const FirstRunModal: React.FC<Props> = ({ onComplete }) => {
  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 backdrop-blur"
      style={{
        zIndex: 9999,
      }}
    >
      <div className="flex justify-center items-center h-full">
        <div className="flex items-center flex-col font-space-mono border border-lightblue bg-log-bg text-white w-5/6 md:w-3/4 p-4 text-center relative">
          <p>
            This tool is intended to help{' '}
            <a
              href="https://www.mobiusdigitalgames.com/outer-wilds.html"
              className="italic underline"
            >
              Outer Wilds
            </a>{' '}
            travellers complete their on-board computer Ship Log. It therefore
            obviously contains lots of spoilers.
          </p>

          <div className="mt-10 mb-12 w-5/6 md:w-1/3 space-y-4">
            <div>
              <button
                className="w-full bg-card-green text-white text-xl py-3"
                onClick={() => onComplete('full')}
              >
                Launch <span className="tracking-tighter">--|-..|-.</span>
              </button>
            </div>
            <div>
              <button
                className="w-full bg-card-grey text-log-bg text-sm py-2"
                onClick={() => onComplete('hide-spoilers')}
              >
                Hide Spoilers
              </button>
            </div>
          </div>

          <div className="md:w-1/2">
            <p className="text-xs">Fair Use</p>
            <p className="text-xs text-lightblue">
              This tool is intended for educational and research purposes only.
            </p>
          </div>

          <div className="absolute bottom-0 left-6 hidden md:block">
            <img src={consent} alt="consent friend" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstRunModal;
