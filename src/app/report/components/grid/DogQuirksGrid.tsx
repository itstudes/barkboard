"use client";

import React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { DogQuirk } from '@/types/DogQuirk';

interface DogQuirksGridProps {
  data: DogQuirk[];
}

const DogQuirksGrid: React.FC<DogQuirksGridProps> = ({ data }) => {
  return (
    <div>
      {/* Header with total count on the top right */}
      {/* <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
        <span style={{ fontWeight: 'bold' }}>Total: {data.length}</span>
      </div> */}
      
      <Grid
        style={{ height: '475px' }}
        data={data}
        dataItemKey="base2Id"  
        sortable={true}
      >
        <Column 
          field="name" 
          title="Name"
          width={"300px"}
        />
        <Column 
          field="description" 
          title="Description"
        />
      </Grid>
    </div>
  );
};

export default DogQuirksGrid;
