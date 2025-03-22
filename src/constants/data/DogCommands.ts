import { DogCommand } from "@/types/DogCommand";

export const commands: DogCommand[] = 
[
    {
      base2Id: 1,
      name: 'sit',
      expectation: 'The dog sits calmly where it was.',
      similarToCommandsBitMap: 2,
      type: 'obedience'
    },
    {
      base2Id: 2,
      name: 'down',
      expectation: 'The dog lies down on command.',
      similarToCommandsBitMap: 1,
      type: 'obedience'
    },
    {
      base2Id: 4,
      name: 'stay',
      expectation: 'The dog remains in place until released.',
      similarToCommandsBitMap: 24,
      type: 'obedience'
    },
    {
      base2Id: 8,
      name: 'wait',
      expectation: 'The dog holds its position until given further instructions.',
      similarToCommandsBitMap: 20,
      type: 'obedience'
    },
    {
      base2Id: 16,
      name: 'stop',
      expectation: 'The dog ceases its current action immediately.',
      similarToCommandsBitMap: 12,
      type: 'obedience'
    },
    {
      base2Id: 32,
      name: 'heel',
      expectation: 'The dog walks closely beside its handler.',
      similarToCommandsBitMap: 201326592,
      type: 'obedience'
    },
    {
      base2Id: 64,
      name: 'come',
      expectation: 'The dog returns promptly to its handler.',
      similarToCommandsBitMap: 128,
      type: 'obedience'
    },
    {
      base2Id: 128,
      name: 'fetch',
      expectation: 'The dog retrieves an item and brings it back.',
      similarToCommandsBitMap: 16777280,
      type: 'play'
    },
    {
      base2Id: 256,
      name: 'roll over',
      expectation: 'The dog rolls onto its back and then back up.',
      similarToCommandsBitMap: 2147483648,
      type: 'play'
    },
    {
      base2Id: 512,
      name: 'speak',
      expectation: 'The dog barks on command.',
      similarToCommandsBitMap: 1024,
      type: 'play'
    },
    {
      base2Id: 1024,
      name: 'quiet',
      expectation: 'The dog stops barking when told.',
      similarToCommandsBitMap: 512,
      type: 'obedience'
    },
    {
      base2Id: 2048,
      name: 'leave it',
      expectation: 'The dog refrains from picking up or engaging with an item.',
      similarToCommandsBitMap: 4096,
      type: 'obedience'
    },
    {
      base2Id: 4096,
      name: 'drop it',
      expectation: 'The dog releases an item from its mouth.',
      similarToCommandsBitMap: 2048,
      type: 'obedience'
    },
    {
      base2Id: 8192,
      name: 'place',
      expectation: 'The dog goes to a designated spot and stays there.',
      similarToCommandsBitMap: 49152,
      type: 'obedience'
    },
    {
      base2Id: 16384,
      name: 'stand',
      expectation: 'The dog stands still and attentive.',
      similarToCommandsBitMap: 40960,
      type: 'obedience'
    },
    {
      base2Id: 32768,
      name: 'back up',
      expectation: 'The dog moves backward on command.',
      similarToCommandsBitMap: 24576,
      type: 'obedience'
    },
    {
      base2Id: 65536,
      name: 'off',
      expectation: 'The dog gets off furniture or stops jumping.',
      similarToCommandsBitMap: 131072,
      type: 'obedience'
    },
    {
      base2Id: 131072,
      name: 'no',
      expectation: 'The dog stops undesirable behavior immediately.',
      similarToCommandsBitMap: 65536,
      type: 'obedience'
    },
    {
      base2Id: 262144,
      name: 'touch',
      expectation: 'The dog touches the designated target with its nose.',
      similarToCommandsBitMap: 524288,
      type: 'obedience'
    },
    {
      base2Id: 524288,
      name: 'shake',
      expectation: 'The dog offers its paw for a shake.',
      similarToCommandsBitMap: 262144,
      type: 'social'
    },
    {
      base2Id: 1048576,
      name: 'spin',
      expectation: 'The dog spins in a circle.',
      similarToCommandsBitMap: 2097152,
      type: 'advanced'
    },
    {
      base2Id: 2097152,
      name: 'bow',
      expectation: 'The dog takes a bow, lowering its front legs.',
      similarToCommandsBitMap: 1048576,
      type: 'advanced'
    },
    {
      base2Id: 4194304,
      name: 'beg',
      expectation: 'The dog sits up on its hind legs in a begging posture.',
      similarToCommandsBitMap: 8388608,
      type: 'play'
    },
    {
      base2Id: 8388608,
      name: 'crawl',
      expectation: 'The dog moves forward low to the ground.',
      similarToCommandsBitMap: 4194304,
      type: 'advanced'
    },
    {
      base2Id: 16777216,
      name: 'find it',
      expectation: 'The dog searches for a hidden object.',
      similarToCommandsBitMap: 192,
      type: 'play'
    },
    {
      base2Id: 33554432,
      name: 'guard',
      expectation: 'The dog stands alert and protects its territory.',
      similarToCommandsBitMap: 0,
      type: 'behavior'
    },
    {
      base2Id: 67108864,
      name: 'heel left',
      expectation: 'The dog moves with precision to the left of its handler.',
      similarToCommandsBitMap: 134217760,
      type: 'obedience'
    },
    {
      base2Id: 134217728,
      name: 'heel right',
      expectation: 'The dog moves with precision to the right of its handler.',
      similarToCommandsBitMap: 67108896,
      type: 'obedience'
    },
    {
      base2Id: 268435456,
      name: 'side',
      expectation: 'The dog moves laterally on command.',
      similarToCommandsBitMap: 0,
      type: 'advanced'
    },
    {
      base2Id: 536870912,
      name: 'jump',
      expectation: 'The dog leaps into the air.',
      similarToCommandsBitMap: 1073741824,
      type: 'play'
    },
    {
      base2Id: 1073741824,
      name: 'sweep',
      expectation: 'The dog performs a sweeping motion with its body.',
      similarToCommandsBitMap: 536870912,
      type: 'advanced'
    },
    {
      base2Id: 2147483648,
      name: 'roll',
      expectation: 'The dog executes a rolling movement.',
      similarToCommandsBitMap: 256,
      type: 'advanced'
    },
    {
      base2Id: 4294967296,
      name: 'cuddle',
      expectation: 'The dog approaches for affection and cuddling.',
      similarToCommandsBitMap: 8589934592,
      type: 'social'
    },
    {
      base2Id: 8589934592,
      name: 'greet',
      expectation: 'The dog welcomes people with a friendly demeanor.',
      similarToCommandsBitMap: 4294967296,
      type: 'social'
    },
    {
      base2Id: 17179869184,
      name: 'play dead',
      expectation: 'The dog pretends to be dead when instructed.',
      similarToCommandsBitMap: 0,
      type: 'advanced'
    },
    {
      base2Id: 34359738368,
      name: 'mimic',
      expectation: 'The dog imitates actions as a form of trick.',
      similarToCommandsBitMap: 0,
      type: 'advanced'
    },
    {
      base2Id: 68719476736,
      name: 'balance',
      expectation: 'The dog maintains steady balance on command.',
      similarToCommandsBitMap: 549755813888,
      type: 'advanced'
    },
    {
      base2Id: 137438953472,
      name: 'patience',
      expectation: 'The dog waits calmly without fuss.',
      similarToCommandsBitMap: 274877906944,
      type: 'obedience'
    },
    {
      base2Id: 274877906944,
      name: 'calm',
      expectation: 'The dog relaxes and remains composed.',
      similarToCommandsBitMap: 137438953472,
      type: 'behavior'
    },
    {
      base2Id: 549755813888,
      name: 'focus',
      expectation: 'The dog concentrates on the task at hand.',
      similarToCommandsBitMap: 68719476736,
      type: 'obedience'
    },
    {
      base2Id: 1099511627776,
      name: 'paw',
      expectation: 'The dog gives its paw on command.',
      similarToCommandsBitMap: 524288,
      type: 'social'
    },
    {
      base2Id: 2199023255552,
      name: 'paws up',
      expectation: 'The dog puts its paws on a surface when instructed.',
      similarToCommandsBitMap: 0,
      type: 'advanced'
    },
    {
      base2Id: 4398046511104,
      name: 'scratch',
      expectation: 'The dog scratches at a target when prompted.',
      similarToCommandsBitMap: 0,
      type: 'play'
    },
    {
      base2Id: 8796093022208,
      name: 'home',
      expectation: 'The dog stands between the handler’s legs as a trick.',
      similarToCommandsBitMap: 0,
      type: 'advanced'
    },
    {
      base2Id: 17592186044416,
      name: 'go to your mat',
      expectation: 'The dog goes to its designated mat and stays there.',
      similarToCommandsBitMap: 8192,
      type: 'obedience'
    },
    {
      base2Id: 35184372088832,
      name: 'bow',
      expectation: 'The dog performs a down dog pose on command.',
      similarToCommandsBitMap: 0,
      type: 'advanced'
    },
    {
      base2Id: 70368744177664,
      name: 'through',
      expectation: 'The dog jumps through a hoop or obstacle when signaled.',
      similarToCommandsBitMap: 0,
      type: 'advanced'
    }
  ];
  