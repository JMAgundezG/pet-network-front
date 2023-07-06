import * as React from 'react';

import { Pet } from '@/lib/models/Pet';

import ImageBadge from '@/components/layout/ImageBadge';

interface Props {
  pets: Pet[];
}

export default function PetList({ pets }: Props) {
  return (
    <div className='grid-rows grid'>
      <div className='grid-cols grid grid-cols-1 md:grid-cols-3'>
        {pets.map((pet, index) => (
          <ImageBadge text={pet.name} image={pet.image} key={'pet-' + index} />
        ))}
      </div>
    </div>
  );
}
