// All personal information below is illustrative. Replace it with your real details.
export const profile = {
  name: 'Alex Morgan',
  firstName: 'Alex',
  role: 'Electronics engineer',
  intro: 'I turn curious ideas into circuits that do something meaningful. A maker at heart, with a soft spot for analog things in a digital world.',
  about: 'I’m Alex, an electronics engineer who likes to understand how things work — and then make them work a little better. My happy place is somewhere between a breadboard, a notebook, and a good cup of coffee.',
  philosophy: 'From the first pencil sketch to the last solder joint, I believe the best engineering is thoughtful, useful, and a little bit inventive.',
  email: 'hello@example.com',
  github: '',
  linkedin: '',
  location: 'Your city, your country',
};

export const projects = [
  {
    id: 'radio', number: '01', title: 'The pocket radio', subtitle: 'A small tribute to the art of listening.',
    category: 'RF & ANALOG', tags: ['Circuit design', 'PCB layout', 'Prototyping'], color: 'sage',
    description: 'An illustrative project exploring a compact FM receiver: from tuning and amplification to a custom enclosure with a satisfyingly tactile dial.',
    challenge: 'How can an everyday object make the invisible world of radio signals feel tangible?',
    approach: 'Explore a receiver circuit, prototype the audio stage, lay out a compact PCB, and bring the assembly together in a considered enclosure.',
    notes: ['Analog signal path', 'Custom printed circuit board', 'Physical tuning interface'],
  },
  {
    id: 'sensor', number: '02', title: 'A sense of place', subtitle: 'Listening to the world, one reading at a time.',
    category: 'EMBEDDED SYSTEMS', tags: ['Embedded C', 'Sensors', 'IoT'], color: 'sand',
    description: 'An illustrative environmental sensing station that brings temperature, humidity, and light readings together in a quiet, approachable interface.',
    challenge: 'Make environmental measurements understandable without losing the details that matter.',
    approach: 'Connect and calibrate sensors, structure the firmware into clear modules, and design a simple interface for observing changes over time.',
    notes: ['Sensor integration', 'Modular firmware', 'Data visualization'],
  },
  {
    id: 'motor', number: '03', title: 'Motion, considered', subtitle: 'A little precision goes a long way.',
    category: 'CONTROL & AUTOMATION', tags: ['Motor control', 'PID', 'Mechatronics'], color: 'rose',
    description: 'An illustrative closed-loop motor controller that connects feedback, control logic, and deliberate movement in a compact experimental platform.',
    challenge: 'Translate a desired motion into a smooth, observable physical response.',
    approach: 'Build a driver and encoder interface, implement a feedback loop, and use a test setup to explore tuning and response.',
    notes: ['Encoder feedback', 'Control loop experiments', 'Hardware and software integration'],
  },
];

export const journey = [
  { date: '20XX — PRESENT', type: 'EXPERIENCE', title: 'Electronics engineer', place: 'Your company · Your city', description: 'Describe your current role, the systems you work on, and the responsibilities that make the work yours.' },
  { date: '20XX — 20XX', type: 'EXPERIENCE', title: 'Engineering intern', place: 'Your previous company', description: 'Add the hands-on experience, design work, and practical lessons from your first engineering role.' },
  { date: '20XX — 20XX', type: 'EDUCATION', title: 'B.Eng. in Electronics', place: 'Your university', description: 'Add your degree, areas of study, and any academic projects or activities you want to share.' },
];

export const hobbies = [
  { id: 'camera', title: 'Chasing the light', label: 'FILM PHOTOGRAPHY', text: 'Slowing down. Looking closer. Finding a story in the ordinary.' },
  { id: 'vinyl', title: 'A different frequency', label: 'MUSIC & RECORDS', text: 'A good record, a warm sound, and absolutely no skip button.' },
  { id: 'mountain', title: 'Off the grid', label: 'HIKING & EXPLORING', text: 'Trading circuit traces for winding trails every now and then.' },
];
