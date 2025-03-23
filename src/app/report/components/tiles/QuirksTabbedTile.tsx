"use client";

import * as React from 'react';
import { TabStrip, TabStripSelectEventArguments, TabStripTab } from '@progress/kendo-react-layout';
import DogQuirksGrid from '../grid/DogQuirksGrid';
import { DogQuirk } from '@/types/DogQuirk';

interface QuirksTabbedTileProps {
  physicalQuirks: DogQuirk[];
  behaviorQuirks: DogQuirk[];
}

const QuirksTabbedTile: React.FC<QuirksTabbedTileProps> = ({ physicalQuirks, behaviorQuirks }) => {
  const [selected, setSelected] = React.useState<number>(0);

  // Split physical quirks
  const appearanceQuirks = physicalQuirks.filter(q => q.type === 'appearance');
  const medicalQuirks = physicalQuirks.filter(q => q.type === 'medical');

  // Split behavior quirks
  const generalBehaviorQuirks = behaviorQuirks.filter(q => q.type === 'general behavior');
  const humanInteractionQuirks = behaviorQuirks.filter(q => q.type === 'human interaction');
  const animalInteractionQuirks = behaviorQuirks.filter(q => q.type === 'animal interaction');
  const playQuirks = behaviorQuirks.filter(q => q.type === 'play');

  // Define all potential tabs with a cute title and associated quirks collection.
  const allTabs = [
    { title: 'Appearance 😎', quirks: appearanceQuirks },
    { title: 'Medical 🏥', quirks: medicalQuirks },
    { title: 'Behavior 🐶', quirks: generalBehaviorQuirks },
    { title: 'Human Interactions 🤝', quirks: humanInteractionQuirks },
    { title: 'Animal Interactions 👹', quirks: animalInteractionQuirks },
    { title: 'Play 🎾', quirks: playQuirks }
  ];

  // Filter out tabs that have an empty or null quirks collection.
  const tabs = allTabs.filter(tab => tab.quirks && tab.quirks.length > 0);

  const handleSelect = (e: TabStripSelectEventArguments) => {
    setSelected(e.selected);
  };

  return (
    <div>
      <TabStrip
        selected={selected}
        onSelect={handleSelect}
        tabPosition="left"  // Positions tabs on the left-hand side
        size="small"        // Uses small tabs
        style={{ height: '500px', userSelect: 'none' }}
      >
        {tabs.map((tab, index) => (
          <TabStripTab key={index} title={tab.title}>
            {/* Render the DogQuirksGrid for this tab's collection */}
            <DogQuirksGrid data={tab.quirks} />
          </TabStripTab>
        ))}
      </TabStrip>
    </div>
  );
};

export default QuirksTabbedTile;
